// import React from "react";
import { render } from "@testing-library/react";
import CourseDetails from "../pages/courseDetails/CourseDetailsItems";
import { useCourseDetailsState } from "../context/course_details/context";
import { useModuleState } from "../context/module/context";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    courseID: "123", // Mock the course ID parameter
  }),
}));

jest.mock("../context/course_details/context");
jest.mock("../context/module/context");

describe("CourseDetails", () => {
  test("renders course details with enrolled status", async () => {
    const mockCourse = {
      id: "123",
      title: "Sample Course",
      description: "This is a sample course description.",
      category_name: "Sample Category",
      rating: 4.5,
      level: "Intermediate",
      enrolledStudents: 1000,
      image: "sample_image_url",
      instructor: "Sample Instructor",
      instructorId: "instructor_123",
      syllabus: "Topic 1, Topic 2, Topic 3",
      prerequisites: "Prerequisite 1, Prerequisite 2",
      resources: "Resource 1, Resource 2",
      duration: "10",
      price: 100,
    };

    const mockModules = [
      {
        id: "1",
        title: "Module 1",
        description: "This is module 1",
      },
      {
        id: "2",
        title: "Module 2",
        description: "This is module 2",
      },
    ];

    const mockCourseDetailsState = {
      course: mockCourse,
      isLoading: false,
      isError: false,
      errorMessage: "",
    };

    const mockModuleState = {
      modules: mockModules,
      isLoading1: false,
      isError1: false,
      errorMessage1: "",
    };

    // Type cast mocked functions
    (useCourseDetailsState as jest.Mock).mockReturnValue(
      mockCourseDetailsState
    );
    (useModuleState as jest.Mock).mockReturnValue(mockModuleState);

    const { queryAllByText } = render(<CourseDetails />);

    // Check if there are multiple elements with the text "Sample Course"
    const sampleCourseElements = queryAllByText("Sample Course");

    // Ensure there are multiple elements
    expect(sampleCourseElements.length).toBeGreaterThan(1);

    // Iterate over each element and assert if it's in the document
    sampleCourseElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});

// import "@testing-library/jest-dom";

// // import { reducer, initialState } from "./reducer";

// describe("reducer test", () => {
//   test("test", () => {
//     expect(true).toBe(true);
//   });
// });
