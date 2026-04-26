import React, { useEffect, useRef, useState } from 'react';

const DockIcon = ({ icon, label, gradient, isImage, isOpen, onClick, isElias, mouseX }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [scale, setScale] = useState(1);

  const baseSize = isElias ? 60 : 56;
  const pressScale = pressed ? 0.9 : 1;
  const finalScale = scale * pressScale;

  useEffect(() => {
    if (mouseX === null || !ref.current) {
      setScale(1);
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - centerX);
    const maxDistance = 120;
    const proximity = Math.max(0, 1 - distance / maxDistance);
    const nextScale = Math.min(Math.max(1 + proximity * 0.5, 1), 1.5);

    setScale(nextScale);
  }, [mouseX]);

  return (
    <div
      ref={ref}
      className="dock-icon-wrapper relative flex flex-col items-center justify-end"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        width: `${baseSize * finalScale}px`,
        minHeight: '76px',
        transition: 'width 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
    >
      {/* Tooltip */}
      <div className="dock-tooltip">{label}</div>

      {/* Icon */}
      <div
        className="dock-icon-inner flex items-center justify-center"
        style={{
          width: `${baseSize}px`,
          height: `${baseSize}px`,
          borderRadius: isElias ? '16px' : '12px',
          background: isImage ? undefined : gradient,
          transform: `translateY(${(finalScale - 1) * -10}px) scale(${finalScale})`,
          transformOrigin: 'bottom center',
          transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.25s ease-out',
          overflow: 'hidden',
          boxShadow: hovered
            ? '0 14px 28px rgba(0,0,0,0.24)'
            : '0 8px 18px rgba(0,0,0,0.16)',
          ...(isElias
            ? {
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                boxShadow: hovered || scale > 1.08
                  ? '0 12px 28px rgba(0,0,0,0.22), 0 0 28px rgba(99,102,241,0.9)'
                  : '0 8px 18px rgba(0,0,0,0.16), 0 0 10px rgba(99,102,241,0.5)',
                outline: '2px solid rgba(96,165,250,0.5)',
                outlineOffset: '2px',
                animation: 'elias-pulse 2.5s ease-in-out infinite',
              }
            : {}),
        }}
      >
        {isImage ? (
          <img
            src={icon}
            alt={label}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: isElias ? '6px' : '0',
            }}
            draggable={false}
          />
        ) : (
          <span
            style={{
              fontSize: isElias ? '28px' : '24px',
              lineHeight: 1,
              color: 'white',
              fontWeight: 700,
            }}
          >
            {icon}
          </span>
        )}
      </div>

      {/* Open indicator dot */}
      {isOpen && (
        <div
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.85)',
            marginTop: '4px',
            transition: 'all 200ms ease',
          }}
        />
      )}
    </div>
  );
};

export default DockIcon;
