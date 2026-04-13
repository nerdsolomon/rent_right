import { useState } from "react";
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
  // const countries = Object.keys(location);
  const states = country ? Object.keys(location[country] || {}) : [];
  const cities = country && state ? location[country]?.[state] || [] : [];
  const types = ["land", "building", "apartment"];
  const listingTypes = ["rental", "sale"];
  const durations = ["daily", "weekly", "monthly", "yearly"];

  return (
    <>
      <div className="flex pb-4 gap-2 flex-wrap block lg:hidden">
        {/* <Dropdown
          label="Country"
          value={country}
          list={countries}
          onSelect={setCountry}
        /> */}
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
          onSelect={setListType}
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

      <div className="hidden lg:block space-y-2">
        {/* <SelectInput
          label="Country"
          value={country}
          list={countries}
          onChange={(value) => {
            setCountry(value);
            setState("");
            setCity("");
          }}
        /> */}
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
          label="Property Type"
          value={type}
          list={types}
          onChange={setType}
        />
        <SelectInput
          label="Listing Type"
          value={listingType}
          list={listingTypes}
          onChange={setListType}
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
