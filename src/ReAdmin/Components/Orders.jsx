import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllOrders,
    updateOrderStatus,
} from "../../Redux/Slices/adminOrdersSlice";
import Pagination from "../../User/Components/Pagination";
import { IoCloseOutline } from "react-icons/io5";
import { renderPagination } from "../../User/Pages/RenderPagination";

const AdminOrders = () => {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector((state) => state.adminOrders);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    // Modal state
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const handleStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatus({ orderId, newStatus }));
    };

    // Get the current orders based on pagination
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    // Handle page change
    const handlePageChange = (page) => {
        if (page === currentPage || page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // Handle page change
    // const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Open modal
    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">All Users Orders</h2>
            {status === "loading" && (
                <div className="flex items-center justify-center w-full mt-[25%]">
                    <div>
                        <span className="loading loading-infinity loading-lg text-mainColor"></span>
                    </div>
                </div>
            )}
            {status === "failed" && <p>{error}</p>}
            {status === "succeeded" && (
                <div className="container mx-auto p-4 mt-3 bg-white rounded-lg shadow-md">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="text-center">
                                    <th>Index</th>
                                    <th>Order ID</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((order, index) => {
                                    // Calculate the global index
                                    const globalIndex =
                                        (currentPage - 1) * ordersPerPage +
                                        index +
                                        1;

                                    return (
                                        <tr key={order.id}>
                                            {/* Index column */}
                                            <td className="text-center">
                                                {globalIndex}
                                            </td>

                                            {/* Order ID column */}
                                            <td className="text-center">
                                                {order.id}
                                            </td>

                                            {/* User column */}
                                            <td className="text-center">
                                                {order.userName}
                                            </td>

                                            {/* Date column */}
                                            <td className="text-center">
                                                {new Date(
                                                    order.orderDate.toDate()
                                                ).toLocaleDateString()}
                                            </td>

                                            {/* Total Price column */}
                                            <td className="text-center">
                                                USD{" "}
                                                {order.orderDetails
                                                    .reduce(
                                                        (total, item) =>
                                                            total +
                                                            item.quantity *
                                                                item.price,
                                                        0
                                                    )
                                                    .toFixed(2)}
                                            </td>

                                            {/* Status column */}
                                            <td className="text-center">
                                                <select
                                                    value={order.orderStatusId}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            order.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="border rounded-lg p-2 cursor-pointer text-base"
                                                >
                                                    <option value="w3oNSy1Y2MrIX1coDIP0">
                                                        Completed
                                                    </option>
                                                    <option value="TUgeq6U27JsTojE1XukC">
                                                        In Progress
                                                    </option>
                                                    <option value="If1uJ5Dbm66w2V0b4CuU">
                                                        Cancelled
                                                    </option>
                                                </select>
                                            </td>

                                            {/* Details column */}
                                            <td className="text-center">
                                                <button
                                                    onClick={() =>
                                                        openModal(order)
                                                    }
                                                    className="text-mainColor hover:text-amber-800 cursor-pointer"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    {/* <Pagination
            postsPerPage={ordersPerPage}
            totalPosts={orders.length}
            paginate={paginate}
            currentPage={currentPage}
          /> */}
                    {renderPagination(
                        currentPage,
                        totalPages,
                        handlePageChange
                    )}
                </div>
            )}

            {/* Order Details Modal */}
            {isModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="modal-box bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-600  cursor-pointer btn btn-circle btn-ghost hover:bg-mainColor hover:text-white"
                        >
                            <IoCloseOutline size={24} />
                        </button>
                        <h2 className="text-xl font-bold mb-4">
                            Order Details
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="table w-full text-lg">
                                <thead>
                                    <tr>
                                        <th className="text-center">Image</th>
                                        <th className="text-center">Name</th>
                                        <th className="text-center">Price</th>
                                        <th className="text-center">
                                            Quantity
                                        </th>
                                        <th className="text-center">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.orderDetails.map(
                                        (item, idx) => (
                                            <tr
                                                key={idx}
                                                className="text-center"
                                            >
                                                <td>
                                                    <img
                                                        src={
                                                            item.imageUrl ||
                                                            "https://via.placeholder.com/64"
                                                        }
                                                        alt={item.title}
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />
                                                </td>
                                                <td>{item.title}</td>
                                                <td>
                                                    USD {item.price.toFixed(2)}
                                                </td>
                                                <td>{item.quantity}</td>
                                                <td>
                                                    USD{" "}
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
