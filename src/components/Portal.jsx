import { createPortal } from "react-dom";

const Portal = ({ children, selector }) => {
  const rootElement = selector && document.querySelector(selector);

  return (
    <div>{rootElement ? createPortal(children, rootElement) : children}</div>
  );
};

export default Portal;
