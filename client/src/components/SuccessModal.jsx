import Modal from "react-modal";
import PropTypes from "prop-types";
import "../styles/Modal.scss";

const SuccessModal = ({ isOpen, closeModal }) => {
  const handleCloseModal = () => {
    closeModal();
  };

  if (!isOpen) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} className={"modal"}>
      <div className="modal-content">
        <h2>¡Usuario creado con éxito!</h2>
        <p>Vuelve al Login para iniciar sesión.</p>
        <div className="modal-actions">
          <button onClick={handleCloseModal}>Cerrar</button>
        </div>
      </div>
    </Modal>
  );
};
SuccessModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default SuccessModal;
