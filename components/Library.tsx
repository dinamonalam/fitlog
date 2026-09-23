"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Workout } from "@/lib/types";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

type SortKey = "duration" | "caloriesBurned" | "rating";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  useEffect(() => {
    getWorkouts()
      .then(setWorkouts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const sorted = [...workouts].sort((a, b) => a[sortBy] - b[sortBy]);

  return (
    <section id="library" className="mt-12 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-bold">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 text-sm">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="appearance-none bg-[#161a20] border border-white/10 rounded-lg pl-3 pr-8 py-1.5 text-white"
            >
              <option value="duration">Duration</option>
              <option value="caloriesBurned">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-white/20 border-t-[#ccff00] rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <p className="text-center text-red-400 py-20">
          Failed to load workouts. Please try again.
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}