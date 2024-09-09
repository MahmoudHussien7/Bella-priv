import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { GoFileMedia } from "react-icons/go";
import { useDispatch } from "react-redux";
import { addProducts } from "../../Redux/Slices/ProductsSlice";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
import { toast } from "react-toastify";

const AddProductModal = ({ closeModal }) => {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
    description: "",
    imageUrl: "",
    price: 0,
    quantity: 0,
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const storageRef = ref(storage, `/product_images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on("state_changed", null, reject, async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      });
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    try {
      const downloadURL = await uploadImage();

      await dispatch(
        addProducts({
          ...newProduct,
          imageUrl: downloadURL,
        })
      );

      toast.success("Product added successfully!", {
        position: "top-center",
      });

      closeModal();
    } catch (error) {
      toast.error("Error adding product, please try again", {
        position: "bottom-center",
      });
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <div className="fixed w-full z-[99999] inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-box bg-white p-5 rounded-lg sm:w-[50rem]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Add Product</h2>
          <button
            className="btn btn-circle btn-ghost hover:bg-mainColor hover:text-white"
            onClick={closeModal}
          >
            <IoCloseOutline size={18} />
          </button>
        </div>

        <form onSubmit={handleAddProduct} className="space-y-3">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Product Name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              min={1}
              placeholder="Price"
              required
            />
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              min={1}
              placeholder="Quantity"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Product Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full"
              placeholder="Product Description"
              rows="2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="select select-info w-full"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Bedroom">Bedroom</option>
              <option value="Decoration">Decoration</option>
              <option value="Living Room">Living Room</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="imgFile"
              className="cursor-pointer flex items-center gap-2"
            >
              <GoFileMedia />
              Add Image
            </label>
            <input
              id="imgFile"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="object-cover h-[20rem]"
            />
          )}

          <button
            disabled={isDisabled}
            className="bg-mainColor text-white p-2 px-7 rounded mt-10"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
