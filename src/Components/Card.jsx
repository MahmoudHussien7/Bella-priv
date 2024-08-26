import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Card({ className, title, price, imageUrl }) {
  return (
    <div
      className={`w-full sm:w-[45%] md:w-[40%] lg:w-[80%] grid grid-rows-3 hover:cursor-pointer group relative m-2 ${className}`}
    >
      <Link to="/Products" className="row-span-3 mb-2">
        <img
          src={imageUrl} // Use the imageUrl prop
          alt={`Product Image - ${title}`}
          className="w-full h-full min-h-56 max-h-60 mt"
        />
        <div
          className="bg-titleColor text-[#fff] grid grid-cols-4 text-center row-span-1 w-[100%] 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="col-span-3 p-3 flex justify-center items-center hover:bg-hovermain hover:text-[white] transition-all duration-200">
            <span className="text-[0.9rem]">ADD TO CART</span>{" "}
            {/* Changed from Link to span */}
          </div>
          <div
            className="col-span-1 cursor-pointer border-[#4D4D4D] border transition-all duration-200 hover:text-[white] hover:border-hovermain  hover:bg-hovermain  flex justify-center items-center"
            aria-label="Add to Wishlist"
          >
            <CiHeart size={24} />
          </div>
        </div>
      </Link>

      <div className="row-span-1">
        <h2 className="text-titleColor text-[1rem] md:text-[1.1rem] lg:text-[1.3rem] font-light mt-1 hover:text-hovermain transition-all duration-200">
          {title} {/* Use the title prop */}
        </h2>
        <p className="text-hovermain mt-1 text-[0.8rem] lg:text-[1rem]">
          {price} EGP {/* Use the price prop */}
        </p>
      </div>
    </div>
  );
}

export default Card;
