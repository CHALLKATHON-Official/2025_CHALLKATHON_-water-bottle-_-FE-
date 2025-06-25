import React, { useEffect, useState } from 'react';

interface Props {
  userId: string;
  period: "7days" | "30days" | "90days";
}

interface SiteEntry {
  domain: string;
  visitCount: number;
  visitPercent: number;
}

const titleMap = {
  "7days": "최근 7일 Top 5",
  "30days": "최근 30일 Top 5",
  "90days": "최근 90일 Top 5"
};

const colors = ["#6366F1", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const PerDayTop5Chart: React.FC<Props> = ({ userId, period }) => {
  const [topSites, setTopSites] = useState<SiteEntry[]>([]);

  useEffect(() => {
    fetch(`https://webself-be.onrender.com/api/top-sites/${userId}/${period}`)
      .then(res => res.json())
      .then(setTopSites)
      .catch(console.error);
  }, [userId, period]);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-[300px] min-w-[280px]">
      <h3 className="text-xl font-bold text-gray-800 mb-6">{titleMap[period]}</h3>
      {topSites.map((site, idx) => (
        <div key={idx} className="mb-5">
          <div className="flex justify-between items-center mb-1">
            <span
              className="text-gray-700 font-semibold block truncate w-full"
              title={site.domain}
            >
              {idx + 1}. {site.domain}
            </span>
            <span className="text-sm text-gray-500">{site.visitCount}회 ({site.visitPercent}%)</span>
          </div>
          <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded"
              style={{
                width: `${site.visitPercent}%`,
                backgroundColor: colors[idx % colors.length]
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerDayTop5Chart;
