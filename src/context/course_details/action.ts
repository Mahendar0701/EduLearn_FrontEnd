// import axios from "axios";

import axios from "axios";

export const getCourseDetails = async (
  // dispatch: ArticleDispatch,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any,
  courseID: string
  // articles: Article
) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_COURSESDetails_REQUEST" });
    const response = await axios.get(
      `http://127.0.0.1:8000/api/courses/${courseID}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    console.log("get course Details", data);

    // fetchArticles(dispatch);
    dispatch({ type: "FETCH_COURSESDetails_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching COURSESDetails:", error);
    dispatch({
      type: "FETCH_COURSESDetails_FAILURE",
      payload: "Unable to load COURSESDetails",
    });
  }
};
