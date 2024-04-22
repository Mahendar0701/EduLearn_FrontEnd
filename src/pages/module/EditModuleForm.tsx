/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
// import JoditEditor from "jodit-react";
import { Fragment, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";

// First I'll import the addProject function
// import { addProject } from "../../context/projects/actions";

// // Then I'll import the useProjectsDispatch hook from projects context
// import { useProjectsDispatch } from "../../context/projects/context";
type EditFormInputs = {
  course: string;
  title: string;
  description: string;
  order: number;
  image_link: string;
  video_link: string;
  instructorId: number;
};
type ModuleType = {
  course: string;
  title: string;
  description: string;
  order: number;
  image_link: string;
  video_link: string;
  instructorId: number;
};
const ModuleEditForm: React.FC<{
  module: ModuleType;
  moduleId: ModuleType;
  courseId: any;
}> = ({ module, courseId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { courseID, moduleID } = useParams();
  // const editor = useRef(null);
  // const [description, setDescription] = useState("");
  const authToken = localStorage.getItem("authToken");
  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm<EditFormInputs>({
    defaultValues: {
      title: module.title,
      description: module.description,
      order: module.order,
      image_link: module.image_link,
      video_link: module.video_link,
      instructorId: module.instructorId,
    },
  });

  //   const { lessonId } = useParams<{ lessonId: string }>();

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  // const csrfToken = getCookie("csrftoken");
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<EditFormInputs> = async (data) => {
    // Handle the form submission logic
    console.log("data", data);
    data.course = courseId;
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/courses/${courseID}/modules/${moduleID}/`,
        data,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      console.log("Module updated successfully", response.data);

      setIsOpen(false);

      // Clear previous errors if any
      setError(null);

      // Perform any necessary navigation or state updates after successful sign-in
    } catch (error: any) {
      console.error(
        "Module creation failed:",
        error.response?.data || error.message
      );
      setError("Invalid field entries");
    }
  };

  return (
    <>
      <button
        type="button"
        id="newProjectBtn"
        onClick={openModal}
        className="rounded-md bg-violet-900 hover:bg-violet-950 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Edit Module
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
                    update lesson
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
                          description:
                        </label>
                        <textarea
                          id="description"
                          // type="textbox"
                          placeholder="Enter description..."
                          autoFocus
                          {...register("description")}
                          className={`w-full h-24 border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.video_link ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {error && (
                        <div className="text-red-500 font-bold text-sm my-2">
                          {error}
                        </div>
                      )}

                      {/* <div className="my-4">
                        <label className="block text-gray-700 font-semibold my-2">
                          Instructor ID:
                        </label>
                        <input
                          type="number"
                          placeholder="Enter instructor ID..."
                          {...register("instructorId")}
                          className={`w-full border border-gray-400 rounded-md py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.instructorId ? "border-red-500" : ""
                          }`}
                        />
                      </div> */}

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
export default ModuleEditForm;
