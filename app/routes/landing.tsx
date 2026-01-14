import { usePageTitle } from "~/hooks/usePageTitle";
import { useData } from "~/hooks/useData";
import Navbar from "~/components/landing/Navbar";
import Footer from "~/components/landing/footer";
import FeaturedProperties from "~/components/landing/featuredproperties";
import Features from "~/components/landing/features";
import CTACards from "~/components/landing/ctacards";
import HowItWorks from "~/components/landing/howitworks";

const Landing = () => {
  usePageTitle("RentRight");
  const { users } = useData();

  return (
    <>
      <Navbar/>
      <FeaturedProperties />
      <Features />
      <HowItWorks/>
      <CTACards />
      <Footer />
    </>
  );
};

export default Landing;
