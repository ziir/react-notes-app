function dec2hex(dec) {
  return ('0' + dec.toString(16)).substr(-2);
}

function generateId() {
  const arr = new Uint8Array(5);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}

export default generateId;
