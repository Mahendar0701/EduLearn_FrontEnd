/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_ENDPOINT } from "../../config/constants";
import { useEffect, useState } from "react";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

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

  return (
    <div>
      {categories ? (
        categories.map((category: any) => (
          <h1 key={category.id}>{category.title}</h1>
        ))
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  );
};

export default CategoryList;
