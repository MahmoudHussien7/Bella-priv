// eslint-disable-next-line no-unused-vars
import React from "react";
import HeroImage from "../assets/Images/404-bg.jpg";

const Hero = () => {
  return (
    <section
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      <div className="text-center">
        <h2 className="text-5xl font-bold text-white">JUST FOR YOUR HOME</h2>
        <p className="text-lg mt-4 text-white">
          BELLA - Bringing you premium comfort.
        </p>
      </div>
    </section>
  );
};

export default Hero;
