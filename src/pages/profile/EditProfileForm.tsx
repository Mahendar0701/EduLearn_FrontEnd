/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { API_ENDPOINT } from "../../config/constants";

type Inputs = {
  username: string;
  email: string;
  password: string;
  role: string;
};

const ProfileEditForm = () => {
  const [_isOpen, setIsOpen] = useState(false);
  // const [user, setUser] = useState<any>({});
  // const [loading, setLoading] = useState(true);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<Inputs>({
  //   defaultValues: {
  //     username: localStorage.getItem("userData")
  //       ? JSON.parse(localStorage.getItem("userData")).username || ""
  //       : "",
  //     email: localStorage.getItem("userData")
  //       ? JSON.parse(localStorage.getItem("userData")).email
  //       : "",
  //     password: "", // Assuming you don't want to pre-fill the password for security reasons
  //     role: localStorage.getItem("userData")
  //       ? JSON.parse(localStorage.getItem("userData")).role
  //       : "",
  //   },
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData")!)?.username || ""
        : "",
      email: localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData")!)?.email || ""
        : "",
      password: "", // Assuming you don't want to pre-fill the password for security reasons
      role: localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData")!)?.role || ""
        : "",
    },
  });

  function getCookie(name: string) {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));

    return cookieValue ? cookieValue.split("=")[1] : null;
  }
  const csrfToken = getCookie("csrftoken");
  const [_error, setError] = useState<string | null>(null);
  // const _closeModal = () => {
  //   setIsOpen(false);
  // };
  // const _openModal = () => {
  //   setIsOpen(true);
  // };

  //   useEffect(() => {
  //     const fetchUserData = async () => {
  //       try {
  //         const authToken = localStorage.getItem("authToken");

  //         if (!authToken) {
  //           console.error("Authentication token not found");
  //           setLoading(false);
  //           return;
  //         }

  //         const response = await axios.get("http://localhost:8000/api/user/", {
  //           withCredentials: true,
  //           //   headers: {
  //           //     "Content-Type": "application/json",
  //           //     Authorization: `Bearer ${authToken}`, // or `Token ${authToken}`
  //           //     "X-CSRFToken": csrfToken,
  //           //   },
  //         });

  //         setUser(response.data);
  //         setLoading(false);
  //       } catch (error) {
  //         console.error(
  //           "Failed to fetch user details:",
  //           error.response?.data || error.message
  //         );
  //         setLoading(false);
  //       }
  //     };

  //     fetchUserData();
  //   }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log("data", data);

    try {
      const authToken = localStorage.getItem("authToken");
      console.log("authToken", authToken);

      if (!authToken) {
        console.error("Authentication token not found");
        setError("Authentication token not found");
        return;
      }

      const response = await axios.put(
        `${API_ENDPOINT}/api/user/profile/edit/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
            "X-CSRFToken": csrfToken,
          },
        }
      );

      console.log("profile update successfull", response.data);

      setIsOpen(false);

      // Clear previous errors if any
      setError(null);
    } catch (error: any) {
      console.error(
        "profile update failed:",
        error.response?.data || error.message
      );
      setError("Invalid field entries");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Your Name:
          </label>
          <input
            id="userName"
            type="text"
            placeholder="Enter User name..."
            autoFocus
            {...register("username", { required: true })}
            className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.username ? "border-red-500" : ""
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email:
          </label>
          <input
            id="userEmail"
            type="text"
            placeholder="Enter email..."
            autoFocus
            {...register("email", { required: true })}
            className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.email ? "border-red-500" : ""
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Password:
          </label>
          <input
            id="userPassword"
            type="password"
            placeholder="Enter password..."
            autoFocus
            {...register("password")}
            className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.password ? "border-red-500" : ""
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Role:
          </label>
          <select
            {...register("role", { required: true })}
            className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.role ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Update
        </button>
      </form>
      <div className="text-center mt-4">
        Have an account?{" "}
        <a
          href="/signin"
          id="signup-link"
          className="text-blue-500 hover:underline"
        >
          Update
        </a>
      </div>
    </div>
  );
};

export default ProfileEditForm;
