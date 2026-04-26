import React from 'react';

function KpiCard({ icon, label, value, trend, trendDir, valueColor, onClick }) {
  return (
    <div className="kpi-card" onClick={onClick}>
      <div className="kpi-label">
        <span className="ico">{icon}</span>{label}
      </div>
      <div className="kpi-val" style={valueColor ? { color: valueColor } : {}}>{value}</div>
      <div className={`kpi-trend ${trendDir === 'up' ? 'trend-up' : 'trend-down'}`}>
        {trendDir === 'up' ? '▲' : '▼'} {trend}
      </div>
    </div>
  );
}

export default KpiCard;
