import { FaUserCircle } from "react-icons/fa";
import Signin from "~/components/landing/signin";
import Signup from "~/components/landing/signup";
import { usePageTitle } from "~/hooks/usePageTitle";
import {useData} from "~/data";

const Landing = () => {
  usePageTitle("RentRight");
  const { users } = useData();

  return (
    <>
      <nav className="border-b border-gray-300 p-4 sticky top-0 z-50 flex justify-between bg-white text-blue-500 font-bold">
        <div className="text-xl">RentRight {users.length}</div>
        <div className="flex gap-5 lg:gap-10 items-center">
          <a className="hover:text-black" href="#get-started">
            Get Started
          </a>
          <a className="hover:text-black" href="#about">
            About
          </a>
          <a className="hover:text-black" href="#team">
            Team
          </a>
        </div>
      </nav>

      <section className="bg-gray-100" id="get-started">
        <p className="font-bold text-lg py-4">Get Started</p>
        <div className="flex items-center justify-center gap-4">
          <Signin />
          <Signup />
        </div>
      </section>
      <section className="bg-gray-200" id="about">
        <p className="font-bold text-lg py-4">About</p>
      </section>
      <section className="bg-gray-300 p-4" id="team">
        <p className="font-bold text-lg py-4">Team</p>
        <div className="flex flex-wrap gap-4 items-center text-gray-400 justify-center">
          <FaUserCircle size={200} />
          <FaUserCircle size={200} />
          <FaUserCircle size={200} />
          <FaUserCircle size={200} />
        </div>
      </section>
    </>
  );
};

export default Landing;
