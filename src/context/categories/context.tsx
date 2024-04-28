// First, I'll import the createContext, useContext and useReducer from React

import React, { createContext, useContext, useReducer } from "react";
import {
  reducer,
  initialState,
  CategoryState,
  CategoryActions,
} from "./reducer";
const CategoryStateContext = createContext<CategoryState | undefined>(
  undefined
);

type CategoryDispatch = React.Dispatch<CategoryActions>;

// Using createContext function, we will create a context
// called `ProjectsDispatchContext`. Let's say the shape of this new
// context object is ProjectsDispatch (which I'll define now, wait for it).
// I've set the default value to undefined.

const CategoryDispatchContext = createContext<CategoryDispatch | undefined>(
  undefined
);
export const CategoryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

  return (
    <CategoryStateContext.Provider value={state}>
      <CategoryDispatchContext.Provider value={dispatch}>
        {children}
      </CategoryDispatchContext.Provider>
    </CategoryStateContext.Provider>
  );
};

// Next, I'll define our ProjectsProvider component, and make this
// ProjectsStateContext available using context Provider.

export const useCategoryState = () => useContext(CategoryStateContext);
export const useCategoryDispatch = () => useContext(CategoryDispatchContext);
