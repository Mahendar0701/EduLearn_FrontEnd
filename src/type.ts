// types.ts

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  instructorId: number;
  instructor: string;
  duration: number;
  level: string;
  price: number;
  category: string;
  enrolledStudents: number;
  rating: number;
  startDate: string;
  endDate: string;
  syllabus: string;
  prerequisites: string;
  resources: string;
}

export interface CourseFormValues {
  title: string;
  description: string;
  image: string;
  instructorId: number;
  instructor: string;
  duration: number;
  level: string;
  price: number;
  category: string;
  enrolledStudents: number;
  rating: number;
  startDate: string;
  endDate: string;
  syllabus: string;
  prerequisites: string;
  resources: string;
}

export interface ModuleType {
  id: number;
  course: string;
  title: string;
  description: string;
  order: number;
  image_link: string;
  video_link: string;
  instructorId: number;
}

// type ModuleType = {
//   id: number;
//   course: string;
//   title: string;
//   description: string;
//   order: number;
//   image_link: string;
//   video_link: string;
//   instructorId: number;
// };
