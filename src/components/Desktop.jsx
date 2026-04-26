import React, { useState } from 'react';
import Dock from './Dock';
import EliasWindow from './EliasWindow';
import LiveActivitySidebar from './LiveActivitySidebar';

const Desktop = () => {
  const [isEliasOpen, setIsEliasOpen] = useState(false);
  const [isEliasMinimized, setIsEliasMinimized] = useState(false);

  const handleEliasClick = () => {
    setIsEliasOpen(true);
    setIsEliasMinimized(false);
  };

  const handleEliasClose = () => {
    setIsEliasOpen(false);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundImage: 'url(/desktop.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Elias Window */}
      {isEliasOpen && !isEliasMinimized && (
        <EliasWindow 
          onClose={handleEliasClose} 
          onMinimize={() => setIsEliasMinimized(true)} 
        />
      )}

      {/* Dock */}
      <Dock isEliasOpen={isEliasOpen} onEliasClick={handleEliasClick} />

      {/* System-level live activity sidebar */}
      <LiveActivitySidebar />
    </div>
  );
};

export default Desktop;
