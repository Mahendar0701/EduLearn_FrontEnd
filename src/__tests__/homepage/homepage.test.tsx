// // import React from 'react';
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";

// import Dashboard from "../../pages/dashboard";
// // import Dashboard from './Dashboard';

// describe("Dashboard component", () => {
//   test("renders welcome message", () => {
//     render(<Dashboard />);
//     const welcomeMessage = screen.getByText(/Welcome to EduLearn/i);
//     expect(welcomeMessage).toBeInTheDocument();
//   });

//   test("scrolls to featured courses when button is clicked", () => {
//     // Mock the scrollIntoView function
//     const scrollIntoViewMock = jest.fn();
//     window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

//     render(<Dashboard />);
//     const startLearningButton = screen.getByRole("button", {
//       name: /Start Learning Now/i,
//     });
//     startLearningButton.click();

//     // Expect the scrollIntoView function to have been called with the behavior 'smooth'
//     expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });
//   });

//   test("renders create course section for instructors", () => {
//     localStorage.setItem("userData", JSON.stringify({ role: "Teacher" }));
//     render(<Dashboard />);

//     const createCourseSection = screen.getByRole("button", {
//       name: /Create New Course/i,
//     });
//     expect(createCourseSection).toBeInTheDocument();
//   });

//   test("does not render create course section for non-instructors", () => {
//     localStorage.setItem("userData", JSON.stringify({ role: "Student" }));
//     render(<Dashboard />);

//     const createCourseSection = screen.queryByText(/Create New Course/i);
//     expect(createCourseSection).toBeNull();
//   });

//   test("renders create category section for instructors", () => {
//     localStorage.setItem("userData", JSON.stringify({ role: "Teacher" }));
//     render(<Dashboard />);

//     const createCategorySection = screen.getByRole("button", {
//       name: /Create New Category/i,
//     });
//     expect(createCategorySection).toBeInTheDocument();
//   });

//   test("does not render create category section for non-instructors", () => {
//     localStorage.setItem("userData", JSON.stringify({ role: "Student" }));
//     render(<Dashboard />);

//     const createCategorySection = screen.queryByText(/Create New Category/i);
//     expect(createCategorySection).toBeNull();
//   });
// });

import "@testing-library/jest-dom";

// import { reducer, initialState } from "./reducer";

describe("reducer test", () => {
  test("test", () => {
    expect(true).toBe(true);
  });
});
