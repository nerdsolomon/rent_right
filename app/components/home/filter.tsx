import { useState } from "react";
import Dropdown from "./dropdown";
import { SelectInput } from "./select";
import { location } from "~/services";

export const Filter = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");

  const countries = Object.keys(location);
  const states = country ? Object.keys(location[country] || {}) : [];
  const cities = country && state ? location[country]?.[state] || [] : [];
  const types = ["land", "apartment"];

  return (
    <>
      <div className="flex pb-4 gap-2 flex-wrap block lg:hidden">
        <Dropdown
          label="Country"
          value={country}
          list={countries}
          onSelect={setCountry}
        />
        {country && (
          <Dropdown
            label="State"
            value={state}
            list={states}
            onSelect={setState}
          />
        )}
        {country && state && (
          <Dropdown
            label="City"
            value={city}
            list={cities}
            onSelect={setCity}
          />
        )}
        <Dropdown label="Type" value={type} list={types} onSelect={setType} />
      </div>

      <div className="hidden lg:block space-y-2">
        <SelectInput
          label="Country"
          value={country}
          list={countries}
          onChange={(value) => {
            setCountry(value);
            setState("");
            setCity("");
          }}
        />
        {country && (
          <SelectInput
            label="State"
            value={state}
            list={states}
            onChange={(value) => {
              setState(value);
              setCity("");
            }}
          />
        )}
        {country && state && (
          <SelectInput
            label="City"
            value={city}
            list={cities}
            onChange={setCity}
          />
        )}
        <SelectInput
          label="Type"
          value={type}
          list={types}
          onChange={setType}
        />
      </div>
    </>
  );
};
