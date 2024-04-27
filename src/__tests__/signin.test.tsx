import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import SigninForm from "../pages/signin/SigninForm";
import { API_ENDPOINT } from "../config/constants";

jest.mock("axios");

describe("SigninForm", () => {
  test("submits sign-in form with user input", async () => {
    // Mock axios post function to resolve with successful response
    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockResolvedValueOnce({
      data: {
        auth_token: "mockAuthToken",
        user: {
          id: 1,
          email: "test@example.com",
          username: "JohnDoe",
          role: "student",
        },
      },
    });

    const { getByLabelText, getByText } = render(
      <Router>
        <SigninForm />
      </Router>
    );

    // Fill out the form fields using getByLabelText
    fireEvent.change(getByLabelText("Email:"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText("Password:"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(getByText("Sign in"));

    // Wait for axios to be called with the correct data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(`${API_ENDPOINT}/api/signin/`, {
        email: "test@example.com",
        password: "password123",
      });
    });

    // Assert navigation to the correct page after successful sign-in
    // You can assert based on your navigation logic, since useNavigate is not directly testable
    // For example, if successful sign-in navigates to "/"
    expect(window.location.pathname).toBe("/");
  });
});
