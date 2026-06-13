import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Software from "@/components/Software";
import Footer from "@/components/Footer";
import FloatingPixels from "@/components/FloatingPixels";
import ConstellationBackground from "@/components/ConstellationBackground";

export default function Home() {
  return (
    <>
      <ConstellationBackground />
      <FloatingPixels />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Software />
      </main>
      <Footer />
    </>
  );
}
