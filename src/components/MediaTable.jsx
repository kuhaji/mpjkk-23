import {ImageList} from '@mui/material';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import MediaRow from './MediaRow';

const MediaTable = ({myFilesOnly, searchQuery}) => {
  const {mediaArray, deleteMedia} = useMedia(myFilesOnly);
  const windowSize = useWindowSize();

  // Filter mediaArray based on the search query
  const filteredMediaArray = mediaArray.filter((item) => {
    const title = item.title.toLowerCase();
    const description = item.description.toLowerCase();
    const query = searchQuery.toLowerCase();

    return title.includes(query) || description.includes(query);
  });

  return (
    <div>
      {/* Display filtered media */}
      <ImageList cols={windowSize.width > 768 ? 3 : 2} gap={8}>
        {filteredMediaArray.map((item, index) => (
          <MediaRow key={index} file={item} deleteMedia={deleteMedia} />
        ))}
      </ImageList>
    </div>
  );
};

MediaTable.propTypes = {
  myFilesOnly: PropTypes.bool,
  searchQuery: PropTypes.string,
};

export default MediaTable;
