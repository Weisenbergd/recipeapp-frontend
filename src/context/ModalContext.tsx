import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface ModalContextType {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const ModalContextProvider = (props: Props) => {
  const [modal, setModal] = useState(false);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {props.children}
    </ModalContext.Provider>
  );
};
