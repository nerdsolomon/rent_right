import Dropdown from "./dropdown";
import { SelectInput } from "./select";
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

  // ✅ centralised handlers (fixes your issue)
  const handleStateChange = (value: string) => {
    setState(value);
    setCity(""); // reset dependent field
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
      {/* ✅ MOBILE */}
      <div className="flex pb-4 gap-2 flex-wrap lg:hidden">
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

      {/* ✅ DESKTOP */}
      <div className="grid grid-cols-5 pb-4">
        {country && (
          <SelectInput
            label="State"
            value={state}
            list={states}
            onChange={handleStateChange}
          />
        )}

        {country && state && (
          <SelectInput
            label="City"
            value={city}
            list={cities}
            onChange={handleCityChange}
          />
        )}

        <SelectInput
          label="Property Type"
          value={type}
          list={types}
          onChange={setType}
        />

        <SelectInput
          label="Listing Type"
          value={listingType}
          list={listingTypes}
          onChange={handleListingTypeChange}
        />

        {listingType === "rental" && (
          <SelectInput
            label="Duration"
            value={duration}
            list={durations}
            onChange={setDuration}
          />
        )}
      </div>
    </>
  );
};