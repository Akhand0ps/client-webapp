import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function tagClass(tag) {
  if (tag === 'Shared') return 'tag-shared';
  if (tag === 'Draft') return 'tag-draft';
  return 'tag-final';
}

function PresentationList({ onViewAll, onPresClick, externalPresentations }) {
  const [presentations, setPresentations] = useState(externalPresentations || []);

  useEffect(() => {
    if (!externalPresentations) {
      fetch(`${API_BASE}/hr/presentations`)
        .then(res => res.json())
        .then(data => setPresentations(data))
        .catch(err => console.error(err));
    } else {
      setPresentations(externalPresentations);
    }
  }, [externalPresentations]);

  return (
    <div className="card fu" style={{ animationDelay: '.25s' }}>
      <div className="card-body">
        <div className="pres-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="card-title">📂 Latest Presentations</div>
            <div className="pres-count">{presentations.length}</div>
          </div>
          <span className="view-all" onClick={() => onViewAll(presentations)}>View all →</span>
        </div>
        {presentations.map((p) => (
          <div className="pres-item" key={p.id} onClick={() => onPresClick(p.file, p.title, p.meta, p.tag)}>
            <div className="pres-icon">P</div>
            <div className="pres-info">
              <div className="pres-name">{p.file}</div>
              <div className="pres-meta">{p.meta}</div>
            </div>
            <span className={`pres-tag ${tagClass(p.tag)}`}>{p.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { tagClass };
export default PresentationList;
