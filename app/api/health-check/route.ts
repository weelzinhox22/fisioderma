import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
}

// Não é necessário cache para este endpoint
export const dynamic = 'force-dynamic'; 