import ReactDOM from "react-dom";

function ModalPortal({ children }) {
    const modalRoot = document.getElementById("modal-root");
    return ReactDOM.createPortal(children, modalRoot);
}

export default ModalPortal;
