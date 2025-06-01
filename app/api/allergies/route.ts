import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { Allergy } from '../../../types/models';

export const dynamic = 'force-dynamic';

// Get all allergies for the user
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('spoonfull');
    const allergies = await db.collection('allergies')
      .find({ userId: 'demo-user' })
      .toArray();
    
    return NextResponse.json(allergies);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Add a new allergy
export async function POST(request: Request) {
  try {
    const allergy: Allergy = await request.json();
    const client = await clientPromise;
    const db = client.db('spoonfull');
    
    const result = await db.collection('allergies').insertOne({
      ...allergy,
      userId: 'demo-user',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete an allergy
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const allergyId = searchParams.get('id');
    
    if (!allergyId) {
      return NextResponse.json({ error: 'Allergy ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('spoonfull');
    
    const result = await db.collection('allergies').deleteOne({
      _id: allergyId,
      userId: 'demo-user'
    });
    
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 