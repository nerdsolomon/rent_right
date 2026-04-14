import { useState } from "react";
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

  const [country, setCountry] = useState("Nigeria");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [listingType, setListType] = useState("");
  const [duration, setDuration] = useState("");

  const filteredProperties = properties.filter((p) => {
  return (
    (!city || p.city === city) &&
    (!state || p.state === state) &&
    (!type || p.type === type) &&
    (!listingType || p.listingType === listingType) &&
    (!duration || p.duration === duration)
  );
});

  return (
    <RequireAuth>
      <div className="p-2">
        <Carousel />
        <div className="lg:hidden">
          <Filter
            city={city}
            country={country}
            duration={duration}
            listingType={listingType}
            setCity={setCity}
            setCountry={setCountry}
            setDuration={setDuration}
            setListType={setListType}
            setState={setState}
            setType={setType}
            state={state}
            type={type}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProperties.map((property, index) => (
            <PropertyCard property={property} key={index} />
          ))}
        </div>
        {/* <Padgination /> */}
      </div>
    </RequireAuth>
  );
};

export default Home;
