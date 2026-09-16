import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, onClose }) {
  const previousFocus = useRef(document.activeElement);

  useEffect(() => {
    const firstFocusable = document.querySelector(
      "#modal-root button, #modal-root input, #modal-root a"
    );

    if (firstFocusable) {
      firstFocusable.focus();
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    };
  }, [onClose]);

  return createPortal(
    <div
      className="overlay"
      onClick={onClose}
    >
      <div
        className="panel"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;