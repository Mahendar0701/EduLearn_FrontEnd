import { useEffect } from "react";
import { fetchCourses } from "../../context/courses/action";
import { useCourseDispatch } from "../../context/courses/context";
import CourseListItems from "./CourseListItems";

export default function CourseList() {
  const dispatchCourse = useCourseDispatch();
  console.log("..list");

  useEffect(() => {
    fetchCourses(dispatchCourse);
  }, [dispatchCourse]);

  return (
    <div className="mr-7 my-5">
      <CourseListItems />
      <br />
    </div>
  );
}
