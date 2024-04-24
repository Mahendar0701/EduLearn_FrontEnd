/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_ENDPOINT } from "../../config/constants";

export const fetchModuless = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: "FETCH_COURSES_REQUEST" });
    const response = await axios.get(`${{ API_ENDPOINT }}/api/courses`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export const fetchLessons = async (
  // dispatch: ArticleDispatch,
  dispatch: any,
  courseID: string,
  moduleID: any
  // articles: Article
) => {
  //   const token = localStorage.getItem("authToken") ?? "";
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: "FETCH_LESSONS_REQUEST" });
    console.log("get token", token);
    const response = await fetch(
      `${API_ENDPOINT}/api/courses/${courseID}/modules/${moduleID}/lessons/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log("get Lessons", data);

    // fetchArticles(dispatch);
    dispatch({ type: "FETCH_LESSONS_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching LessonS:", error);
    dispatch({
      type: "FETCH_LESSONS_FAILURE",
      payload: "Unable to load LessonS",
    });
  }
};

export const fetchLesson = async (
  // dispatch: ArticleDispatch,
  dispatch: any,
  courseID: string,
  moduleID: string,
  lessonID: string
  // articles: Article
) => {
  //   const token = localStorage.getItem("authToken") ?? "";
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: "FETCH_LESSONS_REQUEST" });
    const response = await fetch(
      `${API_ENDPOINT}/api/courses/${courseID}/modules/${moduleID}/lessons/${lessonID}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log("get Lesson", data);

    // fetchArticles(dispatch);
    dispatch({ type: "FETCH_LESSONS_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching LessonS:", error);
    dispatch({
      type: "FETCH_LESSONS_FAILURE",
      payload: "Unable to load LessonS",
    });
  }
};
