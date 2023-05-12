import {Typography} from '@mui/material';
import MediaTable from '../components/MediaTable';
import React from 'react';

const Home = () => {
  return (
    <>
      <Typography component="h1" variant="h3">
        Home
      </Typography>
      <MediaTable />
    </>
  );
};

export default Home;
