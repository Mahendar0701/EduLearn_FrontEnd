/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModuleType } from "../../type";
import NewModule from "../module/ModuleForm";
// import { ModuleType } from "./types";

interface SidebarProps {
  isCreator: boolean;
  course: any; // Adjust the type as per your data structure
  courseID: any;
  isLoading: boolean;
  isLoading1: boolean;
  isSidebarOpen: boolean;
  modules: ModuleType[]; // Add type annotation for modules
  handleModuleClick: (module: ModuleType) => void;
  isModuleCompleted: (moduleId: number) => boolean;
  selectedModule: ModuleType | undefined;
}

const Sidebar = ({
  isCreator,
  course,
  isLoading1,
  courseID,
  modules,
  isSidebarOpen,
  handleModuleClick,
  isModuleCompleted,
  selectedModule,
}: SidebarProps) => {
  return (
    <div
      className={`w-1/4 p-4 border-r overflow-y-scroll ${
        isSidebarOpen ? "" : "hidden" // Hide or show sidebar based on isSidebarOpen
      }`}
      style={{ height: "90vh", position: "sticky", top: 0 }}
    >
      <div>
        <h1 className="text-xl font-semibold mb-3 text-center ">
          {course.title}-{course.category_name}
        </h1>
        <img src={`${course.image}`} className="rounded-md my-2" alt="" />
      </div>

      <hr />

      <Link to={`/dashboard/courses/${course.id}/coursedashboard`}>
        <button className="cursor-pointer w-full pr-5 pl-5 py-4  border bg-gray-700 hover:bg-gray-900">
          <p className="text-white">My Learning</p>
        </button>
      </Link>

      {isLoading1 ? (
        <div>Loading Modules</div>
      ) : (
        <ul>
          {modules.map((module: any) => (
            <Link
              to={`/dashboard/courses/${courseID}/modules/${module.id}/lessons`}
              onClick={() => handleModuleClick(module)}
            >
              <li
                key={module.id}
                className={`cursor-pointer pr-5 pl-5 py-4 my-1 border ${
                  isModuleCompleted(module.id) ? "border-green-500" : ""
                } hover:bg-slate-200 ${
                  selectedModule === module ? "bg-slate-200" : "bg-slate-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{module.title}</h3>
                  <span className="text-lg">
                    {selectedModule === module ? "▶" : "▼"}
                  </span>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
      {isCreator && <NewModule />}
    </div>
  );
};

export default Sidebar;
