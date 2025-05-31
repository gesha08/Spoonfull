'use client';

import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';

type Currency = {
  code: string;
  symbol: string;
  name: string;
};

type MealPreference = 'pre-cooked' | 'cooking-needed' | 'both';

const currencies: Currency[] = [
  { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];

interface Location {
  lat: number;
  lng: number;
  address: string;
}

export default function HomePage() {
  const [budget, setBudget] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const [mealPreference, setMealPreference] = useState<MealPreference>('both');
  const [location, setLocation] = useState<Location | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string>('');

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setBudget(value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currency = currencies.find(c => c.code === e.target.value) || currencies[0];
    setSelectedCurrency(currency);
  };

  const handleMealPreferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMealPreference(e.target.value as MealPreference);
  };

  const detectLocation = () => {
    setIsDetecting(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
          );
          const data = await response.json();
          
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: data.display_name || 'Location detected'
          });
        } catch (err) {
          setError('Failed to get address details');
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        setError('Failed to detect location. Please enter manually.');
        setIsDetecting(false);
      }
    );
  };

  return (
    <PageLayout
      title="Welcome to Spoonful"
      description="Let's get started by setting up your preferences for a better food experience."
    >
      <div className="space-y-8">
        {/* Budget and Currency Section */}
        <div className="bg-white rounded-2xl border-4 border-[#FFD93D] p-8">
          <h2 className="text-2xl font-bold text-[#FF6B6B] mb-6 flex items-center">
            <span className="text-3xl mr-2">💰</span>
            Budget Settings
          </h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="budget" className="block text-lg font-medium text-[#4A4A4A] mb-2">
                Daily Budget
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="budget"
                  value={budget}
                  onChange={handleBudgetChange}
                  className="w-full rounded-xl border-2 border-[#FFD93D] p-4 pr-16 text-lg text-[#4A4A4A] placeholder-[#B5B5B5] focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
                  placeholder="Enter your daily budget"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-[#4A4A4A]">{selectedCurrency.symbol}</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="currency" className="block text-lg font-medium text-[#4A4A4A] mb-2">
                Currency
              </label>
              <select
                id="currency"
                value={selectedCurrency.code}
                onChange={handleCurrencyChange}
                className="w-full rounded-xl border-2 border-[#FFD93D] p-4 text-lg text-[#4A4A4A] focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.name} ({currency.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Meal Preferences Section */}
        <div className="bg-white rounded-2xl border-4 border-[#FFD93D] p-8">
          <h2 className="text-2xl font-bold text-[#FF6B6B] mb-6 flex items-center">
            <span className="text-3xl mr-2">🍳</span>
            Meal Preferences
          </h2>
          <div>
            <label htmlFor="mealPreference" className="block text-lg font-medium text-[#4A4A4A] mb-2">
              Cooking Preference
            </label>
            <select
              id="mealPreference"
              value={mealPreference}
              onChange={handleMealPreferenceChange}
              className="w-full rounded-xl border-2 border-[#FFD93D] p-4 text-lg text-[#4A4A4A] focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
            >
              <option value="pre-cooked">Pre-cooked meals only</option>
              <option value="cooking-needed">I want to cook</option>
              <option value="both">Both options are fine</option>
            </select>
          </div>
        </div>

        {/* Location Picker */}
        <div className="bg-white rounded-2xl border-4 border-[#FFD93D] p-8">
          <h2 className="text-2xl font-bold text-[#FF6B6B] mb-6 flex items-center">
            <span className="text-3xl mr-2">📍</span>
            Your Location
          </h2>

          <div className="space-y-4">
            <button
              onClick={detectLocation}
              disabled={isDetecting}
              className="w-full bg-[#FF6B6B] hover:bg-[#FFD93D] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isDetecting ? (
                <>
                  <span className="animate-spin mr-2">🔄</span>
                  Detecting...
                </>
              ) : (
                <>
                  <span className="mr-2">🎯</span>
                  Auto-detect my location
                </>
              )}
            </button>

            <div className="relative">
              <input
                type="text"
                placeholder="Or enter your location manually..."
                className="w-full rounded-xl border-2 border-[#FFD93D] p-4 pr-12 text-lg text-[#4A4A4A] placeholder-[#B5B5B5] focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
                onChange={(e) => {
                  setLocation({
                    lat: 0,
                    lng: 0,
                    address: e.target.value
                  });
                }}
                value={location?.address || ''}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
                🔍
              </span>
            </div>

            {error && (
              <div className="text-[#FF6B6B] text-sm flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            )}

            {location && !error && (
              <div className="bg-[#F8F9FA] rounded-xl p-4 flex items-start">
                <span className="text-2xl mr-3 mt-1">📍</span>
                <div>
                  <p className="font-medium text-[#4A4A4A]">Selected Location:</p>
                  <p className="text-sm text-[#6C757D]">{location.address}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Check Button */}
        <div className="flex justify-center pt-8">
          <button
            className="bg-[#FF6B6B] hover:bg-[#FFD93D] text-white font-bold py-4 px-12 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Check
          </button>
        </div>
      </div>
    </PageLayout>
  );
} 