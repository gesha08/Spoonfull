import { ObjectId } from 'mongodb';

export interface UserPreferences {
  _id?: ObjectId;
  budget: number;
  currency: string;
  mealPreference: 'pre-cooked' | 'cooking-needed' | 'both';
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Allergy {
  _id?: ObjectId;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Product {
  _id?: ObjectId;
  name: string;
  price: number;
  currency: string;
  requiresCooking: boolean;
  allergens: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
} 