import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Components/Card";
import { fetchProducts } from "../../Redux/Slices/ProductsSlice"; // Update this path if necessary

const RelatedProducts = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Use slice to limit to 4 products
  const relatedProducts = products.slice(0, 4);

  if (loading) {
    return (
      <div className="flex items-center justify-center object-centerw-full mt-[25%]">
        <div className="">
          <span className="loading loading-infinity loading-lg text-mainColor"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-col lg:flex-row gap-6 ">
      {relatedProducts.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          imageUrl={product.imageUrl}
          stockquantity={product.quantity}
          link=""
        />
      ))}
    </div>
  );
};

export default RelatedProducts;
