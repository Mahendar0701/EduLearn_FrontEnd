/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useCourseDetailsState } from "../../context/course_details/context";
import { useModuleState } from "../../context/module/context";
import { Link } from "react-router-dom";

import axios from "axios";
import CourseEditForm from "./CourseEditForm";
import { API_ENDPOINT } from "../../config/constants";
import { useTranslation } from "react-i18next";

export default function CourseDetails() {
  const { t } = useTranslation(); // Import useTranslation hook

  const [selectedModule, setSelectedModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);

  const handleModuleClick = (moduleId: null) => {
    // Toggle selected module when clicked
    setSelectedModule((prevModule) =>
      prevModule === moduleId ? null : moduleId
    );
  };

  // const navigate = useNavigate();
  const courseDetailsState: any = useCourseDetailsState();
  const moduleState: any = useModuleState();

  const { course, isLoading, isError, errorMessage } = courseDetailsState;
  const { modules, isLoading1, isError1, errorMessage1 } = moduleState;

  const authToken = localStorage.getItem("authToken");
  const isAuthenticated = !!localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch enrollment status when the component mounts
    setEnrollLoading(true);
    const fetchEnrollmentStatus = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINT}/api/check-enrollment/${course.id}/`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );
        setIsEnrolled(!!response.data); // Set isEnrolled to true if there is enrollment data
        setEnrollLoading(false);
      } catch (error) {
        setIsEnrolled(false); // Set isEnrolled to false if there is an error or no enrollment data
        setEnrollLoading(false);
      }
    };

    if (course) {
      fetchEnrollmentStatus();
    }
  }, [authToken, course]); // Run the effect whenever the course changes

  const courseId = course.id;
  const enrollHandler = async () => {
    try {
      const response = await axios.post(
        `${API_ENDPOINT}/api/courses/${courseId}/enroll/`,
        {},
        {
          headers: {
            Authorization: `Token ${authToken}`, // Include the authentication token in the request headers
          },
        }
      );

      // If the enrollment is successful, you can handle it accordingly
      console.log("Enrollment successful: ", response.data);
    } catch (error: any) {
      // Handle errors during enrollment
      console.error("Enrollment failed: ", error.response.data);
    }
  };

  const cartHandler = async () => {
    try {
      const response = axios.post(
        `${API_ENDPOINT}/api/courses/${courseId}/add-to-cart/`,
        {},
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      console.log("added to cart", (await response).data);
    } catch (error: any) {
      error.response?.data || error.message;
    }
  };

  const handleDeleteCourse = () => {
    axios
      .delete(`${API_ENDPOINT}/api/courses/${courseId}/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((_response) => {
        console.log("deleted course successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-700 dark:text-gray-300">
        {t("Loading Course")} {/* Translate static text */}
      </div>
    );
  }
  if (isLoading1) {
    return (
      <div className="text-center text-gray-700 dark:text-gray-300">
        {t("Loading Modules")} {/* Translate static text */}
      </div>
    );
  }

  if (isError || isError1) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        {errorMessage}
        {errorMessage1}
      </div>
    );
  }

  let isCreator = false;

  let userData = null;
  const userDataString = localStorage.getItem("userData");

  if (userDataString) {
    try {
      userData = JSON.parse(userDataString);
    } catch (error) {
      console.error("Error parsing userData:", error);
    }
  }

  let userId = null;

  if (userData) {
    userId = userData.user_id;
  }

  if (userId && course.instructorId == userId) {
    isCreator = true;
  }

  console.log("instr id", course.instructorId);
  console.log("user id", userId);

  return (
    <div className=" mx-16 p-8">
      {course ? (
        <div>
          <div className="grid grid-cols-7 gap-8 bg-slate-50 p-2">
            <div className="mb-4 col-span-3">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <div className="col-start-4 col-span-3">
              <div className="flex justify-between">
                <h2
                  data-testid="course-title"
                  className="text-4xl font-bold mb-4"
                >
                  {course.title}
                </h2>
              </div>

              <p className="text-sm mb-2"> {course.category_name}</p>
              <p className="text-lg text-gray-700 col-span-2 col-start-3 mb-4">
                {course.description}
              </p>
              <div className="flex gap-10 mx-20">
                <h3 data-testid="course-rating">
                  {t("Rating")} {course.rating}/5
                </h3>
                <h3 data-testid="course-level">
                  {t("Level")} {course.level}
                </h3>
                <h3 data-testid="course-learners">
                  {course.enrolledStudents}+ {t("Learners")}
                </h3>
              </div>
              <div className="flex m-auto justify-center my-9">
                <div>
                  {enrollLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <div>
                      {isEnrolled ? (
                        <Link
                          to="coursedashboard"
                          className="bg-violet-900 text-white hover:bg-violet-950 shadow px-20 py-2 my-5 rounded-md items-center mx-auto"
                        >
                          {t("Open Course")} {/* Translate static text */}
                        </Link>
                      ) : isAuthenticated ? (
                        <div className="flex gap-4 mx-6">
                          <button
                            id="enroll-now"
                            className="bg-violet-900 text-white hover:bg-violet-950  px-20 py-2 my-5 rounded-md items-center mx-auto"
                            onClick={enrollHandler}
                          >
                            {t("Buy Now")} {/* Translate static text */}
                          </button>
                          <button
                            className="bg-violet-800 text-white hover:bg-violet-900 px-20 py-2 my-5 rounded-md items-center mx-auto"
                            onClick={cartHandler}
                          >
                            {t("Add to cart")} {/* Translate static text */}
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <a
                            className="bg-violet-900 text-white hover:bg-violet-950 px-20 py-2 my-5 rounded-md items-center mx-auto"
                            href="/signin"
                          >
                            {t("Buy Now")} {/* Translate static text */}
                          </a>
                          <a
                            className="bg-violet-500 text-white hover:bg-violet-900 px-20 py-2 my-5 rounded-md items-center mx-auto"
                            href="/signin"
                          >
                            {t("Add to Cart")} {/* Translate static text */}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              {isCreator && (
                <div className="flex">
                  <CourseEditForm course={course} courseId={course.id} />
                  <button
                    className="bg-red-600 text-white ml-2 px-2 rounded-md  "
                    onClick={handleDeleteCourse}
                  >
                    {t("Delete")} {/* Translate static text */}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4 w-full  p-3">
            <h1 className="text-3xl font-semibold my-2">
              {t("What you will learn in")} {course.title}
            </h1>
            <div className="flex">{course.syllabus}</div>
          </div>
          <div className="grid grid-cols-9 gap-6">
            <div className="mb-4 p-3 col-span-6">
              <div>
                <h1 className="text-3xl font-semibold my-2">
                  {t("Course Outline")}
                </h1>
                <ul>
                  {modules.map((module: any) => (
                    <li
                      key={module.id}
                      className={`cursor-pointer pr-5 pl-5 py-4 border hover:bg-slate-200 bg-slate-100 my-2 ${
                        selectedModule === module.id ? "bg-slate-200" : ""
                      }`}
                      onClick={() => handleModuleClick(module.id)}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">
                          {module.title}
                        </h3>
                        <span className="text-lg">
                          {selectedModule === module.id ? "▲" : "▼"}
                        </span>
                      </div>
                      {selectedModule === module.id && (
                        <p className="text-md">{module.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full my-5">
                <h1 className="text-3xl font-semibold my-2">
                  {t("Instructor Details")}
                </h1>
                <div className="flex gap-7 border p-5 rounded">
                  <div>
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                      alt="profile"
                      className=" w-56 h-28 "
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{course.instructor}</p>
                    <p>
                      {t(
                        "Instructor is someone who teaches at an institution. They may also serve on academic and administrative committees that review policies and may supervise graduate students' theses. An instructor is a college or university teacher who is below professorial rank."
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h1 className="text-2xl font-semibold my-2">
                  {t("Prerequisites")}
                </h1>
                <p>{course.prerequisites}</p>
              </div>

              <div className="mb-4">
                <h1 className="text-2xl font-semibold my-2">
                  {t("Resources")}
                </h1>
                <p>{course.resources}</p>
              </div>
            </div>
            <div className="course-card mx-5 p-4 border rounded-md w-full h-fit col-start-7 col-span-3 shadow-md overflow-y-auto lg:sticky lg:top-0">
              <div className="mx-5">
                <h1 className="text-4xl my-4 font-bold">{course.title}</h1>
                <p className="text-lg font-semibold my-4">
                  {t("With this course you get")}
                </p>
                <h1 className="text-lg my-4">{t("Free lifetime access")}</h1>
                <h1 className="text-lg my-4">
                  {t("Course Completion certificate")}
                </h1>

                <h1 className="text-lg my-4">
                  {course.duration} hrs {t("learning")}
                </h1>
                <h1 className="text-lg font-bold my-4"> RS {course.price} </h1>
                <div className="flex mx-auto">
                  {isEnrolled ? (
                    <button
                      className="bg-violet-900 text-white hover:bg-violet-950 px-20 py-2 mb-5 w-96  rounded-md items-center mx-auto"
                      // onClick={enrollHandler}
                    >
                      {t("Start Learning")} {/* Translate static text */}
                    </button>
                  ) : (
                    <button
                      className="bg-violet-900 text-white hover:bg-violet-950 px-20 py-2 mb-5 w-96  rounded-md items-center mx-auto"
                      onClick={enrollHandler}
                    >
                      {t("Enroll Now")} {/* Translate static text */}
                    </button>
                  )}
                </div>
                <div className="flex gap-3">
                  {isEnrolled ? (
                    <button
                      className="bg-cyan-800 text-white hover:bg-cyan-950 px-5 py-2 w-48  mb-2 rounded-md items-center mx-auto"
                      // onClick={cartHandler}
                    >
                      {t("Open Course")} {/* Translate static text */}
                    </button>
                  ) : (
                    <button
                      className="bg-cyan-800 text-white hover:bg-cyan-950 px-5 py-2 w-48  mb-2 rounded-md items-center mx-auto"
                      onClick={cartHandler}
                    >
                      {t("Add to Cart")} {/* Translate static text */}
                    </button>
                  )}

                  <button className="bg-cyan-800 text-white hover:bg-cyan-950 1x-20 py-2 w-48  mb-2 rounded-md items-center mx-auto">
                    {t("Share to friends")} {/* Translate static text */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-red-600 dark:text-red-400">
          {t("Failed to load course details.")} {/* Translate static text */}
        </div>
      )}
    </div>
  );
}

// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useCourseDetailsState } from "../../context/course_details/context";
// import { useModuleState } from "../../context/module/context";
// import { Link } from "react-router-dom";

// import axios from "axios";
// import CourseEditForm from "./CourseEditForm";
// import { API_ENDPOINT } from "../../config/constants";

// export default function CourseDetails() {
//   const [selectedModule, setSelectedModule] = useState(null);
//   const [isEnrolled, setIsEnrolled] = useState(false);

//   const handleModuleClick = (moduleId: null) => {
//     // Toggle selected module when clicked
//     setSelectedModule((prevModule) =>
//       prevModule === moduleId ? null : moduleId
//     );
//   };

//   // const navigate = useNavigate();
//   const courseDetailsState: any = useCourseDetailsState();
//   const moduleState: any = useModuleState();

//   const { course, isLoading, isError, errorMessage } = courseDetailsState;
//   const { modules, isLoading1, isError1, errorMessage1 } = moduleState;

//   const authToken = localStorage.getItem("authToken");
//   const isAuthenticated = !!localStorage.getItem("authToken");

//   useEffect(() => {
//     // Fetch enrollment status when the component mounts
//     const fetchEnrollmentStatus = async () => {
//       try {
//         const response = await axios.get(
//           `${API_ENDPOINT}/api/check-enrollment/${course.id}/`,
//           {
//             headers: {
//               Authorization: `Token ${authToken}`,
//             },
//           }
//         );
//         setIsEnrolled(!!response.data); // Set isEnrolled to true if there is enrollment data
//       } catch (error) {
//         setIsEnrolled(false); // Set isEnrolled to false if there is an error or no enrollment data
//       }
//     };

//     if (course) {
//       fetchEnrollmentStatus();
//     }
//   }, [authToken, course]); // Run the effect whenever the course changes

//   const courseId = course.id;
//   const enrollHandler = async () => {
//     try {
//       const response = await axios.post(
//         `${API_ENDPOINT}/api/courses/${courseId}/enroll/`,
//         {},
//         {
//           headers: {
//             Authorization: `Token ${authToken}`, // Include the authentication token in the request headers
//           },
//         }
//       );

//       // If the enrollment is successful, you can handle it accordingly
//       console.log("Enrollment successful: ", response.data);
//     } catch (error: any) {
//       // Handle errors during enrollment
//       console.error("Enrollment failed: ", error.response.data);
//     }
//   };

//   const cartHandler = async () => {
//     try {
//       const response = axios.post(
//         `${API_ENDPOINT}/api/courses/${courseId}/add-to-cart/`,
//         {},
//         {
//           headers: {
//             Authorization: `Token ${authToken}`,
//           },
//         }
//       );

//       console.log("added to cart", (await response).data);
//     } catch (error: any) {
//       error.response?.data || error.message;
//     }
//   };

//   const handleDeleteCourse = () => {
//     axios
//       .delete(`${API_ENDPOINT}/api/courses/${courseId}/`, {
//         headers: {
//           Authorization: `Token ${authToken}`,
//         },
//       })
//       .then((_response) => {
//         console.log("deleted course successfully");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   if (isLoading) {
//     return (
//       <div className="text-center text-gray-700 dark:text-gray-300">
//         Loading Course...
//       </div>
//     );
//   }
//   if (isLoading1) {
//     return (
//       <div className="text-center text-gray-700 dark:text-gray-300">
//         Loading Modules...
//       </div>
//     );
//   }

//   if (isError || isError1) {
//     return (
//       <div className="text-center text-red-600 dark:text-red-400">
//         {errorMessage}
//         {errorMessage1}
//       </div>
//     );
//   }

//   let isCreator = false;
//   // const userDataString = localStorage.getItem("userData") || "";
//   // const userData = JSON.parse(userDataString) || "";

//   let userData = null;
//   const userDataString = localStorage.getItem("userData");

//   if (userDataString) {
//     try {
//       userData = JSON.parse(userDataString);
//     } catch (error) {
//       console.error("Error parsing userData:", error);
//     }
//   }

//   let userId = null;

//   if (userData) {
//     userId = userData.user_id;
//   }

//   if (userId && course.instructorId == userId) {
//     isCreator = true;
//   }

//   console.log("instr id", course.instructorId);
//   console.log("user id", userId);

//   return (
//     <div className=" mx-16 p-8">
//       {course ? (
//         <div>
//           <div className="grid grid-cols-7 gap-8 bg-slate-50 p-2">
//             <div className="mb-4 col-span-3">
//               <img
//                 src={course.image}
//                 alt={course.title}
//                 className="w-full h-auto rounded-lg shadow-md"
//               />
//             </div>

//             <div className="col-start-4 col-span-3">
//               <div className="flex justify-between">
//                 <h2
//                   data-testid="course-title"
//                   className="text-4xl font-bold mb-4"
//                 >
//                   {course.title}
//                 </h2>
//               </div>

//               <p className="text-sm mb-2"> {course.category_name}</p>
//               <p className="text-lg text-gray-700 col-span-2 col-start-3 mb-4">
//                 {course.description}
//               </p>
//               <div className="flex gap-10 mx-20">
//                 <h3 data-testid="course-rating">Rating {course.rating}/5</h3>
//                 <h3 data-testid="course-level">Level {course.level}</h3>
//                 <h3 data-testid="course-learners">
//                   {course.enrolledStudents}+ Learners
//                 </h3>
//               </div>
//               <div className="flex mx-auto">
//                 {isEnrolled ? (
//                   <Link
//                     to="coursedashboard"
//                     className="bg-violet-900 text-white hover:bg-violet-950 shadow px-20 py-2 my-5 rounded-md items-center mx-auto"
//                   >
//                     Open Course
//                   </Link>
//                 ) : isAuthenticated ? (
//                   <div className="flex gap-4 mx-6">
//                     <button
//                       id="enroll-now"
//                       className="bg-violet-900 text-white hover:bg-violet-950  px-20 py-2 my-5 rounded-md items-center mx-auto"
//                       onClick={enrollHandler}
//                     >
//                       Buy Now
//                     </button>
//                     <button
//                       className="bg-violet-800 text-white hover:bg-violet-900 px-20 py-2 my-5 rounded-md items-center mx-auto"
//                       onClick={cartHandler}
//                     >
//                       Add to cart
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex gap-3">
//                     <a
//                       className="bg-violet-900 text-white hover:bg-violet-950 px-20 py-2 my-5 rounded-md items-center mx-auto"
//                       href="/signin"
//                     >
//                       Buy Now
//                     </a>
//                     <a
//                       className="bg-violet-500 text-white hover:bg-violet-900 px-20 py-2 my-5 rounded-md items-center mx-auto"
//                       href="/signin"
//                     >
//                       Add to Cart
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div>
//               {isCreator && (
//                 <div className="flex">
//                   <CourseEditForm course={course} courseId={course.id} />
//                   <button
//                     className="bg-red-600 text-white ml-2 px-2 rounded-md  "
//                     onClick={handleDeleteCourse}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="mb-4 w-full  p-3">
//             <h1 className="text-3xl font-semibold my-2">
//               What you will learn in {course.title}
//             </h1>
//             <div className="flex">
//               {
//                 course.syllabus
//                 // .split(",")
//                 // .map((item: string, index: React.Key | null | undefined) => (
//                 //   <p className=" mx-2" key={index}>
//                 //     → {item.trim()}
//                 //   </p>
//                 // ))
//               }
//             </div>
//           </div>
//           <div className="grid grid-cols-9 gap-6">
//             <div className="mb-4 p-3 col-span-6">
//               <div>
//                 <h1 className="text-3xl font-semibold my-2">Course Outline</h1>
//                 <ul>
//                   {modules.map((module: any) => (
//                     <li
//                       key={module.id}
//                       className={`cursor-pointer pr-5 pl-5 py-4 border hover:bg-slate-200 bg-slate-100 my-2 ${
//                         selectedModule === module.id ? "bg-slate-200" : ""
//                       }`}
//                       onClick={() => handleModuleClick(module.id)}
//                     >
//                       <div className="flex justify-between items-center">
//                         <h3 className="text-lg font-semibold">
//                           {module.title}
//                         </h3>
//                         <span className="text-lg">
//                           {selectedModule === module.id ? "▲" : "▼"}
//                         </span>
//                       </div>
//                       {selectedModule === module.id && (
//                         <p className="text-md">{module.description}</p>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="w-full my-5">
//                 <h1 className="text-3xl font-semibold my-2">
//                   Instructor Details
//                 </h1>
//                 <div className="flex gap-7 border p-5 rounded">
//                   <div>
//                     <img
//                       src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
//                       alt="profile"
//                       className=" w-56 h-28 "
//                     />
//                   </div>
//                   <div>
//                     <p className="text-lg font-semibold">{course.instructor}</p>
//                     <p>
//                       Instructor is someone who teaches at an institution. They
//                       may also serve on academic and administrative committees
//                       that review policies and may supervise graduate students'
//                       theses. An instructor is a college or university teacher
//                       who is below professorial rank.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <h1 className="text-2xl font-semibold my-2">Prerequisites</h1>
//                 <p>{course.prerequisites}</p>
//               </div>

//               <div className="mb-4">
//                 <h1 className="text-2xl font-semibold my-2">Resources</h1>
//                 <p>{course.resources}</p>
//               </div>
//             </div>
//             <div className="course-card mx-5 p-4 border rounded-md w-full h-fit col-start-7 col-span-3 shadow-md overflow-y-auto lg:sticky lg:top-0">
//               <div className="mx-5">
//                 <h1 className="text-4xl my-4 font-bold">{course.title}</h1>
//                 <p className="text-lg font-semibold my-4">
//                   With this course you get
//                 </p>
//                 <h1 className="text-lg my-4">Free lifetime access</h1>
//                 <h1 className="text-lg my-4">Course Completion certificate</h1>

//                 <h1 className="text-lg my-4">{course.duration} hrs learning</h1>
//                 <h1 className="text-lg font-bold my-4"> RS {course.price} </h1>
//                 <div className="flex mx-auto">
//                   {isEnrolled ? (
//                     <button
//                       className="bg-violet-900 text-white hover:bg-violet-950 px-20 py-2 mb-5 w-96  rounded-md items-center mx-auto"
//                       // onClick={enrollHandler}
//                     >
//                       Start Learning
//                     </button>
//                   ) : (
//                     <button
//                       className="bg-violet-900 text-white hover:bg-violet-950 px-20 py-2 mb-5 w-96  rounded-md items-center mx-auto"
//                       onClick={enrollHandler}
//                     >
//                       Enroll Now
//                     </button>
//                   )}
//                 </div>
//                 <div className="flex gap-3">
//                   {isEnrolled ? (
//                     <button
//                       className="bg-cyan-800 text-white hover:bg-cyan-950 px-5 py-2 w-48  mb-2 rounded-md items-center mx-auto"
//                       // onClick={cartHandler}
//                     >
//                       Open Course
//                     </button>
//                   ) : (
//                     <button
//                       className="bg-cyan-800 text-white hover:bg-cyan-950 px-5 py-2 w-48  mb-2 rounded-md items-center mx-auto"
//                       onClick={cartHandler}
//                     >
//                       Add to Cart
//                     </button>
//                   )}

//                   <button className="bg-cyan-800 text-white hover:bg-cyan-950 1x-20 py-2 w-48  mb-2 rounded-md items-center mx-auto">
//                     Share to friends
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="text-center text-red-600 dark:text-red-400">
//           Failed to load course details.
//         </div>
//       )}
//     </div>
//   );
// }
