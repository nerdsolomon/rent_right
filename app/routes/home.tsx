import { Card } from "~/components/home/card";
import { Filter } from "~/components/home/filter";
import { usePageTitle } from "~/hooks/usePageTitle";

const Home = () => {
  usePageTitle("RentRight - Home");
  
  return (
    <div className="p-4">
      <Filter/>
      <div className="flex flex-wrap gap-4 justify-center">
        <Card />
      </div>
    </div>
  );
};

export default Home;
