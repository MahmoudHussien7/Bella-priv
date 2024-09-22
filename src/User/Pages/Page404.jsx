// eslint-disable-next-line no-unused-vars
import React from "react";
import img404 from "../../assets/Images/404-bg.jpg";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

function Page404() {
  return (
    <div>
      <section
        className="h-screen flex  flex-col items-strat justify-center bg-cover bg-center "
        style={{ backgroundImage: `url(${img404})` }}
      >
        <div className="text-center flex flex-col justify-evenly">
          <h2
            className="text-[15rem] md:text-[15rem]  lg:text-[16rem] font-sans "
            style={{ color: "rgba(255, 255, 255, 0.8)" }}
          >
            404
          </h2>
          <h3
            className="text-[1.3rem] md:text-[2rem] lg:test-[7rem] font-bold "
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              letterSpacing: "0.6rem",
            }}
          >
            P A G E N O T F O U N D
          </h3>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            className="text-[14px] md:text-[15px]  lg:text-[16px] p-3 sm:w-[28%] md:w-[22%]   lg:w-[20%] xl:w-[13%]
           border border-white text-white"
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              letterSpacing: "0.1rem",
            }}
          >
            <Link to="/">GO TO HOME</Link>
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Page404;
