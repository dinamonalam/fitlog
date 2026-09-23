import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-24 text-center">
      <p className="text-[#ccff00] text-xs tracking-widest font-semibold mb-3">
        ERROR 404
      </p>
      <h1 className="font-[family-name:var(--font-oswald)] text-5xl md:text-6xl font-bold uppercase mb-3">
        Page not found
      </h1>
      <p className="text-gray-400 text-sm mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#ccff00] text-black font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition"
      >
        Go Home
      </Link>
    </main>
  );
}