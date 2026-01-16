import { Filter } from "../home/filter";

const Rightbar = () => {
  return (
    <aside className="hidden lg:block h-screen w-[250px] bg-purple-100 p-2 border-l border-gray-200 bg-gray-100">
      <p className="text-gray-400 font-bold p-2">Filter</p>
      <Filter />
    </aside>
  );
};

export default Rightbar;
