import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

import {
  ImageCalleryItemBox,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, id, tags }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  return (
    <>
      <ImageCalleryItemBox key={id} onClick={toggleModal}>
        <ImageGalleryItemImage src={webformatURL} alt={tags} />
      </ImageCalleryItemBox>
      {modalIsOpen && (
        <Modal
          toggleModal={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  id: PropTypes.string,
  tags: PropTypes.string.isRequired,
};
