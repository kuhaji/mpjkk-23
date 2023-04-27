import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/variables';
import {Link} from 'react-router-dom';

const MediaRow = ({file}) => {
  return (
    <tr>
      <td>
        <img
          src={
            file.thumbnails && file.thumbnails.w160
              ? mediaUrl + file.thumbnails.w160
              : ''
          }
          alt={file.title}
        />
      </td>
      <td>
        <h3>{file.title}</h3>
        <p>{file.description}</p>
      </td>
      <td>
        <Link to="/single" state={{file}}>
          View
        </Link>
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object.isRequired,
};

export default MediaRow;
