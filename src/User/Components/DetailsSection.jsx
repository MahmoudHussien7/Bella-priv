import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../Redux/Slices/ProductsSlice"; // Update this path if necessary
import { addToCart } from "../../Redux/Slices/CartSlice";
import { toggleFavourite } from "../../Redux/Slices/FavouriteSlice";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function DetailSection() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, loading } = useSelector((state) => state.products);
  const favouriteIds = useSelector((state) => state.favourites.items);
  const { userDetails } = useSelector((state) => state.auth);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === id);
      setProduct(foundProduct);
    }
  }, [products, id]);

  const isFavourite = favouriteIds.includes(id);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      console.log("Product ID added to cart:", id);
    }
  };

  const handleToggleFavourite = () => {
    if (!userDetails) {
      navigate("/login");
    } else {
      dispatch(toggleFavourite(id));
      console.log("Toggled favorite for product ID:", id);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-10 px-[7%] py-5 md:py-[3%] md:px-[7%]">
        <div className="bg-slate-400 col-span-2 sm:col-span-1">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-auto"
          />
        </div>
        <div className="col-span-2 sm:col-span-1 px-3 sticky top-5 left-[50%]">
          <h2 className="text-titleColor text-[1.2rem] md:text-[1.5rem] font-light mb-2 md:mb-5 ">
            {product.title}
          </h2>
          <p className="text-mainColor mb-2 md:mb-5">{product.price}EGP</p>
          <p className="text-textColor text-[0.8rem] mb-2 md:mb-5">
            {product.description || "White Zen wood"}
          </p>
          {/* <p className="text-textColor text-[0.8rem] mb-2 md:mb-5">
            Good wood countertops
          </p>
          <p className="text-textColor text-[0.8rem] mb-2 md:mb-5">
            Natural veneer
          </p>
          <p className="text-textColor text-[0.8rem] mb-2 md:mb-5">
            Eco-friendly paints
          </p> */}
          <p className="text-textColor text-[0.8rem] mb-5 md:mb-[3rem]">
            <span className="font-bold text-[0.8rem]">Size:</span> 65 x 46
          </p>
          <div className="flex gap-2 mb-5 md:mb-[5rem]">
            <button className="text-[14px] md:text-[14px] p-[0.3rem] border border-textColor">
              <span className="px-2">-</span> 1 <span className="px-2">+</span>
            </button>
            <button
              className="text-[12px] md:text-[14px] p-[0.6rem] px-7 border border-mainColor hover:text-[#fff] hover:bg-mainColor"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
            <button
              className="text-[12px] md:text-[14px] p-[0.6rem] px-3 border border-mainColor hover:text-[#fff] hover:bg-mainColor flex items-center justify-center"
              onClick={handleToggleFavourite}
            >
              {isFavourite ? (
                <FaHeart size={22} color="red" />
              ) : (
                <CiHeart size={22} color="black" />
              )}
            </button>
          </div>
          <div>
            <p className="text-titleColor text-[0.8rem]">
              {`Category:`}
              <NavLink to="/Products" className="text-textColor">
                {product.category || "New Arrival"}
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailSection;
