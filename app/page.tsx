import Hero from "@/components/Hero"
import Demo from "@/components/Demo"
import Approach from "@/components/Approach"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      {/* background grid */}
      <div className="pointer-events-none fixed inset-0 -z-10 grid-overlay bg-grid" />

      <Hero />
      <Demo />
      <Approach />
      <Contact />
      <Footer />
    </main>
  );
}
