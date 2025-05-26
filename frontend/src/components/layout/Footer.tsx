import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

import Logo from "../../../asset/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#ffffff] text-wheat-100 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <img className="w-[130px]" src={Logo} alt="main logo" />
            </div>
            <p className="text-sm text-[#021729] leading-relaxed mb-4">
              Crafting delicious artisan bread with time-honored techniques
              since 1995. From our ovens to your table.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-[#021729] hover:text-wheat-100 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                className="text-[#021729] hover:text-wheat-100 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                className="text-[#021729] hover:text-wheat-100 transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-[#021729] font-display text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#021729] transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="text-[#021729]  transition text-sm">
                  Order Here
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-[#021729] font-display text-lg mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#021729] transition text-sm">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-[#021729] transition text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#021729] transition text-sm">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-[#021729] font-display text-lg mb-4">
              Visit Us
            </h3>
            <address className="text-[#021729] text-sm not-italic mb-4 leading-relaxed">
              Location: Israel Yellow House, Accra
              <br />
              Phone: 0554099405 Or 0249607271
            </address>
            <h4 className="text-[#021729] font-display text-base mb-2">
              Hours
            </h4>
            <p className="text-[#021729] text-sm">Mon-Fri: 7am - 7pm</p>
            <p className="text-[#021729] text-sm">Sat-Sun: 8am - 5pm</p>
          </div>
        </div>

        <div className="border-t border-[#021729] mt-8 pt-6">
          <p className="text-[#021729] text-sm text-center">
            &copy; {new Date().getFullYear()} Glo-Zel Bakery. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;