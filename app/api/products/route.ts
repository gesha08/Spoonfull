import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { Product } from '../../../types/models';

export const dynamic = 'force-dynamic';

// Get all products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requiresCooking = searchParams.get('requiresCooking');
    const allergens = searchParams.get('allergens')?.split(',');
    
    const client = await clientPromise;
    const db = client.db('spoonfull');
    
    let query: any = {};
    
    if (requiresCooking !== null) {
      query.requiresCooking = requiresCooking === 'true';
    }
    
    if (allergens && allergens.length > 0) {
      query.allergens = { $nin: allergens };
    }
    
    const products = await db.collection('products')
      .find(query)
      .toArray();
    
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Add a new product
export async function POST(request: Request) {
  try {
    const product: Product = await request.json();
    const client = await clientPromise;
    const db = client.db('spoonfull');
    
    const result = await db.collection('products').insertOne({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 