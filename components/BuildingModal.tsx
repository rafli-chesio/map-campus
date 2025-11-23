'use client';

import { motion, Variants } from 'framer-motion'; // Tambah 'Variants' disini
import { CultureData } from '@/types';
import { X } from 'lucide-react';

interface BuildingModalProps {
  data: CultureData;
  onClose: () => void;
}

const overlayVariants: Variants = { // Tambahkan tipe ': Variants'
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants: Variants = { // Tambahkan tipe ': Variants'
  hidden: { scale: 0.9, opacity: 0, y: 20 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 }
  },
  exit: { 
    scale: 0.95, 
    opacity: 0, 
    y: 20,
    transition: { duration: 0.2 }
  },
};

export default function BuildingModal({ data, onClose }: BuildingModalProps) {
  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4"
    >
      <motion.div
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Header Banner */}
        <div className={`h-24 w-full ${data.color} relative`}>
            <div className="absolute -bottom-8 left-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white text-3xl shadow-sm">
                {data.icon}
            </div>
            <button 
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/40 transition-colors"
            >
                <X size={20} />
            </button>
        </div>

        {/* Content */}
        <div className="px-6 pt-10 pb-8">
            <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {data.category}
                </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{data.name}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
                {data.description}
            </p>

            <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
                <h4 className="text-sm font-semibold text-slate-700 mb-1">🔥 Kebiasaan Unik</h4>
                <p className="text-sm text-slate-600 italic">"{data.habit}"</p>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
}