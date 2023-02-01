import React, { createContext } from "react";

type ContextType = {
    testValue: string
};

const Context = createContext<ContextType>({
    testValue: ""
});

const ContextProvider: any = (props: any) => {

    const testValue = "abc"

  return(
    <Context.Provider 
    value={{
        testValue,
    }}
    >
        {props.children}
    </Context.Provider>
  )
};

export { Context, ContextProvider };
