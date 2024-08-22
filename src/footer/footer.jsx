import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1D293F] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Logo and tagline */}
          <div className="mb-8 md:mb-0">
            {/* Placeholder for logo */}
            <div className="w-48 h-12 bg-white mb-2 flex items-center justify-center text-[#1D293F] font-bold">
              DIGITAL HORIZONS
            </div>
            <p className="text-sm">Everything we do in a single place</p>
          </div>

          {/* Navigation links */}
          <div className="flex flex-wrap gap-x-12 gap-y-8">
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 mt-5">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Learn More</h3>
              <ul className="space-y-2 mt-5">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <p>info@digitalhorizons.com</p>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-white hover:text-gray-300">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2024 Digital Horizons. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
