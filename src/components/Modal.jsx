import styled from "styled-components";
import Portal from "./Portal";
import { CSSTransition } from "react-transition-group";
import "./modal.css";

const Overlay = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dim = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  max-width: 456px;
  position: relative;
  width: 100%;
`;

const Modal = ({ children, isOpen, onClose, selector = "#modal-root" }) => {
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Portal selector={selector}>
        <Overlay>
          <Dim onClick={onClose} />
          <Container>{children}</Container>
        </Overlay>
      </Portal>
    </CSSTransition>
  );
};

export default Modal;
