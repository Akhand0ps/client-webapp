import React, { useState, useRef, useCallback, useEffect } from 'react';
import EliasApp from '../elias/EliasApp';

const EliasWindow = ({ onClose, onMinimize }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [closing, setClosing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const dragRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Center the window on mount
  useEffect(() => {
    const x = Math.round((window.innerWidth - 900) / 2);
    const y = Math.round((window.innerHeight - 600) / 2);
    setPosition({ x, y });
  }, []);

  const handleMouseDown = useCallback((e) => {
    // Don't drag if clicking traffic lights or if fullscreen
    if (e.target.closest('.traffic-light') || isFullscreen) return;
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.preventDefault();
  }, [position, isFullscreen]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleMouseMove, handleMouseUp, handleClose]);

  return (
    <div
      ref={dragRef}
      className={`${closing ? 'animate-window-close' : 'animate-window-open'} bg-white shadow-lg flex flex-col`}
      style={{
        position: 'fixed',
        left: isFullscreen ? '0px' : `${position.x}px`,
        top: isFullscreen ? '0px' : `${position.y}px`,
        width: isFullscreen ? 'calc(100vw - 320px)' : '900px',
        height: isFullscreen ? '100vh' : '600px',
        zIndex: isFullscreen ? 50 : 30,
        borderRadius: isFullscreen ? '0px' : '12px',
        overflow: 'hidden',
        boxShadow: isFullscreen 
          ? '0 18px 60px rgba(15, 23, 42, 0.16)' 
          : '0 25px 60px -15px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
        transition: 'width 0.3s, height 0.3s, border-radius 0.3s',
      }}
    >
      {/* macOS window bar */}
      <div
        className="window-titlebar flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200"
        style={{
          flexShrink: 0,
          minHeight: '40px',
          backgroundColor: 'rgba(243,244,246,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-2 w-20">
          <button
            type="button"
            className="traffic-light w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-1"
            onClick={handleClose}
            aria-label="Close Elias"
            title="Close"
          />
          <button
            type="button"
            className="traffic-light w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-1"
            onClick={onMinimize}
            aria-label="Minimize Elias"
            title="Minimize"
          />
          <button
            type="button"
            className="traffic-light w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-1"
            onClick={() => setIsFullscreen(!isFullscreen)}
            aria-label={isFullscreen ? 'Restore Elias' : 'Maximize Elias'}
            title={isFullscreen ? "Restore" : "Maximize"}
          />
        </div>

        {/* Center title */}
        <div className="flex items-center justify-center flex-1 pointer-events-none">
          <span className="text-sm font-medium text-gray-700">
            Elias
          </span>
        </div>

        {/* Spacer to balance the traffic lights */}
        <div className="w-20" />
      </div>

      {/* Content area */}
      <div
        className="flex-1 w-full overflow-auto bg-white"
        style={{
          minHeight: 0,
        }}
      >
        <EliasApp />
      </div>
    </div>
  );
};

export default EliasWindow;
