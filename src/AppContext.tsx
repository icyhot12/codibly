import React, { createContext, useState } from "react";

type ContextType = {
  modalValues: any
  setModalValues: any
};

const Context = createContext<ContextType>({
  modalValues: "",
  setModalValues: () => {},
});

const ContextProvider: any = (props: any) => {

  const [modalValues, setModalValues] = useState<any>("")

  return (
    <Context.Provider
      value={{
        modalValues,
        setModalValues
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
