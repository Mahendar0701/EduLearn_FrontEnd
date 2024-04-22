/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Course {
  title: string;
  description: string;
  image: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  rating: number;
  duration: number;
}

export default function CartDetails() {
  const [courses, setCourses] = useState<Course[]>([]);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/user/cart/`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );

        const courseIds = response.data.map(
          (item: { course: any }) => item.course
        );

        console.log("courseIds", courseIds);

        const courseDetailsPromises = courseIds.map((id: any) =>
          axios.get(`http://127.0.0.1:8000/api/courses/${id}/`)
        );

        const courseDetailsResponses = await Promise.all(courseDetailsPromises);

        const coursesData = courseDetailsResponses.map((res) => res.data);

        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    };

    if (authToken) {
      fetchUserCart();
    }
  }, [authToken]);

  return (
    <div className="flex flex-wrap gap-3 mx-28">
      {courses.map((course: any) => (
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
  );
}
