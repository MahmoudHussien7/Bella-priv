import React, { useMemo } from "react";
import HeroImage from "../../assets/Images/404-bg.jpg";

const Hero = () => {
  // Memoize the style object to prevent unnecessary recalculations
  const heroStyle = useMemo(
    () => ({
      backgroundImage: `url(${HeroImage})`,
    }),
    []
  );

  return (
    <section
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={heroStyle} // Use the memoized style object
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
