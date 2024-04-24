// Dashboard.tsx
import React, { useRef } from "react";
import Courses from "../courses";
import CreateCourseForm from "../courses/NewCourse";
import CreateCategoryForm from "../categories/NewCategory";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  let isInstructor = false;
  // const userDataString = localStorage.getItem("userData") || "";
  // const userData = JSON.parse(userDataString);
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

  console.log("isInstructor", isInstructor);

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  // };

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
      {/* Hero Section */}
      <div className="bg-violet-900 text-white flex">
        <div className="container mx-auto text-center py-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t("Welcome")} to EduLearn
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Empowering Education, Inspiring Minds
          </p>
          <button
            className="bg-white text-violet-700 px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-violet-400 hover:text-white transition duration-300"
            onClick={scrollToFeaturedCourses}
          >
            Start Learning Now
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

      {/* Why Choose Section */}
      <div className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why Choose EduLearn?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-2">
            {/* Feature Cards */}
            <div className=" bg-white rounded-lg shadow-md ">
              <img
                src="https://www.viewsonic.com/library/wp-content/uploads/2019/08/The-Benefits-of-Interactive-Learning.jpg"
                alt=""
                className="rounded"
              />
              <h3 className="text-xl font-semibold my-4">
                Interactive Learning
              </h3>
              <p className="my-4">
                Engage with immersive content and interactive quizzes.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://growshiksha.com/public/image/service/2/icon-1837922086-1703680853.webp"
                alt=""
              />
              <h3 className="text-xl font-semibold mb-4">Expert Instructors</h3>
              <p>Learn from industry experts and experienced educators.</p>
            </div>
            <div className=" bg-white rounded-lg shadow-md">
              <img
                src="https://www.maplelms.com/wp-content/uploads/2021/08/Beige-Green-and-Pink-Blob-Organic-Sale-Quick-Create-Facebook-Cover.png"
                alt=""
                // width="300"
                // height="100"
              />
              <h3 className="text-xl font-semibold my-4">
                Personalized Learning Paths
              </h3>
              <p className="mx-2">
                Tailored courses to match your learning pace and style.
              </p>
            </div>
            <div className="p-2 bg-white rounded-lg shadow-md">
              <img
                src="https://www.elearningnews.it/_resources/images/articoli/Immagini_OK_512x268/design-elearning.jpg"
                alt=""
                // height="250"
                className="mt-4"
              />
              <h3 className="text-xl font-semibold my-4">Community Support</h3>
              <p>
                Connect with peers, discuss topics, and collaborate on projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Course Section (For Instructors) */}
      {isInstructor && (
        <div className="py-20 bg-gray-200">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Create New Course
            </h2>
            {/* Instruction Message */}
            <p className="text-lg mb-4">
              As an instructor, you have the opportunity to share your knowledge
              and expertise with our community. Create a new course to inspire
              and empower learners.
            </p>
            {/* Create Course Form */}
            {/* <CreateCourseForm  /> */}
          </div>
        </div>
      )}

      {/* Create Category Section (For Instructors) */}
      {isInstructor && (
        <div className="py-20 bg-gray-300">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Create New Category
            </h2>
            {/* Instruction Message */}
            <p className="text-lg mb-4">
              Organize your courses by creating new categories. This helps
              learners discover relevant content and enhances their learning
              experience.
            </p>
            {/* Create Category Form */}
            {/* <CreateCategoryForm /> */}
          </div>
        </div>
      )}

      {/* Featured Courses Section */}
      <div ref={featuredCoursesRef} className="py-20">
        <div className="container mx-auto ">
          <h2 className="text-3xl md:text-4xl text-center font-bold mb-12">
            Featured Courses
          </h2>
          {/* Course Cards (Carousel or Grid) */}
          <div className="gap-8">
            <Courses />{" "}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            What Our Users Say
          </h2>
          {/* Testimonial Slider/Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-3">
            {/* Individual Testimonial Cards */}
            <div className="p-6 bg-white rounded-lg shadow-md ">
              <p className="text-lg mb-4">
                "EduLearn has transformed the way I learn. The interactive
                courses and supportive community have helped me achieve my
                goals!"
              </p>
              <p className="font-semibold">- Rishith</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-lg mb-4">
                "EduLearn provides top-notch education with a user-friendly
                interface. Highly recommended!"
              </p>
              <p className="font-semibold">- Shyam</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-lg mb-4">
                "EduLearn stands out for its comprehensive courses and
                easy-to-navigate interface. It's been a game-changer for me!"
              </p>
              <p className="font-semibold">- Mahesh</p>
            </div>
            {/* Add more testimonials here */}
          </div>
        </div>
      </div>

      {/* Get Started Section */}
      <div className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Get Started Today
          </h2>
          <button className="bg-violet-900 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-md hover:bg-violet-950 transition duration-300">
            Sign Up Now
          </button>
        </div>
      </div>

      {/* Footer Section */}
    </div>
  );
};

export default Dashboard;
