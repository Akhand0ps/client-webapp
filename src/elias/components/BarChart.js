import React from 'react';

function BarChart({ title, data, onViewAll }) {
  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title">{title}</div>
        {onViewAll && <button className="view-btn" onClick={onViewAll}>View all →</button>}
      </div>
      <div className="card-body">
        {data.map((item, i) => (
          <div className="bar-row" key={i}>
            <div className="bar-label">{item.label}</div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: item.width, background: item.color }}></div>
            </div>
            <div className="bar-val">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarChart;
