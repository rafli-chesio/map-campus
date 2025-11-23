'use client';

import { motion, Variants } from 'framer-motion'; // 1. Kita import tipe 'Variants'

interface MapSVGProps {
  onBuildingClick: (id: string) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

// 2. Kita pasang tipe ': Variants' di sini agar TypeScript tidak rewel
const buildingVariants: Variants = {
  initial: { 
    translateY: 0,
    filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.1))"
  },
  hover: { 
    translateY: -10, 
    filter: "drop-shadow(0px 20px 20px rgba(0,0,0,0.3))",
    transition: { type: 'spring', stiffness: 300 } // TypeScript sekarang tahu ini valid
  },
  tap: { translateY: 0 }
};

const buildings = [
  { 
    id: 'teknik', 
    d: "M200,300 L250,275 L300,300 L300,400 L250,425 L200,400 Z", 
    color: "url(#gradBlue)",
    labelX: 250, labelY: 350 
  },
  { 
    id: 'seni', 
    d: "M350,250 L400,225 L450,250 L450,350 L400,375 L350,350 Z", 
    color: "url(#gradPink)",
    labelX: 400, labelY: 300 
  },
  { 
    id: 'perpus', 
    d: "M500,200 L600,150 L700,200 L700,350 L600,400 L500,350 Z", 
    color: "url(#gradEmerald)",
    labelX: 600, labelY: 280 
  },
  { 
    id: 'kantin', 
    d: "M150,400 L250,350 L350,400 L250,450 Z", 
    color: "url(#gradOrange)",
    labelX: 250, labelY: 400 
  },
  { 
    id: 'auditorium', 
    d: "M400,400 L450,375 L500,400 L500,450 L450,475 L400,450 Z", 
    color: "url(#gradPurple)",
    labelX: 450, labelY: 425 
  },
  { 
    id: 'rektorat', 
    d: "M400,100 L500,50 L600,100 L600,250 L500,300 L400,250 Z", 
    color: "url(#gradSlate)",
    labelX: 500, labelY: 180 
  },
  { 
    id: 'taman', 
    d: "M650,400 Q750,350 800,400 T750,480 T650,400", 
    color: "url(#gradGreen)",
    labelX: 725, labelY: 420 
  },
];

export default function MapSVG({ onBuildingClick, hoveredId, setHoveredId }: MapSVGProps) {
  return (
    <svg 
      viewBox="0 0 900 600" 
      className="w-full h-full drop-shadow-2xl"
      style={{ maxHeight: '85vh' }}
    >
      <defs>
        <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="gradPink" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#BE185D" />
        </linearGradient>
        <linearGradient id="gradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="gradOrange" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
        <linearGradient id="gradPurple" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
        <linearGradient id="gradSlate" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
      </defs>

      <path 
        d="M50,300 L450,100 L850,300 L450,550 Z" 
        fill="#E2E8F0" 
        stroke="#CBD5E1" 
        strokeWidth="2"
      />
      <path 
        d="M150,350 L750,350" 
        fill="none" 
        stroke="#FFFFFF" 
        strokeWidth="12" 
        strokeLinecap="round"
        opacity="0.6"
      />

      {buildings.map((b) => {
        const isHovered = hoveredId === b.id;
        
        return (
          <g key={b.id} onClick={() => onBuildingClick(b.id)}>
            <motion.path
              d={b.d}
              fill={b.color}
              stroke="white"
              strokeWidth={isHovered ? 3 : 1}
              variants={buildingVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              animate={isHovered ? "hover" : "initial"}
              onHoverStart={() => setHoveredId(b.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="cursor-pointer transition-colors duration-300"
              style={{ opacity: 0.9 }}
            />
            
            <motion.text
              x={b.labelX}
              y={b.labelY}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? -20 : 10 }}
              textAnchor="middle"
              className="pointer-events-none fill-slate-800 text-xs font-bold uppercase tracking-wider"
              style={{ textShadow: '0px 2px 0px rgba(255,255,255,1)' }}
            >
              {b.id}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}