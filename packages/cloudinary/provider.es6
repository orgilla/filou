import PropTypes from 'prop-types';
import { withContext } from 'recompose';
import imageSrc from './image-src';

export default withContext(
  {
    imageSrc: PropTypes.func
  },
  props => ({
    imageSrc: imageSrc(props)
  })
);
