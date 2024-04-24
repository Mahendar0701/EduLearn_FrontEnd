/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const SigninForm = () => {
  // const [content, setContent] = useState("");

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signin/", {
        email,
        password,
      });

      // if (!response.data.auth_token) {
      //   throw new Error("Sign-in failed");
      // }

      console.log("Sign-in successful", response.data);

      const { auth_token, user } = response.data;

      // Save the token and user data in localStorage
      localStorage.setItem("authToken", auth_token);
      localStorage.setItem("userData", JSON.stringify(user));
      localStorage.setItem("authenticated", "true");

      // Clear previous errors if any
      setError(null);
      navigate("/");
      // Perform any necessary navigation or state updates after successful sign-in
    } catch (error: any) {
      console.error("signin  failed:", error.response?.data || error.message);
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="userEmail"
            className="block text-gray-700 font-semibold mb-2"
          >
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
        {error && (
          <div className="text-red-500 font-bold text-sm mt-2">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Sign in
        </button>
      </form>
      <div className="text-center mt-4">
        Don't have an account?{" "}
        <a
          href="/signup"
          id="signup-link"
          className="text-blue-500 hover:underline"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default SigninForm;
