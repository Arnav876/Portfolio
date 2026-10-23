import React, { useState, useEffect } from 'react';
import { Timer, Gauge, Zap, Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react';
import { sound } from '../utils/audio';

interface TelemetryHUDProps {
  raceMode: boolean;
  setRaceMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({ raceMode, setRaceMode }) => {
  const [seconds, setSeconds] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [fps, setFps] = useState(60);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // FPS estimation
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };

    animId = requestAnimationFrame(calcFps);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(animId);
    };
  }, []);

  const formatLapTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    const ms = ((totalSec * 37) % 99).toString().padStart(2, '0');
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  const handleSoundToggle = () => {
    const active = sound.toggle();
    setSoundActive(active);
  };

  return (
    <aside
      aria-label="Motorsport Telemetry HUD"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 850,
        maxWidth: '320px',
        backgroundColor: 'rgba(9, 9, 12, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border-accent)',
        borderRadius: '6px',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7), 0 0 20px var(--accent-glow)',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className="corner-markers telemetry-hud-container"
    >
      {/* Top Header Bar */}
      <div
        onClick={() => {
          sound.playClick();
          setIsCollapsed(prev => !prev);
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.6rem 0.85rem',
          backgroundColor: 'rgba(212, 255, 0, 0.08)',
          borderBottom: isCollapsed ? 'none' : '1px solid var(--border-subtle)',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Gauge size={14} color="var(--accent-racing)" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-racing)' }}>
            LIVE TELEMETRY // F1 HUD
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--telemetry-green)' }}>
            {fps} FPS
          </span>
          {isCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </div>

      {/* Expanded Telemetry View */}
      {!isCollapsed && (
        <div style={{ padding: '0.85rem' }}>
          {/* Lap Time Counter */}
          <div style={{ marginBottom: '0.75rem', padding: '0.5rem 0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '3px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                SESSION LAP TIME
              </span>
              <Timer size={12} color="var(--accent-racing)" />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-white)' }}>
              {formatLapTime(seconds)}
            </div>
          </div>

          {/* Sector Times Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem', marginBottom: '0.75rem' }}>
            <div style={{ backgroundColor: 'rgba(187, 102, 255, 0.1)', border: '1px solid rgba(187, 102, 255, 0.3)', padding: '0.3rem', textAlign: 'center', borderRadius: '2px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--telemetry-purple)', fontWeight: 700 }}>S1</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#fff' }}>24.12s</div>
            </div>
            <div style={{ backgroundColor: 'rgba(0, 229, 117, 0.1)', border: '1px solid rgba(0, 229, 117, 0.3)', padding: '0.3rem', textAlign: 'center', borderRadius: '2px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--telemetry-green)', fontWeight: 700 }}>S2</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#fff' }}>29.84s</div>
            </div>
            <div style={{ backgroundColor: 'rgba(0, 229, 117, 0.1)', border: '1px solid rgba(0, 229, 117, 0.3)', padding: '0.3rem', textAlign: 'center', borderRadius: '2px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--telemetry-green)', fontWeight: 700 }}>S3</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#fff' }}>21.05s</div>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => {
                sound.playClick();
                setRaceMode(prev => !prev);
              }}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
                padding: '0.4rem',
                backgroundColor: raceMode ? 'var(--accent-racing)' : 'rgba(255, 255, 255, 0.05)',
                color: raceMode ? '#000' : 'var(--text-white)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Zap size={12} />
              <span>{raceMode ? 'OVERDRIVE' : 'STANDARD'}</span>
            </button>

            <button
              onClick={handleSoundToggle}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.4rem 0.6rem',
                backgroundColor: soundActive ? 'rgba(212, 255, 0, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                color: soundActive ? 'var(--accent-racing)' : 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                cursor: 'pointer'
              }}
            >
              {soundActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 600px) {
          .telemetry-hud-container {
            bottom: 0.75rem !important;
            right: 0.75rem !important;
            max-width: 260px !important;
          }
        }
      `}</style>
    </aside>
  );
};
