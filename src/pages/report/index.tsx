import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
// import ReportDetailsItems from "./ReportDetailsItems";
const ReportDetailsItems = React.lazy(() => import("./ReportDetailsItems"));
// Just import the file
// import RichTextEditor from "../../components/RichTextEditor";

const ReportIndex = () => {
  // And use it after the h1 tag
  return (
    <div className="">
      <div className="">
        {/* <RichTextEditor /> */}
        {/* <ReportDetailsItems /> */}
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading...</div>}
          >
            <ReportDetailsItems />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};
export default ReportIndex;
