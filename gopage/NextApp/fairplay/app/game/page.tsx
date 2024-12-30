'use client';

import Image from 'next/image';
import GameImage from '@/images/game.jpg'; 
import Navbar from '@/components/nav';
export default function DopeCop() {
  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-gray-900 text-gray-300 flex items-center justify-center">
      <div className="container mx-auto px-4 ">
        {/* Background Card */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* Left Image Section */}
          <div className="md:w-1/2 relative">
            <Image
              src={GameImage}
              alt="DopeCop Game"
              className="object-cover h-full"
              
              priority
            />
          </div>

          {/* Right Content Section */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-green-500 px-3 py-1 text-sm font-medium text-gray-900">
                A Story-Based Game (Beta)
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                DopeCop
              </h1>
              <p className="text-lg text-gray-400">
                Step into the shoes of an undercover agent and unravel the dark world of doping. 
                Embark on a mission to educate, inspire, and create awareness about anti-doping through an engaging story-driven 3D game.
              </p>
              <p className="text-gray-400">
                Join the fight against illegal practices in sports, ensure fairness, and make a difference in the athletic world!
              </p>
            </div>

            {/* Call to Action */}
            <div className="mt-6 flex justify-center items-center">
            <a
                href="https://dope-cop-host.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Play Now
              </a>
              
              <a
                href="https://github.com/PriyanshuDas01/DopeCop-Host"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 bg-gray-700 text-gray-300 font-semibold px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
