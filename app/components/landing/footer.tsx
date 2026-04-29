import { FaEnvelope, FaHome, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-4 sm:px-6 md:px-8 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 md:mb-12">
          <div>
            <div className="text-white flex items-center">
              <FaHome size={25} />
              <span className="text-[25px] font-bold">xterra</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Find your perfect rental home with ease. Axterra connects
              tenants and landlords for seamless rental experiences.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FaEnvelope />
                <span>admin@axterra.ng</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt />
                <span>+234 9876 543 210</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  For Tenants
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  For Landlords
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-5">
          <p className="text-gray-500 text-sm text-center">
            © 2026 Axterra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
