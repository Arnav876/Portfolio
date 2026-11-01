import React, { useState } from 'react';
import { sound } from '../utils/audio';

interface Circuit {
  id: string;
  name: string;
  location: string;
  record: string;
  path: string;
  viewBox: string;
}

const CIRCUITS: Circuit[] = [
  {
    id: 'mexico',
    name: 'MEXICO GP',
    location: 'AUTÓDROMO HNOS. RODRÍGUEZ',
    record: '1:17.774',
    // Accurate Hermanos Rodríguez circuit silhouette matching Lando Norris reference
    path: 'M 18,52 L 82,52 C 86,52 88,50 88,46 L 88,38 C 88,34 84,33 80,33 L 56,33 C 52,33 50,30 52,26 L 56,18 C 58,14 55,10 50,10 L 32,10 C 27,10 24,14 26,18 L 30,24 C 32,27 30,30 26,30 L 16,30 C 11,30 10,36 12,40 L 14,46 C 15,50 16,52 18,52 Z',
    viewBox: '0 0 100 60'
  },
  {
    id: 'silverstone',
    name: 'SILVERSTONE GP',
    location: 'CIRCUIT SILVERSTONE // UK',
    record: '1:27.097',
    path: 'M 20,48 L 44,48 C 48,48 50,44 52,40 L 56,32 C 58,28 64,28 68,32 L 76,40 C 80,44 86,42 86,36 L 86,22 C 86,14 78,12 72,16 L 62,22 C 58,24 54,20 52,16 L 46,12 C 40,8 34,12 36,18 L 38,26 C 40,30 36,34 30,34 L 18,34 C 12,34 12,44 16,47 Z',
    viewBox: '0 0 100 60'
  },
  {
    id: 'monaco',
    name: 'MONACO GP',
    location: 'CIRCUIT DE MONACO',
    record: '1:12.909',
    path: 'M 22,50 L 70,50 C 76,50 80,44 78,38 L 74,28 C 72,22 76,14 84,14 C 88,14 90,10 86,8 L 60,8 C 52,8 48,16 44,22 L 38,30 C 34,34 28,34 24,28 L 18,22 C 12,18 10,26 14,32 L 18,40 C 20,46 18,50 22,50 Z',
    viewBox: '0 0 100 60'
  }
];

export const RaceBadge: React.FC = () => {
  const [circuitIndex, setCircuitIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const currentCircuit = CIRCUITS[circuitIndex];

  const handleNextCircuit = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.stopPropagation();
    sound.playRadioBeep();
    setCircuitIndex((prev) => (prev + 1) % CIRCUITS.length);
  };

  return (
    <div
      className="race-badge-card"
      onClick={handleNextCircuit}
      onMouseEnter={() => {
        setIsHovered(true);
        sound.playTelemetryScan();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      role="button"
      tabIndex={0}
      title="Click or press Enter/Space to cycle race circuits"
      aria-label={`Current race: ${currentCircuit.name}. Click to cycle to next circuit.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsPressed(true);
          handleNextCircuit(e);
          setTimeout(() => setIsPressed(false), 150);
        }
      }}
      style={{
        position: 'absolute',
        bottom: '2.4rem',
        left: '2.5rem',
        zIndex: 40,
        width: '128px',
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: isHovered ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.16)',
        borderRadius: '12px',
        padding: '12px 10px 10px 10px',
        boxShadow: isPressed
          ? '0 4px 12px rgba(0, 0, 0, 0.12)'
          : isHovered
          ? '0 16px 36px rgba(0, 0, 0, 0.16), 0 0 16px rgba(212, 255, 0, 0.45)'
          : '0 8px 24px rgba(0, 0, 0, 0.06)',
        cursor: 'pointer',
        transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s ease, border-color 0.18s ease',
        transform: isPressed
          ? 'translateY(-1px) scale(0.97)'
          : isHovered
          ? 'translateY(-4px) scale(1.03)'
          : 'translateY(0) scale(1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        color: '#0a0a0c',
        userSelect: 'none',
        pointerEvents: 'auto',
        outline: 'none'
      }}
    >
      {/* 1. Header: NEXT RACE with Interactive "CYCLE ↻" Indicator */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '4px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: '#1a1a1a',
            textTransform: 'uppercase'
          }}
        >
          NEXT RACE
        </span>

        {/* Live Interactive Cycle Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.52rem',
              fontWeight: 800,
              color: isHovered ? '#000000' : 'rgba(0, 0, 0, 0.55)',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              transition: 'color 0.2s ease'
            }}
          >
            CYCLE <span style={{ transform: isHovered ? 'rotate(90deg)' : 'none', display: 'inline-block', transition: 'transform 0.3s ease' }}>↻</span>
          </span>
          <span
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: '#00cc66',
              borderRadius: '50%',
              boxShadow: isHovered ? '0 0 8px rgba(0, 204, 102, 1)' : '0 0 5px rgba(0, 204, 102, 0.7)',
              display: 'inline-block'
            }}
          />
        </div>
      </div>

      {/* 2. Track Circuit SVG Outline */}
      <div
        style={{
          width: '100%',
          height: '48px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '2px 0'
        }}
      >
        <svg
          viewBox={currentCircuit.viewBox}
          style={{
            width: '100%',
            height: '100%',
            overflow: 'visible'
          }}
        >
          {/* Circuit track background shadow */}
          <path
            d={currentCircuit.path}
            fill="none"
            stroke="rgba(0, 0, 0, 0.12)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Circuit track primary line */}
          <path
            d={currentCircuit.path}
            fill="none"
            stroke={isHovered ? '#000000' : '#1c1c20'}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Racing telemetry dot moving along the path */}
          <circle r="2.2" fill="#d4ff00" stroke="#000" strokeWidth="0.8">
            <animateMotion
              path={currentCircuit.path}
              dur="4s"
              repeatCount="indefinite"
              rotate="auto"
            />
          </circle>
        </svg>
      </div>

      {/* 3. Circuit Name & Cycle Telemetry Hint */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px'
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.66rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            color: '#000000',
            textAlign: 'center',
            textTransform: 'uppercase',
            lineHeight: 1.1
          }}
        >
          {currentCircuit.name}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.48rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: isHovered ? '#000000' : 'rgba(0, 0, 0, 0.45)',
            textTransform: 'uppercase',
            transition: 'color 0.2s ease'
          }}
        >
          0{circuitIndex + 1}/03 // CLICK TO CYCLE
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.12)', margin: '2px 0' }} />

      {/* 4. Laurel Wreath with Driver Helmet */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg
          viewBox="0 0 64 36"
          style={{
            width: '54px',
            height: '30px'
          }}
        >
          {/* Left Laurel Branch */}
          <path
            d="M 32,32 C 22,32 14,24 14,14 C 14,10 16,6 18,4"
            fill="none"
            stroke="#111111"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Left Laurel Leaves */}
          <path d="M 17,29 C 14,28 12,25 15,23 C 17,25 18,27 17,29 Z" fill="#111111" />
          <path d="M 13,22 C 10,21 9,18 12,16 C 14,18 15,20 13,22 Z" fill="#111111" />
          <path d="M 12,15 C 9,14 9,11 12,9 C 14,11 14,13 12,15 Z" fill="#111111" />
          <path d="M 14,9 C 12,7 13,4 16,4 C 17,6 16,8 14,9 Z" fill="#111111" />

          {/* Right Laurel Branch */}
          <path
            d="M 32,32 C 42,32 50,24 50,14 C 50,10 48,6 46,4"
            fill="none"
            stroke="#111111"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Right Laurel Leaves */}
          <path d="M 47,29 C 50,28 52,25 49,23 C 47,25 46,27 47,29 Z" fill="#111111" />
          <path d="M 51,22 C 54,21 55,18 52,16 C 50,18 49,20 51,22 Z" fill="#111111" />
          <path d="M 52,15 C 55,14 55,11 52,9 C 50,11 50,13 52,15 Z" fill="#111111" />
          <path d="M 50,9 C 52,7 51,4 48,4 C 47,6 48,8 50,9 Z" fill="#111111" />

          {/* Center Helmet Silhouette */}
          <g transform="translate(24, 8)">
            {/* Helmet shell */}
            <path
              d="M 3,11 C 3,5 6,2 10,2 C 14,2 16,4 16,9 L 16,13 C 16,14 14,15 11,15 L 6,15 C 4,15 3,13 3,11 Z"
              fill="none"
              stroke="#0a0a0c"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Helmet Visor cutout */}
            <path
              d="M 10,5 L 15,6 C 15.5,7 15.5,8 14.5,9 L 10,9 Z"
              fill="#d4ff00"
              stroke="#0a0a0c"
              strokeWidth="0.8"
            />
            {/* Helmet aerodynamic lower spoiler */}
            <line x1="4" y1="13" x2="14" y2="13" stroke="#0a0a0c" strokeWidth="0.9" />
          </g>
        </svg>

        {/* 5. Footer Label matching Lando's "MCLAREN F1 / SINCE 2019" */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.52rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: '#111111',
            textAlign: 'center',
            lineHeight: 1.25,
            marginTop: '2px',
            textTransform: 'uppercase'
          }}
        >
          <div>ARNAV YADAV</div>
          <div style={{ color: '#555555', fontSize: '0.48rem', fontWeight: 700 }}>SINCE 2006</div>
        </div>
      </div>
    </div>
  );
};

