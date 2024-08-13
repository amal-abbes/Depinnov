// /utils/api.ts

export interface PredictionResponse {
  result: 'sum' | 'plot';
  value: string | number;
  days_number: number;
}

export async function fetchPrediction(days: number, action: 'Plot' | 'Sum'): Promise<PredictionResponse> {
  const response = await fetch('http://127.0.0.1:5000/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ days, action }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch prediction');
  }

  return response.json();
}
