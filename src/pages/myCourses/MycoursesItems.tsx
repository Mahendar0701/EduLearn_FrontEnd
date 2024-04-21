// Mycourses.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCourseState } from "../../context/courses/context";
import { Link } from "react-router-dom";

const MycoursesItems = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const courseState: any = useCourseState();

  const { courses, isLoading, isError, errorMessage } = courseState;

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch enrolled courses when the component mounts
    axios
      .get(`http://127.0.0.1:8000/api/user/enrolled-courses/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        setEnrolledCourses(response.data);
        console.log("setEnrolledCourses", enrolledCourses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return <span>Loading courses...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  // Filter enrolled courses from the complete courses list
  const enrolledCoursesIds = enrolledCourses.map(
    (enrollment) => enrollment.course
  );
  const filteredCourses = courses.filter((course) =>
    enrolledCoursesIds.includes(course.id)
  );

  return (
    <div>
      <h1 className="text-2xl  text-center my-3">My Courses</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-3 mx-28">
          {filteredCourses.map((course: any) => (
            // <div>{course.title}</div>
            <div
              key={course.id}
              className="max-w-sm m-3 bg-slate-50 border border-gray-200 rounded-lg shadow-md"
            >
              <Link to={`/dashboard/courses/${course.id}`}>
                <img
                  className="rounded-t-lg"
                  src={course.image}
                  style={{ height: "250px", width: "100%" }}
                  alt=""
                />
              </Link>
              <div className="p-5">
                <a href={`/dashboard/courses/${course.id}`}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-violet-900">
                    {course.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">
                  {course.description}
                </p>
                <a
                  href={`/dashboard/courses/${course.id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-900 rounded-lg hover:bg-violet-950 focus:ring-4 focus:outline-none focus:ring-violet-950"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MycoursesItems;
