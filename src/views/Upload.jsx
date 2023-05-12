import {
  Box,
  Button,
  TextField,
  Slider,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import useForm from '../hooks/FormHooks';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {appId} from '../utils/variables';
import {useMedia, useTag} from '../hooks/ApiHooks';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    'https://placehold.co/600x400?text=Choose-media'
  );
  // 'https://placekitten.com/600/400'
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  };

  const filterInitValues = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
  };

  const doUpload = async () => {
    try {
      const data = new FormData();
      data.append('title', inputs.title);
      const allData = {
        desc: inputs.description,
        filters: filterInputs,
      };
      data.append('description', JSON.stringify(allData));
      data.append('file', file);
      const userToken = localStorage.getItem('userToken');
      const uploadResult = await postMedia(data, userToken);
      const tagResult = await postTag(
        {
          file_id: uploadResult.file_id,
          tag: appId,
        },
        userToken
      );
      console.log('doUpload', tagResult);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFileChange = (event) => {
    event.persist();
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setSelectedImage(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doUpload,
    initValues
  );

  const {inputs: filterInputs, handleInputChange: handleFilterChange} = useForm(
    null,
    filterInitValues
  );

  console.log('Upload', file);

  return (
    <Card sx={{maxWidth: 400, margin: '0 auto', marginTop: 10}}>
      <CardContent>
        <Box sx={{textAlign: 'center'}}>
          <img
            src={selectedImage}
            alt="preview"
            style={{
              width: '100%',
              height: 400,
              objectFit: 'contain',
              filter: `
          brightness(${filterInputs.brightness}%)
          contrast(${filterInputs.contrast}%)
          saturate(${filterInputs.saturation}%)
          sepia(${filterInputs.sepia}%)
        `,
            }}
          />
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={handleInputChange}
              type="text"
              name="title"
              label="Title"
              value={inputs.title}
              variant="outlined"
              fullWidth
              sx={{mt: 4}}
            />
            <TextField
              onChange={handleInputChange}
              name="description"
              label="Description"
              value={inputs.description}
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{mt: 2}}
            />
            <input
              onChange={handleFileChange}
              type="file"
              name="file"
              accept="image/*,video/*,audio/*"
            />
            <Button
              variant="contained"
              type="submit"
              sx={{mt: 4, background: 'black'}}
            >
              Upload
            </Button>
          </form>

          <Slider
            name="brightness"
            min={0}
            max={200}
            step={1}
            valueLabelDisplay="auto"
            onChange={handleFilterChange}
            value={filterInputs.brightness}
            sx={{mt: 1, color: 'black'}}
          />
          <Typography variant="subtitle1" gutterBottom sx={{mt: 2}}>
            Brightness
          </Typography>

          <Slider
            name="contrast"
            min={0}
            max={200}
            step={1}
            valueLabelDisplay="auto"
            onChange={handleFilterChange}
            value={filterInputs.contrast}
            sx={{mt: 1, color: 'black'}}
          />
          <Typography variant="subtitle1" gutterBottom sx={{mt: 2}}>
            Contrast
          </Typography>

          <Slider
            name="saturation"
            min={0}
            max={200}
            step={1}
            valueLabelDisplay="auto"
            onChange={handleFilterChange}
            value={filterInputs.saturation}
            sx={{mt: 1, color: 'black'}}
          />
          <Typography variant="subtitle1" gutterBottom sx={{mt: 2}}>
            Saturation
          </Typography>

          <Slider
            name="sepia"
            min={0}
            max={100}
            step={1}
            valueLabelDisplay="auto"
            onChange={handleFilterChange}
            value={filterInputs.sepia}
            sx={{mt: 1, color: 'black'}}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Upload;
