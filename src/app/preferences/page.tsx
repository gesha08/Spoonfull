'use client';

import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';

const cuisineTypes = [
  { id: 'italian', label: 'Italian', icon: '🍝' },
  { id: 'japanese', label: 'Japanese', icon: '🍱' },
  { id: 'mexican', label: 'Mexican', icon: '🌮' },
  { id: 'indian', label: 'Indian', icon: '🍛' },
  { id: 'chinese', label: 'Chinese', icon: '🥡' },
  { id: 'american', label: 'American', icon: '🍔' },
  { id: 'mediterranean', label: 'Mediterranean', icon: '🥙' },
  { id: 'thai', label: 'Thai', icon: '🍜' }
];

const dietaryPreferences = [
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥗' },
  { id: 'vegan', label: 'Vegan', icon: '🌱' },
  { id: 'pescatarian', label: 'Pescatarian', icon: '🐟' },
  { id: 'keto', label: 'Keto', icon: '🥑' },
  { id: 'paleo', label: 'Paleo', icon: '🍖' },
  { id: 'halal', label: 'Halal', icon: '🌙' },
  { id: 'kosher', label: 'Kosher', icon: '✡️' },
  { id: 'none', label: 'No Restrictions', icon: '🍽️' }
];

export default function PreferencesPage() {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<string>('none');

  const toggleCuisine = (cuisineId: string) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisineId)
        ? prev.filter(id => id !== cuisineId)
        : [...prev, cuisineId]
    );
  };

  return (
    <PageLayout
      title="Food Preferences"
      emoji="😋"
      description="Tell us what you like to eat! Select your favorite cuisines and dietary preferences."
    >
      <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 transform hover:-translate-y-1 transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#FF6B6B]">
            Favorite Cuisines
            <span className="inline-block ml-2 animate-wiggle">🌎</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cuisineTypes.map((cuisine) => (
            <div
              key={cuisine.id}
              onClick={() => toggleCuisine(cuisine.id)}
              className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                selectedCuisines.includes(cuisine.id) ? 'scale-105' : ''
              }`}
            >
              <div
                className={`flex flex-col items-center gap-4 p-6 rounded-2xl shadow-lg ${
                  selectedCuisines.includes(cuisine.id)
                    ? 'bg-[#FF6B6B] ring-4 ring-[#FF6B6B] ring-offset-4 ring-offset-white'
                    : 'bg-[#4D96FF]'
                }`}
              >
                <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                  {cuisine.icon}
                </span>
                <span className="font-bold text-white text-lg">
                  {cuisine.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#FF6B6B]">
            Dietary Preference
            <span className="inline-block ml-2 animate-wiggle">🥗</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {dietaryPreferences.map((diet) => (
            <div
              key={diet.id}
              onClick={() => setSelectedDiet(diet.id)}
              className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                selectedDiet === diet.id ? 'scale-105' : ''
              }`}
            >
              <div
                className={`flex flex-col items-center gap-4 p-6 rounded-2xl shadow-lg ${
                  selectedDiet === diet.id
                    ? 'bg-[#FF6B6B] ring-4 ring-[#FF6B6B] ring-offset-4 ring-offset-white'
                    : 'bg-[#6BCB77]'
                }`}
              >
                <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                  {diet.icon}
                </span>
                <span className="font-bold text-white text-lg">
                  {diet.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
} 