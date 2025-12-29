import { Card } from "~/components/home/card";
import { Filter } from "~/components/home/filter";
import { Padgination } from "~/components/home/padgination";
import { usePageTitle } from "~/hooks/usePageTitle";
import { RequireAuth } from "~/hooks/useRequireAuth";

const Home = () => {
  usePageTitle("RentRight - Home");

  return (
    <RequireAuth>
      <div className="p-4">
      <Filter />
      <div className="flex flex-wrap gap-4 justify-center">
        <Card />
      </div>
      <Padgination/>
    </div>
    </RequireAuth>
    
  );
};

export default Home;
