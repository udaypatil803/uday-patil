/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-[#00ffff] font-terminal selection:bg-[#ff00ff] selection:text-black overflow-hidden relative">
      <div className="static-noise" />
      <div className="scanlines" />
      <div className="crt-flicker" />

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center gap-12">
        
        <div className="text-center mb-4">
          <h1 className="glitch-text text-3xl md:text-5xl font-pixel mb-4" data-text="SYS.PROTOCOL_0x9A">
            SYS.PROTOCOL_0x9A
          </h1>
          <p className="text-[#ff00ff] font-pixel text-xs md:text-sm tracking-widest mt-4 uppercase">
            &gt; STATUS: CORRUPTED // OVERRIDE_ENGAGED
          </p>
        </div>

        <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-16">
          <div className="flex-1 flex justify-center w-full">
            <SnakeGame />
          </div>

          <div className="w-full max-w-md lg:w-96 flex-shrink-0">
            <MusicPlayer />
          </div>
        </div>
      </div>
    </div>
  );
}
