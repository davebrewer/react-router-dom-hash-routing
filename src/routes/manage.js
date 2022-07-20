import React, { createRef } from 'react';
import { PoapsContext } from '../index';
import { validateEvent, getPoap } from '../helpers/api';
import { lsDoesNotHaveID, lsAddPoap, lsRemovePoap } from '../helpers/local-storage';

import { IconButton, Button, TextField, Card, CardContent, Typography, Grid } from '@material-ui/core';
import { Delete } from '@material-ui/icons'

import { Link } from "react-router-dom";

export default function Home() {
  const [Poaps, setPoaps] = React.useContext(PoapsContext);
  const eventIdRef = createRef();
  const secretCodeRef = createRef();

  const handleAddPoap = async (e) => {
    e.preventDefault();

    const eventId = parseInt(e.target['event_id'].value);
    const secretCode = e.target['secret_code'].value;

    if (!Poaps.filter(Poap => Poap.id === eventId).length && lsDoesNotHaveID(eventId)) {
      if (validateEvent(eventId, secretCode)) {
        const PoapObj = await getPoap(eventId);

        lsAddPoap({ event_id: eventId, secret_code: secretCode });
        setPoaps([{ ...PoapObj, secret_code: secretCode }, ...Poaps])

        eventIdRef.current.value = '';
        secretCodeRef.current.value = '';
      } else {
        alert("The values provided dont match. Please check your id and secret!")
      }
    } else {
      alert('You have already added this Poap!');
    }
  }

  const removePoap = (id) => {
    lsRemovePoap(id);
    setPoaps((prevPoaps) => prevPoaps.filter(poap => poap.id !== id));
  }

  return (
    <div>
      <main style={{ paddingTop: '80px'}}>
        <h1>Manage your Poap&apos;s</h1>
        <p>Manage all your Poap&apos;s here! It&apos;s as easy as adding your Poap&apos;s [id] and [secret]. We only use these details directly with Poap&apos;s official API. Once saved we store these details in your browser&apos;s LocalStorage for persistence. That&apos;s it!</p>

        <h2>Add your Poap</h2>
        <form onSubmit={handleAddPoap}>
          <TextField type="number" name="event_id" placeholder="Poap ID" required ref={eventIdRef} />
          <TextField type="text" name="secret_code" placeholder="SECRET CODE" pattern='^[0-9]{6}$' required ref={secretCodeRef} />
          <Button type="submit">
            Add
          </Button>
        </form>

        { Poaps && Poaps.length > 0 && (
          <>
            <h2>Your Poapfolio</h2>
            <div>
              { Poaps.map(Poap => {
                  return (
                    <div key={Poap.id} style={{ marginBottom: '20px' }} >
                      <Card>
                        <CardContent>
                          <Grid
                            justify="space-between"
                            container 
                            spacing={24}
                          >
                            <Grid item>
                              <Typography component="p">
                                <Link to={`/poap/${Poap.id}`}>{Poap.name}</Link>
                              </Typography>
                              {Poap.id}
                            </Grid>
                            <Grid item>
                              <IconButton aria-label="delete"  onClick={() => {removePoap(Poap.id)}}>
                                <Delete/>
                              </IconButton> 
                            </Grid>
                          </Grid>
                          {/* <TextField label="ID" type="text" value={Poap.id} disabled style={{ marginRight: '20px' }} /> */}
                          {/* <TextField label="Secret Code" type="password" value={Poap.secret_code} disabled /> */}
                        </CardContent>  
                      </Card>
                    </div>
                  )
                })
              }
            </div>
          </>
        )}
      </main>
    </div>
  )
}
