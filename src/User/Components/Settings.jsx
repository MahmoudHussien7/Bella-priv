import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/Slices/AuthSlice";

function Settings() {
  const { userDetails } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: userDetails ? userDetails.userName : "",
    userEmail: userDetails ? userDetails.userEmail : "",
    phone: userDetails ? userDetails.phone : "",
    address: userDetails ? userDetails.address : "",
    city: userDetails ? userDetails.city : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.userEmail) {
      console.log("Please fill in all required fields.");
      return;
    }

    // Dispatch updateUser with the updated form data
    dispatch(updateUser(formData))
      .unwrap()
      .then(() => {
        console.log("User updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Settings
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Email</label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-btncolor text-white py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default Settings;
