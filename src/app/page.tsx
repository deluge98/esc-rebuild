import DemoHeader from "@/components/DemoHeader";
import FeatureCards from "@/components/FeatureCards";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import Sponsors from "@/components/Sponsors";

export default function Home() {
  return (
    <>
      <DemoHeader />
      <main>
        <Hero />
        <IntroSection />
        <FeatureCards />
        <Sponsors />
      </main>
      <Footer />
    </>
  );
}
