import { Navigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../config/constants";

export default function ProtectedEnrolledRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { pathname } = useLocation();
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);
  const { courseID } = useParams();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchEnrollmentStatus = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINT}/api/check-enrollment/${courseID}/`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );
        console.log("API Response:", response.data);
        setIsEnrolled(true);
      } catch (error) {
        console.error("API Error:", error);
        setIsEnrolled(false);
      }
    };

    fetchEnrollmentStatus();
  }, [courseID, authToken]);

  // Check if isEnrolled is true, render children, if false, navigate to /dashboard
  if (isEnrolled === null) {
    // Return a loading state or any other placeholder while waiting for the API response
    return <div>Loading...</div>;
  }

  // If isEnrolled is true, render the children, otherwise, navigate to /dashboard
  return isEnrolled ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" replace state={{ referrer: pathname }} />
  );
}
