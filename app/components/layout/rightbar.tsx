import { BeOwner } from "../profile/beOwner";
import { useData } from "~/hooks/useData";

const Rightbar = () => {
  
  const { currentUser } = useData();
  return (
    <aside className="hidden lg:block h-screen w-[250px] bg-purple-100 border-l border-gray-200 bg-gray-100">
      {currentUser.role !== "owner" && <BeOwner />}
    </aside>
  );
};

export default Rightbar;
