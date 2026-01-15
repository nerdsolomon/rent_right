import {
  FaSearch,
  FaComments,
  FaFileAlt,
  FaUpload,
  FaUsers,
  FaHome,
} from "react-icons/fa";
import Signup from "./signup";

export default function HowItWorks() {
  const steps = [
    {
      icon: FaSearch,
      title: "Search Properties",
      description:
        "Browse thousands of verified listings with advanced filters to find your perfect home.",
    },
    {
      icon: FaComments,
      title: "Contact Landlord",
      description:
        "Message landlords directly through our secure platform and schedule viewings.",
    },
    {
      icon: FaFileAlt,
      title: "Apply Online",
      description:
        "Submit your rental application with all required documents in just a few clicks.",
    },
    {
      icon: FaUpload,
      title: "List Property",
      description:
        "Create and publish your property listing in minutes with ease.",
    },
    {
      icon: FaUsers,
      title: "Receive Applications",
      description: "Get applications from interested and verified tenants.",
    },
    {
      icon: FaHome,
      title: "Rent Out",
      description:
        "Finalize agreements and rent out your property confidently.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4" id="get-started">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-purple-600 font-semibold text-xs tracking-widest uppercase mb-3">
          How It Works
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center text-black">
          Simple Steps to{" "}
          <span className="bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
            Get Started
          </span>
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Whether you're looking for a place to rent or want to list your
          property, RentRight makes it easy.
        </p>

        <div className="inline-flex bg-purple-50 rounded-full p-1 mb-16">
          <Signup />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[60%] w-full h-px bg-purple-200" />
              )}

              <div className="relative mx-auto mb-5 w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-700 to-pink-600 text-white flex items-center justify-center">
                <step.icon size={24} />

                <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>

              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
