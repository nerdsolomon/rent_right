import { usePageTitle } from "~/hooks/usePageTitle";
import { useData } from "~/hooks/useData";
import Footer from "~/components/landing/footer";
import FeaturedProperties from "~/components/landing/featuredproperties";
import Features from "~/components/landing/features";
import CTACards from "~/components/landing/ctacards";
import HowItWorks from "~/components/landing/howitworks";
import { Nav } from "~/components/landing/nav";
import HeroSection from "~/components/landing/hero";

const Landing = () => {
  usePageTitle("RentRight");
  const { users } = useData();

  return (
    <>
      <Nav/>
      <HeroSection/>
      <FeaturedProperties />
      <Features />
      <HowItWorks/>
      <CTACards />
      <Footer />
    </>
  );
};

export default Landing;
