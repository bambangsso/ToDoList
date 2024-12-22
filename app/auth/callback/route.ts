

/*
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error('Auth error:', error);
      return NextResponse.redirect(`${requestUrl.origin}?error=auth`);
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}*/


import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const error = requestUrl.searchParams.get('error');
    const error_description = requestUrl.searchParams.get('error_description');

    console.log('-->', requestUrl, code, error, error_description)

    if (error) {
      console.error('Auth error:', error, error_description);
      return NextResponse.redirect(`${requestUrl.origin}?error=${error}`);
    }

    if (code) {
      const cookieStore = cookies();
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
      
      try {
        await supabase.auth.exchangeCodeForSession(code);
        return NextResponse.redirect(requestUrl.origin);
      } catch (error) {
        console.error('Session exchange error:', error);
        return NextResponse.redirect(`${requestUrl.origin}?error=session`);
      }
    }

    return NextResponse.redirect(`${requestUrl.origin}?error=no_code`);
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(`${request.url.split('/auth')[0]}?error=callback`);
  }
}