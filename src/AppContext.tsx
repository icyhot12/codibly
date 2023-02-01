import React, { createContext, useState } from "react";

type ContextType = {
};

const Context = createContext<ContextType>({
  apiData: [],
  setApiData: () => {},
});

const ContextProvider: any = (props: any) => {

  return (
    <Context.Provider
      value={{
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
