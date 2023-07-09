import { HeroSection } from "./HeroSection";
import { getHeroSectionData } from "./getHeroSectionData";

export default async function Hero() {
  const heroDataPromise = getHeroSectionData();
  const heroData = await heroDataPromise;

  console.log("heroData:", heroData);

  return <HeroSection {...heroData} />;
}
