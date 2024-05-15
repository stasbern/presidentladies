import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export default async function GET(req: NextRequest) {
  const supabase = createClient()

  try {
    console.log('Signing in with Discord...')
    // Handle the OAuth flow on the server-side
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${req.nextUrl.origin}/protected`,
      },
    })

    if (error) {
      console.error('Error signing in with Discord:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Getting session data...')
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      console.error('Error getting session:', sessionError)
      return NextResponse.json({ error: sessionError.message }, { status: 500 })
    }

    console.log('Session data:', sessionData)

    // Store the session data in a secure cookie or return it to the client-side
    const response = NextResponse.json({ session: sessionData.session })

    if (sessionData.session) {
      response.cookies.set('session', sessionData.session.access_token, { httpOnly: true, secure: true })
    }

    return response
  } catch (error) {
    console.error('Error handling authentication:', error)
    let errorMessage
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ errorMessage }, { status: 500 })
  }
}