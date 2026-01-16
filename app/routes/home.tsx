import { Carousel } from "~/components/home/carousel";
import { Filter } from "~/components/home/filter";
import { Padgination } from "~/components/home/padgination";
import { PropertyCard } from "~/components/home/propertycard";
import { useData } from "~/hooks/useData";
import { usePageTitle } from "~/hooks/usePageTitle";
import { RequireAuth } from "~/hooks/useRequireAuth";

const Home = () => {
  usePageTitle("RentRight - Home");
  const { properties } = useData();

  return (
    <RequireAuth>
      <div className="p-2">
        <Carousel />
        <div className="lg:hidden">
          <Filter />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {properties.map((property, index) => (
            <PropertyCard property={property} key={index} />
          ))}
        </div>
        <Padgination />
      </div>
    </RequireAuth>
  );
};

export default Home;
