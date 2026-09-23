import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0f1115]">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-[family-name:var(--font-oswald)] text-lg font-bold">
          <span className="bg-[#ccff00] text-black p-1 rounded-md">
            <Dumbbell size={14} />
          </span>
          FITLOG
        </div>
        <p className="text-gray-500 text-xs text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}