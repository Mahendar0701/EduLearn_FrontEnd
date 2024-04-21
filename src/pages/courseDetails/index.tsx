import { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import React from "react";
// import CourseDetails from "./CourseDetails";
const CourseDetails = React.lazy(() => import("./CourseDetails"));

const CourseDetailsIndex = () => {
  return (
    <>
      <div className="">
        {/* <ArticleList /> */}
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading....</div>}
          >
            <CourseDetails />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
  // return <CourseDetails />;
};
export default CourseDetailsIndex;
