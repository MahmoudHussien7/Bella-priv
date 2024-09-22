import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Slices/CartSlice";
import { toggleFavourite } from "../../Redux/Slices/FavouriteSlice";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Card({ id, title, imageUrl, price, uid, stockquantity }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the current favorite state (now an array of product IDs)
    const favouriteIds = useSelector((state) => state.favourites.items);
    const isFavourite = favouriteIds.includes(id);

    // Get the cart items from the state to check if the item is already in the cart
    const cartItems = useSelector((state) => state.cart.items);
    const isAlreadyInCart = cartItems.some((item) => item.id === id);

    // Get user details from state
    const { userDetails } = useSelector((state) => state.auth);

    const handleAddToCart = () => {
        if (stockquantity > 0) {
            const product = { id, title, imageUrl, price, stockquantity };
            dispatch(addToCart(product));
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

    return (
        <div className="w-full md:w-[47%] lg:w-[47%] xl:w-[27%] hover:cursor-pointer group relative">
            <Link to={`/products/${id}`} className="row-span-3">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full min-h-[15rem] lg:min-h-[20rem] max-h-[20rem] object-cover"
                />
            </Link>

            <div className="bg-titleColor text-white grid grid-cols-4 text-center w-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div
                    onClick={handleAddToCart}
                    className={`col-span-3 p-3 flex justify-center items-center hover:bg-mainColor hover:text-white transition-all duration-200 ${
                        stockquantity === 0
                            ? "bg-gray-500 hover:bg-slate-600 cursor-not-allowed"
                            : ""
                    }`}
                >
                    {stockquantity === 0 ? (
                        <span className="text-[0.9rem]">OUT OF STOCK</span>
                    ) : isAlreadyInCart ? (
                        <button className="text-[0.9rem]">Added TO CART</button>
                    ) : (
                        <button className="text-[0.9rem]">ADD TO CART</button>
                    )}
                </div>
                <div
                    className="col-span-1 cursor-pointer border-gray-500 border transition-all duration-200 hover:text-white hover:border-mainColor hover:bg-mainColor flex justify-center items-center"
                    onClick={handleToggleFavourite}
                >
                    {isFavourite && userDetails ? (
                        <FaHeart size={19} color="red" />
                    ) : (
                        <CiHeart size={24} color="white" />
                    )}
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
