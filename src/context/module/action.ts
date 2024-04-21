/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const fetchCoursess = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: "FETCH_COURSES_REQUEST" });
    const response = await axios.get(`http://127.0.0.1:8000/api/courses/`, {
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

export const fetchModules = async (
  // dispatch: ArticleDispatch,
  dispatch: any,
  courseID: string
  // articles: Article
) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_MODULES_REQUEST" });
    const response = await fetch(
      `http://127.0.0.1:8000/api/courses/${courseID}/modules/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Token ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log("get Modules ", data);

    // fetchArticles(dispatch);
    dispatch({ type: "FETCH_MODULES_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching ModuleS:", error);
    dispatch({
      type: "FETCH_MODULES_FAILURE",
      payload: "Unable to load ModuleS",
    });
  }
};
