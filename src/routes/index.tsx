import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import Dashboard from "../pages/dashboard";
import CourseDetailsIndex from "../pages/courseDetails";
import AccountLayout from "../layouts/account";
import CourseContainer from "../pages/courses/CourseContainer";
import Courses from "../pages/courses";
import { Children, Suspense } from "react";
// import CourseDashboard from "../pages/courseDashboard";
// import CourseDashboardIndex from "../pages/courseDashboard";
const CourseDashboardIndex = React.lazy(
  () => import("../pages/courseDashboard")
);
// import LessonDetails from "../pages/courseDashboard/LessonDetails";
const LessonDetails = React.lazy(
  () => import("../pages/courseDashboard/LessonDetails")
);
import ProtectedRoute from "./ProtectedRoute";
// import ProfileIndex from "../pages/profile";
const ProfileIndex = React.lazy(() => import("../pages/profile"));
// import MyCourses from "../pages/myCourses";
const MyCourses = React.lazy(() => import("../pages/myCourses"));
// import ReportIndex from "../pages/report";
const ReportIndex = React.lazy(() => import("../pages/report"));
import ProtectedEnrolledRoute from "./ProtectedEnrolledRoute";
// import CategoryCourses from "../pages/categories/CategoryCourses";
const CategoryCourses = React.lazy(
  () => import("../pages/categories/CategoryCourses")
);
// import CartDetailsIndex from "../pages/userCart";
const CartDetailsIndex = React.lazy(() => import("../pages/userCart"));

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "profile",
    index: true,
    element: (
      <ProtectedRoute>
        {/* <ProfileIndex /> */}
        <Suspense
          fallback={<div className="suspense-loading">Loading....</div>}
        >
          <ProfileIndex />
        </Suspense>
      </ProtectedRoute>
    ),
  },

  {
    path: "/dashboard",
    element: <AccountLayout />,
    children: [
      {
        index: true,
        element: (
          // <Dashboard />

          <Dashboard />
        ),
      },
      {
        path: "mycourses",
        index: true,
        element: (
          <ProtectedRoute>
            {/* <MyCourses /> */}
            <Suspense
              fallback={<div className="suspense-loading">Loading....</div>}
            >
              <MyCourses />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "report",
        index: true,
        element: (
          <ProtectedRoute>
            {/* <ReportIndex /> */}
            <Suspense
              fallback={<div className="suspense-loading">Loading....</div>}
            >
              <ReportIndex />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "catalog",
        children: [
          {
            path: ":catalogID",
            children: [
              {
                index: true,
                element: (
                  // <CategoryCourses />
                  <Suspense
                    fallback={
                      <div className="suspense-loading">Loading....</div>
                    }
                  >
                    <CategoryCourses />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "cart",
        children: [
          {
            // path: ":cart",
            children: [
              {
                index: true,
                element: (
                  // <CartDetailsIndex />
                  <Suspense
                    fallback={
                      <div className="suspense-loading">Loading....</div>
                    }
                  >
                    <CartDetailsIndex />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "courses",
        children: [
          {
            path: ":courseID",
            children: [
              {
                index: true,
                element: (
                  // <CourseDetailsIndex />
                  <Suspense
                    fallback={
                      <div className="suspense-loading">Loading....</div>
                    }
                  >
                    <CourseDetailsIndex />
                  </Suspense>
                ),
              },
              // {
              //   path: "modules/:moduleID/lessons",
              //   index: true,
              //   element: <CourseDashboardIndex />,
              // },
              {
                path: "modules/:moduleID/lessons",
                // index: true,
                element: (
                  // <ProtectedRoute>
                  <ProtectedEnrolledRoute>
                    {/* <CourseDashboardIndex /> */}
                    <Suspense
                      fallback={
                        <div className="suspense-loading">Loading....</div>
                      }
                    >
                      <CourseDashboardIndex />
                    </Suspense>
                  </ProtectedEnrolledRoute>
                  // </ProtectedRoute>
                ),
                children: [
                  {
                    path: ":lessonID",
                    element: (
                      <ProtectedEnrolledRoute>
                        {/* <LessonDetails /> */}
                        <Suspense
                          fallback={
                            <div className="suspense-loading">Loading....</div>
                          }
                        >
                          <LessonDetails />
                        </Suspense>
                      </ProtectedEnrolledRoute>
                    ),
                    // element: <CourseDashboardIndex />,
                  },
                ],
              },
              {
                path: "coursedashboard",
                index: true,
                element: (
                  // <ProtectedRoute>
                  <ProtectedEnrolledRoute>
                    {/* <CourseDashboardIndex /> */}
                    <Suspense
                      fallback={
                        <div className="suspense-loading">Loading....</div>
                      }
                    >
                      <CourseDashboardIndex />
                    </Suspense>
                  </ProtectedEnrolledRoute>
                  // {/* </ProtectedRoute> */}
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
