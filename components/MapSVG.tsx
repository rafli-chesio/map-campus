'use client';

import { motion, Variants } from 'framer-motion';

interface MapSVGProps {
  onBuildingClick: (id: string) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

// Animasi Gedung: Naik turun halus
const buildingVariants: Variants = {
  initial: { 
    translateY: 0,
    filter: "drop-shadow(0px 10px 5px rgba(0,0,0,0.1))"
  },
  hover: { 
    translateY: -20, 
    filter: "drop-shadow(0px 30px 20px rgba(0,0,0,0.3))",
    transition: { type: 'spring', stiffness: 300 }
  },
  tap: { translateY: 0 }
};

// DATA GEDUNG (Sudah saya rapikan posisinya biar masuk akal di lantai baru)
const buildings = [
  { 
    id: 'teknik', 
    // Kiri Tengah
    d: "M300,400 L350,375 L400,400 L400,500 L350,525 L300,500 Z", 
    color: "url(#gradBlue)",
    labelX: 350, labelY: 450 
  },
  { 
    id: 'seni', 
    // Kanan Tengah
    d: "M1000,400 L1050,375 L1100,400 L1100,500 L1050,525 L1000,500 Z", 
    color: "url(#gradPink)",
    labelX: 1050, labelY: 450 
  },
  { 
    id: 'perpus', 
    // Tepat di Tengah Pusat
    d: "M650,350 L750,300 L850,350 L850,500 L750,550 L650,500 Z", 
    color: "url(#gradEmerald)",
    labelX: 750, labelY: 425 
  },
  { 
    id: 'kantin', 
    // Depan Kiri
    d: "M450,550 L550,500 L650,550 L550,600 Z", 
    color: "url(#gradOrange)",
    labelX: 550, labelY: 550 
  },
  { 
    id: 'auditorium', 
    // Depan Kanan
    d: "M850,550 L950,500 L1050,550 L950,600 Z", 
    color: "url(#gradPurple)",
    labelX: 950, labelY: 550 
  },
  { 
    id: 'rektorat', 
    // Paling Belakang (Puncak)
    d: "M650,150 L750,100 L850,150 L850,250 L750,300 L650,250 Z", 
    color: "url(#gradSlate)",
    labelX: 750, labelY: 200 
  },
  { 
    id: 'taman', 
    // Paling Depan (Ujung Bawah)
    d: "M650,650 Q750,600 850,650 T750,730 T650,650", 
    color: "url(#gradGreen)",
    labelX: 750, labelY: 680 
  },
];

export default function MapSVG({ onBuildingClick, hoveredId, setHoveredId }: MapSVGProps) {
  return (
    <svg 
      viewBox="0 0 1400 800" // Kanvas Besar
      className="w-full h-full drop-shadow-2xl"
    >
      <defs>
        <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#60A5FA" /><stop offset="100%" stopColor="#1D4ED8" /></linearGradient>
        <linearGradient id="gradPink" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#F472B6" /><stop offset="100%" stopColor="#BE185D" /></linearGradient>
        <linearGradient id="gradEmerald" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#34D399" /><stop offset="100%" stopColor="#047857" /></linearGradient>
        <linearGradient id="gradOrange" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#FB923C" /><stop offset="100%" stopColor="#C2410C" /></linearGradient>
        <linearGradient id="gradPurple" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#A78BFA" /><stop offset="100%" stopColor="#6D28D9" /></linearGradient>
        <linearGradient id="gradSlate" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#94A3B8" /><stop offset="100%" stopColor="#334155" /></linearGradient>
        <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#86EFAC" /><stop offset="100%" stopColor="#15803D" /></linearGradient>
      </defs>

      {/* 1. LAYER TEBAL LANTAI (Biar kelihatan tebal tanahnya) */}
      <path 
        d="M100,400 L700,750 L1300,400 L700,780 Z" 
        fill="#94A3B8" 
      />

      {/* 2. LAYER PERMUKAAN LANTAI (Diamond Raksasa Simetris) */}
      {/* Koordinat ini sudah dihitung presisi: Kiri(100), Atas(100), Kanan(1300), Bawah(750) */}
      <path 
        d="M100,400 L700,100 L1300,400 L700,750 Z" 
        fill="#E2E8F0" 
        stroke="white" 
        strokeWidth="4"
      />
      
      {/* 3. JALAN RAYA ISOMETRIC (Menyilang X) */}
      {/* Jalan Kiri Atas ke Kanan Bawah */}
      <path d="M400,250 L1000,600" stroke="white" strokeWidth="20" strokeLinecap="round" opacity="0.5" />
      {/* Jalan Kanan Atas ke Kiri Bawah */}
      <path d="M1000,250 L400,600" stroke="white" strokeWidth="20" strokeLinecap="round" opacity="0.5" />

      {/* 4. RENDER GEDUNG */}
      {buildings.map((b) => {
        const isHovered = hoveredId === b.id;
        
        return (
          <g key={b.id} onClick={() => onBuildingClick(b.id)}>
            <motion.path
              d={b.d}
              fill={b.color}
              stroke="white"
              strokeWidth={isHovered ? 2 : 0}
              variants={buildingVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              animate={isHovered ? "hover" : "initial"}
              onHoverStart={() => setHoveredId(b.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="cursor-pointer"
              style={{ opacity: 0.95 }}
            />
            
            {/* Teks Label */}
            <motion.text
              x={b.labelX}
              y={b.labelY}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? -30 : 10 }}
              textAnchor="middle"
              className="pointer-events-none fill-slate-800 text-xs font-bold uppercase tracking-wider"
              style={{ textShadow: '0px 0px 8px rgba(255,255,255,1)' }}
            >
              {b.id}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}