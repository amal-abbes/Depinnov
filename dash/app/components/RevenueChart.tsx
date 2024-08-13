'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Post } from '@/lib/getData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface RevenueChartProps {
  data: Post[];
}

const dataFormatter = (number: number) => `${number} W`; // Format y-axis values as Watts

// Function to extract and format time from datetime string
const formatTime = (datetime: string) => {
  const date = new Date(datetime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function RevenueChart({ data }: RevenueChartProps) {
  if (!data || data.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  // Filter data for User 1
  const user1Data = data.map((item) => ({
    time: formatTime(item.datetime),
    "User 1 Production": item.user1_production,
    "User 1 Consumption": item.user1_consumption,
  }));

  const chartData = {
    labels: user1Data.map((item) => item.time),
    datasets: [
      {
        label: ' Production',
        data: user1Data.map((item) => item["User 1 Production"]),
        borderColor: '#4CAF50', // Green for production
        backgroundColor: 'rgba(76, 175, 80, 0.5)',
        fill: false,
      },
      {
        label: ' Consumption',
        data: user1Data.map((item) => item["User 1 Consumption"]),
        borderColor: '#F44336', // Red for consumption
        backgroundColor: 'rgba(244, 67, 54, 0.5)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
          },
          color: '#333', // Darker color for better readability
        },
      },
      title: {
        display: true,
        text: 'Production and Consumption',
        font: {
          size: 16,
        },
        color: '#333', // Darker color for better readability
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
          font: {
            size: 14,
          },
          color: '#333', // Darker color for better readability
        },
        ticks: {
          color: '#333', // Darker color for better readability
          // Show every 6th label if there are too many
          callback: function (value: any, index: number) {
            return index % 6 === 0 ? this.getLabelForValue(value) : '';
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Watt',
          font: {
            size: 14,
          },
          color: '#333', // Darker color for better readability
        },
        ticks: {
          color: '#333', // Darker color for better readability
          callback: (value: number) => dataFormatter(value),
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Production and Consumption</h2>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
