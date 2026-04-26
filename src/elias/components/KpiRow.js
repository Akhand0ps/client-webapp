import React from 'react';
import KpiCard from './KpiCard';

function KpiRow({ data, onDrillHeadcount, onDrillAttrition, onDrillPositions, onDrillTenure }) {
  if (!data || !data.headcount) return null;
  
  return (
    <div className="kpi-row fu fu1">
      <KpiCard
        icon="👥" label="Total Headcount" value={data.headcount.total}
        trend={data.headcount.trend + " vs last month"} trendDir="up"
        onClick={onDrillHeadcount}
      />
      <KpiCard
        icon="📉" label="Attrition Rate" value={data.attrition.rate}
        trend={data.attrition.trend + " vs last month"} trendDir="down"
        valueColor="var(--red)"
        onClick={onDrillAttrition}
      />
      <KpiCard
        icon="💼" label="Open Positions" value={data.headcount.openRoles}
        trend="+6 vs last month" trendDir="up"
        onClick={onDrillPositions}
      />
      <KpiCard
        icon="⏱" label="Avg Tenure" value={data.tenure.avg}
        trend={data.tenure.trend + " vs last month"} trendDir="up"
        onClick={onDrillTenure}
      />
    </div>
  );
}

export default KpiRow;
