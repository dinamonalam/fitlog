"use client";

import { useRouter } from "next/navigation";
import { Plus, Bookmark } from "lucide-react";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";

export default function DetailActions({ workout }: { workout: Workout }) {
  const router = useRouter();
  const { plan, addToPlan, saveForLater, isInPlan } = usePlan();
  const full = plan.length >= 5 && !isInPlan(workout.id);

  const handleAdd = () => {
    addToPlan(workout);
    if (!full) router.push("/my-plan?tab=plan");
  };

  const handleSave = () => {
    saveForLater(workout);
    router.push("/my-plan?tab=saved");
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleAdd}
        disabled={full}
        className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Plus size={16} />
        Add to today&apos;s plan
      </button>
      <button
        onClick={handleSave}
        className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-white/10 transition"
      >
        <Bookmark size={16} />
        Save for later
      </button>
    </div>
  );
}