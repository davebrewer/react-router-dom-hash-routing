const url = process.env.REACT_APP_API_URL;

// Headers
const getOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'X-API-Key': process.env.REACT_APP_POAP_API_KEY
  }
};

const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: process.env.REACT_APP_POAP_BEARER,
    'X-API-Key': process.env.REACT_APP_POAP_API_KEY
  },
  body: null
};

const optionsCreate = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    Authorization: process.env.REACT_APP_POAP_BEARER,
    'X-API-Key': process.env.REACT_APP_POAP_API_KEY
  },
  body: null
};

const getOptionsWithBearer = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: process.env.REACT_APP_POAP_BEARER,
    'X-API-Key': process.env.REACT_APP_POAP_API_KEY
  }
};

const putOptions = {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'X-API-Key': process.env.REACT_APP_POAP_API_KEY
  }
};

export const postWithBearerOptions = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: process.env.REACT_APP_POAP_BEARER,
    'X-API-Key': process.env.REACT_APP_POAP_API_KEY
  },
  body: null
};

// Normalise form data
export const createUpdatePoapForm = (formEvent, checkboxVirtualValue, checkboxPrivateValue, secretCode) => {
  const form = new FormData();
  form.append("name", formEvent.target['name'].value);
  form.append("description", formEvent.target['description'].value);
  form.append("country", formEvent.target['country'].value);
  form.append("city", formEvent.target['city'].value);
  form.append("start_date", formEvent.target['start_date'].value);
  form.append("end_date", formEvent.target['end_date'].value);
  form.append("expiry_date", formEvent.target['expiry_date'].value);
  form.append("event_url", formEvent.target['event_url'].value);
  form.append("virtual_event", checkboxVirtualValue);
  form.append("year", formEvent.target['year'].value);
  form.append("secret_code", secretCode);
  form.append("private_event", checkboxPrivateValue);

  return form;
}

export const buildCreatePoapForm = (formEvent) => {
  const image = formEvent.target['image'].files[0];

  const form = new FormData();
  form.append("name", formEvent.target['name'].value);
  form.append("description", formEvent.target['description'].value);
  form.append("city", formEvent.target['city'].value);
  form.append("country", formEvent.target['country'].value);
  form.append("start_date", formEvent.target['start_date'].value);
  form.append("end_date", formEvent.target['end_date'].value);
  form.append("expiry_date", formEvent.target['expiry_date'].value);
  form.append("year", formEvent.target['year'].value);
  form.append("event_url", formEvent.target['event_url'].value);
  form.append("virtual_event", formEvent.target['virtual_event'].checked);
  form.append("image", image);
  form.append("secret_code", formEvent.target['secret_code'].value);
  form.append("email", formEvent.target['email'].value);
  form.append("private_event", formEvent.target['private_event'].checked);

  return form;
}

// Calls
export const getPoap = async (id) => {
  const response = await fetch(`${url}/events/id/${id}`, getOptions);
  const poap = await response.json();
  return poap;
}

export const getPoaps = async (savedLsPoaps) => {
  const lsPoapsObj = JSON.parse(savedLsPoaps);
  const poapIds = lsPoapsObj.map(poap => poap.event_id);

  const responses = await Promise.all(poapIds.map(async poapId => {
    const response = await fetch(`${url}/events/id/${poapId}`, getOptions);
    return await response.json();
  }));

  responses.map(poap => {
    poap.secret_code = lsPoapsObj.filter(lsPoap => lsPoap.event_id === poap.id)[0].secret_code;
    return poap;
  })

  return responses;
}

export const updatePoap = async (formData, fancyId) => {
  putOptions.body = formData;
  const response = await fetch(`${url}/events/${fancyId}`, putOptions);
  
  return response.status ? true : false;
}

export const getPoapsMinted = async (id) => {
  const response = await fetch(`${url}/event/${id}/poaps`, getOptionsWithBearer);
  return response.json();
}

const handleError = () => {
  alert('Had a little hiccup! :x, Achoo, pls refresh the browser.')
}

export const getQrCodes = async (id, secretCode) => {
  options.body = JSON.stringify({secret_code: secretCode});
  const response = await fetch(`${url}/event/${id}/qr-codes`, options).catch(handleError);

  if (response.ok) {
    return response.json();
  } else {
      return Promise.reject(response);
  }
}

export const validateEvent = async (eventId, secretCode) => {
  postWithBearerOptions.body = JSON.stringify({ event_id: eventId, secret_code: secretCode });
  const response = await fetch('https://api.Poap.tech/event/validate', postWithBearerOptions);
  const isValidObj = await response.json();
  return isValidObj.valid;
}

// Create event /events
export const createEvent = async (formData) => {
  optionsCreate.body = formData;
  const response = await fetch(`${url}/events`, optionsCreate).catch(handleError);
  return response.json();
}
