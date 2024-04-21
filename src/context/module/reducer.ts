interface Module {
  title: string;
  description: string;
  order: number;
}

// Now, I'll rename the interface in the `ProjectList` component from `State`
// to `ProjectsState`. And I'll also export the interface.

export interface ModuleState {
  modules: Module[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

// Then I'll define a new type called `ProjectsActions`
// for all possible combimations of action objects.

export type ModuleActions =
  | { type: "FETCH_MODULES_REQUEST" }
  | { type: "FETCH_MODULES_SUCCESS"; payload: Module[] }
  | { type: "FETCH_MODULES_FAILURE"; payload: string };
//   | { type: "ADD_MEMBERS_SUCCESS"; payload: Article }
//   | { type: "DELETE_MEMBER_SUCCESS"; payload: Article[] };

export const initialState: ModuleState = {
  modules: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Then we will pass the `initialState` object to the `state` of reducer function.

export const reducer = (
  state: ModuleState = initialState,
  action: ModuleActions
): ModuleState => {
  switch (action.type) {
    case "FETCH_MODULES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_MODULES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        modules: action.payload,
      };
    case "FETCH_MODULES_FAILURE":
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

export type ModuleDispatch = React.Dispatch<ModuleActions>;
