import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();
    const { loginId, password } = body;

    // Helper to detect loginType
    const loginType = detectLoginType(loginId);
    const payload = {
      loginType,
      [loginType]: loginId,
      password
    };

    // Call your external backend
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/register/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    if (!backendRes.ok) {
      const errorData = await backendRes.json();
      return NextResponse.json(
        { message: errorData?.message || 'Login failed' },
        { status: backendRes.status }
      );
    }

    const data = await backendRes.json();
    // console.log(data);
    const { token, user } = data;

    // Set the access token in HTTP-only cookie
    cookies().set({
      name: 'accessToken',
      value: token.access.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      sameSite: 'lax'
    });

    // Return user info only
    return NextResponse.json({ user });
  } catch (err) {
    console.error('Login route error:', err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Utility function
const detectLoginType = (loginId) => {
  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(loginId)) {
    return 'email';
  } else if (/^[0-9]{10}$/.test(loginId)) {
    return 'phone';
  } else if (/^[a-zA-Z ]{3,}$/.test(loginId)) {
    return 'name';
  }
  return 'email'; // default fallback
};
