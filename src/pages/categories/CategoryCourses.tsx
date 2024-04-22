/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { fetchCourses } from "../../context/courses/action";
import {
  useCourseDispatch,
  useCourseState,
} from "../../context/courses/context";
import { Link, useParams } from "react-router-dom";

export default function CategoryCourses() {
  const dispatchCourse = useCourseDispatch();

  const { catalogID } = useParams();

  useEffect(() => {
    fetchCourses(dispatchCourse);
  }, []);

  const courseState: any = useCourseState();

  const { courses, isLoading, isError, errorMessage } = courseState;

  if (isLoading) {
    return <span>Loading courses...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const filteredCourses = courses.filter(
    (course: { category: string | undefined }) => {
      return course.category == catalogID;
    }
  );

  console.log("filteredCourses", filteredCourses);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1 className="text-2xl my-3 text-center">Available Courses</h1>
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
        </div>
      )}
    </div>
  );
}
