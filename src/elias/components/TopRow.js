import React from 'react';

function TopRow({ onSearch }) {
  return (
    <div className="top-row fu">
      <div className="page-title">
        <span className="ico">📊</span>
        <div>
          <h1>HR Dashboard — Reports</h1>
          <span className="crumb">/ Employee Overview</span>
        </div>
      </div>
      <div className="top-meta">
        <div className="search-bar">
          <span style={{ fontSize: '13px', color: 'var(--subtle)' }}>🔍</span>
          <input type="text" placeholder="Search…" onChange={(e) => onSearch && onSearch(e.target.value)} />
        </div>
        <div className="date-chip">Apr 2026</div>
        <div className="live-pill">
          <div className="live-dot-r"></div>Live
        </div>
        <div className="user-avatar" title="Rais Ahamad">RA</div>
      </div>
    </div>
  );
}

export default TopRow;
