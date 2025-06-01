import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('spoonfull');

    // Sample data
    const sampleProducts = [
      {
        name: "Quick & Easy Pasta",
        price: 12.99,
        currency: "USD",
        requiresCooking: true,
        allergens: ["wheat", "eggs"],
        nutritionalInfo: {
          calories: 350,
          protein: 12,
          carbs: 45,
          fats: 8
        }
      },
      {
        name: "Ready-to-eat Chicken Salad",
        price: 8.99,
        currency: "USD",
        requiresCooking: false,
        allergens: ["eggs"],
        nutritionalInfo: {
          calories: 280,
          protein: 25,
          carbs: 12,
          fats: 15
        }
      }
    ];

    const sampleAllergies = [
      {
        name: "Peanuts",
        severity: "severe",
        userId: "demo-user"
      },
      {
        name: "Lactose",
        severity: "moderate",
        userId: "demo-user"
      }
    ];

    const samplePreferences = {
      budget: 150,
      currency: "USD",
      mealPreference: "both",
      userId: "demo-user"
    };

    // Clear existing data
    await db.collection('products').deleteMany({});
    await db.collection('allergies').deleteMany({});
    await db.collection('preferences').deleteMany({});

    // Insert sample data
    await db.collection('products').insertMany(sampleProducts);
    await db.collection('allergies').insertMany(sampleAllergies);
    await db.collection('preferences').insertOne(samplePreferences);

    return NextResponse.json({
      status: 'success',
      message: 'Database seeded successfully!',
      data: {
        productsCount: sampleProducts.length,
        allergiesCount: sampleAllergies.length,
        preferencesCount: 1
      }
    });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to seed database',
        error: error.message 
      },
      { status: 500 }
    );
  }
} 