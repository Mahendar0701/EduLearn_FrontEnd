import React, { Suspense } from "react";
// import MycoursesList from "./MycoursesList";
const MycoursesList = React.lazy(() => import("./MycoursesList"));
import ErrorBoundary from "../../components/ErrorBoundary";

const MyCourses = () => {
  return (
    <>
      <div className="">
        {/* <ArticleList /> */}

        {/* <MycoursesList /> */}
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading....</div>}
          >
            <MycoursesList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};
export default MyCourses;
