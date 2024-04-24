// import React from "react";
// import Signup from "./pages/signup";
// import Signin from "./pages/signin";
// // import Signup from "../pages/signup";

// function App() {
//   return (
//     <div>
//       {/* Other components or content in your App */}
//       <Signup />
//       <Signin />
//     </div>
//   );
// }

// export default App;

// import React from "react";
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

const App = () => {
  // const { theme } = useContext(ThemeContext);
  return (
    <div className={`h-full w-full  `}>
      <CourseProvider>
        <ModuleProvider>
          <LessonProvider>
            <CourseDetailsProvider>
              <RouterProvider router={router} />
            </CourseDetailsProvider>
          </LessonProvider>
        </ModuleProvider>
      </CourseProvider>
    </div>
  );
};
export default App;
