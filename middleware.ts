import { type NextRequest } from 'next/server'
import { updateSession } from '@/app/utils/supabase/middleware'
import { redirect } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/server'

export async function middleware(request: NextRequest) {
    // console.log(request);
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    const isLoggedIn = !!data?.user;
    const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');
    console.log(isLoggedIn, isOnDashboard);
    if (isOnDashboard) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/login', request.nextUrl)); // Redirect unauthenticated users to login page
    } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', request.nextUrl));
    }

    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}