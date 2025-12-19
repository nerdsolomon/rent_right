import { FaUserCircle } from "react-icons/fa";
import Signin from "~/components/landing/signin";
import Signup from "~/components/landing/signup";
import { usePageTitle } from "~/hooks/usePageTitle";
import {useData} from "~/hooks/useData";
import { Team } from "~/components/landing/team";

const Landing = () => {
  usePageTitle("RentRight");
  const { users } = useData();

  return (
    <>
      <nav className="border-b border-gray-300 p-4 sticky top-0 z-50 flex justify-between bg-white text-blue-500 font-bold">
        <div className="text-xl">RentRight</div>
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
        <p className="text-center font-semibold text-blue-400">Members : { users.length }</p>
      </section>
      <section id="team">
        <p className="font-bold text-lg py-4">Team</p>
        <div className="flex flex-wrap gap-4 items-center text-green-100 justify-center">
          <Team/>
        </div>
      </section>
      <footer className="h-50"></footer>
    </>
  );
};

export default Landing;
