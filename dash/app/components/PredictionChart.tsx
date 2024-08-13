// /components/PredictionChart.tsx
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import { ChartProps } from 'react-chartjs-2';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

interface PredictionChartProps {
  data: number[];
}

const PredictionChart: React.FC<PredictionChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((_, index) => index.toString()), // x-axis labels
    datasets: [
      {
        label: 'Predicted Values',
        data,
        fill: false,
        borderColor: '#4F46E5', // Blue color
        tension: 0.1,
      },
    ],
  };

  const chartOptions: ChartProps = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default PredictionChart;
