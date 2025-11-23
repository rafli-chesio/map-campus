import CanvasMap from '@/components/CanvasMap';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-slate-100">
      {/* Container Wrapper for Aspect Ratio */}
      <div className="w-full h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
        <CanvasMap />
      </div>
    </main> 
  );
}