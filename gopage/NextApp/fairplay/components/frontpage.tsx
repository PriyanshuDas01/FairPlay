// "use client"
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Img1 from "@/images/frontlg.jpg";
// import Link from "next/link";

// const FrontPage = () => {
//   const [text, setText] = useState("PLAY WITH HONOUR");
//   const [fade, setFade] = useState(true);

//   useEffect(() => {
//     const texts = [
//       "PLAY WITH HONOUR",
//       "FAIR PLAY ALWAYS WINS",
//       "SAY NO TO DRUGS",
//       "SPORTSMANSHIP MATTERS",
//     ];

//     let index = 0;

//     const interval = setInterval(() => {
//       setFade(false); // Trigger fade-out
//       setTimeout(() => {
//         index = (index + 1) % texts.length; 
//         setText(texts[index]); // Update text
//         setFade(true); // Trigger fade-in
//       }, 500); 
//     }, 3000); 

//     return () => clearInterval(interval); 
//   }, []);

//   return (
//     <div className="relative">
//       {/* Desktop screens */}
//       <div className="hidden md:block w-full h-[80vh] md:h-[90vh] lg:h-[100vh] relative bg-black">
//         <Image
//           src={Img1}
//           alt="Opening Image"
//           className="w-full h-[90vh] object-cover pt-10"
//         />
//         <div className="absolute h-[90vh] inset-0 bg-black bg-opacity-60"></div>
//       </div>

//       {/* Mobile screens */}
//       <div className="block md:hidden w-full h-[75vh] pt-10 bg-black relative">
//         <Image
//           src={Img1}
//           alt="Mobile Opening Image"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-60 "></div>
//       </div>

//       {/* Buttons */}
//       <div className="absolute top-[40vh] md:top-[60vh]">
//         <div className="relative ml-[2vh] md:ml-[24vh]">
//           {/* Back layer */}
//           <div className="absolute inset-0 bg-gray-700 rounded-full translate-y-2"></div>
//         </div>
//       </div>

//       {/* Text with Sliding and Fading Animation */}
//       <div className="absolute top-[35vh] md:top-[40vh] left-1/2 transform -translate-x-1/2 text-white font-bold font-sans text-4xl text-center">
//         <p
//           className={`transition-all duration-500 ${
//             fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
//           }`}
//         >
//           {text}
//         </p>
        
//       </div>
//       <div className="absolute top-[60vh] left-1/2 transform -translate-x-1/2 text-center">
//   <p className="md:hidden text-gray-400 text-sm">Login from PC to play DopeCop!</p>
// </div>


//       <div className="absolute top-[67vh] md:top-[50vh] left-1/2 transform -translate-x-1/2 flex justify-center items-center">
//         <div className="absolute inset-0 bg-green-800 rounded-full translate-y-2"></div>
//         <button className="relative bg-green-400 font-bold px-3 py-2 md:px-7 md:py-3 translate-x-2 rounded-full hover:bg-green-500 transition-transform duration-150 hover:translate-y-1 hover:translate-x-1">
//   <Link href="/game">
//     <p className="hidden md:block">Play DopeCop</p>
//   </Link>
// </button>
      
//       </div>
      
//     </div>
//   );
// };

// export default FrontPage;

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Img1 from "@/images/frontlg.jpg";

const FrontPage = () => {
  const texts = [
    "PLAY WITH HONOUR",
    "FAIR PLAY ALWAYS WINS",
    "SAY NO TO DRUGS",
    "SPORTSMANSHIP MATTERS",
  ];

  const [text, setText] = useState(texts[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setFade(false); // Trigger fade-out
      setTimeout(() => {
        index = (index + 1) % texts.length;
        setText(texts[index]); // Update text
        setFade(true); // Trigger fade-in
      }, 500);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <div className="relative">
      {/* Background Images */}
      <div className="hidden md:block w-full h-[80vh] md:h-[90vh] lg:h-[100vh] relative bg-black">
        <Image
          src={Img1}
          alt="Opening Image"
          className="w-full h-[90vh] object-cover pt-10"
        />
        <div className="absolute h-[90vh] inset-0 bg-black bg-opacity-60"></div>
      </div>
      <div className="block md:hidden w-full h-[75vh] pt-10 bg-black relative">
        <Image
          src={Img1}
          alt="Mobile Opening Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Text with Sliding and Fading Animation */}
      <div className="absolute top-[35vh] md:top-[40vh] left-1/2 transform -translate-x-1/2 text-white font-bold font-sans text-4xl text-center">
        <p
          className={`transition-all duration-500 ${
            fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          {text}
        </p>
      </div>

      {/* Buttons */}
      <div className="absolute top-[67vh] md:top-[50vh] left-1/2 transform -translate-x-1/2 flex justify-center items-center">
        <div className="absolute inset-0 bg-green-800 rounded-full translate-y-2"></div>
        <button className="relative bg-green-400 font-bold px-3 py-2 md:px-7 md:py-3 translate-x-2 rounded-full hover:bg-green-500 transition-transform duration-150 hover:translate-y-1 hover:translate-x-1">
          <Link href="/game">
            <p className="hidden md:block">Play DopeCop</p>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default FrontPage;

