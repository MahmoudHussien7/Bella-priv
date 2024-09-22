// eslint-disable-next-line no-unused-vars
import React from "react";
import Details from "../Components/DetailsSection";
import Navbar from "../Components/Navbar";
import Link from "../Components/Links";
import RelatedProducts from "../Components/RelatedProducts";
import Footer from "../Components/Footer";

function ProductDetails() {
  return (
    <div>
      <Link />
      <Navbar />
      <Details />
      <div className="px-[7%] py-5 md:py-[3%] md:px-[7%]">
        <h2 className="text-titleColor text-[1.3rem] md:text-[1.6rem] mb-2 md:mb-5 font-semibold">
          Related Products
        </h2>
        <RelatedProducts />
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetails;
