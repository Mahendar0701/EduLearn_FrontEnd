import React, { useEffect } from "react";
import { getCourseDetails } from "../../context/course_details/action";
import { fetchModules } from "../../context/module/action";
import { fetchLessons } from "../../context/lessons/action";
import { useCourseDetailsDispatch } from "../../context/course_details/context";
import { useModuleDispatch } from "../../context/module/context";
import { useLessonDispatch } from "../../context/lessons/context";
import CourseDashboardItems from "./CourseDashboardItems";
import { useParams } from "react-router-dom";

const CourseDashboard: React.FC = () => {
  const dispatchCourseDetails = useCourseDetailsDispatch();
  const dispatchModule = useModuleDispatch();
  const dispatchLesson = useLessonDispatch();
  const { courseID, moduleID } = useParams();

  useEffect(() => {
    if (courseID) {
      getCourseDetails(dispatchCourseDetails, courseID);
      fetchModules(dispatchModule, courseID);
      fetchLessons(dispatchLesson, courseID, moduleID);
    }
  }, [
    dispatchCourseDetails,
    courseID,
    dispatchModule,
    dispatchLesson,
    moduleID,
  ]);
  return <CourseDashboardItems />;
};
export default CourseDashboard;
