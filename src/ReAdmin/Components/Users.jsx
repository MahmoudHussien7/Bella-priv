/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../Redux/Slices/AuthSlice";
import Pagination from "../../User/Components/Pagination";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { toast } from "react-toastify";
import { renderPagination } from "../../User/Pages/RenderPagination";

const Users = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.auth);
    const [isDeleteModal, setDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Start from page 1
    const usersPerPage = 10;
    const [searchTerm, setSearchTerm] = useState("");
    const [isDisabled, setIsDisabled] = useState(false); // Disable state

    // Fetch users on component mount
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // Handle search input
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        setCurrentPage(1); // Reset to page 1 on new search
    };

    // Filter users based on search term
    const filteredUsers = users.filter((user) =>
        user.userName.toLowerCase().includes(searchTerm)
    );

    // Pagination calculations
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePageChange = (page) => {
        if (page === currentPage || page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // Open delete modal
    const openDeleteModal = (user) => {
        setUserToDelete(user);
        setDeleteModal(true);
    };

    // Close delete modal
    const closeDeleteModal = () => {
        setDeleteModal(false);
        setIsDisabled(false); // Reset disabled state
    };

    // Handle user deletion
    const handleDelete = async () => {
        if (userToDelete) {
            setIsDisabled(true); // Disable buttons during delete operation
            try {
                await dispatch(deleteUser(userToDelete.id)).unwrap(); // Ensure async handling
                toast.success("User deleted successfully!", {
                    position: "bottom-right",
                });
                closeDeleteModal();
            } catch (err) {
                toast.error("Error deleting user, please try again.", {
                    position: "bottom-right",
                });
                setIsDisabled(false); // Enable buttons if delete fails
            }
        }
    };

    // Handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading)
        return (
            <div className="flex items-center justify-center object-centerw-full mt-[25%]">
                <div className="">
                    <span className="loading loading-infinity loading-lg text-mainColor"></span>
                </div>
            </div>
        );
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="flex my-5">
                <h1 className="text-2xl font-bold text-titleColor">
                    {" "}
                    <div className="breadcrumbs text-sm text-titleColor">
                        <ul>
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <a>Users</a>
                            </li>
                        </ul>
                    </div>
                </h1>
                <input
                    type="text"
                    className="w-[50%] input input-bordered focus:border-0 h-[2.5rem] m-auto"
                    placeholder="Search"
                    onChange={handleSearch}
                    value={searchTerm}
                />
            </div>

            <div className="container mx-auto p-4 mt-3 bg-white rounded-lg shadow-md">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th>Index</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                currentUsers.map((user, index) => (
                                    <tr key={user.id} className="text-center">
                                        <td>
                                            {index +
                                                1 +
                                                (currentPage - 1) *
                                                    usersPerPage}
                                        </td>
                                        <td>{user.userName}</td>
                                        <td>{user.userEmail}</td>
                                        <td>{user.role}</td>
                                        <td className="flex justify-center gap-2">
                                            <button
                                                className="btn btn-ghost btn-xs text-red-700"
                                                onClick={() =>
                                                    openDeleteModal(user)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* <Pagination
          postsPerPage={usersPerPage}
          totalPosts={filteredUsers.length} // Use filteredUsers for pagination
          paginate={paginate}
          currentPage={currentPage}
        /> */}
                {renderPagination(currentPage, totalPages, handlePageChange)}
            </div>

            {/* Delete User Modal */}
            {isDeleteModal && (
                <div className="fixed w-full z-[99999] inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-box bg-white p-5 rounded-lg sm:w-[50rem]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Delete User</h2>
                            <button
                                className="btn btn-circle btn-ghost hover:bg-mainColor hover:text-white"
                                onClick={closeDeleteModal}
                            >
                                <IoCloseOutline size={18} />
                            </button>
                        </div>
                        <p className="py-4">
                            Are you sure you want to delete{" "}
                            {userToDelete?.userName}?
                        </p>
                        <div className="modal-action">
                            <button
                                className="btn bg-white text-red-800 hover:bg-white hover:border-mainColor"
                                onClick={handleDelete}
                                disabled={isDisabled} // Disable delete button during process
                            >
                                Delete
                            </button>
                            <button
                                className="btn bg-mainColor text-white hover:bg-mainColor"
                                onClick={closeDeleteModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
