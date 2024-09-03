import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct } from "../../Redux/Slices/ProductSlice";
import DataTable from "../Components/DataTable";
import HeaderWithSubPath from "../Components/HeaderWithSubPath";
import { getAuth } from "firebase/auth";

// Define the table columns
const productColumns = [
  { header: "ID", accessor: "id" },
  { header: "Title", accessor: "title" },
  {
    header: "Price",
    accessor: "price",
    render: (value) =>
      typeof value === "number" ? `$${value.toFixed(2)}` : "N/A",
  },
  { header: "Quantity", accessor: "quantity" },
  {
    header: "Image",
    accessor: "imageUrl",
    render: (value) => <img src={value} alt="Product" className="w-20 h-20" />,
  },
];

const ProductsTable = () => {
  const [isModalOpen, setModalOpen] = useState(false); // Modal control state
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });

  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle new product addition
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (uid) {
      dispatch(addProduct({ ...newProduct, uid })).then(() => {
        setModalOpen(false);
        setNewProduct({ title: "", price: "", quantity: "", imageUrl: "" }); // Reset form
      });
    } else {
      console.error("User is not authenticated");
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <HeaderWithSubPath title="Products" />
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Product
      </button>
      <DataTable columns={productColumns} data={products} />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={newProduct.imageUrl}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, imageUrl: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
