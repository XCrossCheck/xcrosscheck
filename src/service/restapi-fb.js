import axios from 'axios';

const dbUrl = 'https://xcrosscheck.firebaseio.com/';

// let accessToken = '';

export const dbGetReq = (req, index = null, value = null) => {
  const pr = index && value ? `?orderBy="${index}"&equalTo="${value}"` : '';
  const res = axios.get(`${dbUrl}/${req}.json${pr}`); // ,
  // { credentials: 'include', withCredentials: true });
  return res;
};

export const dbCreateRecord = (req, obj) => {
  const res = axios.post(`${dbUrl}/${req}.json`, obj); // ,
  // { credentials: 'include', withCredentials: true });
  return res;
};

export const dbPutReq = (req, obj) => {
  const res = axios.put(`${dbUrl}/${req}.json`, obj); // ,
  // { credentials: 'include', withCredentials: true });
  return res;
};

export const dbPatchReq = (req, obj) => {
  const res = axios.patch(`${dbUrl}/${req}.json`, obj); // ,
  // { credentials: 'include', withCredentials: true });
  return res;
};

export const dbDeleteReq = (req, key) => {
  const res = axios.delete(`${dbUrl}/${req}/${key}.json`); // ,
  // { credentials: 'include', withCredentials: true });
  return res;
};
