import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCourseDetailsState } from "../../context/course_details/context";
import { useModuleState } from "../../context/module/context";
import { useLessonState } from "../../context/lessons/context";
import axios from "axios";
import LessonDetails from "./LessonDetails";
// import ModuleTab from "./ModuleTab";
import LessonFormComponent from "../lesson";
import NewLesson from "../lesson/LessonFormDialogue";
import NewModule from "../module/ModuleForm";
import ModuleEditForm from "../module/EditModuleForm";
// import CourseDetails from "../courseDetails/CourseDetailsItems";
// import Chart from "chart.js/auto";
import DonutGraph from "../dashboard/DonutGraph";
// import CourseDetails from "../courseDetails";
import Rating from "react-rating-stars-component";

export default function CourseDashboard() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [totalLessons, setTotalLessons] = useState(0);
  // const [lessons, setLessons] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar
  // console.log("selected module", selectedModule);

  const navigate = useNavigate();
  const { courseID, moduleID, lessonID } = useParams(); // Extract courseID from the URL parameters
  console.log(courseID, moduleID, lessonID);

  const handleModuleClick = (moduleId) => {
    // setTotalLessons(lessons.length);
    setSelectedModule((prevModule) =>
      prevModule === moduleId ? null : moduleId
    );
    setSelectedLesson(null); // Reset selected lesson when a new module is clicked
  };

  const handleLessonClick = (lessonId) => {
    setSelectedLesson((prevLesson) =>
      prevLesson === lessonId ? null : lessonId
    );
  };

  const courseDetailsState = useCourseDetailsState();
  const moduleState = useModuleState();
  const lessonState = useLessonState();

  const authToken = localStorage.getItem("authToken");

  const { course, isLoading, isError, errorMessage } = courseDetailsState;
  const { modules, isLoading1, isError1, errorMessage1 } = moduleState;
  const { lessons, isLoading2, isError2, errorMessage2 } = lessonState;

  // Filter the selected module based on moduleID
  const selecteddModule = modules.find(
    (module) => module.id === Number(moduleID)
  );
  console.log("selecteddModule", selecteddModule);

  console.log("lessons", lessons);

  // Filter the selected lesson based on lessonID
  const selecteddLesson = lessons.find(
    (lesson) => lesson.id === Number(lessonID)
  );

  useEffect(() => {
    if (modules.length > 0) {
      setTotalLessons(
        modules.reduce((acc, module) => acc + module.num_lessons, 0)
      );
    }
  }, [modules]);

  useEffect(() => {
    const selectedModuleFromURL = modules.find(
      (module) => module.id === Number(moduleID)
    );

    const selectedLessonFromURL = lessons.find(
      (lesson) => lesson.id === Number(lessonID)
    );

    if (
      selectedModuleFromURL ||
      moduleID ||
      selectedLessonFromURL ||
      lessonID
    ) {
      setSelectedModule(selectedModuleFromURL);
      setSelectedLesson(selectedLessonFromURL);
    } else {
      // If no module is selected, navigate to the default URL
      navigate(`/dashboard/courses/${courseID}/coursedashboard`);
    }
  }, [moduleID, modules, navigate, courseID, lessons, lessonID]);

  // console.log("authToken", authToken);

  useEffect(() => {
    // Check if the lesson is marked as complete

    axios
      .get(`http://127.0.0.1:8000/api/courses/${courseID}/completed-lessons/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        setCompletedLessons(response.data || []);
        console.log("completed lesson", response.data);
      })
      .catch((error) => {
        setCompletedLessons([]);
      });
  }, [courseID, moduleID, lessonID, authToken]);

  if (isLoading || isLoading1 || isLoading2) {
    return (
      <div className="text-center text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  if (isError || isError1 || isError2) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        Error: {errorMessage || errorMessage1 || errorMessage2}
      </div>
    );
  }

  const handleNextModule = () => {
    if (selectedModuleIndex < modules.length - 1) {
      const nextModuleIndex = selectedModuleIndex + 1;
      setSelectedModuleIndex(nextModuleIndex);
      setSelectedModule(modules[nextModuleIndex]); // Update selectedModule based on the index
      setSelectedLesson(null);

      // Navigate to the next module
      const nextModuleId = modules[nextModuleIndex].id;
      navigate(
        `/dashboard/courses/${courseID}/modules/${nextModuleId}/lessons`
      );
    }
  };

  const handlePreviousModule = () => {
    if (selectedModuleIndex > 0) {
      const prevModuleIndex = selectedModuleIndex - 1;
      setSelectedModuleIndex(prevModuleIndex);
      setSelectedModule(modules[prevModuleIndex]); // Update selectedModule based on the index
      setSelectedLesson(null);

      // Navigate to the previous module
      const prevModuleId = modules[prevModuleIndex].id;
      navigate(
        `/dashboard/courses/${courseID}/modules/${prevModuleId}/lessons`
      );
    }
  };

  const handleDeleteModule = () => {
    axios
      .delete(
        `http://127.0.0.1:8000/api/courses/${courseID}/modules/${moduleID}/`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((response) => {
        console.log("deleted module successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isModuleCompleted = (moduleId) => {
    const moduleLessons = lessons.filter(
      (lesson) => lesson.module === moduleId
    );
    const completedModuleLessons = completedLessons.filter(
      (completedLesson) => completedLesson.module === moduleId
    );

    const ratio =
      moduleLessons.length > 0
        ? completedModuleLessons.length / moduleLessons.length
        : 0;

    return ratio === 1;
  };

  let isCreator = false;
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const userId = userData.user_id;

  if (userId && course.instructorId == userId) {
    isCreator = true;
  }

  console.log("instr id", course.instructorId);
  console.log("user id", userId);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <div
        className={`w-1/4 p-4 border-r overflow-y-scroll ${
          isSidebarOpen ? "" : "hidden" // Hide or show sidebar based on isSidebarOpen
        }`}
        style={{ height: "90vh", position: "sticky", top: 0 }}
      >
        <hr />

        <h1 className="text-3xl font-semibold my-2 text-center">
          Course Outline
        </h1>
        {isCreator && <NewModule />}
        <ul>
          {modules.map((module) => (
            <li
              key={module.id}
              className={`cursor-pointer pr-5 pl-5 py-4 my-1 border ${
                isModuleCompleted(module.id) ? "border-green-500" : ""
              } hover:bg-slate-200 ${
                selectedModule === module ? "bg-slate-200" : "bg-slate-100"
              }`}
              onClick={() => {
                handleModuleClick(module);
                navigate(
                  `/dashboard/courses/${courseID}/modules/${module.id}/lessons`
                );
              }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{module.title}</h3>

                <span className="text-lg">
                  {selectedModule === module ? "▲" : "▼"}
                </span>
              </div>
              {selectedModule === module && (
                <p className="text-md">{module.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleToggleSidebar} className="mb-4">
        C
      </button>
      {/* Content Area with Lessons */}
      <div className=" w-3/4 p-4 ">
        {selectedModule && moduleID ? (
          <div>
            {selectedLesson && lessonID ? (
              <div className="mr-14">
                {" "}
                {selectedLesson && <LessonDetails />}
              </div>
            ) : (
              <div>
                <div className="flex justify-around">
                  <h2 className="text-center text-2xl font-semibold mb-2">
                    {selectedModule.title}
                  </h2>
                  {isCreator && (
                    <div>
                      <ModuleEditForm
                        module={selectedModule}
                        moduleId={selectedModule}
                        courseId={courseID}
                      />
                      <button
                        className="bg-red-600 hover:bg-red-800 text-white px-3 py-2 rounded-md ml-3"
                        onClick={handleDeleteModule}
                      >
                        Delete Module
                      </button>
                    </div>
                  )}
                </div>

                <hr />
                <div
                  className="text-center text-md my-3"
                  dangerouslySetInnerHTML={{
                    __html: selectedModule.description,
                  }} // Render HTML content
                />
                <div className="items-center justify-center mx-32 my-10">
                  <ul>
                    {lessons
                      .filter((lesson) => lesson.module === selectedModule.id)
                      .map((lesson) => (
                        <li
                          key={lesson.id}
                          className={`cursor-pointer my-5 list-disc ${
                            selectedLesson === lesson.id ? "text-blue-500" : ""
                          }`}
                          onClick={() => {
                            handleLessonClick(lesson.id);
                            navigate(
                              `/dashboard/courses/${courseID}/modules/${selectedModule.id}/lessons/${lesson.id}`
                            );
                          }}
                        >
                          <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">
                              {lesson.title}
                              {/* {lesson.module} */}
                            </h3>
                            {completedLessons &&
                              completedLessons.some(
                                (completedLesson) =>
                                  completedLesson.lesson === lesson.id
                              ) && (
                                <p className="text-green-500">(Completed)</p>
                              )}
                          </div>

                          <hr className="my-5" />
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="ml-28">{isCreator && <NewLesson />}</div>
                <div>
                  <div className="flex justify-center gap-20">
                    {selectedModuleIndex > 0 ? (
                      <div className="flex justify-center">
                        <button
                          className="bg-violet-200 px-20 py-2 my-5 rounded-md items-center"
                          onClick={handlePreviousModule}
                        >
                          &larr; Previous Module
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center invisible">
                        <button className="bg-transparent"></button>
                      </div>
                    )}

                    {selectedModuleIndex < modules.length - 1 ? (
                      <div className="flex justify-center">
                        <button
                          className="bg-violet-200 px-20 py-2 my-5 rounded-md items-center"
                          onClick={handleNextModule}
                        >
                          Next Module &rarr;
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center invisible">
                        <button className="bg-transparent"></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* <CourseDetails /> */}

            {course && (
              <div className="flex gap-24 ">
                <div key={course.id} className="max-w-lg  m-5  ">
                  {/* <Link to={`/dashboard/courses/${course.id}`}> */}
                  <img
                    className="rounded-md"
                    src={course.image}
                    style={{ height: "250px", width: "100%" }}
                    alt=""
                  />
                  {/* </Link> */}
                  <div className="p-5">
                    {/* <a href={`/dashboard/courses/${course.id}`}> */}
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-violet-900">
                      {course.title}
                    </h5>
                    {/* </a> */}
                    <p className="mb-3 font-normal text-gray-700">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex gap-10 mx-20">
                    <h3>Rating {course.rating}/5</h3>
                    <h3>Level {course.level}</h3>
                    <h3>{course.enrolledStudents}+ Learners</h3>
                  </div>
                </div>
                <div className="m-3">
                  <div className="text-2xl my-3">Course Progress</div>
                  <div>Total Lessons c : {course.num_lessons}</div>
                  <div>Total Lessons : {totalLessons}</div>
                  <div>Completed Lessons : {completedLessons.length}</div>

                  <DonutGraph
                    totalLessons={totalLessons}
                    completedLessons={completedLessons}
                  />

                  <div className="flex items-center">
                    <p className="mr-3">Rate Now:</p>
                    <Rating
                      count={5}
                      value={5}
                      // onChange={handleRatingChange}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
