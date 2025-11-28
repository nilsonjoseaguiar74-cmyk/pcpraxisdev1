import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Configurator } from "@/components/Configurator";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CyberpunkEffects } from "@/components/CyberpunkEffects";
import { FloatingLanguageSwitcher } from "@/components/FloatingLanguageSwitcher";

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth">
      <CyberpunkEffects />
      <Navbar />
      <ScrollProgress />
      <FloatingLanguageSwitcher />
      <main>
        <Hero />
        <Services />
        <Configurator />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
