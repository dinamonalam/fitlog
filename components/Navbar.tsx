"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isPlan = pathname === "/my-plan";

  const linkBase = "px-4 py-1.5 rounded-full text-sm transition";
  const active = "bg-[#ccff00] text-black font-semibold";
  const inactive = "text-gray-300 hover:text-white";

  return (
    <nav className="bg-[#0f1115] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-[family-name:var(--font-oswald)] text-xl font-bold tracking-wide"
        >
          <span className="bg-[#ccff00] text-black p-1.5 rounded-md">
            <Dumbbell size={18} />
          </span>
          FITLOG
        </Link>

        {/* Middle: Links */}
        <div className="flex items-center gap-1">
          <Link href="/" className={`${linkBase} ${!isPlan ? active : inactive}`}>
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`${linkBase} ${isPlan ? active : inactive}`}
          >
            My Plan
          </Link>
        </div>

        {/* Right: Badges */}
        <Link href="/my-plan" className="flex items-center gap-2 text-xs">
          <span className="bg-[#ccff00] text-black font-semibold px-3 py-1 rounded-full">
            Plan 0
          </span>
          <span className="border border-white/30 px-3 py-1 rounded-full">
            Saved 0
          </span>
        </Link>
      </div>
    </nav>
  );
}