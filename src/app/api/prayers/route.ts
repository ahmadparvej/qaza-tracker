// app/api/prayers/route.ts
import { NextResponse } from 'next/server';
import connect from '../../../../lib/mongoose';
import Prayer from '../../../../models/Prayer';
import { NextRequest } from 'next/server';

export async function GET() {
  await connect();
  try {
    const prayers = await Prayer.find({});
    return NextResponse.json(prayers);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching prayers' }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  await connect();
  try {
    const { name, qazaCount } = await req.json();
    const prayer = await Prayer.create({ name, qazaCount, lastUpdated: new Date() });
    return NextResponse.json(prayer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating prayer' }, { status: 400 });
  }
}
