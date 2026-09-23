"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, Clock, Flame, Star, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/lib/types";

type Tab = "plan" | "saved";
type SortKey = "duration" | "caloriesBurned" | "rating";

export default function MyPlanPage() {
  const { plan, saved, done, loaded, removeFromPlan, removeFromSaved, markDone } =
    usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  const minutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const calories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const list = [...(tab === "plan" ? plan : saved)].sort(
    (a, b) => a[sortBy] - b[sortBy]
  );

  const stats = [
    { label: "Exercises", value: plan.length },
    { label: "Minutes", value: minutes },
    { label: "Calories", value: calories },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase">
        My Plan
      </h1>
      <p className="text-gray-400 text-sm mt-1 mb-6">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#14161b] border border-white/10 rounded-xl p-5 mb-8">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={i !== 0 ? "sm:border-l sm:border-white/10 sm:pl-6" : ""}
          >
            <p className="text-gray-500 text-xs">{s.label}</p>
            <p
              className={`font-[family-name:var(--font-oswald)] text-3xl font-bold ${
                i === 0 ? "text-[#ccff00]" : "text-white"
              }`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs + Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="inline-flex bg-[#14161b] border border-white/10 rounded-lg p-1 text-xs">
          <button
            onClick={() => setTab("plan")}
            className={`px-4 py-1.5 rounded-md transition ${
              tab === "plan" ? "bg-[#0f1115] text-white font-semibold" : "text-gray-400"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`px-4 py-1.5 rounded-md transition ${
              tab === "saved" ? "bg-[#0f1115] text-white font-semibold" : "text-gray-400"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="appearance-none bg-[#14161b] border border-white/10 rounded-lg pl-3 pr-8 py-1.5 text-white"
            >
              <option value="duration">Duration</option>
              <option value="caloriesBurned">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {!loaded ? (
        <p className="text-center text-gray-400 py-20">Loading workouts…</p>
      ) : list.length === 0 ? (
        <div className="border-2 border-dashed border-white/10 rounded-xl py-16 px-4 text-center">
          <h2 className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase mb-1">
            Nothing here yet
          </h2>
          <p className="text-gray-400 text-sm mb-5">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#ccff00] text-black font-semibold text-xs px-5 py-2 rounded-full hover:opacity-90 transition"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((w) => (
            <PlanItem
              key={w.id}
              workout={w}
              isDone={done.includes(w.id)}
              showDone={tab === "plan"}
              onDone={() => markDone(w.id)}
              onRemove={() =>
                tab === "plan" ? removeFromPlan(w.id) : removeFromSaved(w.id)
              }
            />
          ))}
        </div>
      )}
    </main>
  );
}

function PlanItem({
  workout,
  isDone,
  showDone,
  onDone,
  onRemove,
}: {
  workout: Workout;
  isDone: boolean;
  showDone: boolean;
  onDone: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-4 bg-[#14161b] border border-white/10 rounded-xl p-3 ${
        isDone ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="relative w-24 h-16 shrink-0 rounded-md overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h3
            className={`font-[family-name:var(--font-oswald)] text-sm font-bold uppercase ${
              isDone ? "line-through" : ""
            }`}
          >
            {workout.name}
          </h3>
          <p className="text-gray-500 text-[11px] mb-1">{workout.equipment}</p>
          <div className="flex items-center gap-3 text-[11px] text-gray-300">
            <span className="flex items-center gap-1">
              <Clock size={11} className="text-[#ccff00]" />
              {workout.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Flame size={11} className="text-[#ccff00]" />
              {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1">
              <Star size={11} className="text-[#ccff00]" />
              {workout.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/10 transition"
        >
          View Details
        </Link>
        {showDone && (
          <button
            onClick={onDone}
            className="inline-flex items-center gap-1.5 bg-[#ccff00] text-black text-xs font-semibold px-4 py-2 rounded-full hover:opacity-90 transition"
          >
            <Check size={14} />
            {isDone ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={onRemove}
          aria-label="Remove"
          className="border border-white/20 p-2 rounded-full hover:bg-white/10 transition"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}