import axios from 'axios';

const dbUrl = 'https://xcrosscheck.firebaseio.com/';

let accessToken = ''; 

export const dbGetReq = (req, index = null, value = '') => {
  // https://xcrosscheck.firebaseio.com/tasks.json?orderBy=%22author%22&equalTo="newuser";
  const pr = index ? `?orderBy="${index}"&equalTo="${value}"` : '';
  const res = axios.get(`${dbUrl}/${req}.json${pr}${accessToken}`); // ,
  // { credentials: 'include', withCredentials: true });
  // console.log(`Status code:`, res.status);
  // console.log(`Status text:`,res.statusText);
  return res;
};

export const dbCreateRecord = (req, obj) => {
  const res = axios.post(`${dbUrl}/${req}.json${accessToken}`, obj); // ,
  // { credentials: 'include', withCredentials: true });
  return res;
};

export const dbDeleteRecord = async (req, success, reject, id) => {
  try {
    const res = await axios.delete(`${dbUrl}/${req}.json/${id}${accessToken}`); // ,
    // { credentials: 'include', withCredentials: true });
    if (success) success(res.data);
    return res;
  } catch (e) {
    console.log(`request failed: ${e}`);
    if (reject) reject(e);
    return null;
  }
};

export const dbUpdateRecord = async (req, success, reject, id) => {
  try {
    const res = await axios.delete(`${dbUrl}/${req}.json/${id}${accessToken}`); // ,
    // { credentials: 'include', withCredentials: true });
    if (success) success(res.data);
    return res;
  } catch (e) {
    console.log(`request failed: ${e}`);
    if (reject) reject(e);
    return null;
  }
};
