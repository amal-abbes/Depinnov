'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchPrediction } from '@/utils/api';
import PredictionChart from './PredictionChart';

export default function PredictionComponent() {
  const [days, setDays] = useState<number>(3);
  const [action, setAction] = useState<'Plot' | 'Sum'>('Plot');
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  const handlePredict = async () => {
    try {
      const prediction = await fetchPrediction(days, action);
      setResult(prediction);
      router.push('/NewComponent'); // Navigate to the NewComponent page
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Energy Prediction</h2>
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Number of days"
        />
        <select
          value={action}
          onChange={(e) => setAction(e.target.value as 'Plot' | 'Sum')}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Plot">Predict Total Energy</option>
          <option value="Sum">Plot Productions</option>
        </select>
        <button
          onClick={handlePredict}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Predict
        </button>
      </div>
      {result && (
        <div className="mt-4">
          {result.result === 'plot' ? (
            <PredictionChart data={result.value as number[]} />
          ) : (
            <p className="text-lg font-medium text-gray-800">Total Forecast: {result.value} Watt</p>
          )}
        </div>
      )}
    </div>
  );
}
