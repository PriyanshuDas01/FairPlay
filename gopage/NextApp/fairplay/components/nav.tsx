"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Img1 from "@/images/logo.png"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black  md:opacity-80 sticky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
          <a href="/" className="flex items-center text-white text-xl font-bold">
  <Image
    src={Img1} 
    alt="FairPlay Logo"
    width={50} // Adjust the width as needed
    height={50} // Adjust the height as needed
    className="mr-2"
  />
  FairPlay
</a>

            {/* Desktop Menu */}
            <div className="hidden md:flex">
              <div className="ml-[35vh] flex items-baseline  space-x-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-full text-sm lg:text-base font-medium"
                >
                  Home
                </Link>

                <Link
                  href="/navigation\tasks"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-full text-sm lg:text-base font-medium"
                >
                  Daily Tasks
                </Link>
              
               
                <Link
                  href="/contact"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-full text-sm lg:text-base font-medium"
                >
                  Contact
                </Link>

                <Link
              href="/free-trial"
              className="text-white font-semibold bg-blue-400 shadow-blue-600 shadow-md hover:bg-blue-500 hover:text-gray-200 px-4 py-1 mt-4 block text-center rounded-full"
            >
              Log In
            </Link>

              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pb-2 sm:px-3 bg-black">
            <Link
              href="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>


            <Link
                  href="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-full text-sm lg:text-base font-medium"
                >
                  Daily Tasks
                </Link>


            <Link
              href="/contact"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >

              Contact
            </Link>

            {/* Free Trial Button */}
            <Link
              href="/free-trial"
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 mt-4 block text-center rounded-md"
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
