// CourseForm.tsx

import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Course, CourseFormValues } from "./type";

const CourseForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormValues>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<CourseFormValues> = async (data) => {
    console.log("Submitted data:", data);
    data.duration = Number(data.duration);
    data.enrolledStudents = Number(data.enrolledStudents);
    data.price = Number(data.price);
    data.rating = Number(data.rating);
    try {
      const response = await axios.post<Course>(
        "http://127.0.0.1:8000/api/courses/",
        data
      );
      setSuccessMessage("Course created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div>
      <h2>Create a New Course</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title:</label>
          <input type="text" {...register("title", { required: true })} />
          {errors.title && <span>Title is required</span>}
        </div>

        <div>
          <label>Description:</label>
          <textarea {...register("description", { required: true })} />
          {errors.description && <span>Description is required</span>}
        </div>

        <div>
          <label>Image URL:</label>
          <input type="text" {...register("image", { required: true })} />
          {errors.image && <span>Image URL is required</span>}
        </div>

        <div>
          <label>Instructor ID:</label>
          <input
            type="number"
            {...register("instructorId", { required: true, min: 1 })}
          />
          {errors.instructorId && (
            <span>Instructor ID is required and must be at least 1</span>
          )}
        </div>

        <div>
          <label>Instructor:</label>
          <input type="text" {...register("instructor", { required: true })} />
          {errors.instructor && <span>Instructor is required</span>}
        </div>

        <div>
          <label>Duration (in minutes):</label>
          <input
            type="number"
            {...register("duration", { required: true, min: 1 })}
          />
          {errors.duration && (
            <span>Duration is required and must be at least 1 minute</span>
          )}
        </div>

        <div>
          <label>Level:</label>
          <input type="text" {...register("level", { required: true })} />
          {errors.level && <span>Level is required</span>}
        </div>

        <div>
          <label>Price:</label>
          <input type="text" {...register("price", { required: true })} />
          {errors.price && <span>Price is required</span>}
        </div>

        <div>
          <label>Category:</label>
          <input type="text" {...register("category", { required: true })} />
          {errors.category && <span>Category is required</span>}
        </div>

        <div>
          <label>Enrolled Students:</label>
          <input
            type="number"
            {...register("enrolledStudents", { required: true, min: 0 })}
          />
          {errors.enrolledStudents && (
            <span>Enrolled Students must be a non-negative number</span>
          )}
        </div>

        <div>
          <label>Rating:</label>
          <input
            type="number"
            {...register("rating", { required: true, min: 0, max: 5 })}
          />
          {errors.rating && (
            <span>Rating is required and must be between 0 and 5</span>
          )}
        </div>

        <div>
          <label>Start Date:</label>
          <input type="date" {...register("startDate", { required: true })} />
          {errors.startDate && <span>Start Date is required</span>}
        </div>

        <div>
          <label>End Date:</label>
          <input type="date" {...register("endDate", { required: true })} />
          {errors.endDate && <span>End Date is required</span>}
        </div>

        <div>
          <label>Syllabus:</label>
          <input type="text" {...register("syllabus", { required: true })} />
          {errors.syllabus && <span>Syllabus is required</span>}
        </div>

        <div>
          <label>Prerequisites:</label>
          <input
            type="text"
            {...register("prerequisites", { required: true })}
          />
          {errors.prerequisites && <span>Prerequisites is required</span>}
        </div>

        <div>
          <label>Resources:</label>
          <input type="text" {...register("resources", { required: true })} />
          {errors.resources && <span>Resources is required</span>}
        </div>

        <button type="submit">Create Course</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default CourseForm;
