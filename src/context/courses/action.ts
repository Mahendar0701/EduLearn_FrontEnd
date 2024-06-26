/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_ENDPOINT } from "../../config/constants";

export const createCourse = async (dispatch: any, courseData: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  console.log("authToken", token);
  try {
    dispatch({ type: "CREATE_COURSE_REQUEST" });
    const response = await axios.post(
      `${API_ENDPOINT}/api/courses/`,
      courseData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = response.data;
    console.log("created course", data);
    dispatch({ type: "CREATE_COURSE_SUCCESS", payload: data });
  } catch (error: any) {
    console.log("Error creating course:", error);
    console.error(
      "course creation failed:",
      error.response?.data || error.message
    );
    dispatch({
      type: "CREATE_COURSE_FAILURE",
      payload: "Unable to create course",
    });
  }
};

export const fetchCourses = async (dispatch: any) => {
  // const token = localStorage.getItem("authToken") ?? "";
  console.log("get course");
  try {
    dispatch({ type: "FETCH_COURSES_REQUEST" });
    const response = await axios.get(`${API_ENDPOINT}/api/courses/`, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log("get course", data);
    dispatch({ type: "FETCH_COURSES_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching COURSES:", error);

    dispatch({
      type: "FETCH_COURSES_FAILURE",
      payload: "Unable to load COURSESs",
    });
  }
};

export const getArticle = async (
  // dispatch: ArticleDispatch,
  dispatch: any,
  courseID: string
  // articles: Article
) => {
  //   const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_COURSES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/api/courses/${courseID}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("get article", data);

    // fetchArticles(dispatch);
    dispatch({ type: "FETCH_COURSES_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching COURSES:", error);
    dispatch({
      type: "FETCH_COURSES_FAILURE",
      payload: "Unable to load COURSES",
    });
  }
};
