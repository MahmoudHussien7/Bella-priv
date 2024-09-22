import { IoCloseOutline } from "react-icons/io5";

const DetilesModal = ({ closeModal, quantity, orderDetailsUser }) => {
  return (
    <dialog
      open
      className="modal modal-bottom sm:modal-middle h-[100%] w-[100%]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-box shadow-lg bg-white rounded-lg p-6 w-[90%] h-[80%]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Product Details</h2>
          <button
            className="btn btn-circle btn-ghost hover:bg-mainColor hover:text-white"
            onClick={closeModal}
            aria-label="Close Modal"
          >
            <IoCloseOutline size={18} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-center">
                <th>Index</th>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderDetailsUser.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-24 h-24 object-cover"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{quantity}</td>
                  <td>${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
};

export default DetilesModal;
