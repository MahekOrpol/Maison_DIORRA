import { NextResponse } from 'next/server';

// For App Router
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('No image URL provided', { status: 400 });
  }

  const response = await fetch(imageUrl); // still http
  const buffer = await response.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
