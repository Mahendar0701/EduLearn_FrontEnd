import React, { useRef } from "react";
import Courses from "../courses";
import CreateCourseForm from "../courses/NewCourse";
import CreateCategoryForm from "../categories/NewCategory";

import { useTranslation } from "react-i18next";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  let isInstructor = false;
  let userData = null;

  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
    userData = JSON.parse(userDataString);
  }

  let role = null;

  if (userData) {
    role = userData.role;
  }

  if (role && role === "Teacher") {
    isInstructor = true;
  }

  const featuredCoursesRef = useRef<HTMLDivElement>(null);

  const scrollToFeaturedCourses = () => {
    if (featuredCoursesRef.current) {
      featuredCoursesRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gray-100 ">
      <div className="bg-violet-900 text-white flex">
        <div className="container mx-auto text-center py-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t("Welcome to EduLearn")}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {t("Empowering Education, Inspiring Minds")}
          </p>
          <button
            className="bg-white text-violet-700 px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-violet-400 hover:text-white transition duration-300"
            onClick={scrollToFeaturedCourses}
          >
            {t("Start Learning Now")}
          </button>
        </div>
        <div className="m-5 rounded-md">
          <img
            src="https://appinventiv.com/wp-content/uploads/2020/06/edtech-business-Model.png"
            alt=""
            className="rounded-md"
          />
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            {t("Why Choose EduLearn?")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-2">
            <div className=" bg-white rounded-lg shadow-md ">
              <img
                src="https://www.viewsonic.com/library/wp-content/uploads/2019/08/The-Benefits-of-Interactive-Learning.jpg"
                alt=""
                className="rounded"
              />
              <h3 className="text-xl font-semibold my-4">
                {t("Interactive Learning")}
              </h3>
              <p className="my-4">
                {t("Engage with immersive content and interactive quizzes.")}
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://growshiksha.com/public/image/service/2/icon-1837922086-1703680853.webp"
                alt=""
              />
              <h3 className="text-xl font-semibold mb-4">
                {t("Expert Instructors")}
              </h3>
              <p>
                {t("Learn from industry experts and experienced educators.")}
              </p>
            </div>
            <div className=" bg-white rounded-lg shadow-md">
              <img
                src="https://www.maplelms.com/wp-content/uploads/2021/08/Beige-Green-and-Pink-Blob-Organic-Sale-Quick-Create-Facebook-Cover.png"
                alt=""
              />
              <h3 className="text-xl font-semibold my-4">
                {t("Personalized Learning Paths")}
              </h3>
              <p className="mx-2">
                {t("Tailored courses to match your learning pace and style.")}
              </p>
            </div>
            <div className="p-2 bg-white rounded-lg shadow-md">
              <img
                src="https://www.elearningnews.it/_resources/images/articoli/Immagini_OK_512x268/design-elearning.jpg"
                alt=""
                className="mt-4"
              />
              <h3 className="text-xl font-semibold my-4">
                {t("Community Support")}
              </h3>
              <p>
                {t(
                  "Connect with peers, discuss topics, and collaborate on projects."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isInstructor && (
        <div className="py-20 bg-gray-200">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              {t("Create New Course")}
            </h2>
            <p className="text-lg mb-4">
              {t(
                "As an instructor, you have the opportunity to share your knowledge and expertise with our community. Create a new course to inspire and empower learners."
              )}
            </p>
            <CreateCourseForm data-testid="create-course-form" />
          </div>
        </div>
      )}

      {isInstructor && (
        <div className="py-20 bg-gray-300">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              {t("Create New Category")}
            </h2>
            <p className="text-lg mb-4">
              {t(
                "Organize your courses by creating new categories. This helps learners discover relevant content and enhances their learning experience."
              )}
            </p>
            <CreateCategoryForm />
          </div>
        </div>
      )}

      <div ref={featuredCoursesRef} className="py-20">
        <div className="container mx-auto ">
          <h2 className="text-3xl md:text-4xl text-center font-bold mb-12">
            {t("Featured Courses")}
          </h2>
          <div className="gap-8">
            <Courses />{" "}
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            {t("What Our Users Say")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-3">
            <div className="p-6 bg-white rounded-lg shadow-md ">
              <p className="text-lg mb-4">
                {t(
                  "EduLearn has transformed the way I learn. The interactive courses and supportive community have helped me achieve my goals!"
                )}
              </p>
              <p className="font-semibold">- Rishith</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-lg mb-4">
                {t(
                  "EduLearn provides top-notch education with a user-friendly interface. Highly recommended!"
                )}
              </p>
              <p className="font-semibold">- Shyam</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-lg mb-4">
                {t(
                  "EduLearn stands out for its comprehensive courses and easy-to-navigate interface. It's been a game-changer for me!"
                )}
              </p>
              <p className="font-semibold">- Mahesh</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {t("Get Started Today")}
          </h2>
          <button className="bg-violet-900 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-md hover:bg-violet-950 transition duration-300">
            {t("Sign Up Now")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
