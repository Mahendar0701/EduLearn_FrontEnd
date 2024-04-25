import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import CourseListItems from "./CourseListItems";
// import CourseList from "./CourseList";
// const CourseList = React.lazy(() => import("./CourseList"));

const Courses = () => {
  return (
    <>
      <div className="">
        {/* <ArticleList /> */}
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading....</div>}
          >
            {/* <CourseList /> */}
            <CourseListItems />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};
export default Courses;
