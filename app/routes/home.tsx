import { useState } from "react";
import { Card } from "~/components/home/card";
import Dropdown from "~/components/home/dropdown";
import { usePageTitle } from "~/hooks/usePageTitle";

const Home = () => {
  usePageTitle("RentRight - Home");
  const filter = { label: "location", list: ["a", "b", "c", "d", "e"] };
  const [selected, setSelected] = useState("");
  return (
    <div className="p-4">
      <div className="flex justify-center pb-4">
        <Dropdown
          label={filter.label}
          value={selected}
          list={filter.list}
          onSelect={(value) => setSelected(value)}
        />
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <Card />
      </div>
    </div>
  );
};

export default Home;
