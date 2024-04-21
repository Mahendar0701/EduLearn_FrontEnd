// First, I'll import the createContext, useContext and useReducer from React

import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, ModuleState, ModuleActions } from "./reducer";
const ModuleStateContext = createContext<ModuleState | undefined>(undefined);

type ModuleDispatch = React.Dispatch<ModuleActions>;

// Using createContext function, we will create a context
// called `ProjectsDispatchContext`. Let's say the shape of this new
// context object is ProjectsDispatch (which I'll define now, wait for it).
// I've set the default value to undefined.

const ModuleDispatchContext = createContext<ModuleDispatch | undefined>(
  undefined
);
export const ModuleProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

  return (
    <ModuleStateContext.Provider value={state}>
      <ModuleDispatchContext.Provider value={dispatch}>
        {children}
      </ModuleDispatchContext.Provider>
    </ModuleStateContext.Provider>
  );
};

// Next, I'll define our ProjectsProvider component, and make this
// ProjectsStateContext available using context Provider.

export const useModuleState = () => useContext(ModuleStateContext);
export const useModuleDispatch = () => useContext(ModuleDispatchContext);
