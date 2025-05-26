// Supports GET requests to /api/video-proxy?url=...

import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get('url');

  if (!videoUrl) {
    return new NextResponse('Missing video URL', { status: 400 });
  }

  try {
    const response = await fetch(videoUrl);

    if (!response.ok) {
      return new NextResponse('Failed to fetch video', { status: 502 });
    }

    const contentType = response.headers.get('Content-Type') || 'video/mp4';
    const readableStream = response.body;

    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } catch (error) {
    return new NextResponse('Server error', { status: 500 });
  }
}
