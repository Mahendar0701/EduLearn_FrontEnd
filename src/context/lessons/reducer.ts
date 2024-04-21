interface Lesson {
  title: string;
  content: string;
  order: number;
}

// Now, I'll rename the interface in the `ProjectList` component from `State`
// to `ProjectsState`. And I'll also export the interface.

export interface LessonState {
  lessons: Lesson[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

// Then I'll define a new type called `ProjectsActions`
// for all possible combimations of action objects.

export type LessonActions =
  | { type: "FETCH_LESSONS_REQUEST" }
  | { type: "FETCH_LESSONS_SUCCESS"; payload: Lesson[] }
  | { type: "FETCH_LESSONS_FAILURE"; payload: string };
//   | { type: "ADD_MEMBERS_SUCCESS"; payload: Article }
//   | { type: "DELETE_MEMBER_SUCCESS"; payload: Article[] };

export const initialState: LessonState = {
  lessons: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Then we will pass the `initialState` object to the `state` of reducer function.

export const reducer = (
  state: LessonState = initialState,
  action: LessonActions
): LessonState => {
  switch (action.type) {
    case "FETCH_LESSONS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_LESSONS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        lessons: action.payload,
      };
    case "FETCH_LESSONS_FAILURE":
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

export type LessonDispatch = React.Dispatch<LessonActions>;
