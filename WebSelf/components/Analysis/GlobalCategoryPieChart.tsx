import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface GlobalCategoryData {
  category: string;
  totalTimeMs: number;
}

const GlobalCategoryPieChart = () => {
  const [data, setData] = useState<GlobalCategoryData[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/global-category-summary')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('❌ 글로벌 카테고리 오류:', err));
  }, []);

  if (data.length === 0) return null;

  const total = data.reduce((sum, item) => sum + item.totalTimeMs, 0);
  const labels = data.map((d) => d.category);
  const values = data.map((d) => ((d.totalTimeMs / total) * 100).toFixed(2));

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          '#4F46E5', '#60A5FA', '#A78BFA', '#F87171', '#FBBF24', '#34D399',
          '#818CF8', '#F472B6', '#2DD4BF', '#FCD34D'
        ],
      }
    ]
  };

  return (
    <div className="px-6 py-16 max-w-3xl mx-auto">
      <h2 className="text-2xl text-center text-blue-800 drop-shadow-lg py-3">
        다른 사용자들의 카테고리별 평균 사용 시간 비율
      </h2>
      <div className="mt-10 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
        <div className="w-90 h-90">
          <Pie data={chartData} options={{
            plugins: {
              legend: { position: 'bottom' },
              title: { display: false }
            }
          }} />
        </div>
      </div>
    </div>
  );
};

export default GlobalCategoryPieChart;