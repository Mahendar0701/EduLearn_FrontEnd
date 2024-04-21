interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  instructorId: number;
  instructor: string;
  duration: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: string;
  category: string;
  enrolledStudents: number;
  rating: number;
  startDate: string;
  endDate: string;
  syllabus: string;
  prerequisites: string;
  resources: string;
}

// Now, I'll rename the interface in the `ProjectList` component from `State`
// to `ProjectsState`. And I'll also export the interface.

export interface CourseDetailsState {
  course: Course | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

// Then I'll define a new type called `ProjectsActions`
// for all possible combimations of action objects.

export type CourseDetailsActions =
  | { type: "FETCH_COURSESDetails_REQUEST" }
  | { type: "FETCH_COURSESDetails_SUCCESS"; payload: Course }
  | { type: "FETCH_COURSESDetails_FAILURE"; payload: string };
//   | { type: "ADD_MEMBERS_SUCCESS"; payload: Article }
//   | { type: "DELETE_MEMBER_SUCCESS"; payload: Article[] };

export const initialState: CourseDetailsState = {
  course: {
    id: 0,
    title: "",
    description: "",
    image: "",
    instructorId: 0,
    instructor: "",
    duration: 0,
    level: "Beginner",
    price: "",
    category: "",
    enrolledStudents: 0,
    rating: 0,
    startDate: "",
    endDate: "",
    syllabus: "",
    prerequisites: "",
    resources: "",
  },
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Then we will pass the `initialState` object to the `state` of reducer function.

export const reducer = (
  state: CourseDetailsState = initialState,
  action: CourseDetailsActions
): CourseDetailsState => {
  switch (action.type) {
    case "FETCH_COURSESDetails_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_COURSESDetails_SUCCESS":
      return {
        ...state,
        isLoading: false,
        course: action.payload,
      };
    case "FETCH_COURSESDetails_FAILURE":
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

export type CourseDetailsDispatch = React.Dispatch<CourseDetailsActions>;
