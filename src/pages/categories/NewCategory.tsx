/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
// import JoditEditor from "jodit-react";
import { Fragment, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface CategoryData {
  title: string;
}

const CreateCategoryForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Next, I'll add a new state to handle errors.
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryData>();
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const authToken = localStorage.getItem("authToken");
  const onSubmit: SubmitHandler<CategoryData> = async (data) => {
    const { title } = data;

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/categories/",
        {
          title,
        },
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      setIsOpen(false);

      console.log("Category created  successful");

      // Clear previous errors if any
      setError(null);

      // Perform any necessary navigation or state updates after successful sign-in
    } catch (error: any) {
      console.error(
        "Category creation failed:",
        error.response?.data || error.message
      );
      setError("Invalid field entries");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-violet-900 px-2 py-3  text-sm font-medium text-white hover:bg-violet-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        + Create New Category
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
                <Dialog.Panel className="w-1/3 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center mb-3"
                  >
                    Create New Category
                  </Dialog.Title>
                  <div className="">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {/* Input fields for course properties */}
                      <div className="flex gap-4">
                        <label className="block text-gray-700 my-2 text-xl font-semibold ">
                          Title:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter title..."
                          autoFocus
                          {...register("title", { required: true })}
                          className={`w-full border border-gray-400 rounded-md py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.title ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      {error && (
                        <div className="text-red-500 font-bold text-sm mt-2">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
                      >
                        Create Category
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CreateCategoryForm;
