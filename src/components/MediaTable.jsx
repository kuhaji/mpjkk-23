import {ImageList, useMediaQuery} from '@mui/material';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import MediaRow from './MediaRow';

const MediaTable = ({myFilesOnly = false}) => {
  const {mediaArray, deleteMedia} = useMedia(myFilesOnly);
  const windowSize = useWindowSize();
  const isLargeScreen = useMediaQuery('(min-width: 768px)');

  const getCols = () => {
    if (windowSize.width <= 576) {
      return 1; // Single column for extra-small screens
    } else if (windowSize.width <= 992) {
      return 2; // Two columns for small and medium screens
    } else {
      return isLargeScreen ? 3 : 2; // Three columns for large screens, otherwise two columns
    }
  };

  return (
    <ImageList cols={getCols()} gap={8}>
      {mediaArray.map((item, index) => (
        <MediaRow key={index} file={item} deleteMedia={deleteMedia} />
      ))}
    </ImageList>
  );
};

MediaTable.propTypes = {
  myFilesOnly: PropTypes.bool,
};

export default MediaTable;
