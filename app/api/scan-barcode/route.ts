import { NextResponse } from 'next/server';
import { scanBarcode } from '@/lib/api/barcode';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const barcode = url.searchParams.get('barcode');
    if (!barcode) return NextResponse.json({ error: 'barcode is required' }, { status: 400 });

    const food = await scanBarcode(barcode);
    return NextResponse.json(food);
  } catch (err: any) {
    console.error('scan-barcode error', err);
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}
