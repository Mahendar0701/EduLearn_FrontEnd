import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
// import { ThemeContext } from "./context/theme";
// import { useContext } from "react";
import { CourseProvider } from "./context/courses/context";
import { ModuleProvider } from "./context/module/context";
import { CourseDetailsProvider } from "./context/course_details/context";
import { LessonProvider } from "./context/lessons/context";
import "./i18n";
import { CategoryProvider } from "./context/categories/context";
import { ToastContainer } from "react-toastify";

const App = () => {
  // const { theme } = useContext(ThemeContext);
  return (
    <div className={`h-full w-full  `}>
      <CategoryProvider>
        <CourseProvider>
          <ModuleProvider>
            <LessonProvider>
              <CourseDetailsProvider>
                <RouterProvider router={router} />
                <ToastContainer />
              </CourseDetailsProvider>
            </LessonProvider>
          </ModuleProvider>
        </CourseProvider>
      </CategoryProvider>
    </div>
  );
};
export default App;
