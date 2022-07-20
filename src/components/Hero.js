import React from 'react';

import { Link } from "react-router-dom";

import { Button } from '@material-ui/core';
import { Add, Settings } from '@material-ui/icons';

const Hero = ({ count }) => {
  if (!count) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <>
      { !count &&
        <h1>You have created 🤔 Poap!</h1>
      }
      {count === 0 &&
        <>
          <h1>You have created {count} Poap{count > 1 && `'s`}!</h1>
        </>
      }
      {count >= 1 &&
        <>
          <h1>You have created {count} Poap{count > 1 && `s`}!</h1>
        </>
      }
      <div style={{display: 'flex', justifyContent: 'space-between' }}>
        {count >= 1 && <Link to="/manage"><Button variant="outlined" startIcon={<Settings />}>Manage</Button></Link>}
        <Link style={{float:'right'}} to="/create"><Button variant="contained" startIcon={<Add />}>Create new</Button></Link>
      </div>
    </>
  );
}

export default Hero;