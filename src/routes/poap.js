import React, {useRef, useState, useContext, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { PoapsContext } from '../index';
import { updatePoap, createUpdatePoapForm, getPoapsMinted, getQrCodes } from '../helpers/api';
import { lsUpdateOrder } from '../helpers/local-storage';


import { TextField, TextareaAutosize, Button } from '@material-ui/core';

const formKeys = ['name', 'description', 'city', 'country', 'start_date', 'end_date', 'expiry_date', 'virtual_event', 'private_event'];

export default function Poap() {
  const params = useParams();
  
  const [poaps, setPoaps] = useContext(PoapsContext);
  
  const [poap, setPoap] = useState();
  const [mintInfo, setMintInfo] = useState();
  const [qrCodes, setQrCodes] = useState();

  const checkboxVirtualRef = useRef();
  const checkboxPrivateRef = useRef();

  useEffect(() => {
    setPoap(poaps ? poaps.filter(poap => poap.id.toString() === params.id)[0] : null)
  }, [poaps])

  const getAdditionalPoapInfo = async() => {
    setMintInfo(await getPoapsMinted(poap.id));
    setQrCodes(await getQrCodes(poap.id, poap.secret_code));
  }

  useEffect(() => {
    if(poap) {
      getAdditionalPoapInfo()
    }
  }, [poap])

  const handleUpdate = async (formEvent) => {
    formEvent.preventDefault();
    const virtualEventCheckboxVal = checkboxVirtualRef.current.checked;
    const privateEventCheckboxVal = privateEventCheckboxVal;

    const isUpdateSuccess = await updatePoap(createUpdatePoapForm(formEvent, virtualEventCheckboxVal, privateEventCheckboxVal, poap.secret_code), poap.fancy_id);
    
    if (isUpdateSuccess) {
      setPoaps(prevState => {
        const currentPoap = prevState.filter(item => item.id === parseInt(poap.id))[0];
        if(currentPoap) {
          formKeys.forEach(key => {
            console.log(key);
            if (key === 'virtual_event') {
              return currentPoap[key] = virtualEventCheckboxVal;
            }
            if (key === 'private_event') {
              return currentPoap[key] = privateEventCheckboxVal;
            }
            return currentPoap[key] = formEvent.target[key].value;
          });
          const prevStateSubUpdate = prevState.filter(item => item.id !== poap.id);

          return [currentPoap, ...prevStateSubUpdate];
        }
      })

      lsUpdateOrder({ 
        event_id: poap.id, 
        secret_code: poap.secret_code
      });

      // router.push('/');
    } else {
      alert('ERROR: Please refresh app and try again!')
    }
  }

  const quantityClaimed = () => qrCodes.length > 0 ? qrCodes.filter(poap => poap.claimed === true).length : 0;

  const multipleHolders = () => mintInfo.tokens.filter(poap => poap.owner.tokensOwned === 1).length;

  if (!poap) {
    return (<div>Loading...</div>)
  }

  return (
    <div style={{ paddingTop: '80px'}}>

      <h1>Review and update<br/> your POAP</h1>

      <p style={{textAlign: 'center'}}>
        <img alt="" src={poap.image_url} style={{width: '200px', height: '200px'}} />
      </p>

      <br/>

      <h2>Poap Stats</h2>
      { mintInfo ? mintInfo.total : '#' } of { qrCodes ? qrCodes.length : '#'} minted.<br/> 
      { `${ qrCodes && quantityClaimed()} of ${qrCodes ? qrCodes.length : '#'} claimed.`}<br/>
      { mintInfo ? multipleHolders() : '#' } people's first poap!<br/>

      <br/>

      <h2>Edit Poap</h2>
      <form onSubmit={handleUpdate}>
        <TextField fullWidth margin="normal" name="id" type="text" defaultValue={poap.id} disabled label="ID" /><br/>
        <TextField fullWidth margin="normal" name="name" type="text" defaultValue={poap.name}  placeholder="Title" label="Title" /><br/>
        <TextareaAutosize style={{ width: '100%' }} name="description" placeholder='Description' minRows={3}>{poap.description}</TextareaAutosize><br/>
        <TextField fullWidth margin="normal" name="city" type="text" defaultValue={poap.city} placeholder="City" label="City" /><br/>
        <TextField fullWidth margin="normal" name="country" type="text" defaultValue={poap.country} placeholder="Country" label="Country" /><br/>
        <TextField fullWidth margin="normal" name="start_date" type="text" defaultValue={poap.start_date} placeholder="Start date" label="Start date" /><br/>
        <TextField fullWidth margin="normal" name="end_date" type="text" defaultValue={poap.end_date} placeholder="End date" label="End date" /><br/>
        <TextField fullWidth margin="normal" name="expiry_date" type="text" defaultValue={poap.expiry_date} placeholder="Expiry date" label="Expiry date" /><br/>
        <label><input name="virtual_event" type="checkbox" defaultChecked={poap.virtual_event} ref={checkboxVirtualRef} /> Virtual Event</label><br/>
        <TextField fullWidth margin="normal" name="event_url" type="text" defaultValue={poap.event_url} placeholder="Event URL" label="Event URL" /><br/>
        <TextField fullWidth margin="normal" name="year" type="text" defaultValue={poap.year} placeholder="Year" label="Year" disabled /><br/>
        <label><input name="private_event" type="checkbox" defaultChecked={poap.private_event} ref={checkboxPrivateRef} /> Private</label><br/>
        <Button type="submit" variant='outlined'>Update</Button>
      </form>
    </div>
  )
}

