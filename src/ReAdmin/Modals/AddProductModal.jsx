/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { GoFileMedia } from "react-icons/go";
import { useDispatch } from "react-redux";
import { addProducts, updateProducts } from "../../Redux/Slices/ProductsSlice";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const AddProductModal = ({ closeModal, productToUpdate }) => {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: productToUpdate ? productToUpdate.title : "",
      category: productToUpdate ? productToUpdate.category : "",
      description: productToUpdate ? productToUpdate.description : "",
      price: productToUpdate ? productToUpdate.price : 0,
      quantity: productToUpdate ? productToUpdate.quantity : 0,
    },
  });

  const dispatch = useDispatch();
  const imageUrl = watch("imageUrl");

  useEffect(() => {
    if (productToUpdate) {
      setPreview(productToUpdate.imageUrl);
      setValue("title", productToUpdate.title);
      setValue("category", productToUpdate.category);
      setValue("description", productToUpdate.description);
      setValue("price", productToUpdate.price);
      setValue("quantity", productToUpdate.quantity);
      setValue("imageUrl", productToUpdate.imageUrl);
    } else {
      resetForm();
    }
  }, [productToUpdate, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setValue("imageUrl", file.name); // Update imageUrl field in form state
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const storageRef = ref(storage, `/product_images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  const resetForm = () => {
    setPreview(null);
    setImageFile(null);
    setValue("title", "");
    setValue("category", "");
    setValue("description", "");
    setValue("price", 0);
    setValue("quantity", 0);
    setValue("imageUrl", "");
  };

  const handleAddOrUpdateProduct = async (data) => {
    setIsDisabled(true);

    try {
      const downloadURL = imageFile ? await uploadImage() : data.imageUrl;

      const productData = { ...data, imageUrl: downloadURL };

      if (productToUpdate) {
        await dispatch(
          updateProducts({
            productId: productToUpdate.id,
            updatedData: productData,
          })
        );
        toast.success("Product updated successfully!", {
          position: "bottom-right",
        });
      } else {
        await dispatch(addProducts(productData));
        toast.success("Product added successfully!", {
          position: "bottom-right",
        });
      }

      resetForm();
      closeModal();
    } catch (error) {
      toast.error("Error saving product, please try again", {
        position: "bottom-right",
      });
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <div className="fixed w-full z-[99999] inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-box bg-white p-5 rounded-lg sm:w-[50rem]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            {productToUpdate ? "Update Product" : "Add Product"}
          </h2>
          <button
            className="btn btn-circle btn-ghost hover:bg-mainColor hover:text-white "
            onClick={closeModal}
            aria-label="Close Modal"
          >
            <IoCloseOutline size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleAddOrUpdateProduct)}
          className="space-y-3"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Product Name
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Product Name is required" })}
              className="input input-bordered w-full focus:border-0"
              placeholder="Product Name"
            />
            {errors.title && (
              <p className="text-red-700 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <div className="w-[50%]">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be at least 1" },
                })}
                className="input input-bordered w-full focus:border-0 mb-3"
                placeholder="Price"
              />
              {errors.price && (
                <p className="text-red-700 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="w-[50%]">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 1, message: "Quantity must be at least 1" },
                })}
                className="input input-bordered w-full focus:border-0"
                placeholder="Quantity"
              />
              {errors.quantity && (
                <p className="text-red-700 text-sm mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Category
            </label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className="select select-bordered w-full focus:border-0"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Bed Room">Bed Room</option>
              <option value="Decoration">Decoration</option>
              <option value="Living Room">Living Room</option>
            </select>
            {errors.category && (
              <p className="text-red-700 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Product Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className="textarea textarea-bordered w-full focus:border-0"
              placeholder="Product Description"
              rows="2"
            />
            {errors.description && (
              <p className="text-red-700 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="imgFile"
              className="cursor-pointer flex items-center gap-2 mb-3 text-sm font-medium"
            >
              <GoFileMedia size={22} />
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
          <div className="flex justify-end mt-3">
            <button
              disabled={isDisabled}
              className={`bg-mainColor text-white p-2 px-7 rounded ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
            >
              {isDisabled
                ? "Processing..."
                : productToUpdate
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
