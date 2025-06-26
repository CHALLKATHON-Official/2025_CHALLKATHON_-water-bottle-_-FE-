import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type GlobalAnalyzedData = {
  domain: string;
  visitCount: number;
  visitPercent: number;
};

const GlobalUsagePieChart = () => {
  const [data, setData] = useState<GlobalAnalyzedData[]>([]);

  useEffect(() => {
    fetch('https://webself-be.onrender.com/api/global-visit-ratio')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const labels = data.map(d => d.domain);
  const values = data.map(d => Number(d.visitPercent) * 100);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          '#A5D8FF', '#B2F2BB', '#FFD6A5', '#FFC9C9', '#D0BFFF',
          '#FFE066', '#C5F6FA', '#F3D9FA', '#FABADA', '#B2F0E5'
        ],
      },
    ],
  };

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto">
      <div className="mt-10 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-100 to-white p-8 shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
        <h2 className="text-xl font-bold text-center text-blue-800 drop-shadow-lg mb-4">
          전 세계 사용자 사이트 이용 비율
        </h2>
        <div className="w-[500px] h-[500px] mx-auto">
          <Pie
            data={chartData}
            options={{
              plugins: {
                legend: { position: 'bottom' },
                title: { display: false }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalUsagePieChart;
