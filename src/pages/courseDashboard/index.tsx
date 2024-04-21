// Dashboard.tsx
import React, { Suspense } from "react";
// import CourseDashboard from "./CourseDashboard";
const CourseDashboard = React.lazy(() => import("./CourseDashboard"));
import ErrorBoundary from "../../components/ErrorBoundary";

const CourseDashboardIndex: React.FC = () => {
  return (
    <div>
      {/* <h1 className="">Welcome to the Dashboard!</h1> */}
      {/* <CourseDashboard />; */}
      <ErrorBoundary>
        <Suspense
          fallback={<div className="suspense-loading">Loading....</div>}
        >
          <CourseDashboard />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default CourseDashboardIndex;
