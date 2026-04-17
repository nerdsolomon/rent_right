import Dropdown from "./dropdown";
import { location } from "~/services";

interface Prop {
  country: string;
  setCountry: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  listingType: string;
  setListType: (value: string) => void;
  duration: string;
  setDuration: (value: string) => void;
}

export const Filter = ({
  country,
  setCountry,
  city,
  duration,
  listingType,
  setCity,
  setDuration,
  setListType,
  setState,
  setType,
  state,
  type,
}: Prop) => {
  const states = country ? Object.keys(location[country] || {}) : [];
  const cities = country && state ? location[country]?.[state] || [] : [];

  const types = ["land", "building", "apartment"];
  const listingTypes = ["rental", "sale"];
  const durations = ["daily", "weekly", "monthly", "yearly"];

  const handleStateChange = (value: string) => {
    setState(value);
    setCity("");
  };

  const handleCityChange = (value: string) => {
    setCity(value);
  };

  const handleListingTypeChange = (value: string) => {
    setListType(value);
    setDuration(""); 
  };

  return (
    <>
      <div className="flex pb-4 gap-2 flex-wrap">
        {country && (
          <Dropdown
            label="State"
            value={state}
            list={states}
            onSelect={handleStateChange}
          />
        )}

        {country && state && (
          <Dropdown
            label="City"
            value={city}
            list={cities}
            onSelect={handleCityChange}
          />
        )}

        <Dropdown
          label="Property Type"
          value={type}
          list={types}
          onSelect={setType}
        />

        <Dropdown
          label="Listing Type"
          value={listingType}
          list={listingTypes}
          onSelect={handleListingTypeChange}
        />

        {listingType === "rental" && (
          <Dropdown
            label="Duration"
            value={duration}
            list={durations}
            onSelect={setDuration}
          />
        )}
      </div>
    </>
  );
};