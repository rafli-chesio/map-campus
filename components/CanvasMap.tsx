'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MapSVG from './MapSVG';
import BuildingModal from './BuildingModal';
import { cultureData } from '@/data/cultures';

export default function CanvasMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selectedBuilding = cultureData.find((c) => c.id === selectedId);
  const hoveredBuildingName = cultureData.find((c) => c.id === hoveredId)?.name;

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-50 overflow-hidden rounded-3xl border border-slate-200 shadow-inner">
      
      {/* Floating Header / HUD */}
      <div className="absolute top-6 left-0 right-0 flex flex-col items-center z-10 pointer-events-none">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Universitas Negeri Medan Map
        </h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">
            Jelajahi cerita di setiap sudut
        </p>
        
        {/* Dynamic Tooltip Indicator */}
        <motion.div 
            className="mt-4 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredBuildingName ? 1 : 0 }}
        >
            <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-sm shadow-lg">
                {hoveredBuildingName || '...'}
            </span>
        </motion.div>
      </div>
    
      {/* The Map */}
      <div className="w-full max-w-5xl p-4">
        <MapSVG 
            onBuildingClick={setSelectedId} 
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
        />
      </div>

      {/* The Modal */}
      <AnimatePresence>
        {selectedBuilding && (
          <BuildingModal 
            data={selectedBuilding} 
            onClose={() => setSelectedId(null)} 
          />
        )}
      </AnimatePresence>
      
      {/* Instructions Footer */}
      <div className="absolute bottom-6 text-slate-400 text-xs font-medium uppercase tracking-widest">
        Scroll to Zoom • Click to Explore
      </div>
    </div>
  );
}