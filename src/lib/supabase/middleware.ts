import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refreshing the auth token
  const { data: { user } } = await supabase.auth.getUser()

  const url = request.nextUrl.clone()

  // Protected routes
  const isDashboardRoute = url.pathname.startsWith('/dashboard') || 
                          url.pathname.startsWith('/licenses') || 
                          url.pathname.startsWith('/downloads') || 
                          url.pathname.startsWith('/profile') || 
                          url.pathname.startsWith('/settings')
  
  const isAdminRoute = url.pathname.startsWith('/admin')
  const isAuthRoute = url.pathname.startsWith('/auth')

  if (!user && (isDashboardRoute || isAdminRoute)) {
    // no user, potentially respond by redirecting the user to the login page
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  if (user && isAuthRoute) {
    // user is logged in, redirect them to the dashboard
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  if (user && isAdminRoute) {
    // check for admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
