import React, { useState, useEffect } from 'react';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Milestones } from './components/Milestones';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { TelemetryHUD } from './components/TelemetryHUD';
import { ScrollStack } from './components/ScrollStack';

export const App: React.FC = () => {
  const [raceMode, setRaceMode] = useState<boolean>(false);

  useEffect(() => {
    if (raceMode) {
      document.body.classList.add('race-mode');
    } else {
      document.body.classList.remove('race-mode');
    }
  }, [raceMode]);

  return (
    <div className="portfolio-app" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Subtle Grain Texture Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Custom Precision Motorsport Cursor */}
      <Cursor />

      {/* Fixed Telemetry Navigation */}
      <Navbar raceMode={raceMode} setRaceMode={setRaceMode} />

      {/* Main Content Sections with GSAP ScrollStack */}
      <main id="main-content">
        <ScrollStack>
          <Hero raceMode={raceMode} setRaceMode={setRaceMode} />
          <Projects />
          <Skills />
          <Milestones />
          <Contact />
        </ScrollStack>
      </main>

      {/* Telemetry Footer */}
      <Footer />

      {/* Floating Motorsport Lap & Telemetry HUD */}
      <TelemetryHUD raceMode={raceMode} setRaceMode={setRaceMode} />
    </div>
  );
};

export default App;
