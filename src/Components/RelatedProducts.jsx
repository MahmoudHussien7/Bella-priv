// eslint-disable-next-line no-unused-vars
import React from "react";
import Card from "../Components/Card";

const relatedProducts = [
  {
    id: 1,
    name: "Rozana Nightstand",
    price: "7,900",
    image: "../assets/Images/about2.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: "6,000",
    image: "../assets/Images/about2.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: "8,500",
    image: "../assets/Images/about2.jpg",
  },
  {
    id: 4,
    name: "Product 4",
    price: "5,200",
    image: "../assets/Images/about2.jpg",
  },
];

function RelatedProducts() {
  return (
    // <div className="px-[7%] py-5 md:py-[3%] md:px-[7%]">
    //   <h2 className="text-titleColor text-[1.3rem] md:text-[1.6rem] mb-2 md:mb-5 font-semibold">
    //     Related Products
    //   </h2>
    <div className="flex md:flex-col lg:flex-row flex-col gap-2 w-full animate-fadeIn">
      {relatedProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
    // </div>
  );
}

export default RelatedProducts;
