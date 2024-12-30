'use client';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-gray-300 py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Fairplay. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Created by DasPriyanshu01
        </p>
      </div>
    </footer>
  );
};

export default Footer;
