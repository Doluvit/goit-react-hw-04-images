import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';

export const ImageGallery = ({ collection, query, loading, onLoadMore }) => {
  return (
    <>
      <ImageGalleryList>
        {collection.map(({ webformatURL, largeImageURL, id, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          );
        })}
      </ImageGalleryList>
      {(query === 12 && !loading) && <Button onClick={onLoadMore} />}
    </>
  );
};

ImageGallery.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  id: PropTypes.string,
  tags: PropTypes.string,
};
