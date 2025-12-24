import { useState } from "react";
import Dropdown from "./dropdown";
import { location } from "~/services";

export const Filter = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const countries = Object.keys(location);
  const states = country ? Object.keys(location[country] || {}) : [];
  const cities = country && state ? location[country]?.[state] || [] : [];
  return (
    <div className="flex pb-4 gap-2">
      <Dropdown
        label="Country"
        value={country}
        list={countries}
        onSelect={(value) => setCountry(value)}
      />
      {country && (
        <Dropdown
          label="State"
          value={state}
          list={states}
          onSelect={(value) => setState(value)}
        />
      )}
      {state && (
        <Dropdown
          label="City"
          value={city}
          list={cities}
          onSelect={(value) => setCity(value)}
        />
      )}
    </div>
  );
};
