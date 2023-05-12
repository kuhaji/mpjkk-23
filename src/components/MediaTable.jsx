import {ImageList, useMediaQuery, TextField} from '@mui/material';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import MediaRow from './MediaRow';
import {useState, useEffect} from 'react';

const MediaTable = ({myFilesOnly = false}) => {
  const {mediaArray, deleteMedia} = useMedia(myFilesOnly);
  const [filteredMediaArray, setFilteredMediaArray] = useState(mediaArray);
  const windowSize = useWindowSize();
  const isLargeScreen = useMediaQuery('(min-width: 768px)');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery) {
      const filteredData = mediaArray.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMediaArray(filteredData);
    } else {
      setFilteredMediaArray(mediaArray);
    }
  }, [searchQuery, mediaArray]);

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
    <>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        sx={{mb: 2, marginTop: '10px'}}
      />
      <ImageList cols={getCols()} gap={8}>
        {filteredMediaArray.map((item, index) => (
          <MediaRow key={index} file={item} deleteMedia={deleteMedia} />
        ))}
      </ImageList>
    </>
  );
};

MediaTable.propTypes = {
  myFilesOnly: PropTypes.bool,
};

export default MediaTable;
