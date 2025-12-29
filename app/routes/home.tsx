import { Card } from "~/components/home/card";
import { Filter } from "~/components/home/filter";
import { Padgination } from "~/components/home/padgination";
import { usePageTitle } from "~/hooks/usePageTitle";
import { useRequireAuth } from "~/hooks/useRequireAuth";

const Home = () => {
  useRequireAuth()
  usePageTitle("RentRight - Home");

  return (
    <div className="p-4">
      <Filter />
      <div className="flex flex-wrap gap-4 justify-center">
        <Card />
      </div>
      <Padgination/>
    </div>
  );
};

export default Home;
