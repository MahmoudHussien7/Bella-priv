import { useSelector, useDispatch } from "react-redux";
import { toggleFavourite } from "../../Redux/Slices/FavouriteSlice";
import { addToCart } from "../../Redux/Slices/CartSlice";
import FavouriteCard from "../Components/FavouriteCard"; // Import the reusable FavouriteCard component

function ProfileFavourites() {
  const dispatch = useDispatch();

  // Get favorite product IDs and all products from the Redux store
  const favouriteIds = useSelector((state) => state.favourites.items);
  const allProducts = useSelector((state) => state.products.items);

  // Filter the products to show only the user's favorite products
  const favouriteProducts = allProducts.filter((product) =>
    favouriteIds.includes(product.id)
  );

  // Handle adding to cart
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  // Handle removing from favorites
  const handleToggleFavourite = (id) => {
    dispatch(toggleFavourite(id));
  };

  return (
    <div className="p-5">
      <h2 className="text-titleColor text-[1.2rem] font-semibold">
        Your Favourites
      </h2>

      {favouriteProducts.length === 0 ? (
        <p>Your favourites list is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favouriteProducts.map((item) => (
            <FavouriteCard
              key={item.id}
              item={item}
              handleAddToCart={handleAddToCart}
              handleToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileFavourites;
