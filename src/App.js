import React from 'react';
import { PoapsContext } from'./index.js';
import Hero from './components/Hero';
import Cards from './components/Cards';

import { Grid } from '@material-ui/core';

export default function Home() {
  const [poaps, ] = React.useContext(PoapsContext);

  return (
    <div>
      <main>
        <Grid container spacing={3} style={{ paddingTop: '80px'}}>
          <Grid item xs="12" >
            {<Hero count={poaps && poaps.length} />}
          </Grid>
          <Grid item xs="12" >
            <Cards poaps={poaps} />
          </Grid>
        </Grid>
      </main>
    </div>
  )
}