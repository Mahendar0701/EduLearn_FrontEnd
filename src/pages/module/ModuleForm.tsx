/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { API_ENDPOINT } from "../../config/constants";
import { Fragment, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  title: string;
  description: string;
  order: number;
  image_link: string;
  video_link: string;
  instructorId: number;
};
const NewModule = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Next, I'll add a new state to handle errors.
  const [error, setError] = useState<string | null>(null);

  // const editor = useRef(null);
  // const [description, setDescription] = useState("");

  const authToken = localStorage.getItem("authToken");
  const { courseID } = useParams();

  // Then I'll call the useProjectsDispatch function to get the dispatch function
  // for projects
  //   const dispatchProjects = useProjectsDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { title, description, order, image_link, video_link } = data;

    // console.log("module description", data.description);

    try {
      await axios.post(
        `${API_ENDPOINT}/api/courses/${courseID}/modules/`,
        {
          title,
          description,
          order,
          image_link,
          video_link,
        },
        {
          headers: {
            // "X-CSRFToken": csrfToken,
            Authorization: `Token ${authToken}`,
            // "Content-Type": "application/json",
          },
        }
      );

      setIsOpen(false);

      console.log("module created  successful");

      // Clear previous errors if any
      setError(null);

      toast.success("module created successfully!", {
        autoClose: 3000,
      });

      // Perform any necessary navigation or state updates after successful sign-in
    } catch (error: any) {
      toast.success("module creation failed!", {
        autoClose: 3000,
      });
      console.error(
        "module creation failed:",
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
        className="rounded-md bg-violet-900 hover:bg-violet-950 pr-5 pl-5 py-5 w-full  text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        + Add New Module
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
                    Create new module
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
                            {...register("order")}
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
                          placeholder="Enter description..."
                          autoFocus
                          {...register("description")}
                          className={`w-full h-24 border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.description ? "border-red-500" : ""
                          }`}
                        />
                        {/* <JoditEditor
                          ref={editor}
                          value={description}
                          onChange={(description) =>
                            setDescription(description)
                          }
                        /> */}

                        {/* {description} */}
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
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
                      >
                        Create Module
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
export default NewModule;
