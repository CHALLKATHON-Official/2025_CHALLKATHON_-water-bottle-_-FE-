import { useEffect, useState } from 'react';
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
    fetch('https://webself-be.onrender.com/api/global-category-summary')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('❌ 글로벌 카테고리 오류:', err));
  }, []);

  if (data.length === 0) return null;

  const total = data.reduce((sum, item) => sum + item.totalTimeMs, 0);
  const labels = data.map((d) => d.category);
  const values = data.map((d) => parseFloat(((d.totalTimeMs / total) * 100).toFixed(2)));

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          '#A5D8FF', '#B2F2BB', '#FFD6A5', '#FFC9C9', '#D0BFFF',
          '#FFE066', '#C5F6FA', '#F3D9FA', '#FABADA', '#B2F0E5'
        ],
      }
    ]
  };

  return (
    <div className="px-6 py-16 max-w-3xl mx-auto">
      <div className="mt-10 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-100 to-white p-8 shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
        <h2 className="text-xl font-bold text-center text-blue-800 drop-shadow-lg py-3">
          다른 사용자들의 카테고리별 평균 사용 시간 비율
        </h2>
        <div className="w-[500px] h-[500px] mx-auto">
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