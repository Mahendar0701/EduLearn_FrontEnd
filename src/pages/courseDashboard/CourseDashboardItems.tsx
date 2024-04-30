/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import closesidebar from "../../assets/images/closesidebar.png";
import opensidebar from "../../assets/images/opensidebar.png";

import { useCourseDetailsState } from "../../context/course_details/context";
import { useModuleState } from "../../context/module/context";
import { useLessonState } from "../../context/lessons/context";
import axios from "axios";
import LessonDetails from "./LessonDetails";
// import ModuleTab from "./ModuleTab";
// import LessonFormComponent from "../lesson";
import NewLesson from "../lesson/LessonFormDialogue";
import ModuleEditForm from "../module/EditModuleForm";
// import CourseDetails from "../courseDetails/CourseDetailsItems";
// import Chart from "chart.js/auto";
import DonutGraph from "../dashboard/DonutGraph";
import { API_ENDPOINT } from "../../config/constants";
import Sidebar from "./SideBar";
// import { useTranslation } from "react-i18next";
// import CourseDetails from "../courseDetails";
// import Rating from "react-rating-stars-component";

type ModuleType = {
  id: number;
  course: string;
  title: string;
  description: string;
  order: number;
  image_link: string;
  video_link: string;
  instructorId: number;
};

export default function CourseDashboard() {
  const [selectedModule, setSelectedModule] = useState<ModuleType>();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [totalLessons, setTotalLessons] = useState(0);
  // const [showProgress, setShowProgress] = useState(false);
  // const [lessons, setLessons] = useState([]);

  const [isSidebarOpen, _setIsSidebarOpen] = useState(true); // State for sidebar
  // console.log("selected module", selectedModule);

  const navigate = useNavigate();
  // const { t } = useTranslation();
  const { courseID, moduleID, lessonID } = useParams(); // Extract courseID from the URL parameters
  console.log(courseID, moduleID, lessonID);

  const handleModuleClick = (moduleId: any) => {
    // setTotalLessons(lessons.length);

    if (moduleId !== selectedModule?.id) {
      setSelectedModule((_prevModule) => {
        // Update selected module only if it's different from the previously selected module
        return moduleId;
      });
      setSelectedLesson(null); // Reset selected lesson when a new module is clicked
    }

    // setSelectedModule((prevModule) => {
    //   if (moduleId === prevModule) {
    //     return null;
    //   } else if (moduleId) {
    //     return moduleId;
    //   } else {
    //     return null;
    //   }
    //   // prevModule === moduleId ? null : moduleId;
    // });
    setSelectedLesson(null); // Reset selected lesson when a new module is clicked
  };

  const handleLessonClick = (lessonId: null) => {
    setSelectedLesson((prevLesson) =>
      prevLesson === lessonId ? null : lessonId
    );
  };

  const courseDetailsState: any = useCourseDetailsState();
  const moduleState: any = useModuleState();
  const lessonState: any = useLessonState();

  const authToken = localStorage.getItem("authToken");

  const { course, isLoading, isError, errorMessage } = courseDetailsState;
  const { modules, isLoading1, isError1, errorMessage1 } = moduleState;
  const { lessons, isError2, errorMessage2 } = lessonState;

  // Filter the selected module based on moduleID
  const selecteddModule = modules.find(
    (module: { id: number }) => module.id === Number(moduleID)
  );
  console.log("selecteddModule", selecteddModule);

  console.log("lessons", lessons);

  // Filter the selected lesson based on lessonID
  // const selecteddLesson = lessons.find(
  //   (lesson) => lesson.id === Number(lessonID)
  // );

  useEffect(() => {
    if (modules.length > 0) {
      setTotalLessons(
        modules.reduce(
          (acc: any, module: { num_lessons: any }) => acc + module.num_lessons,
          0
        )
      );
    }
  }, [modules]);

  useEffect(() => {
    const selectedModuleFromURL = modules.find(
      (module: { id: number }) => module.id === Number(moduleID)
    );

    const selectedLessonFromURL = lessons.find(
      (lesson: { id: number }) => lesson.id === Number(lessonID)
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
      .get(`${API_ENDPOINT}/api/courses/${courseID}/completed-lessons/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        setCompletedLessons(response.data || []);
        console.log("completed lesson", response.data);
      })
      .catch((_error) => {
        setCompletedLessons([]);
      });
  }, [courseID, moduleID, lessonID, authToken]);

  // if (isLoading || isLoading1 || isLoading2) {
  //   return (
  //     <div className="text-center text-gray-700 dark:text-gray-300">
  //       Loading...
  //     </div>
  //   );
  // }

  if (isError || isError1 || isError2) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        Error: {errorMessage || errorMessage1 || errorMessage2}
      </div>
    );
  }

  // const handleNextModule = () => {
  //   if (selectedModuleIndex < modules.length - 1) {
  //     const nextModuleIndex = selectedModuleIndex + 1;
  //     setSelectedModuleIndex(nextModuleIndex);
  //     setSelectedModule(modules[nextModuleIndex]); // Update selectedModule based on the index
  //     setSelectedLesson(null);

  //     // Navigate to the next module
  //     const nextModuleId = modules[nextModuleIndex].id;
  //     navigate(
  //       `/dashboard/courses/${courseID}/modules/${nextModuleId}/lessons`
  //     );
  //   }
  // };

  // const handlePreviousModule = () => {
  //   if (selectedModuleIndex > 0) {
  //     const prevModuleIndex = selectedModuleIndex - 1;
  //     setSelectedModuleIndex(prevModuleIndex);
  //     setSelectedModule(modules[prevModuleIndex]); // Update selectedModule based on the index
  //     setSelectedLesson(null);

  //     // Navigate to the previous module
  //     const prevModuleId = modules[prevModuleIndex].id;
  //     navigate(
  //       `/dashboard/courses/${courseID}/modules/${prevModuleId}/lessons`
  //     );
  //   }
  // };

  const findModuleIndex = (moduleId: any) => {
    if (!modules) return -1;
    return modules.findIndex((module: any) => module.id === Number(moduleId));
  };

  const currentModuleIndex = findModuleIndex(moduleID);

  const previousModule =
    modules && currentModuleIndex !== -1
      ? modules[currentModuleIndex - 1]
      : null;
  const nextModule =
    modules && currentModuleIndex !== -1
      ? modules[currentModuleIndex + 1]
      : null;

  const navigateToModule = (moduleId: any) => {
    navigate(`/dashboard/courses/${courseID}/modules/${moduleId}/lessons`);
  };

  const confirmDeleteModule = () => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      handleDeleteModule();
    }
  };

  const handleDeleteModule = () => {
    axios
      .delete(`${API_ENDPOINT}/api/courses/${courseID}/modules/${moduleID}/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((_response) => {
        console.log("deleted module successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isModuleCompleted = (moduleId: any) => {
    const moduleLessons = lessons.filter(
      (lesson: { module: any }) => lesson.module === moduleId
    );
    const completedModuleLessons = completedLessons.filter(
      (completedLesson: any) => completedLesson.module === moduleId
    );

    const ratio =
      moduleLessons.length > 0
        ? completedModuleLessons.length / moduleLessons.length
        : 0;

    return ratio === 1;
  };

  let isCreator = false;
  const userDataString = localStorage.getItem("userData") || "";

  const userData = JSON.parse(userDataString);

  const userId = userData.user_id;

  if (userId && course.instructorId == userId) {
    isCreator = true;
  }

  console.log("instr id", course.instructorId);
  console.log("user id", userId);

  const handleToggleSidebar = () => {
    _setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar
        isCreator={isCreator}
        course={course}
        isLoading={isLoading}
        isLoading1={isLoading1}
        courseID={courseID}
        modules={modules}
        isSidebarOpen={isSidebarOpen}
        handleModuleClick={handleModuleClick}
        isModuleCompleted={isModuleCompleted}
        selectedModule={selectedModule}
      />

      {/* <button onClick={handleToggleSidebar} className="mb-4 ">
        ←
      </button> */}
      {/* Content Area with Lessons */}
      <div className={`${isSidebarOpen ? "  w-3/4 p-4 " : "w-full p-4"}`}>
        <button onClick={handleToggleSidebar} className="mb-4 ">
          {isSidebarOpen ? (
            <div>
              <img
                src={closesidebar}
                alt=""
                style={{ width: "30px", height: "auto" }}
              />
            </div>
          ) : (
            <div>
              {" "}
              <img
                src={opensidebar}
                alt=""
                style={{ width: "30px", height: "auto" }}
              />
            </div>
          )}
        </button>
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
                        // onClick={handleDeleteModule}
                        onClick={confirmDeleteModule}
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
                      .filter(
                        (lesson: any) => lesson.module === selectedModule.id
                      )
                      .map((lesson: any) => (
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
                                (completedLesson: any) =>
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
                  <div className="grid grid-cols-2 gap-4 mx-48 my-10 justify-around">
                    <div className="flex justify-start w-full">
                      {previousModule && (
                        <button
                          className="bg-violet-200 px-4 py-2 w-full rounded-md items-center "
                          onClick={() => navigateToModule(previousModule.id)}
                        >
                          &larr; Previous Module
                        </button>
                      )}
                    </div>

                    <div className="flex justify-end">
                      {nextModule && (
                        <button
                          className="bg-violet-200 px-4 py-2 w-full rounded-md "
                          onClick={() => navigateToModule(nextModule.id)}
                        >
                          Next Module &rarr;
                        </button>
                      )}
                    </div>
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
                  {/* <div>Total Lessons c : {course.num_lessons}</div> */}
                  <div>Total Lessons : {totalLessons}</div>
                  <div>Completed Lessons : {completedLessons.length}</div>

                  <DonutGraph
                    totalLessons={totalLessons}
                    completedLessons={completedLessons}
                  />

                  {/* <div className="flex items-center">
                    <p className="mr-3">Rate Now:</p>
                    <Rating
                      count={5}
                      value={5}
                      // onChange={handleRatingChange}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div> */}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
