import React, { useEffect } from "react";
import { getCourseDetails } from "../../context/course_details/action";
import { fetchModules } from "../../context/module/action";
import { useCourseDetailsDispatch } from "../../context/course_details/context";
import { useModuleDispatch } from "../../context/module/context";
import CourseItems from "./CourseDetailsItems";
import { useParams } from "react-router-dom";

const CourseDetails: React.FC = () => {
  const dispatchCourseDetails = useCourseDetailsDispatch();
  const dispatchModule = useModuleDispatch();
  const { courseID } = useParams();

  useEffect(() => {
    if (courseID) {
      getCourseDetails(dispatchCourseDetails, courseID);
      fetchModules(dispatchModule, courseID);
    }
  }, [dispatchCourseDetails, courseID, dispatchModule]);
  return <CourseItems />;
};
export default CourseDetails;
