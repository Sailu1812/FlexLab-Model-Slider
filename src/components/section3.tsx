import React from 'react';

const Section3 = () => {
  return (
    <div id="section3" className="w-full h-screen relative overflow-hidden text-[#24191b] flex items-center justify-between px-8 md:px-16 pointer-events-none bg-transparent">
      
      {/* Left Side: Title and Description - Layered on z-40 so 3D model never overlaps */}
      <div className="max-w-lg relative z-40 pointer-events-auto">
        <div className="text-xs uppercase tracking-widest text-[#a0142f] mb-4 flex items-center gap-2 font-semibold">
          <span className="w-6 h-[1px] bg-[#a0142f]"></span>
          02 — JOINT INTELLIGENCE
        </div>

        <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.1] mb-6 text-[#5d1024]">
          Range of <br />
          motion, <br />
          measured live.
        </h2>

        <p className="text-[#24191b]/80 text-base font-light leading-relaxed">
          Scroll to flex the knee. Every degree is captured against the patient&apos;s target range, with velocity and symmetry scored on the fly.
        </p>
      </div>

      {/* Right Side: Floating HUD Indicator - Layered on z-40 */}
      <div className="hidden md:block w-80 relative z-40 pointer-events-auto">
        <div className="bg-[#fbeddc]/95 border border-[#a0142f]/40 rounded-2xl p-4 shadow-[0_10px_30px_rgba(160,20,47,0.08)] backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-[#a0142f] font-mono mb-1 font-semibold">
            <span>LIVE TRACKING</span>
            <span className="w-2 h-2 rounded-full bg-[#a0142f] animate-ping"></span>
          </div>
          <div className="text-lg font-light text-[#5d1024]">117° <span className="text-xs text-[#24191b]/70">Knee Flexion</span></div>
        </div>
      </div>

    </div>
  );
};

export default Section3;