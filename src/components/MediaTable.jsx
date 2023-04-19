import {useEffect, useState} from 'react';
import PropType from 'prop-types';
import MediaRow from './mediaRow';

const MediaTable = () => {
  const [MediaArray, setMediaArray] = useState([]);
  const getMedia = async () => {
    const response = await fetch('test.json');
    const json = await response.json();
    console.log(json);
    setMediaArray(json);
  };

  useEffect(() => {
    try {
      getMedia();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  console.log(MediaArray);
  return (
    <table>
      <tbody>
        {MediaArray.map((item, index) => {
          // eslint-disable-next-line react/no-unknown-property
          return <MediaRow key={index} file={item} />;
        })}
      </tbody>
    </table>
  );
};

MediaTable.propTypes = {};

export default MediaTable;
