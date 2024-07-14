import { NextResponse } from 'next/server';
import connect from '../../../../../lib/mongoose';
import Prayer from '../../../../../models/Prayer';
import prayersData from '../../../../../lib/qazalist.json';

export async function POST() {
  await connect();
  console.log("hello")
  try {
    const existingPrayers = await Prayer.find();
    if (existingPrayers.length === 0) {
      const prayers = await Prayer.insertMany(prayersData);
      return NextResponse.json(prayers);
    } else {
      return NextResponse.json(existingPrayers);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error initializing prayers' }, { status: 500 });
  }
}
