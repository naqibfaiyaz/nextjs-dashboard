'use server';

import { z } from 'zod';
import { supabase } from '@/app/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
        message: 'Please select a customer.'
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
        message: 'Please select an invoice status.'
    }),
    date: z.string(),
});

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
    console.log(prevState);
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = CreateInvoice.safeParse(rawFormData);

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        const { data, error } = await supabase
            .from('invoices')
            .insert([
                { customer_id: customerId, amount: amountInCents, status: status, date: date },
            ])
            .select()
        // Test it out:
        console.log(data, error);

    } catch (e) {
        console.log(e);
    } finally {
        //Clear resources
        revalidatePath('/dashboard/invoices');
        redirect('/dashboard/invoices');
    }
}

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = UpdateInvoice.safeParse(rawFormData);

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;

    const amountInCents = amount * 100;

    try {
        const { data, error } = await supabase
            .from('invoices')
            .update({ customer_id: customerId, amount: amountInCents, status: status })
            .eq('id', id)
            .select();
        console.log(data, error);
    } catch (e) {
        console.log(e);
    } finally {
        revalidatePath('/dashboard/invoices');
        redirect('/dashboard/invoices');
    }
}

export async function deleteInvoice(id: string) {

    try {
        const { data, error } = await supabase
            .from('invoices')
            .delete()
            .eq('id', id)
            .select();
        console.log(data, error);
        // return { message: 'Deleted Invoice' };
    } catch (e) {
        console.log(e);
        // return { message: 'Database Error: Failed to Delete Invoice - ' + e };
    } finally {
        revalidatePath('/dashboard/invoices');
    }
}