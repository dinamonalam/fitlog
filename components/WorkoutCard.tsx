import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col h-full bg-[#14161b] border border-white/10 rounded-xl overflow-hidden hover:border-[#ccff00]/60 transition"
    >
      <div className="relative w-full aspect-[2/1] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="flex flex-col flex-1 px-4 pt-4 pb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="bg-[#ccff00] text-black text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full leading-none"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase leading-tight text-white">
          {workout.name}
        </h3>
        <p className="text-[#7f93b0] text-xs mt-1 mb-4">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-4 border border-white/10 px-3 py-2 text-[11px] text-[#8fa3c0]">
          <span className="flex items-center gap-1.5">
            <Clock size={12} className="text-gray-400" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame size={12} className="text-gray-400" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <Star size={12} className="text-gray-400" />
            <span className="text-gray-200">{workout.rating}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}