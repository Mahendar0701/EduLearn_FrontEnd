// LessonDetails.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LessonEditForm from "../lesson/EditLessonFormDialogue";

const LessonDetails = () => {
  const { courseID, moduleID, lessonID } = useParams();
  const [lessons, setLessons] = React.useState(null);
  const [selecteddLesson, setSelectedLesson] = React.useState(null);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);

  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch lesson details based on courseID, moduleID, and lessonID
    axios
      .get(
        `http://127.0.0.1:8000/api/courses/${courseID}/modules/${moduleID}/lessons/`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((response) => {
        setLessons(response.data);
        console.log("Lessons fetching ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching lessons:", error);
      });
  }, [courseID, moduleID, lessonID]);

  // console.log("authToken", authToken);

  useEffect(() => {
    // Check if the lesson is marked as complete

    axios
      .get(
        `http://127.0.0.1:8000/api/courses/${courseID}/modules/${moduleID}/lessons/${lessonID}/complete/`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((response) => {
        setIsLessonCompleted(true);
        console.log("completed lesson", response.data);
      })
      .catch((error) => {
        setIsLessonCompleted(false);
      });
  }, [courseID, moduleID, lessonID, authToken]);

  if (lessons === null) {
    return <div>Loading lesson details...</div>;
  }

  // Find the lesson only if it's not already selected
  if (!selecteddLesson) {
    const currentLesson = lessons.find(
      (lesson) => lesson.id === Number(lessonID)
    );
    setSelectedLesson(currentLesson);
  }

  if (!selecteddLesson) {
    return <div>Loading lesson details...</div>;
  }

  const findLessonIndex = (lessonId) => {
    return lessons.findIndex((lesson) => lesson.id === Number(lessonId));
  };

  const currentIndex = findLessonIndex(lessonID);
  const previousLesson = lessons[currentIndex - 1];
  const nextLesson = lessons[currentIndex + 1];
  console.log("nextLesson", currentIndex, nextLesson);

  const navigateToLesson = (lessonId) => {
    setSelectedLesson(lessons.find((lesson) => lesson.id === Number(lessonId)));
    navigate(
      `/dashboard/courses/${courseID}/modules/${moduleID}/lessons/${lessonId}`
    );
    console.log("selecteddLesson", selecteddLesson);
  };

  const handleMarkAsComplete = () => {
    // Send a POST request to mark the lesson as complete
    const token = localStorage.getItem("authToken");

    axios
      .post(
        `http://127.0.0.1:8000/api/courses/${courseID}/modules/${moduleID}/lessons/${lessonID}/complete/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        setIsLessonCompleted(true);
        console.log("marked lesson as complete");
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
      });
  };

  const handleLessonDelete = () => {
    axios
      .delete(
        `http://127.0.0.1:8000/api/courses/${courseID}/modules/${moduleID}/lessons/${lessonID}/`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((response) => {
        console.log("deleted lesson successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const match = selecteddLesson.video_link.match(
    /(?:youtu.be\/|youtube(?:-nocookie)?.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );

  // Check if a match is found
  let embeddedUrl = "";
  if (match) {
    const videoId = match[1];
    // Construct the embedded URL
    embeddedUrl = `https://www.youtube.com/embed/${videoId}`;
  }
  const renderedContent = { __html: selecteddLesson.content };

  let isCreator = false;
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const userId = userData.user_id;

  if (userId && selecteddLesson.instructorId == userId) {
    isCreator = true;
  }

  console.log("instr id", selecteddLesson.instructorId);
  console.log("user id", userId);
  return (
    <div className="mx-32 ">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold ">{selecteddLesson.title}</h1>
        {isLessonCompleted && (
          <p className="bg-green-400 px-14 py-2 mx-5 rounded-md items-center ">
            ✓✓ Completed
          </p>
        )}
      </div>
      <hr className="my-5 mr-10" />
      <div className="">
        <div
          className="text-md"
          dangerouslySetInnerHTML={renderedContent}
        ></div>

        {selecteddLesson.image_link && (
          <div>
            <img
              className="w-3/5 my-5"
              src={selecteddLesson.image_link}
              alt={selecteddLesson.title}
            />
          </div>
        )}
        {selecteddLesson.video_link && (
          <div className="mt-5">
            <iframe
              width="560"
              height="315"
              src={embeddedUrl}
              title={selecteddLesson.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
      {isCreator && (
        <div className="my-2">
          <LessonEditForm
            lesson={selecteddLesson}
            lessonId={selecteddLesson.id}
            courseId={courseID}
            moduleId={moduleID}
          />
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 mx-2 rounded-md"
            onClick={handleLessonDelete}
          >
            Delete{" "}
          </button>
        </div>
      )}
      <div>
        {isLessonCompleted ? (
          <p className="bg-gray-400 px-14 py-2  rounded-md text-center ">
            ✓✓ Marked as Completed
          </p>
        ) : (
          <button
            className="bg-green-600 text-white text-bold px-14 py-2 w-full rounded-md text-center "
            onClick={handleMarkAsComplete}
          >
            Mark as Complete
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mx-auto my-5 place-content-center justify-center">
        <div className="flex justify-start w-full">
          {previousLesson && (
            <button
              className="bg-violet-200 px-4 py-2 w-full rounded-md items-center"
              onClick={() => navigateToLesson(previousLesson.id)}
            >
              &larr; Previous
            </button>
          )}
        </div>

        <div className="flex justify-center">
          <button
            className="bg-slate-300 w-full px-4 py-2 rounded-md items-center"
            onClick={scrollToTop}
          >
            Scroll to top
          </button>
        </div>

        <div className="flex justify-end">
          {nextLesson && (
            <button
              className="bg-violet-200 px-4 py-2 w-full rounded-md items-center"
              onClick={() => navigateToLesson(nextLesson.id)}
            >
              Next &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
