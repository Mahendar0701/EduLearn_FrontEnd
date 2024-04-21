import React, { Suspense } from "react";
// Just import the file
import ProfileItems from "./ProfileItems";
// import ProfileEditForm from "./EditProfileForm";
const ProfileEditForm = React.lazy(() => import("./EditProfileForm"));
import ErrorBoundary from "../../components/ErrorBoundary";
// import RichTextEditor from "../../components/RichTextEditor";

const ProfileIndex: React.FC = () => {
  // And use it after the h1 tag
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        {/* <ProfileEditForm /> */}
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading...</div>}
          >
            <ProfileEditForm />
          </Suspense>
        </ErrorBoundary>

        {/* <RichTextEditor /> */}
      </div>
    </div>
  );
};
export default ProfileIndex;
