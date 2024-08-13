'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { fetchPrediction } from '@/utils/api';
import PredictionChart from './PredictionChart';

export default function NewComponent() {
  const [days, setDays] = useState<number>(3);
  const [action, setAction] = useState<'Plot' | 'Sum'>('Plot');
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  const handlePredict = async () => {
    try {
      const prediction = await fetchPrediction(days, action);
      setResult(prediction);
      router.push('/new-page'); // Navigate to the new page
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="logo.png" alt="Logo" width="120" height="120" />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white">User</span>
            <img src="hacker.png" alt="User Avatar" width="40" height="40" className="rounded-full" />
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg text-gray-900 mt-10">
        <h1 className="text-2xl font-bold mb-5">Energy Forecast</h1>
        <form id="forecast-form" className="space-y-4">
          <div className="form-group">
            <label htmlFor="days" className="block text-sm font-medium text-gray-900">Number of Days to Predict:</label>
            <input
              type="number"
              id="days"
              name="days"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              min="1"
              max="10"
            />
          </div>
          <div className="form-group">
            <label htmlFor="action" className="block text-sm font-medium text-gray-900">Action:</label>
            <select
              id="action"
              name="action"
              value={action}
              onChange={(e) => setAction(e.target.value as 'Plot' | 'Sum')}
              className="p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="Sum">Predict Total Energy</option>
              <option value="Plot">Plot Predictions</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handlePredict}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Predict
          </button>
        </form>
        <div className="loading fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-teal-500 hidden">
          Loading...
        </div>
        <div className="results mt-5"></div>
        {result && (
          <div className="mt-4">
            {result.result === 'plot' ? (
              <PredictionChart data={result.value as number[]} />
            ) : (
              <p className="text-lg font-medium">Total Forecast: {result.value} Watt</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
