/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { fetchCourses } from "../../context/courses/action";
import { useCourseDispatch } from "../../context/courses/context";
import MycoursesItems from "./MycoursesItems";

export default function CourseList() {
  const dispatchCourse = useCourseDispatch();

  useEffect(() => {
    fetchCourses(dispatchCourse);
  }, []);

  return (
    <div className="mr-7 my-5">
      <MycoursesItems />
      <br />
    </div>
  );
}
