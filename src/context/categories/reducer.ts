interface Category {
  title: string;
}

// Now, I'll rename the interface in the `ProjectList` component from `State`
// to `ProjectsState`. And I'll also export the interface.

export interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

// Then I'll define a new type called `ProjectsActions`
// for all possible combimations of action objects.

export type CategoryActions =
  | { type: "FETCH_CATEGORIES_REQUEST" }
  | { type: "FETCH_CATEGORIES_SUCCESS"; payload: Category[] }
  | { type: "FETCH_CATEGORIES_FAILURE"; payload: string }
  | { type: "CREATE_CATEGORIES_REQUEST" }
  | { type: "CREATE_CATEGORIES_SUCCESS"; payload: Category }
  | { type: "CREATE_CATEGORIES_FAILURE"; payload: string };

export const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Then we will pass the `initialState` object to the `state` of reducer function.

export const reducer = (
  state: CategoryState = initialState,
  action: CategoryActions
): CategoryState => {
  switch (action.type) {
    case "FETCH_CATEGORIES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_CATEGORIES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    case "FETCH_CATEGORIES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "CREATE_CATEGORIES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "CREATE_CATEGORIES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        categories: [...state.categories, action.payload],
      };
    case "CREATE_CATEGORIES_FAILURE":
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

export type CategoryDispatch = React.Dispatch<CategoryActions>;
