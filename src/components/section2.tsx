import React from 'react';

const Section2 = () => {
  return (
    <div id="section2" className="w-full h-screen relative overflow-hidden text-[#24191b] flex items-center justify-between px-8 md:px-16 pointer-events-none bg-transparent">
      
      {/* Left Side: Title and Description - Layered on z-40 so 3D model never overlaps */}
      <div className="max-w-lg relative z-40 pointer-events-auto">
        <div className="text-xs uppercase tracking-widest text-[#a0142f] mb-4 flex items-center gap-2 font-semibold">
          <span className="w-6 h-[1px] bg-[#a0142f]"></span>
          01 — ANATOMY ENGINE
        </div>

        <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.1] mb-6 text-[#5d1024]">
          See the body <br />
          the way <br />
          clinicians do.
        </h2>

        <p className="text-[#24191b]/80 text-base font-light leading-relaxed">
          A layered, articulated model of the human body. Bones, muscle groups and joints rendered in real time, so every explanation has something to point at.
        </p>
      </div>

      {/* Right Side: Feature Cards Stack (Skeleton, Musculature, Joints) - Layered on z-40 with backdrop blur */}
      <div className="flex flex-col gap-4 w-80 relative z-40 pointer-events-auto">
        
        {/* Active Card: Skeleton */}
        <div className="bg-[#fbeddc]/95 backdrop-blur-md border border-[#a0142f]/40 rounded-2xl p-5 shadow-[0_10px_30px_rgba(160,20,47,0.08)] transition-all">
          <div className="flex items-center justify-between text-xs text-[#a0142f] font-mono mb-2 font-semibold">
            <span>01 SKELETON</span>
            <span className="w-2 h-2 rounded-full bg-[#a0142f] animate-pulse"></span>
          </div>
          <h3 className="text-sm font-medium text-[#5d1024] mb-1">Skeleton</h3>
          <p className="text-xs text-[#24191b]/70 leading-relaxed">
            206 bones, articulated in real time with a scanning wireframe-to-solid transition.
          </p>
        </div>

        {/* Inactive Card: Musculature */}
        <div className="bg-[#fffaf2]/90 border border-[#ead8c3] rounded-2xl p-5 backdrop-blur-md hover:border-[#a0142f]/30 transition-all">
          <div className="text-xs text-[#b99378] font-mono mb-2">02 MUSCULATURE</div>
          <h3 className="text-sm font-medium text-[#5d1024] mb-1">Musculature</h3>
          <p className="text-xs text-[#24191b]/70 leading-relaxed">
            Major muscle groups layered on the skeleton with contraction dynamics.
          </p>
        </div>

        {/* Inactive Card: Joints */}
        <div className="bg-[#fffaf2]/90 border border-[#ead8c3] rounded-2xl p-5 backdrop-blur-md hover:border-[#a0142f]/30 transition-all">
          <div className="text-xs text-[#b99378] font-mono mb-2">03 JOINTS</div>
          <h3 className="text-sm font-medium text-[#5d1024] mb-1">Joints</h3>
          <p className="text-xs text-[#24191b]/70 leading-relaxed">
            Every articulation tracked to the degree, ready for range-of-motion analysis.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Section2;