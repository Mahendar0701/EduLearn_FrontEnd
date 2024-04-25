/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { Fragment, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useCourseState } from "../../context/courses/context";
// // import { Link } from "react-router-dom";

// // import Slider from "react-slick";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";

// export default function CourseListItems() {
//   const courseState: any = useCourseState();

//   const { courses, isLoading, isError, errorMessage } = courseState;

//   console.log("debug courses", courses);
//   console.log(typeof courses);

//   // if (courses.length === 0) {
//   //   throw Error("Error!!!");
//   // }

//   if (isLoading) {
//     return <span>Loading courses...</span>;
//   }
//   if (isError) {
//     return <span>{errorMessage}</span>;
//   }

//   if (!courses || Object.keys(courses).length === 0) {
//     return <h1 className="text-center">No courses available right now.</h1>;
//   }

//   const courseArray = Object.values(courses);

//   //   const isAuthenticated = !!localStorage.getItem("authToken");

//   return (
//     <div>
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="flex flex-wrap gap-3 mx-28">
//           {courseArray &&
//             courseArray.length > 0 &&
//             courseArray.map((course: any) => (
//               // <div>{course.title}</div>
//               <div
//                 key={course.id}
//                 className="max-w-sm m-3 bg-slate-50 border border-gray-200 rounded-lg shadow-md"
//               >
//                 <Link to={`/dashboard/courses/${course.id}`}>
//                   <img
//                     className="rounded-t-lg"
//                     src={course.image}
//                     style={{ height: "250px", width: "100%" }}
//                     alt=""
//                   />
//                 </Link>
//                 <div className="p-5">
//                   <a href={`/dashboard/courses/${course.id}`}>
//                     <h5 className="mb-2 text-2xl font-bold tracking-tight text-violet-900">
//                       {course.title}
//                     </h5>
//                   </a>
//                   <p className="mb-3 font-normal text-gray-700">
//                     {course.description}
//                   </p>
//                   <a
//                     href={`/dashboard/courses/${course.id}`}
//                     className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-900 rounded-lg hover:bg-violet-950 focus:ring-4 focus:outline-none focus:ring-violet-950"
//                   >
//                     Read more
//                     <svg
//                       className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 14 10"
//                     >
//                       <path
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M1 5h12m0 0L9 1m4 4L9 9"
//                       />
//                     </svg>
//                   </a>
//                 </div>
//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios
import { API_ENDPOINT } from "../../config/constants";

export default function CourseListItems() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        // Fetch courses from API using axios
        const response = await axios.get(`${API_ENDPOINT}/api/courses/`);
        const data = response.data;

        setCourses(data);
        setIsLoading(false);
      } catch (error: any) {
        setIsError(true);
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading) {
    return <span>Loading courses...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  if (!courses || courses.length === 0) {
    return <h1 className="text-center">No courses available right now.</h1>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mx-28">
        {courses.map((course: any) => (
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
    </div>
  );
}
