import ReactDom from 'react-dom';

import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  const onCloseHandler = () => {
    dispatch(uiActions.closeModal());
  };

  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onClose={onCloseHandler} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
