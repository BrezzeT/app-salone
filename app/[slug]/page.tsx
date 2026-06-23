import { supabase } from "@/src/lib/supabase";
import { notFound } from "next/navigation";
import HeroSection from "@/src/components/sections/Hero";
import AboutSection from "@/src/components/sections/About";
import PricingSection from "@/src/components/sections/Pricing";
import WorksSection from "@/src/components/sections/Works";
import ReviewsSection from "@/src/components/sections/Reviews";

export default async function MasterProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: master, error } = await supabase
    .from("masters")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !master) notFound();

  const portfolioUrls = master.portfolio_urls || [];

  return (
    <main className="w-full">
      <HeroSection portfolioUrls={portfolioUrls} />
      <AboutSection master={master} />
      <PricingSection />
      <WorksSection master={master} />
      <ReviewsSection />
    </main>
  );
}
