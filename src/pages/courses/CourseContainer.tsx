import { useEffect } from "react";
import { useCourseDispatch } from "../../context/courses/context";
import { fetchCourses } from "../../context/courses/action";
import { Outlet } from "react-router-dom";

const CourseContainer = () => {
  const courseDispatch = useCourseDispatch();
  useEffect(() => {
    fetchCourses(courseDispatch);
  }, [courseDispatch]);
  return <Outlet />;
};

export default CourseContainer;
