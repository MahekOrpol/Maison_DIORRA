// app/actions/authActions.js
'use server';

import { cookies } from 'next/headers';

// export async function loginUser(prevState, formData) {
//   const username = formData.get('username');
//   const password = formData.get('password');

//   const res = await fetch('https://dummyjson.com/auth/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username, password })
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     return { error: data.message || 'Login failed !' };
//   }

//   // ✅ Store token in HttpOnly cookie
//   const cookieStore = await cookies();
//   cookieStore.set({
//     name: 'token',
//     value: data.accessToken, // or whatever your API returns
//     httpOnly: true,
//     secure: true,
//     path: '/',
//     sameSite: 'strict',
//     maxAge: 60 * 60 * 24 * 7 // 7 days
//   });

//   return { success: true };
// }

export async function logoutUser(prevState, formData) {
  const cookieStore = await cookies();

  cookieStore.delete('token');
  return { success: true };
}
