import {Button, Box, Typography} from '@mui/material';
import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [formToggle, setFormToggle] = useState(true);
  const toggle = () => {
    setFormToggle(!formToggle);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="100px"
    >
      <Typography component="h1" variant="h3" mb={2}>
        {formToggle ? 'Login' : 'Register'}
      </Typography>

      <Box sx={{width: '400px'}}>
        {formToggle ? <LoginForm /> : <RegisterForm toggle={toggle} />}
      </Box>

      <Typography variant="body2" mt={2}>
        {formToggle ? 'First time here?' : 'Already registered?'}
      </Typography>

      <Button variant="text" onClick={toggle}>
        {formToggle ? 'Register' : 'Login'}
      </Button>
    </Box>
  );
};

export default Login;
