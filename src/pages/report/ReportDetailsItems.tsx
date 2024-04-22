/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { fetchCourses } from "../../context/courses/action";
import { useCourseDispatch } from "../../context/courses/context";
import ReportItems from "./ReportDetails";

export default function ReportDetailsItems() {
  const dispatchCourse = useCourseDispatch();

  useEffect(() => {
    fetchCourses(dispatchCourse);
  }, []);

  return (
    <div className="mr-7 my-5">
      <ReportItems />
      <br />
    </div>
  );
}
