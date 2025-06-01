'use client';

import { FC, useState } from 'react';
import PageLayout from '../src/components/PageLayout';

const currencies = [
  { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' }
];

const Home: FC = () => {
  const [budget, setBudget] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [mealPreference, setMealPreference] = useState('both');
  const [location, setLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = currencies.find(c => c.code === e.target.value) || currencies[0];
    setSelectedCurrency(selected);
  };

  const handleMealPreferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMealPreference(e.target.value);
  };

  const handleAutoLocate = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            const data = await response.json();
            const address = data.display_name;
            setLocation(address);
          } catch (error) {
            console.error("Error fetching address:", error);
            setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setIsLocating(false);
    }
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

        {/* Location Section */}
        <div className="bg-white rounded-2xl border-4 border-[#FFD93D] p-8">
          <h2 className="text-2xl font-bold text-[#FF6B6B] mb-6 flex items-center">
            <span className="text-3xl mr-2">📍</span>
            Location
          </h2>
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="location" className="block text-lg font-medium text-[#4A4A4A] mb-2">
                Delivery Address
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your delivery address..."
                className="w-full rounded-xl border-2 border-[#FFD93D] p-4 text-lg text-[#4A4A4A] placeholder-[#B5B5B5] focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
              />
            </div>
            <button
              onClick={handleAutoLocate}
              disabled={isLocating}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] text-white rounded-xl py-4 px-6 text-lg font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50"
            >
              <span className="text-xl">🎯</span>
              <span>{isLocating ? 'Locating...' : 'Auto-Locate Me'}</span>
            </button>
          </div>
        </div>

        {/* Recipe Section */}
        <div className="bg-white rounded-2xl border-4 border-[#FFD93D] p-8">
          <button
            onClick={() => {
              setIsLoadingRecipe(true);
              setShowRecipe(false); // Hide current recipe if any
              setTimeout(() => {
                setShowRecipe(true);
                setIsLoadingRecipe(false);
              }, 5000);
            }}
            disabled={isLoadingRecipe}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] text-white rounded-xl py-4 px-6 text-lg font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50"
          >
            <span className="text-xl">🥘</span>
            <span>{isLoadingRecipe ? 'Generating...' : (showRecipe ? 'Hide Recipe' : 'Generate Recipe')}</span>
          </button>
          {showRecipe && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {`
🥘 Recipe: Creamy Pork Skillet with Garlic Mashed Potatoes
🍽️ Serves: 2–3 people
💵 Total Cost: 3.25 BGN (≅ $1.80 USD)
Store: Kaufland, Stara Zagora
Address: ul. Stamo Pulev 2, 6000 Stara Zagora
Flyer: Kaufland Broshura - Stara Zagora

✅ Ingredients You Already Have:
Pork (any cut)
Milk

🛒 Ingredients to Buy (All on Sale at Kaufland):
Ingredient	Quantity	Price (BGN)	Notes
Potatoes	1 kg	1.19	For mashed potatoes
Garlic	1 head	0.79	Adds flavor to the mash
Onion	1 piece	0.79	For the pork skillet
Flour (white)	1 package	0.99	Used to thicken the sauce
Bouillon cube (chicken or veggie)	1 cube	0.39	For the creamy sauce
Salt & Pepper	To taste	~0.10	Standard seasoning

✅ Total: 3.25 BGN

👩‍🍳 Cooking Instructions:
🥔 Garlic Mashed Potatoes:
Boil Potatoes: Peel and chop the potatoes. Boil in salted water until soft (~15 minutes).
Mash: Drain and mash the potatoes with a fork or masher.
Add Garlic and Milk: Finely chop garlic, sauté it in a little oil until golden, then add to the mash with a bit of warm milk. Mix until creamy. Add salt and pepper to taste.

🍖 Creamy Pork Skillet:
Prep Pork: Cut pork into small cubes, season with salt and pepper.
Sauté Onion: In a skillet, heat oil and sauté chopped onion until soft.
Cook Pork: Add the pork and cook until browned.
Make the Sauce: Sprinkle flour over the pork and stir. Dissolve the bouillon cube in ½ cup hot water and pour into the skillet. Stir until the sauce thickens.
Simmer: Let simmer for 5–7 minutes, then adjust seasoning.

🍽️ Serving:
Serve the creamy pork over the garlic mashed potatoes. Optionally garnish with chopped parsley (if available)
                `}
              </pre>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Home; 