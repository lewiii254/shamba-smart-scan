
import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import AnalyticsSection from "@/components/landing/AnalyticsSection";
import EnterpriseSection from "@/components/landing/EnterpriseSection";
import CtaSection from "@/components/landing/CtaSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FooterSection from "@/components/landing/FooterSection";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <FeatureSection />
      <WorkflowSection />
      <BenefitsSection />
      <AnalyticsSection />
      <EnterpriseSection />
      <CtaSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
};

export default Landing;
