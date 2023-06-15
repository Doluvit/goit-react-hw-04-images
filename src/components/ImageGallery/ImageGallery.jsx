import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';

export const ImageGallery = ({
  collection,
  query,
  loading,
  error,
  onLoadMore,
}) => {
  return (
    <>
      {error && <p>{error.message}</p>}
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
      {query === 12 && !loading && <Button onClick={onLoadMore} />}
    </>
  );
};

ImageGallery.propTypes = {
  collection: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      id: PropTypes.number,
      tags: PropTypes.string,
    }).isRequired
  ).isRequired,
  query: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};
