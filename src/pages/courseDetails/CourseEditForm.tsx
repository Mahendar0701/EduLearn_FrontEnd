/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { API_ENDPOINT } from "../../config/constants";
// import JoditEditor from "jodit-react";
import { Fragment, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface CourseData {
  id: number;
  title: string;
  description: string;
  image: string;
  instructorId: number;
  instructor: string;
  duration: number;
  level: string;
  price: string;
  category_name: string;
  enrolledStudents: number;
  rating: number;
  startDate: string;
  endDate: string;
  syllabus: string;
  prerequisites: string;
  resources: string;
}

const CourseEditForm: React.FC<{
  course: CourseData;
  courseId: string;
}> = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Next, I'll add a new state to handle errors.
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const confirmDeleteCourse = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      handleDelete();
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(`${API_ENDPOINT}/api/categories/`, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        });
        setCategories(response.data);
        console.log(response.data);
      } catch (error: any) {
        console.error(
          "Category retrieval failed:",
          error.response?.data || error.message
        );
      }
    };

    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseData>({
    defaultValues: {
      title: course.title,
      description: course.description,
      image: course.image,
      instructorId: course.instructorId,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      price: course.price,
      category_name: course.category_name,
      enrolledStudents: course.enrolledStudents,
      rating: course.rating,
      startDate: course.startDate,
      endDate: course.endDate,
      syllabus: course.syllabus,
      prerequisites: course.prerequisites,
      resources: course.resources,
    },
  });
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  function getCookie(name: string) {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));

    return cookieValue ? cookieValue.split("=")[1] : null;
  }

  const csrfToken = getCookie("csrftoken");
  const authToken = localStorage.getItem("authToken");

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_ENDPOINT}/api/courses/${course.id}/`,
        {
          headers: {
            "X-CSRFToken": csrfToken,
            Authorization: `Token ${authToken}`,
          },
        }
      );

      console.log("course deleted successfully", response.data);

      setIsOpen(false);
      toast.success("course deleted successfully!", {
        autoClose: 3000,
      });

      navigate("/dashboard");

      // history.push("/dashboard");
      // Perform any necessary navigation or state updates after successful deletion
    } catch (error: any) {
      console.error(
        "course deletion failed:",
        error.response?.data || error.message
      );
      toast.error("Course deletion Failed!", {
        autoClose: 3000,
      });
      setError("Failed to delete course");
    }
  };

  const onSubmit: SubmitHandler<CourseData> = async (data) => {
    // Handle the form submission logic
    console.log("course edit data", data);
    try {
      const response = await axios.put(
        `${API_ENDPOINT}/api/courses/${course.id}/`,
        data,
        {
          headers: {
            "X-CSRFToken": csrfToken,
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("course updated successfully", response.data);
      toast.success("Course updated successfully!", {
        autoClose: 3000,
      });

      setIsOpen(false);

      // Clear previous errors if any
      setError(null);

      // Perform any necessary navigation or state updates after successful sign-in
    } catch (error: any) {
      toast.error("Course updation failed. Please try again.", {
        autoClose: 3000,
      });
      console.error(
        "course edit creation failed:",
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
        className="rounded-md bg-violet-900 hover:bg-violet-950 px-4 py-3  text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Edit Course
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
                    Edit Course
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {/* Input fields for course properties */}
                      <div className="flex w-full gap-3 my-3">
                        <div className="w-1/2">
                          <label className="block text-gray-700 font-semibold ">
                            Title:
                          </label>
                          <input
                            type="text"
                            placeholder="Enter title..."
                            autoFocus
                            {...register("title", { required: true })}
                            className={`w-full  border border-gray-400 rounded-md py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                              errors.title ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-gray-700 font-semibold ">
                            Category:
                          </label>
                          <select
                            {...register("category_name")}
                            className={`w-full border border-gray-400 rounded-md py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                              errors.category_name ? "border-red-500" : ""
                            }`}
                          >
                            <option value="">Select category</option>
                            {categories &&
                              categories.map((category: any) => (
                                <option
                                  key={category.id}
                                  value={category.title}
                                >
                                  {category.title}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex w-full gap-3 my-3">
                        <div className="w-1/2">
                          <label className="block text-gray-700 font-semibold ">
                            Image:
                          </label>
                          <input
                            type="text"
                            placeholder="Enter image URL..."
                            {...register("image")}
                            className={`w-full border border-gray-400 rounded-md py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                              errors.image ? "border-red-500" : ""
                            }`}
                          />
                        </div>

                        <div className="w-1/2">
                          <label className="block text-gray-700 font-semibold ">
                            Instructor:
                          </label>
                          <input
                            type="text"
                            placeholder="Enter instructor name..."
                            {...register("instructor")}
                            className={`w-full border border-gray-400 rounded-md py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                              errors.instructor ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex w-full gap-3 my-3">
                        <div className="w-1/2">
                          <label
                            htmlFor="level"
                            className="block text-gray-700 font-semibold "
                          >
                            Level:
                          </label>
                          <select
                            id="level"
                            {...register("level")}
                            className={`w-full border border-gray-400 rounded-md py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                              errors.level ? "border-red-500" : ""
                            }`}
                          >
                            <option value="">Select level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                          {errors.level && (
                            <p className="text-red-500 text-sm mt-1">
                              Level is required
                            </p>
                          )}
                        </div>

                        <div className="w-1/2">
                          <label className="block text-gray-700 font-semibold ">
                            Price:
                          </label>
                          <input
                            type="text"
                            placeholder="Enter price..."
                            {...register("price")}
                            className={`w-full border border-gray-400 rounded-md py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                              errors.price ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex w-full gap-3 my-3">
                        <div className="w-1/2">
                          <label className="block text-gray-700 font-semibold ">
                            Duration:
                          </label>
                          <input
                            type="number"
                            placeholder="Enter duration..."
                            {...register("duration")}
                            className={`w-full border border-gray-400 rounded-md py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                              errors.duration ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-gray-700 font-semibold ">
                            Resources:
                          </label>
                          <input
                            type="text"
                            placeholder="Enter resources..."
                            {...register("resources")}
                            className={`w-full border border-gray-400 rounded-md py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                              errors.resources ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex w-full gap-3">
                        <div className="w-1/2">
                          <label className="block text-gray-700 font-semibold ">
                            Syllabus:
                          </label>
                          <textarea
                            placeholder="Enter syllabus..."
                            {...register("syllabus")}
                            className={`w-full border border-gray-400 rounded-md py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                              errors.syllabus ? "border-red-500" : ""
                            }`}
                          />
                        </div>

                        <div className="w-1/2">
                          <label className="block text-gray-700 font-semibold ">
                            Prerequisites:
                          </label>
                          <textarea
                            // type="text"
                            placeholder="Enter prerequisites..."
                            {...register("prerequisites")}
                            className={`w-full border border-gray-400 rounded-md py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                              errors.prerequisites ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold ">
                          Description:
                        </label>
                        <textarea
                          placeholder="Enter description..."
                          {...register("description")}
                          className={`w-full h-32 border border-gray-400 rounded-md py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.description ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      {/* <div>
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
                      </div> */}

                      {/* <div>
                        <label className="block text-gray-700 font-semibold ">
                          Instructor ID:
                        </label>
                        <input
                          type="number"
                          placeholder="Enter instructor ID..."
                          {...register("instructorId")}
                          className={`w-full border border-gray-400 rounded-md py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.instructorId ? "border-red-500" : ""
                          }`}
                        />
                      </div> */}

                      {error && (
                        <div className="text-red-500 font-bold text-sm mt-2">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
                      >
                        Update Course Details
                      </button>
                    </form>
                    <button
                      type="button"
                      // onClick={handleDelete}
                      onClick={confirmDeleteCourse}
                      className="my-2 rounded-md bg-red-600 px-2 py-3 w-full MY-3 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      Delete Course
                    </button>
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

export default CourseEditForm;
