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
  "7days": "최근 7일",
  "30days": "최근 30일",
  "90days": "최근 90일"
};

const AnalysisTopList: React.FC<Props> = ({ userId, period }) => {
  const [topSites, setTopSites] = useState<SiteEntry[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/top-sites/${userId}/${period}`)
      .then(res => res.json())
      .then(setTopSites)
      .catch(console.error);
  }, [userId, period]);

  return (
    <div className="bg-white shadow rounded-xl p-6 w-full">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">{titleMap[period]} Top 5 사이트</h3>
      {topSites.map((site, index) => (
        <div key={index} className="flex justify-between items-center py-1 border-b">
          <span>{index + 1}. {site.domain}</span>
          <span>{site.visitCount}회 ({site.visitPercent}%)</span>
        </div>
      ))}
    </div>
  );
};

export default AnalysisTopList;
