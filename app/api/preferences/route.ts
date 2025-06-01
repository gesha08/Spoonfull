import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { UserPreferences } from '../../../types/models';

export const dynamic = 'force-dynamic';

// Get user preferences
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('spoonfull');
    const preferences = await db.collection('preferences').findOne({ userId: 'demo-user' });
    
    return NextResponse.json(preferences || {});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update user preferences
export async function PUT(request: Request) {
  try {
    const updates: Partial<UserPreferences> = await request.json();
    const client = await clientPromise;
    const db = client.db('spoonfull');
    
    const result = await db.collection('preferences').updateOne(
      { userId: 'demo-user' },
      { 
        $set: {
          ...updates,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 