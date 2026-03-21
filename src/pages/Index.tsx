import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import FeaturesGrid from "@/components/FeaturesGrid";
import Platforms from "@/components/Platforms";
import CommandReference from "@/components/CommandReference";
import Installation from "@/components/Installation";
import Architecture from "@/components/Architecture";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <WhySection />
        <FeaturesGrid />
        <Platforms />
        <CommandReference />
        <Installation />
        <Architecture />
      </main>
      <Footer />
    </div>
  );
}
