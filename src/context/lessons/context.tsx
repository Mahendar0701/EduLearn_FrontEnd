// First, I'll import the createContext, useContext and useReducer from React

import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, LessonState, LessonActions } from "./reducer";
const LessonStateContext = createContext<LessonState | undefined>(undefined);

type LessonDispatch = React.Dispatch<LessonActions>;

// Using createContext function, we will create a context
// called `ProjectsDispatchContext`. Let's say the shape of this new
// context object is ProjectsDispatch (which I'll define now, wait for it).
// I've set the default value to undefined.

const LessonDispatchContext = createContext<LessonDispatch | undefined>(
  undefined
);
export const LessonProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

  return (
    <LessonStateContext.Provider value={state}>
      <LessonDispatchContext.Provider value={dispatch}>
        {children}
      </LessonDispatchContext.Provider>
    </LessonStateContext.Provider>
  );
};

// Next, I'll define our ProjectsProvider component, and make this
// ProjectsStateContext available using context Provider.

export const useLessonState = () => useContext(LessonStateContext);
export const useLessonDispatch = () => useContext(LessonDispatchContext);
