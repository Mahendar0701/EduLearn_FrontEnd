interface Course {
  title: string;
  description: string;
  image: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  rating: number;
  duration: number;
}

// Now, I'll rename the interface in the `ProjectList` component from `State`
// to `ProjectsState`. And I'll also export the interface.

export interface CourseState {
  courses: Course[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

// Then I'll define a new type called `ProjectsActions`
// for all possible combimations of action objects.

export type CourseActions =
  | { type: "FETCH_COURSES_REQUEST" }
  | { type: "FETCH_COURSES_SUCCESS"; payload: Course[] }
  | { type: "FETCH_COURSES_FAILURE"; payload: string }
  | { type: "CREATE_COURSE_REQUEST" } // Change from "CREATE_COURSES_REQUEST" to "CREATE_COURSE_REQUEST"
  | { type: "CREATE_COURSE_SUCCESS"; payload: Course } // Change from "CREATE_COURSES_SUCCESS" to "CREATE_COURSE_SUCCESS"
  | { type: "CREATE_COURSE_FAILURE"; payload: string }; // Change from "CREATE_COURSES_FAILURE" to "CREATE_COURSE_FAILURE"

export const initialState: CourseState = {
  courses: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Then we will pass the `initialState` object to the `state` of reducer function.

export const reducer = (
  state: CourseState = initialState,
  action: CourseActions
): CourseState => {
  switch (action.type) {
    case "FETCH_COURSES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_COURSES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        courses: action.payload,
      };
    case "FETCH_COURSES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "CREATE_COURSE_REQUEST": // Change from "CREATE_COURSES_REQUEST" to "CREATE_COURSE_REQUEST"
      return {
        ...state,
        isLoading: true,
      };
    case "CREATE_COURSE_SUCCESS": // Change from "CREATE_COURSES_SUCCESS" to "CREATE_COURSE_SUCCESS"
      return {
        ...state,
        isLoading: false,
        courses: [...state.courses, action.payload],
      };
    case "CREATE_COURSE_FAILURE": // Change from "CREATE_COURSES_FAILURE" to "CREATE_COURSE_FAILURE"
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export type CourseDispatch = React.Dispatch<CourseActions>;
