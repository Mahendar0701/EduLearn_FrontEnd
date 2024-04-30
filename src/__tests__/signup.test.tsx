import "@testing-library/jest-dom";

// import { reducer, initialState } from "./reducer";

describe("reducer test", () => {
  test("test", () => {
    expect(true).toBe(true);
  });
});

// // import React from "react";
// import { render, fireEvent, waitFor } from "@testing-library/react";
// import axios from "axios";
// // import SignupForm from "./SignupForm";
// import { BrowserRouter as Router } from "react-router-dom";
// import SignupForm from "../pages/signup/SignupForm";
// import { API_ENDPOINT } from "../config/constants";
// import "@testing-library/jest-dom";

// // Mock axios post function
// jest.mock("axios");

// describe("SignupForm", () => {
//   test("submits sign-up form with user input", async () => {
//     // Mock axios post function to resolve with successful response
//     (
//       axios.post as jest.MockedFunction<typeof axios.post>
//     ).mockResolvedValueOnce({
//       data: {
//         auth_token: "mockAuthToken",
//         user: {
//           id: 1,
//           email: "test@example.com",
//           username: "JohnDoe",
//           role: "student",
//         },
//       },
//     });

//     const { getByLabelText, getByText } = render(
//       <Router>
//         <SignupForm />
//       </Router>
//     );

//     // Fill out the form fields using getByLabelText
//     fireEvent.change(getByLabelText("Your Name:"), {
//       target: { value: "JohnDoe" },
//     });
//     fireEvent.change(getByLabelText("Email:"), {
//       target: { value: "test@example.com" },
//     });
//     fireEvent.change(getByLabelText("Password:"), {
//       target: { value: "password123" },
//     });

//     // Select the role from the dropdown by label text
//     const roleDropdown = getByLabelText("Role:");

//     // Fire change event on the dropdown to select the role
//     fireEvent.change(roleDropdown, { target: { value: "student" } });

//     // Submit the form
//     fireEvent.click(getByText("Sign up"));

//     // Wait for axios to be called with the correct data
//     await waitFor(() => {
//       expect(axios.post).toHaveBeenCalledWith(`${API_ENDPOINT}/api/signup/`, {
//         username: "JohnDoe",
//         email: "test@example.com",
//         password: "password123",
//         role: "student",
//       });
//     });

//     // Assert navigation to the correct page after successful sign-up
//     // You can assert based on your navigation logic, since useNavigate is not directly testable
//     // For example, if successful sign-up navigates to "/signin"
//     expect(window.location.pathname).toBe("/signin");
//   });
// });
