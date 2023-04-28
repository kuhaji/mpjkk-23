import {useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';

const Single = () => {
  const {state} = useLocation();

  const file = state.file;

  return (
    <>
      <h1>{file.title}</h1>
      <img src={mediaUrl + file.filename} alt={file.title} />
      <p>{file.description}</p>
    </>
  );
};

// TODO in the next task: add propType for location

export default Single;
