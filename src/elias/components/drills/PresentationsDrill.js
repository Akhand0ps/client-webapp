import React from 'react';
import { tagClass } from '../PresentationList';

function PresentationsDrill({ onBack, onPresClick, onToast, presentations }) {
  return (
    <div className="drill-panel active">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="top-row" style={{ marginBottom: '16px' }}>
        <div className="page-title"><span className="ico">📂</span>
          <div>
            <h1>All Presentations</h1><span className="crumb">/ {presentations?.length || 0} documents</span>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => onToast('📤 Upload dialog opened')}>+ Upload</button>
      </div>
      <div className="card">
        <div className="card-body" style={{ padding: '8px 16px' }}>
          {presentations && presentations.map((p, i) => (
            <div className="pres-item" key={i} onClick={() => onPresClick(p.file, p.title, p.meta, p.tag)}>
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
    </div>
  );
}

export default PresentationsDrill;
