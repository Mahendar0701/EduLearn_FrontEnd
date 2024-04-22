/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Mycourses.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useCourseState } from "../../context/courses/context";
// import { Link } from "react-router-dom";
import DonutGraph from "../dashboard/DonutGraph";

const ReportItems = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [completedLessons, setCompletedLessons] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  // const [lessons, setLessons] = useState([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        console.log("setEnrolledCourses", response.data);

        response.data.forEach((enrollment: any) => {
          getCompletedLessons(enrollment.course);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getCompletedLessons = (courseID: any) => {
    // Check if the lesson is marked as complete

    axios
      .get(`http://127.0.0.1:8000/api/courses/${courseID}/completed-lessons/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        setCompletedLessons((prevLessons) => [
          ...prevLessons,
          ...response.data,
        ]);
        console.log("completed lesson", response.data);

        getModules(courseID);
      })
      .catch((error) => {
        console.log(error);
        setCompletedLessons([]);
      });
  };

  const getModules = (courseID: any) => {
    // Check if the lesson is marked as complete

    axios
      .get(`http://127.0.0.1:8000/api/courses/${courseID}/modules/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        console.log(" setModules", response.data);
        setModules((prevModules) => [...prevModules, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
        setCompletedLessons([]);
      });
  };

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
  const filteredCourses = courses.filter((course: { id: any }) =>
    enrolledCoursesIds.includes(course.id)
  );

  // const getTotalLessons = (courseID) => {
  //   return lessons.filter((lesson) => lesson.course === courseID);
  // };

  const getCourseCompletedLessons = (courseID: any) => {
    return completedLessons.filter(
      (completedLesson) => completedLesson.course == courseID
    );
  };

  const getPercentage = (course: any, courseID: any) => {
    const completedLessonsCount = getCourseCompletedLessons(courseID).length;
    const totalLessonsCount = course.num_lessons;

    if (totalLessonsCount === 0) {
      return 0; // To avoid division by zero
    }

    const percentage = (completedLessonsCount / totalLessonsCount) * 100;
    return isNaN(percentage) ? 0 : percentage; // Ensure the result is not NaN
  };

  const noOfIncompleteLessons = (course: any, courseID: number) => {
    const completedLessonsCount = getCourseCompletedLessons(courseID).length;
    const totalLessonsCount = course.num_lessons;

    if (totalLessonsCount === 0) {
      return 0; // To avoid division by zero
    }

    const incompleteLessons = totalLessonsCount - completedLessonsCount;
    return incompleteLessons; // Ensure the result is not NaN
  };

  const getCompletedLessonsForModule = (courseID: any, moduleID: any) => {
    // Filter completed lessons for the specific module
    return completedLessons.filter(
      (completedLesson) =>
        completedLesson.course === courseID &&
        completedLesson.module === moduleID
    );
  };

  const getModuleCompletionRatio = (completed: number, total: number) => {
    if (total === 0) {
      return 0; // To avoid division by zero
    }
    return completed / total;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center ">My Report</h1>
      <hr className="my-3" />
      <select
        className="block mx-auto px-4 py-3 mb-4 bg-violet-800 text-white rounded-lg shadow-lg hover:bg-violet-900 focus:outline-none"
        onChange={(e) => {
          const selectedCourseId = parseInt(e.target.value);
          const selectedCourse = filteredCourses.find(
            (course: any) => course.id === selectedCourseId
          );
          setSelectedCourse(selectedCourse);
        }}
      >
        <option>Select your course</option>
        {filteredCourses.map((course: any) => (
          <option
            className="bg-white text-black py-3"
            key={course.id}
            value={course.id}
          >
            {course.title}
          </option>
        ))}
      </select>

      {selectedCourse && (
        <div className="max-w-xl mx-auto mt-8 bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <div className="flex">
              <div className="my-5">
                <h2 className="text-xl font-bold mb-4">
                  {selectedCourse.title}
                </h2>
                <p>
                  Percentage:{" "}
                  {getCourseCompletedLessons(selectedCourse.id).length}/
                  {selectedCourse.num_lessons} (
                  {getPercentage(selectedCourse, selectedCourse.id)}%)
                </p>
                <p>
                  Completed Lessons:{" "}
                  {getCourseCompletedLessons(selectedCourse.id).length}
                </p>
                <p>
                  Incomplete Lessons:{" "}
                  {noOfIncompleteLessons(selectedCourse, selectedCourse.id)}
                </p>
                <p>Total Lessons: {selectedCourse.num_lessons}</p>
              </div>
              <div>
                <DonutGraph
                  totalLessons={selectedCourse.num_lessons}
                  completedLessons={completedLessons}
                />
              </div>
            </div>
            <hr className="my-4" />
            <h3 className="text-lg font-bold mb-2">Modules:</h3>
            <ul>
              {modules
                .filter((moduleData) => moduleData.course === selectedCourse.id)
                .map((moduleData) => (
                  <li
                    key={moduleData.id}
                    className={`px-3 py-2 my-2 border rounded ${
                      getModuleCompletionRatio(
                        getCompletedLessonsForModule(
                          selectedCourse.id,
                          moduleData.id
                        ).length,
                        moduleData.num_lessons
                      ) === 1
                        ? "bg-green-500 text-white" // Apply green background if ratio is 1
                        : ""
                    }`}
                  >
                    {moduleData.title}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportItems;
