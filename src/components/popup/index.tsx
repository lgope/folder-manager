import Modal from "react-modal";

const INLINESTYLE = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: "12px",
    transform: "translate(-50%, -50%)",
    width: 400,
    zIndex: 999,
  },
};

Modal.setAppElement(document.getElementById("root"));

const Popup = ({ isOpen, onClose, children }) => (
  <Modal
    overlayClassName="popup"
    style={INLINESTYLE}
    isOpen={isOpen}
    onRequestClose={onClose}
  >
    {children}
  </Modal>
);

export default Popup;
