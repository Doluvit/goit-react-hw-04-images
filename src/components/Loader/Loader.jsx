import PropTypes from 'prop-types';
import { ColorRing } from 'react-loader-spinner';

export const Loader = ({ isLoading }) => {
  return (
    <ColorRing
      visible={isLoading}
      height="120"
      width="120"
      ariaLabel="blocks-loading"
      wrapperStyle={{ margin: 'auto' }}
      wrapperClass="blocks-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
}