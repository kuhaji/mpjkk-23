import {
  Box,
  Button,
  Slider,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import useForm from '../hooks/FormHooks';
import {useLocation, useNavigate} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {useMedia} from '../hooks/ApiHooks';

const Update = () => {
  const {putMedia} = useMedia();
  const navigate = useNavigate();
  const {state} = useLocation();
  const file = state.file;

  const selectedImage = mediaUrl + file.filename;

  let allData = {
    desc: file.description,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
  };
  try {
    allData = JSON.parse(file.description);
  } catch (error) {
    /* empty */
  }

  const initValues = {
    title: file.title,
    description: allData.desc,
  };

  const filterInitValues = allData.filters;

  const doUpdate = async () => {
    try {
      const allData = {
        desc: inputs.description,
        filters: filterInputs,
      };
      const data = {
        title: inputs.title,
        description: JSON.stringify(allData),
      };

      const userToken = localStorage.getItem('userToken');
      const updateResult = await putMedia(file.file_id, data, userToken);
      console.log('doUpdate', updateResult);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doUpdate,
    initValues
  );

  const {inputs: filterInputs, handleInputChange: handleFilterChange} = useForm(
    null,
    filterInitValues
  );

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

export default Update;
