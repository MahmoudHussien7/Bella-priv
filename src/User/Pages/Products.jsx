import Navbar from "../Components/Navbar";
import Pagination from "../Components/Pagination";
import CollectionCard from "../Components/CollectionCard";
// import useProducts from "../../hooks/useProducts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { setProducts } from "../../Redux/Slices/ProductSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/Firebaseconfig";

const Products = () => {
  const postsPerPage = 9;
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.products); // Access products from Redux
  const [loading, setLoading] = useState(true); // Local loading state
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products from Firestore and dispatch to Redux
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setProducts(fetchedProducts)); // Dispatch products to Redux
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-stone-50 min-h-screen">
      <Navbar />

      <div className="mt-16 bg-[#f4f3ef] px-[7%]">
        <div className="bg-product flex justify-center items-center h-72">
          <h2 className="text-5xl md:text-5xl text-gray-700 p-5 font-bold">
            Collection
          </h2>
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-16">Loading...</p>
      ) : (
        <div className="mt-16 flex flex-col lg:flex-row">
          {/* Products Container */}
          <div className="flex flex-wrap justify-center gap-16 sm:1/2 md:gap-8 w-full">
            {currentPosts.map((product) => (
              <CollectionCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        </div>
      )}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={products.length} // Make sure to use `products` instead of `posts`
        paginate={paginate}
        currentPage={currentPage}
        className="mt-16"
      />
    </div>
  );
};

export default Products;
