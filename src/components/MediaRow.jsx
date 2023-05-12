import {Button, ImageListItem, ImageListItemBar, Box} from '@mui/material';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {useContext, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const MediaRow = ({file, deleteMedia}) => {
  const {user, update, setUpdate} = useContext(MediaContext);
  const [hovered, setHovered] = useState(false);

  const doDelete = async () => {
    const sure = confirm('Are you sure?');
    if (sure) {
      const token = localStorage.getItem('userToken');
      const deleteResult = await deleteMedia(file.file_id, token);
      console.log(deleteResult);
      setUpdate(!update);
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <ImageListItem
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={
          file.media_type !== 'audio'
            ? mediaUrl + file.thumbnails.w640
            : './vite.svg'
        }
        alt={file.title}
      />
      {hovered && (
        <ImageListItemBar
          actionIcon={
            <Box display="flex" justifyContent="center">
              <Box sx={{display: 'inline-flex'}}>
                <Button
                  component={Link}
                  to="/single"
                  state={{file}}
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    flex: 1,
                  }}
                >
                  View
                </Button>
                {user && file.user_id === user.user_id && (
                  <>
                    <Button
                      component={Link}
                      to="/update"
                      state={{file}}
                      sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        flex: 1,
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={doDelete}
                      sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        flex: 1,
                      }}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          }
        />
      )}
    </ImageListItem>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object.isRequired,
  deleteMedia: PropTypes.func.isRequired,
};

export default MediaRow;
