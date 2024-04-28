/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_ENDPOINT } from "../../config/constants";

export const createCategory = async (dispatch: any, categoryData: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  //   console.log("authToken", token);
  try {
    dispatch({ type: "CREATE_CATEGORIES_REQUEST" });
    const response = await axios.post(
      `${API_ENDPOINT}/api/categories/`,
      categoryData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = response.data;
    // console.log("created course", data);
    dispatch({ type: "CREATE_CATEGORIES_SUCCESS", payload: data });
  } catch (error: any) {
    console.log("Error creating course:", error);
    console.error(
      "course creation failed:",
      error.response?.data || error.message
    );
    dispatch({
      type: "CREATE_CATEGORIES_FAILURE",
      payload: "Unable to create course",
    });
  }
};

export const fetchCategories = async (dispatch: any) => {
  // const token = localStorage.getItem("authToken") ?? "";
  console.log("get Category");
  try {
    dispatch({ type: "FETCH_CATEGORIES_REQUEST" });
    const response = await axios.get(`${API_ENDPOINT}/api/categories/`, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    // console.log("get course", data);
    dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching CATEGORIES:", error);

    dispatch({
      type: "FETCH_CATEGORIES_FAILURE",
      payload: "Unable to load CATEGORIES",
    });
  }
};
