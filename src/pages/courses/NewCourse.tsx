/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
// import JoditEditor from "jodit-react";
import { Fragment, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createCourse } from "../../context/courses/action";
import { useCourseDispatch } from "../../context/courses/context";
// import { useDispatch } from "react-redux";

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
  category: any;
  category_name: string;
  enrolledStudents: number;
  rating: number;
  startDate: string;
  endDate: string;
  syllabus: string;
  prerequisites: string;
  resources: string;
}

interface CategoryData {
  id: number;
  title: string;
}

const CreateCourseForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Next, I'll add a new state to handle errors.
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<CategoryData[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState<CourseData>();
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryData | undefined
  >();

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const authToken = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories/",
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );
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
  }, [authToken]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CourseData>();
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  // const dispatch = useDispatch();
  const dispatch = useCourseDispatch();

  const onSubmit: SubmitHandler<CourseData> = async (data) => {
    try {
      await createCourse(dispatch, data);
      // await dispatch(createCourseAction(data));

      setIsOpen(false);
      setError(null);
    } catch (error) {
      setError("Failed to create course");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-violet-900 px-2 py-3  text-sm font-medium text-white hover:bg-violet-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        + Create New Course
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
                <Dialog.Panel className="w-2/3 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center mb-5"
                  >
                    Create new course
                  </Dialog.Title>
                  <hr className="my-5 border border-blue-800" />
                  <div className="mt-2 m-5">
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
                              errors.category ? "border-red-500" : ""
                            }`}
                            onChange={(e) => {
                              const selectedCategoryName = e.target.value;
                              const selectedCategory = categories.find(
                                (category: any) =>
                                  category.title === selectedCategoryName
                              );
                              if (selectedCategory) {
                                setValue("category", selectedCategory.id);
                                setSelectedCategory(selectedCategory);
                              }
                            }}
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
                          {errors.category && (
                            <p className="text-red-500 text-sm mt-1">
                              Category is required
                            </p>
                          )}
                        </div>
                        {/* Add a hidden input field to store the category ID */}
                        <input
                          type="hidden"
                          {...register("category")}
                          // value={selectedCategory || ""}
                          value={
                            selectedCategory ? String(selectedCategory.id) : ""
                          }
                        />
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

export default CreateCourseForm;
