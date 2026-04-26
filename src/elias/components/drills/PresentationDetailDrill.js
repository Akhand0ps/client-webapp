import React from 'react';
import { tagClass } from '../PresentationList';

const emojis = ['📊', '📈', '👥', '💡', '🎯', '📋', '🔍', '⭐'];

function PresentationDetailDrill({ title, meta, tag, onBack, onToast }) {
  const slides = parseInt(meta) || 8;
  const slideCount = Math.min(slides, 8);

  return (
    <div className="drill-panel active">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="pres-detail-hero">
        <div className="pres-big-icon">P</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>{title}</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '10px' }}>{meta}</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-primary btn-sm" onClick={() => onToast('▷ Opening presentation…')}>▷ Open</button>
            <button className="btn btn-ghost" onClick={() => onToast('⬇ Downloading…')}>⬇ Download</button>
            <button className="btn btn-ghost" onClick={() => onToast('🔗 Link copied!')}>🔗 Share</button>
          </div>
        </div>
        <span className={`pres-tag ${tagClass(tag)}`} style={{ fontSize: '12px', padding: '4px 12px' }}>{tag}</span>
      </div>
      <div className="card">
        <div className="card-head">
          <div className="card-title">Slide Thumbnails</div><span className="section-tag">{slides} slides</span>
        </div>
        <div className="card-body">
          <div className="pres-slides-preview">
            {Array.from({ length: slideCount }).map((_, i) => (
              <div className="slide-thumb" key={i} onClick={() => onToast(`📄 Viewing slide ${i + 1}`)}>
                {emojis[i % emojis.length]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PresentationDetailDrill;
