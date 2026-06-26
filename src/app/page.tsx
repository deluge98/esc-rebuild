import FeatureCards from "@/components/FeatureCards";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import Sponsors from "@/components/Sponsors";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <IntroSection />
        <FeatureCards />
        <Sponsors />
      </main>
      <Footer />
    </>
  );
}
