import {
  CustomerField,
  // CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoice,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are not set.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// async function testConnection() {
//   try {
//     const client = createClient(); // Uses process.env.POSTGRES_URL by default
//     // console.log(client);
//     const { rows } = await client.client.sql`SELECT 1 AS test`;
//     console.log('Connection successful:', rows);
//   } catch (error) {
//     console.error('Connection error:', error);
//   }
// }

// testConnection();
export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const { data, error } = await supabase.from('revenue').select('*').returns<Revenue[]>();

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }
    return data;

    // console.log('Data fetch completed after 3 seconds.');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const { data, error } = await supabase.from('invoices').select(`
        id,
        amount,
        customers (
          name,
          image_url,
          email
        )
      `)
      .order('date', { ascending: false })
      .limit(5)
      .returns<LatestInvoice[]>()

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }

    const latestInvoices = data ? data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    })) : [];
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = supabase.from('invoices').select('*', { count: 'exact', head: true });
    const customerCountPromise = supabase.from('customers').select('*', { count: 'exact', head: true });
    const invoiceStatusPromise = { 'paid': 100626, 'pending': 125632 };
    // client.sql`SELECT
    //    SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
    //    SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    //    FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].count ?? '0');
    const numberOfCustomers = Number(data[1].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const { data, error } = await supabase.rpc('search_invoices', {
      query
    })
      .order('date', { ascending: false })
      .range(offset, offset + ITEMS_PER_PAGE - 1)
      .returns<InvoicesTable[]>();

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const { data, error, count } = await supabase.rpc('search_invoices', {
      query
    }, { count: 'exact', head: true });

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }
    console.log(data);
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const { data, error } = await supabase.from('invoices').select(`
        id,
        customer_id,
        amount,
        status
      `)
      .eq('id', id)
      .returns<InvoiceForm[]>();

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }

    const invoice = data ? data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    })) : [];

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const { data, error } = await supabase.from('customers').select(`
        id,
        name
      `)
      .order('name', { ascending: false })
      .returns<CustomerField[]>();

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }

    const customers = data;
    return customers ?? [];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

// export async function fetchFilteredCustomers(query: string) {
//   try {
//     const data = await client.sql<CustomersTableType>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `;

//     const customers = data.rows.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid),
//     }));

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch customer table.');
//   }
// }
