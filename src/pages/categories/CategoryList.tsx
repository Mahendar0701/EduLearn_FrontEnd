import axios from "axios";
import { useEffect, useState } from "react";

const CategoryList = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
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
      } catch (error) {
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
