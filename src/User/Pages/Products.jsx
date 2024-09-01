import Navbar from "../Components/Navbar";
import Pagination from "../Components/Pagination";
import Card from "../Components/Card";
import useProducts from "../../hooks/useProducts";

const Products = () => {
  const postsPerPage = 9;
  const { posts, loading, currentPosts, paginate, currentPage } =
    useProducts(postsPerPage);
  // console.log(currentPosts);
  {
    currentPosts.map((product) => {
      console.log(product);
    });

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
            <div className="">
              <div className="flex flex-wrap justify-center gap-16 sm:1/2 md:4/5 md:gap-8  w-full">
                {currentPosts.map((product) => (
                  <Card
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    imageUrl={product.imageUrl}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
          className="mt-16"
        />
      </div>
    );
  }
};
export default Products;
