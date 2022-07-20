export const lsCollection = () => {
  const lsPoapsString = window.localStorage.getItem('lsPoaps');
  return lsPoapsString ? JSON.parse(lsPoapsString) : [];
}

export const lsDoesNotHaveID = (id) => {
  const matchesLength = lsCollection().filter(poap => poap.id === id).length;
  return !matchesLength;
}

export const lsAddPoap = (poapObj) => {
  const updatedLsPoaps = [poapObj, ...lsCollection()];
  window.localStorage.setItem('lsPoaps', JSON.stringify(updatedLsPoaps));
}

export const lsRemovePoap = (poapId) => {
  const updatedLsPoaps = lsCollection().filter(poap => poap.event_id !== poapId);
  window.localStorage.setItem('lsPoaps', JSON.stringify(updatedLsPoaps));
}

export const lsUpdateOrder = (poapObj) => {
  console.log(poapObj)
  const updatedLsPoaps = lsCollection().filter(poap => poap.event_id !== poapObj.event_id);
  window.localStorage.setItem('lsPoaps', JSON.stringify([poapObj, ...updatedLsPoaps]));
}

