import { useContext } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "../../context/ModalContext";

type props = {
  children: React.ReactNode;
  reset?: () => void;
};

const Modal = (props: props) => {
  const modal = useContext(ModalContext);

  const clickOutside = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const id = target.id;
    if (id === "portal") {
      modal?.setModal(false);
      props.reset?.();
    }
  };

  return (
    <>
      {createPortal(
        <div
          className="absolute left-0 top-0 z-50 h-full w-screen overflow-x-hidden"
          id="portal"
          onClick={clickOutside}
        >
          <div className="absolute left-0 flex h-max min-h-screen w-screen bg-white">
            {props.children}
            <button
              onClick={() => {
                modal?.setModal(false);
                props.reset?.();
              }}
              className="absolute right-8 top-4 p-2"
            >
              [x]
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};
export default Modal;
