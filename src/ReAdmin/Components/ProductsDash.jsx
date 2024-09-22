import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteProducts,
    fetchProducts,
} from "../../Redux/Slices/ProductsSlice";
import AddProductModal from "../Modals/AddProductModal";
import DeleteProductModal from "../Modals/DeleteProductModal";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { renderPagination } from "../../User/Pages/RenderPagination";

const DataTable = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5; // Adjust the number of products per page as needed
    const [searchTerm, setSearchTerm] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState(null);

    const { items } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const openUpdateModal = (product) => {
        setProductToUpdate(product);
        setModalOpen(true);
    };

    // Open delete modal
    const openDeleteModal = (product) => {
        setProductToDelete(product);
        setDeleteModalOpen(true);
        setIsDisabled(false);
    };

    // Close delete modal
    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    // Handle product deletion
    const handleDeleteProduct = async () => {
        setIsDisabled(true); // Disable the button while deleting
        try {
            await dispatch(deleteProducts(productToDelete.id));
            toast.success("Product deleted successfully!", {
                position: "bottom-right",
            });
            closeDeleteModal();
        } catch (error) {
            toast.error("Error deleting product, please try again.", {
                position: "bottom-right",
            });
        } finally {
            setIsDisabled(false);
        }
    };

    // Handle search
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        setCurrentPage(1); // Reset to page 1 on new search
    };

    // Filter products
    const filteredProducts = items.filter((item) => {
        return (
            item.title.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const handlePageChange = (page) => {
        if (page === currentPage || page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="flex justify-between my-5">
                <h1 className="text-2xl font-bold text-titleColor">
                    <div className="breadcrumbs text-sm">
                        <ul>
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <span>Products</span>
                            </li>
                        </ul>
                    </div>
                </h1>
                <input
                    type="text"
                    className="w-[50%] input input-bordered focus:border-0 h-[2.5rem]"
                    placeholder="Search"
                    onChange={handleSearch}
                />
                <button
                    onClick={() => setModalOpen(true)}
                    className="bg-mainColor text-white lg:p-2 lg:px-7 rounded p-2 "
                >
                    <span className="text-[0.8rem]">Add Product</span>
                </button>
            </div>
            <div className="container mx-auto p-4 mt-3 bg-white rounded-lg shadow-md">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th>Index</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((item, index) => (
                                <tr key={item.id} className="text-center">
                                    <td>
                                        {index +
                                            1 +
                                            (currentPage - 1) * productsPerPage}
                                    </td>
                                    <td>
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="min-w-24 min-h-24 max-h-32 max-w-32 object-cover"
                                        />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.category}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <button
                                            className="btn btn-ghost btn-xs"
                                            onClick={() =>
                                                openUpdateModal(item)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-ghost btn-xs text-red-600"
                                            onClick={() =>
                                                openDeleteModal(item)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {renderPagination(currentPage, totalPages, handlePageChange)}
            </div>

            {/* Add & Update Product Modal */}
            {isModalOpen && (
                <AddProductModal
                    closeModal={() => {
                        setModalOpen(false);
                        setProductToUpdate(null);
                    }}
                    productToUpdate={productToUpdate}
                />
            )}

            {/* Delete Product Modal */}
            {isDeleteModalOpen && (
                <DeleteProductModal
                    productToDelete={productToDelete}
                    closeModal={closeDeleteModal}
                    handleDelete={handleDeleteProduct}
                    isDisabled={isDisabled}
                />
            )}
        </div>
    );
};

export default DataTable;
