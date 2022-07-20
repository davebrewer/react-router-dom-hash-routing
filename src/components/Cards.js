import React from 'react';

import { Link } from "react-router-dom";

import { Grid, Card, CardContent } from '@material-ui/core';

const Cards = ({poaps}) => {
    if (!poaps) {
      return (<div>Loading...</div>)
    }

    console.log(poaps);

    if (poaps && poaps.length === 0) {
      return (<div>You have no POAPs!</div>);
    }

    return (
      <Grid container>
        {poaps && poaps.map(poap => {
          return(
            <Grid key={poap.id} item xs="12" style={{marginBottom: '20px'}}>
              <Link to={`/poap/${poap.id}`}>
                <Card sx={{ display: 'flex' }} variant="outlined" style={{cursor: 'pointer'}}>
                  <CardContent>
                    <div style={{display:'flex'}}>
                      <div style={{width: '100px'}}>
                        <img alt="" src={poap.image_url} style={{width: '100px', height: '100px'}} />
                      </div>
                      <div  style={{marginLeft: '20px'}}>
                        <strong>{poap.name}</strong><br/>
                        { `${poap.city}, ${poap.country}`}<br/>
                        { poap.start_date === poap.end_date ? poap.start_date : `${poap.start_date}-${poap.end_date}` }<br/>
                        <em style={{ display: 'inline-block', marginTop: '4px', marginBottom: '8px', color: '#aaa'}}>{poap.description}</em><br/>
                        {poap.virtual_event && `Virtual`} {poap.virtual_event && poap.private_event && ` | `} {poap.private_event && `Private`}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          )
        })}
      </Grid>  
    );
}

export default Cards;