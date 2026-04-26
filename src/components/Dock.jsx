import React, { useState } from 'react';
import DockIcon from './DockIcon';

const dockApps = [
  {
    id: 'teams',
    label: 'Microsoft Teams',
    icon: 'T',
    gradient: 'linear-gradient(135deg, #7b2ff7, #5b21b6)',
    isImage: false,
  },
  {
    id: 'maps',
    label: 'Maps',
    icon: '🗺️',
    gradient: 'linear-gradient(135deg, #22c55e, #15803d)',
    isImage: false,
  },
  {
    id: 'notes',
    label: 'Notes',
    icon: '📝',
    gradient: 'linear-gradient(135deg, #facc15, #eab308)',
    isImage: false,
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: '💬',
    gradient: 'linear-gradient(135deg, #4ade80, #16a34a)',
    isImage: false,
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: '📅',
    gradient: 'linear-gradient(135deg, #ef4444, #ffffff)',
    isImage: false,
  },
];

const Dock = ({ isEliasOpen, onEliasClick }) => {
  const [mouseX, setMouseX] = useState(null);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div
        className="flex items-end gap-2 px-3 py-2"
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
        style={{
          width: 'fit-content',
          backgroundColor: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRadius: '18px',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow:
            '0 18px 36px -14px rgba(0,0,0,0.38), inset 0 1px 2px rgba(255,255,255,0.2)',
        }}
      >
        {/* Left apps */}
        {dockApps.map((app) => (
          <DockIcon
            key={app.id}
            icon={app.icon}
            label={app.label}
            gradient={app.gradient}
            isImage={app.isImage}
            isOpen={false}
            mouseX={mouseX}
            onClick={() => {}}
          />
        ))}

        {/* Separator */}
        <div
          className="mx-1 self-center"
          style={{
            width: '1px',
            height: '32px',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        />

        {/* Elias — center special app */}
        <DockIcon
          icon="/elias.png"
          label="Elias"
          isImage={true}
          isElias={true}
          isOpen={isEliasOpen}
          mouseX={mouseX}
          onClick={onEliasClick}
        />
      </div>
    </div>
  );
};

export default Dock;
