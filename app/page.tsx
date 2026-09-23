import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Hero />
      <section id="library" className="mt-12">
        <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-bold">
          THE LIBRARY
        </h2>
      </section>
    </main>
  );
}