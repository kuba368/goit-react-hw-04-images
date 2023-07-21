import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { useEffect } from 'react';

const Modal = ({ src, alt, closeModal }) => {
  const handleOverlayClick = e => {
    const overlay = e.currentTarget;
    if (e.target === overlay) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleCloseOnEsc = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleCloseOnEsc);
    return () => {
      document.removeEventListener('keydown', handleCloseOnEsc);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.Overlay} onClick={handleOverlayClick}>
      <div className={styles.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
