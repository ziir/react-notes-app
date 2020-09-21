// Since real encryption/decryption are out of scope
// mock the encrypt and decrypt operations with the following functions
// that do not alter any data.
const wait = async (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 500);
  });
};

export const encrypt = async (data) => {
  await wait(500);
  return data;
};

export const decrypt = async (data) => {
  await wait(500);
  return data;
};
