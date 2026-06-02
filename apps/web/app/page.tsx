import { HeroSection } from '@/components/home/HeroSection';
import { QuickAccess } from '@/components/home/QuickAccess';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { SmartEngines } from '@/components/home/SmartEngines';
import { FeaturedVendors } from '@/components/home/FeaturedVendors';
import { StatsSection } from '@/components/home/StatsSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { InspirationGrid } from '@/components/home/InspirationGrid';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { CTABanner } from '@/components/home/CTABanner';
import { PartnerLogos } from '@/components/home/PartnerLogos';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <QuickAccess />
      <FeaturedProperties />
      <SmartEngines />
      <StatsSection />
      <FeaturedVendors />
      <HowItWorks />
      <InspirationGrid />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <PartnerLogos />
    </main>
  );
}
