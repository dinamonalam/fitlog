import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkout } from "@/lib/api";
import DetailActions from "@/components/DetailActions";

export default async function WorkoutDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout || !workout.id) notFound();

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: String(workout.sets) },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: String(workout.rating) },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: image */}
        <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right: info */}
        <div>
          <h1 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase mb-2">
            {workout.name}
          </h1>
          <p className="text-gray-400 text-sm mb-4">{workout.description}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="bg-[#ccff00] text-black text-[10px] font-bold uppercase px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-[#14161b] border border-white/10 rounded-lg mb-6">
            {specs.map((s, i) => (
              <div
                key={s.label}
                className={`flex justify-between px-4 py-2.5 text-xs ${
                  i !== specs.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <span className="text-gray-500 tracking-wider">{s.label}</span>
                <span className="font-semibold">{s.value}</span>
              </div>
            ))}
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase mb-3">
            Instructions
          </h2>
          <ol className="space-y-2 mb-6">
            {workout.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#ccff00] font-bold">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>

          <DetailActions workout={workout} />
        </div>
      </div>
    </main>
  );
}