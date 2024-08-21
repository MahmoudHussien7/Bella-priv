import React from "react";
import HeroImage from "../assets/Images/Hero.jpg"; // Ensure correct path to the image

const Test = () => {
  return (
    <section
      className="h-screen bg-cover bg-center relative mt-52"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-white text-2xl tracking-wider mb-3 border-2 inline-block px-4 py-1">
          LUXURY YOU DESERVE
        </h1>
        <h2 className="text-white text-6xl font-bold uppercase">
          Shop The Look!
        </h2>
        <p className="text-white mt-4 max-w-lg">
          Your place to get one-of-a-kind furniture pieces along with our home
          styling and consultancy services.
        </p>
      </div>
    </section>
  );
};

export default Test;
