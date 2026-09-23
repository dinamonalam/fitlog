"use client";

import { Plus, Bookmark } from "lucide-react";
import { Workout } from "@/lib/types";

export default function DetailActions({ workout }: { workout: Workout }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => console.log("add to plan", workout.id)}
        className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition"
      >
        <Plus size={16} />
        Add to today&apos;s plan
      </button>
      <button
        onClick={() => console.log("save", workout.id)}
        className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-white/10 transition"
      >
        <Bookmark size={16} />
        Save for later
      </button>
    </div>
  );
}