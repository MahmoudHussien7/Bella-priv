// src/components/Card.jsx
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Slices/CartSlice";

function Card({ id, title, price, imageUrl }) {
  const value = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const product = { id, title, price, imageUrl };
    dispatch(addToCart(product));
  };

  return (
    <div
      className={`w-full md:w-[47%] lg:w-[47%] xl:w-[27%] hover:cursor-pointer group relative`}
    >
      <Link to={`/Products/${id}`} className="row-span-3">
        <img
          src={imageUrl}
          alt={title}
          className="w-full min-h-[15rem] lg:min-h-[20rem] max-h-[20rem] object-cover"
        />
      </Link>

      <div className="bg-titleColor text-white grid grid-cols-4 text-center w-full opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="col-span-3 p-3 flex justify-center items-center hover:bg-mainColor hover:text-white transition-all duration-200">
          <div className="text-[0.9rem]" onClick={handleAddToCart}>
            ADD TO CART
          </div>
        </div>
        <div
          className="col-span-1 cursor-pointer border-gray-500 border transition-all duration-200 hover:text-white hover:border-mainColor hover:bg-mainColor flex justify-center items-center"
          aria-label="Add to Wishlist"
        >
          <CiHeart size={24} />
        </div>
      </div>

      <div>
        <h2 className="text-titleColor text-[1rem] md:text-[1.1rem] lg:text-[1.3rem] font-normal mt-1 hover:text-mainColor transition-all duration-200">
          {title}
        </h2>
        <p className="text-mainColor mt-1 lg:text-[1.2rem]">
          {price} <span className="text-[0.8rem]">EGP</span>
        </p>
      </div>
    </div>
  );
}

export default Card;
