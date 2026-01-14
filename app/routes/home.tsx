import { Card } from "~/components/home/card";
import { Carousel } from "~/components/home/carousel";
import { Filter } from "~/components/home/filter";
import { Padgination } from "~/components/home/padgination";
import { BeOwner } from "~/components/profile/beOwner";
import { useData } from "~/hooks/useData";
import { usePageTitle } from "~/hooks/usePageTitle";
import { RequireAuth } from "~/hooks/useRequireAuth";

const Home = () => {
  usePageTitle("RentRight - Home");
  const { currentUser } = useData();

  return (
    <RequireAuth>
      <div className="p-2">
        <Carousel />
        <Filter />
        <div className="flex flex-wrap gap-4 justify-center">
          <Card />
        </div>
        <Padgination />
      </div>
    </RequireAuth>
  );
};

export default Home;
