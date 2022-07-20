import React, { useState } from 'react';
import { PoapsContext } from'../index';
import { buildCreatePoapForm, createEvent } from '../helpers/api';
import { lsAddPoap } from '../helpers/local-storage';

import { TextField, Button, TextareaAutosize } from '@material-ui/core';


export default function Create() {
  const [poaps, setPoaps] = React.useContext(PoapsContext);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [newPoap, setNewPoap] = useState();

  const handleUpdate = async (formEvent) => {
    formEvent.preventDefault();
    setIsFormSubmitted(true);
    const newPoapObj = await createEvent(buildCreatePoapForm(formEvent));
    console.log('newPoapObj', newPoapObj);

    // refactor to use context instead
    setNewPoap(newPoapObj);

    // refactor these to be together in helper
    // check is defined validation
    lsAddPoap({ 
      event_id: newPoapObj.id, 
      secret_code: formEvent.target['secret_code'].value 
    });
    setPoaps([{ ...newPoapObj, secret_code: formEvent.target['secret_code'].value }, ...poaps])
  }

  return (
    <div>

      <main style={{ paddingTop: '80px'}}> 
        <h1>Create your Poap!</h1>
        <p>Create something brand new! Fill in the form and your new Poap will automatically be created and added to your management dashboard.</p>

        <h2>Event details</h2>

        { !isFormSubmitted && 
          <form onSubmit={handleUpdate}>
            <TextField fullWidth margin="normal" name="name" type="text" placeholder="Title" /><br/>
            <TextareaAutosize style={{ width: '100%' }} name="description" placeholder='Description' minRows={3}></TextareaAutosize><br/>
            <TextField fullWidth margin="normal" name="city" type="text" placeholder="City" /><br/>
            <TextField fullWidth margin="normal" name="country" type="text" placeholder="Country" /><br/>
            <TextField fullWidth margin="normal" name="start_date" type="text" placeholder="Start date" /><br/>
            <TextField fullWidth margin="normal" name="end_date" type="text" placeholder="End date" /><br/>
            <TextField fullWidth margin="normal" name="expiry_date" type="text" placeholder="Expiry date" /><br/>
            <TextField fullWidth margin="normal" name="year" type="text" placeholder="Year" /><br/>
            <TextField fullWidth margin="normal" name="event_url" type="text" placeholder="Event URL" /><br/>
            <label><input name="virtual_event" type="checkbox" /> Virtual Event</label><br/>
            <TextField fullWidth margin="normal" name="image" type="file" accept="image/png, image/gif" /><br/>
            <TextField fullWidth margin="normal" name="secret_code" type="text" placeholder="Edit Code" /><br/>
            <TextField fullWidth margin="normal" name="email" type="email" placeholder="Email" /><br/>
            <label><input name="private_event" type="checkbox" /> Private Event</label><br/>
            <br/>
            <Button type="submit" variant='outlined'>Create</Button>
          </form>
        }

        { isFormSubmitted && <div>You event is creating!</div>}

        { newPoap &&
          <>
            { newPoap.id }
            { newPoap.name }
            { newPoap.description }
          </>
        }

      </main>
    </div>
  )
}

