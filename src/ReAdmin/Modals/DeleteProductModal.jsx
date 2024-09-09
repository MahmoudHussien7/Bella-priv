/* eslint-disable react/prop-types */
const DeleteProductModal = ({ productToDelete, closeModal, handleDelete }) => {
  return (
    <dialog
      open
      className="modal modal-bottom sm:modal-middle h-[100%] w-[100%]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-box shadow">
        <h3 className="font-bold text-lg">Delete Product</h3>
        <p className="py-4">
          Are you sure you want to delete {productToDelete?.title}?
        </p>
        <div className="modal-action">
          <button
            className="btn bg-white text-mainColor"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button className="btn bg-mainColor text-white" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteProductModal;
