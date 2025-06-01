'use client';

import React, { useState } from 'react';
import PageLayout from '../../src/components/PageLayout';

const commonAllergies = [
  { id: 'dairy', label: 'Dairy', icon: '🥛' },
  { id: 'nuts', label: 'Nuts', icon: '🥜' },
  { id: 'eggs', label: 'Eggs', icon: '🥚' },
  { id: 'soy', label: 'Soy', icon: '🫘' },
  { id: 'wheat', label: 'Wheat', icon: '🌾' },
  { id: 'fish', label: 'Fish', icon: '🐟' },
  { id: 'shellfish', label: 'Shellfish', icon: '🦐' },
  { id: 'gluten', label: 'Gluten', icon: '🍞' }
];

export default function AllergiesPage() {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [otherAllergies, setOtherAllergies] = useState('');

  const toggleAllergy = (allergyId: string) => {
    setSelectedAllergies(prev =>
      prev.includes(allergyId)
        ? prev.filter(id => id !== allergyId)
        : [...prev, allergyId]
    );
  };

  return (
    <PageLayout
      title="Allergies & Restrictions"
      emoji="🚫"
      description="Select any allergies or dietary restrictions you have. This helps us ensure we only show you safe food options."
    >
      <div className="bg-white rounded-2xl border-4 border-[#FFD93D] p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {commonAllergies.map((allergy) => (
            <div
              key={allergy.id}
              onClick={() => toggleAllergy(allergy.id)}
              className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                selectedAllergies.includes(allergy.id) ? 'scale-105' : ''
              }`}
            >
              <div
                className={`flex flex-col items-center gap-4 p-6 rounded-2xl shadow-lg ${
                  selectedAllergies.includes(allergy.id)
                    ? 'bg-[#FF6B6B] ring-4 ring-[#FF6B6B] ring-offset-4 ring-offset-white'
                    : 'bg-[#FFD93D]'
                }`}
              >
                <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                  {allergy.icon}
                </span>
                <span className="font-bold text-white text-lg">
                  {allergy.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border-4 border-[#FFD93D] p-8">
        <div className="text-center">
          <label className="block text-3xl font-bold text-[#FF6B6B] mb-8">
            Other Restrictions
            <span className="inline-block ml-2 animate-wiggle">📝</span>
          </label>
          <textarea
            value={otherAllergies}
            onChange={(e) => setOtherAllergies(e.target.value)}
            placeholder="Tell us about any other dietary restrictions or preferences..."
            className="w-full max-w-2xl rounded-2xl border-4 border-[#FFD93D] bg-white p-4 text-lg text-[#4A4A4A] placeholder-[#B5B5B5] focus:border-[#FF6B6B] focus:ring-[#FF6B6B] transition-colors duration-300 shadow-inner min-h-[150px]"
          />
        </div>
      </div>
    </PageLayout>
  );
} 