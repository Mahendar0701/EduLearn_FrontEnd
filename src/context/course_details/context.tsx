// First, I'll import the createContext, useContext and useReducer from React

import React, { createContext, useContext, useReducer } from "react";
import {
  reducer,
  initialState,
  CourseDetailsState,
  CourseDetailsActions,
} from "./reducer";
const CourseDetailsStateContext = createContext<CourseDetailsState | undefined>(
  undefined
);

type CourseDetailsDispatch = React.Dispatch<CourseDetailsActions>;

// Using createContext function, we will create a context
// called `ProjectsDispatchContext`. Let's say the shape of this new
// context object is ProjectsDispatch (which I'll define now, wait for it).
// I've set the default value to undefined.

const CourseDetailsDispatchContext = createContext<
  CourseDetailsDispatch | undefined
>(undefined);
export const CourseDetailsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

  return (
    <CourseDetailsStateContext.Provider value={state}>
      <CourseDetailsDispatchContext.Provider value={dispatch}>
        {children}
      </CourseDetailsDispatchContext.Provider>
    </CourseDetailsStateContext.Provider>
  );
};

// Next, I'll define our ProjectsProvider component, and make this
// ProjectsStateContext available using context Provider.

export const useCourseDetailsState = () =>
  useContext(CourseDetailsStateContext);
export const useCourseDetailsDispatch = () =>
  useContext(CourseDetailsDispatchContext);
