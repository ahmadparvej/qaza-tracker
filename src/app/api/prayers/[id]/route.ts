// app/api/prayers/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connect from '../../../../../lib/mongoose';
import Prayer from '../../../../../models/Prayer';
import { ObjectId } from 'mongodb';


export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {
  await connect();
  const id = params.id;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const prayer = await Prayer.findByIdAndDelete(id);
    if (!prayer) {
      return NextResponse.json({ error: 'Prayer not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Prayer deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting prayer' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string }}) {
  await connect();
  const id = params.id;
  const { qazaCount } = await req.json();

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const updatedPrayer = await Prayer.findByIdAndUpdate(
      id,
      { qazaCount, lastUpdated: new Date() },
      { new: true }
    );

    if (!updatedPrayer) {
      return NextResponse.json({ error: 'Prayer not found' }, { status: 404 });
    }

    return NextResponse.json(updatedPrayer);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating prayer' }, { status: 500 });
  }
}
