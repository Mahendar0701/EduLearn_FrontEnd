import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
// import JoditEditor from "jodit-react";
import { Fragment, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface CourseData {
  title: string;
  description: string;
  image: string;
  instructorId: number;
  instructor: string;
  duration: number;
  level: string;
  price: string;
  category: string;
  enrolledStudents: number;
  rating: number;
  startDate: string;
  endDate: string;
  syllabus: string;
  prerequisites: string;
  resources: string;
}

const EditCourseForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Next, I'll add a new state to handle errors.
  const [error, setError] = useState<string | null>(null);

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
    const {
      title,
      description,
      image,
      instructorId,
      instructor,
      duration,
      level,
      price,
      category,
      enrolledStudents,
      rating,
      startDate,
      endDate,
      syllabus,
      prerequisites,
      resources,
    } = data;

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/courses/", {
        title,
        description,
        image,
        instructorId,
        instructor,
        duration,
        level,
        price,
        category,
        enrolledStudents,
        rating,
        startDate,
        endDate,
        syllabus,
        prerequisites,
        resources,
      });

      setIsOpen(false);

      console.log("course created  successful");

      // Clear previous errors if any
      setError(null);
    } catch (error) {
      console.error(
        "course creation failed:",
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
        className="rounded-md bg-blue-600 px-2 py-3  text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
                    Create new course
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {/* Input fields for course properties */}
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Title:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter title..."
                          autoFocus
                          {...register("title", { required: true })}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.title ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Description:
                        </label>
                        <textarea
                          placeholder="Enter description..."
                          {...register("description")}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.description ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Image:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter image URL..."
                          {...register("image")}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.image ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Instructor ID:
                        </label>
                        <input
                          type="number"
                          placeholder="Enter instructor ID..."
                          {...register("instructorId")}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.instructorId ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Instructor:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter instructor..."
                          {...register("instructor")}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.instructor ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Duration:
                        </label>
                        <input
                          type="number"
                          placeholder="Enter duration..."
                          {...register("duration")}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.duration ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Level:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter level..."
                          {...register("level")}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.level ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Price:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter price..."
                          {...register("price")}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.price ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Category:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter category..."
                          {...register("category")}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.category ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Enrolled Students:
                        </label>
                        <input
                          type="number"
                          placeholder="Enter enrolled students..."
                          {...register("enrolledStudents")}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.enrolledStudents ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Rating:
                        </label>
                        <input
                          type="number"
                          placeholder="Enter rating..."
                          {...register("rating")}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.rating ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Start Date:
                        </label>
                        <input
                          type="text" // Assuming you want to use a date picker, consider using a date picker library
                          placeholder="Enter start date..."
                          {...register("startDate")}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.startDate ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          End Date:
                        </label>
                        <input
                          type="text" // Assuming you want to use a date picker, consider using a date picker library
                          placeholder="Enter end date..."
                          {...register("endDate")}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.endDate ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Syllabus:
                        </label>
                        <textarea
                          placeholder="Enter syllabus..."
                          {...register("syllabus")}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.syllabus ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Prerequisites:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter prerequisites..."
                          {...register("prerequisites")}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.prerequisites ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Resources:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter resources..."
                          {...register("resources")}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.resources ? "border-red-500" : ""
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
                        Create Course
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

export default EditCourseForm;
