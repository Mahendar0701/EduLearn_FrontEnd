/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { API_ENDPOINT } from "../../config/constants";
import JoditEditor from "jodit-react";
import { Fragment, useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// First I'll import the addProject function
// import { addProject } from "../../context/projects/actions";

// // Then I'll import the useProjectsDispatch hook from projects context
// import { useProjectsDispatch } from "../../context/projects/context";
type EditFormInputs = {
  id: number;
  module: string;
  course: string;
  title: string;
  content: string;
  order: number;
  image_link: string;
  video_link: string;
  instructorId: number;
};
const LessonEditForm: React.FC<{
  lesson: EditFormInputs;
  lessonId: number;
  courseId: any;
  moduleId: any;
}> = ({ lesson, courseId, moduleId }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Next, I'll add a new state to handle errors.

  const editor = useRef(null);
  const [content, setContent] = useState("");

  // Then I'll call the useProjectsDispatch function to get the dispatch function
  // for projects
  //   const dispatchProjects = useProjectsDispatch();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<EditFormInputs>({
    defaultValues: {
      title: lesson.title,
      content: lesson.content,
      order: lesson.order,
      image_link: lesson.image_link,
      video_link: lesson.video_link,
      instructorId: lesson.instructorId,
    },
  });

  useEffect(() => {
    setContent(lesson.content); // Set initial content from lesson
  }, [lesson.content]);

  //   const { lessonId } = useParams<{ lessonId: string }>();
  function getCookie(name: string) {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));

    return cookieValue ? cookieValue.split("=")[1] : null;
  }
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const csrfToken = getCookie("csrftoken");
  const [error, setError] = useState<string | null>(null);

  const authToken = localStorage.getItem("authToken");
  const onSubmit: SubmitHandler<EditFormInputs> = async (data) => {
    // Handle the form submission logic
    // console.log("data", data);
    data.module = moduleId;
    data.course = courseId;
    data.content = content;
    try {
      const response = await axios.put(
        `${API_ENDPOINT}/api/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}/`,
        data,
        {
          headers: {
            "X-CSRFToken": csrfToken,
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Lesson updated successfully", response.data);

      setIsOpen(false);

      // Clear previous errors if any
      setError(null);

      // Perform any necessary navigation or state updates after successful sign-in
    } catch (error: any) {
      console.error(
        "Lesson creation failed:",
        error.response?.data || error.message
      );
      setError("Invalid field entries");
    }
  };

  // let isCreator = false;
  const userDataString = localStorage.getItem("userData") || "";
  const userData = JSON.parse(userDataString);
  const userId = userData.user_id;

  // if (userId && lesson.instructorId == userId) {
  //   isCreator = true;
  // }

  console.log("instr id", lesson.instructorId);
  console.log("user id", userId);

  return (
    <>
      <button
        type="button"
        id="newProjectBtn"
        onClick={openModal}
        className="rounded-md bg-violet-900 hover:bg-violet-950 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Edit Lesson
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-3/5 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create new lesson
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex w-full gap-3 my-4">
                        <div className="w-1/2">
                          <label className="block text-gray-700 font-semibold my-2 ">
                            title:
                          </label>
                          <input
                            id="title"
                            type="title"
                            placeholder="Enter title..."
                            autoFocus
                            {...register("title", { required: true })}
                            className={`w-full border border-gray-400 rounded-md py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                              errors.title ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-gray-700 font-semibold my-2">
                            order:
                          </label>
                          <input
                            id="order"
                            type="order"
                            placeholder="Enter order..."
                            autoFocus
                            {...register("order", { required: true })}
                            className={`w-full border border-gray-400 rounded-md py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                              errors.order ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex w-full gap-3 my-4">
                        <div className="w-1/2">
                          <label className="block text-gray-700 font-semibold my-2">
                            image_link:
                          </label>
                          <input
                            id="image_link"
                            type="image_link"
                            placeholder="Enter image_link..."
                            autoFocus
                            {...register("image_link")}
                            className={`w-full border border-gray-400 rounded-md py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                              errors.image_link ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        <div className="w-1/2 ">
                          <label className="block text-gray-700 font-semibold my-2">
                            video_link:
                          </label>
                          <input
                            id="video_link"
                            type="video_link"
                            placeholder="Enter video_link..."
                            autoFocus
                            {...register("video_link")}
                            className={`w-full border border-gray-400 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                              errors.video_link ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        {error && (
                          <div className="text-red-500 font-bold text-sm mt-2">
                            {error}
                          </div>
                        )}
                      </div>
                      <div className="my-4">
                        <label className="block text-gray-700 font-semibold my-2">
                          Content:
                        </label>

                        <JoditEditor
                          ref={editor}
                          value={content}
                          onChange={(newContent) => setContent(newContent)}
                        />

                        {/* {content} */}
                      </div>
                      {error && (
                        <div className="text-red-500 font-bold text-sm my-2">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 mt-4"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        // onClick={onClose}
                        className="bg-gray-300 text-gray-700 py-2 px-4 mt-4 ml-2"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default LessonEditForm;
