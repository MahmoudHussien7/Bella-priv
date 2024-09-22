import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, selectOrder } from "../../Redux/Slices/OrdersSlice";
import { fetchProducts } from "../../Redux/Slices/ProductsSlice";
import DetilesModal from "../../ReAdmin/Modals/DetilesModal";


const UserOrders = () => {
    const dispatch = useDispatch();
    const { orders, selectedOrder, status, error } = useSelector(
        (state) => state.orders
    );
    const { items: products } = useSelector((state) => state.products); // Get products from state
    const [currentOrder, setCurrentOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderDetailsUser, setOrderDetailsUser] = useState([]);

    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchProducts()); // Fetch products when the component mounts
    }, [dispatch]);

    const handleOrderClick = (orderId) => {
        dispatch(selectOrder(orderId));
        setCurrentOrder(orderId);
        const selectedOrder = orders.find((order) => order.orderId === orderId);
        if (selectedOrder) {
            const details = selectedOrder.orderDetails.map((item) => {
                const productDetails = getProductDetails(item.productId);
                return {
                    ...item,
                    title: productDetails.title || `Product ${item.productId}`,
                    imageUrl: productDetails.imageUrl || "https://via.placeholder.com/64",
                    price: productDetails.price || item.price,
                };
            });
            setOrderDetailsUser(details);
            setIsModalOpen(true);
        }
    };

    // Helper function to get product details by productId
    const getProductDetails = (productId) => {
        return products.find((product) => product.id === productId) || {};
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between my-5">
                <h1 className="text-2xl font-bold text-titleColor">Orders</h1>
            </div>

            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && <p>Error: {error}</p>}

            <div className="container mx-auto p-4 mt-3 bg-white rounded-lg shadow-md">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th>Index</th>
                                <th>Order Date</th>
                                <th>Payment Method</th>
                                <th>Order Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <tr key={order.orderId} className="text-center">
                                        <td>{index + 1}</td>
                                        <td>
                                            {new Date(order.orderDate.toDate()).toLocaleDateString()}
                                        </td>
                                        <td>{order.paymentMethod}</td>
                                        <td>
                                            <button
                                                className="btn btn-ghost btn-xs text-red-600"
                                                onClick={() => handleOrderClick(order.orderId)}
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Show modal only when isModalOpen is true */}
                {isModalOpen && (
                    <DetilesModal
                        closeModal={closeModal}
                        orderDetailsUser={orderDetailsUser}
                        quantity={orderDetailsUser.reduce((total, item) => total + item.quantity, 0)}
                    />
                )}
            </div>
        </div>
    );
};

export default UserOrders;
