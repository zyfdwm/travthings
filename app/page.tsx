import HeroSection from "@/components/HeroSection";
import DestinationShowcase from "@/components/DestinationShowcase";
import Philosophy from "@/components/Philosophy";
import OurInsight from "@/components/OurInsight";
import { getBlogPosts } from "@/lib/notion";

export default async function Home() {
  const allPosts = await getBlogPosts();
  const posts = allPosts.slice(0, 3);
  
  return (
    <>
      <HeroSection />
      <DestinationShowcase />
      <Philosophy />
      <OurInsight posts={posts} />
    </>
  );
}