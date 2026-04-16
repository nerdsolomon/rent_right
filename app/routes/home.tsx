import { useState, useMemo } from "react";
import { Carousel } from "~/components/home/carousel";
import { Filter } from "~/components/home/filter";
import { PropertyCard } from "~/components/home/propertycard";
import { usePageTitle } from "~/hooks/usePageTitle";
import { useProperties } from "~/hooks/useProperties";
import { RequireAuth } from "~/hooks/useRequireAuth";
import type { Property } from "~/types";

const Home = () => {
  usePageTitle("RentRight - Home");
  const {data} = useProperties()
  const properties = data?.properties ?? []

  const [country, setCountry] = useState("Nigeria");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [listingType, setListType] = useState("");
  const [duration, setDuration] = useState("");

  const filteredProperties = useMemo(() => {
    return properties.filter((p: Property) => {
      return (
        (!city || p.city?.toLowerCase() === city.toLowerCase()) &&
        (!state || p.state?.toLowerCase() === state.toLowerCase()) &&
        (!type || p.type?.toLowerCase() === type.toLowerCase()) &&
        (!listingType || p.listingType?.toLowerCase() === listingType.toLowerCase()) &&
        (!duration || p.duration?.toLowerCase() === duration.toLowerCase())
      );
    });
  }, [properties, city, state, type, listingType, duration]);

  return (
    <RequireAuth>
      <div className="p-2">
        <Carousel />

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property: Property, index: number) => (
              <PropertyCard property={property} key={index} />
            ))
          ) : (
            <p className="text-gray-500 pt-20 col-span-full text-center">
              No properties match your filters.
            </p>
          )}
        </div>
      </div>
    </RequireAuth>
  );
};

export default Home;