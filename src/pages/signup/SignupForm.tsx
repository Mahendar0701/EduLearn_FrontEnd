/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { API_ENDPOINT } from "../../config/constants";

type Inputs = {
  username: string;
  email: string;
  password: string;
  role: string;
};

const SignupForm = () => {
  // const [error] = useState(null);
  // console.log(error);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { username, email, password, role } = data;

    try {
      const response = await axios.post(
        `https://edulearn-backend.onrender.com/api/signup/`,
        {
          username,
          email,
          password,
          role,
        }
      );

      //   if (!response.data.auth_token) {
      //     throw new Error("Sign-up failed");
      //   }

      console.log("Sign-up successful", response.data);

      const { auth_token, user } = response.data;

      // Save the token and user data in localStorage
      localStorage.setItem("authToken", auth_token);
      localStorage.setItem("userData", JSON.stringify(user));
      localStorage.setItem("authenticated", "true");

      console.log("Sign-up successfull");
      navigate("/signin");
    } catch (error: any) {
      console.error(
        "sigup creation failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="userName"
            className="block text-gray-700 font-semibold mb-2"
          >
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
          <label
            htmlFor="userEmail"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email:
          </label>
          <input
            id="userEmail"
            type="email"
            placeholder="Enter email..."
            autoFocus
            {...register("email", { required: true })}
            className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.email ? "border-red-500" : ""
            }`}
          />
        </div>
        <div>
          <label
            htmlFor="userPassword"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password:
          </label>
          <input
            id="userPassword"
            type="password"
            placeholder="Enter password..."
            autoFocus
            {...register("password", { required: true })}
            className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.password ? "border-red-500" : ""
            }`}
          />
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-gray-700 font-semibold mb-2"
          >
            Role:
          </label>
          <select
            id="role"
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
          Sign up
        </button>
      </form>
      <div className="text-center mt-4">
        Have an account?{" "}
        <a
          href="/signin"
          id="signup-link"
          className="text-blue-500 hover:underline"
        >
          Sign In
        </a>
      </div>
    </div>
  );
};

export default SignupForm;
