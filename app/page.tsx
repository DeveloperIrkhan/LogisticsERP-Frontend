import BadgeSection from "@/components/Badge/Badge";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="bg-background">
      <section>
        <HeroSection />
        <BadgeSection />
      </section>
    </div>
  );
}
