import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#161a20] border border-white/10 rounded-2xl p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <p className="text-[#ccff00] text-xs tracking-widest font-semibold mb-3">
          WORKOUT LIBRARY
        </p>
        <h1 className="font-[family-name:var(--font-oswald)] text-4xl md:text-5xl font-bold uppercase leading-tight mb-4">
          Train with intent. Log every set.
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-6">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition"
        >
          BROWSE WORKOUTS
          <ArrowDown size={16} />
        </a>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-sm aspect-square rounded-xl bg-white/5 flex items-center justify-center text-gray-500 text-sm">
          Hero image
        </div>
      </div>
    </section>
  );
}