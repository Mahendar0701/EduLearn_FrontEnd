// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useCourseDetailsState } from "../../context/course_details/context";
// import { useModuleState } from "../../context/module/context";
// import { useLessonState } from "../../context/lessons/context";
// import axios from "axios";
// import LessonDetails from "./LessonDetails";

// export default function ModuleTab() {
//   const [selectedModule, setSelectedModule] = useState(null);
//   const [selectedLesson, setSelectedLesson] = useState(null);
//   console.log("selected module", selectedModule);

//   const navigate = useNavigate();
//   const { courseID } = useParams(); // Extract courseID from the URL parameters

//   const handleModuleClick = (moduleId) => {
//     setSelectedModule((prevModule) =>
//       prevModule === moduleId ? null : moduleId
//     );
//     setSelectedLesson(null); // Reset selected lesson when a new module is clicked
//   };

//   const handleLessonClick = (lessonId) => {
//     setSelectedLesson((prevLesson) =>
//       prevLesson === lessonId ? null : lessonId
//     );
//   };

//   const courseDetailsState = useCourseDetailsState();
//   const moduleState = useModuleState();
//   const lessonState = useLessonState();

//   const { course, isLoading, isError, errorMessage } = courseDetailsState;
//   const { modules, isLoading1, isError1, errorMessage1 } = moduleState;
//   const { lessons, isLoading2, isError2, errorMessage2 } = lessonState;

//   if (isLoading || isLoading1 || isLoading2) {
//     return (
//       <div className="text-center text-gray-700 dark:text-gray-300">
//         Loading...
//       </div>
//     );
//   }

//   if (isError || isError1 || isError2) {
//     return (
//       <div className="text-center text-red-600 dark:text-red-400">
//         Error: {errorMessage || errorMessage1 || errorMessage2}
//       </div>
//     );
//   }

//   return (
//     <div className="flex">
//       {/* Sidebar with Module List */}
//       <div className="w-1/4 p-4 border-r">
//         <h1 className="text-3xl font-semibold my-2">Course Outline</h1>
//         <ul>
//           {modules.map((module) => (
//             <li
//               key={module.id}
//               className={`cursor-pointer pr-5 pl-5 py-4 border hover:bg-slate-200 bg-slate-100 my-2 ${
//                 selectedModule === module.id ? "bg-slate-200" : ""
//               }`}
//               onClick={() => {
//                 handleModuleClick(module.id);
//                 navigate(
//                   `/dashboard/courses/${courseID}/modules/${module.id}/lessons`
//                 );
//               }}
//             >
//               <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-semibold">{module.title}</h3>
//                 <span className="text-lg">
//                   {selectedModule === module.id ? "▲" : "▼"}
//                 </span>
//               </div>
//               {selectedModule === module.id && (
//                 <p className="text-md">{module.description}</p>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
