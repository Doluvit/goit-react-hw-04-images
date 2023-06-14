import { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import { Overlay, ModalWindow } from './Modal.styled';


export const Modal = ({ toggleModal, largeImageURL, tags }) => {
  let targetElement = document.querySelector('body');

  useEffect(() => {
    window.addEventListener('keydown', closeModalByEsc);
    disableBodyScroll(targetElement);

    return () => {
      window.removeEventListener('keydown', closeModalByEsc);
      clearAllBodyScrollLocks();
    };
  });

  const closeModalByEsc = event => {
    if (event.code === 'Escape') {
      toggleModal();
      enableBodyScroll(targetElement);
    }
  };
  const closeModalByClick = event => {
    if (event.currentTarget === event.target) {
      toggleModal();
      enableBodyScroll(targetElement);
    }
  };

  return (
    <Overlay onClick={closeModalByClick}>
      {' '}
      <ModalWindow>
        <img src={largeImageURL} alt={tags} />{' '}
      </ModalWindow>{' '}
    </Overlay>
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};
