import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const cookie = req.headers.get('cookie') || '';
  const { userId } = await params;

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/wishlist/${userId}`,
    {
      headers: { Cookie: cookie },
      cache: 'no-store'
    }
  );

  const data = await backendRes.json();

  return new NextResponse(JSON.stringify({ wishlist: data?.data || [] }), {
    status: backendRes.status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(req) {
  const cookie = req.headers.get('cookie') || '';
  const body = await req.json();
  const { productId, userId, selectedMetal } = body;

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/wishlist`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie
      },
      body: JSON.stringify({ productId, userId, selectedMetal })
    }
  );

  const data = await backendRes.json();

  return new NextResponse(JSON.stringify(data), {
    status: backendRes.status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function DELETE(req) {
  const cookie = req.headers.get('cookie') || '';
  const body = await req.json();
  console.log(body);

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/wishlist/${body.wishlistItemId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie
      }
    }
  );

  const data = await backendRes.json();

  return new NextResponse(JSON.stringify(data), {
    status: backendRes.status,
    headers: { 'Content-Type': 'application/json' }
  });
}
