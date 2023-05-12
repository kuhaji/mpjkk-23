import React, {useState} from 'react';
import MediaTable from '../components/MediaTable';
import {Typography} from '@mui/material';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Typography component="h1" variant="h3">
        Home
      </Typography>
      <div>
        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />

        {/* Media table with filtered media */}
        <MediaTable myFilesOnly={false} searchQuery={searchQuery} />
      </div>
    </>
  );
};

export default Home;
