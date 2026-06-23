import { supabase } from "@/src/lib/supabase";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cache } from "react";
import HeroSection from "@/src/components/sections/Hero";
import AboutSection from "@/src/components/sections/About";
import PricingSection from "@/src/components/sections/Pricing";
import WorksSection from "@/src/components/sections/Works";
import ReviewsSection from "@/src/components/sections/Reviews";

type Props = {
  params: Promise<{ slug: string }>;
};

// Cache the database query so we don't fetch twice (once for metadata, once for page)
const getMaster = cache(async (slug: string) => {
  const { data: master, error } = await supabase
    .from("masters")
    .select("*")
    .eq("slug", slug)
    .single();
  return { master, error };
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { master } = await getMaster(slug);

  if (!master) {
    return {
      title: "Майстер не знайдений",
    };
  }

  let photoUrl =
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600&h=800";
  if (master.photo_url) {
    try {
      const trimmed = master.photo_url.trim();
      if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed) && parsed.length > 0) {
          photoUrl = parsed[0];
        } else if (typeof parsed === "string") {
          photoUrl = parsed;
        }
      } else {
        photoUrl = trimmed;
      }
    } catch (e) {
      // Ignore parse error
    }
  }

  return {
    title: `${master.name} — Майстер краси`,
    description: master.bio || "Професійні послуги краси. Записуйтесь онлайн!",
    openGraph: {
      title: `${master.name} — Майстер краси`,
      description:
        master.bio || "Професійні послуги краси. Записуйтесь онлайн!",
      images: [photoUrl],
    },
  };
}

export default async function MasterProfile({ params }: Props) {
  const { slug } = await params;
  const { master, error } = await getMaster(slug);

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
