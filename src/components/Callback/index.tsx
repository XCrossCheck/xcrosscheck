/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-types */
// /* eslint-disable @typescript-eslint/naming-convention */
// /* eslint-disable @typescript-eslint/restrict-template-expressions */
// /* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable max-len */
// /* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import { exit } from 'process';

async function getAccessToken(code: string) {
  const authurl = `https://noxcc.herokuapp.com/authenticate/${code}`;
  let res;
  try {
    res = await axios(authurl, {
      method: 'get',
    });
    
    return res;
  } catch (e) {
    console.log(`Axios request failed: ${e}`);
    return null;
  }
}

async function getGitUser(token:string) {
  let res;
  try {
    res = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`
      }
    });
    
    return res;
  } catch (e) {
    console.log(`Axios request failed: ${e}`);
    return null;
  }
}

const createOrUpdateDBUser = () => {
  

}

type TCallback = {
  history: {}; // {length: number, action: string, location: {…}, createHref: ƒ, push: ƒ, …}
  location: { pathname: string; search: string; hash: string; state: undefined };
  match: { path: string; url: string; isExact: boolean; params: {} };
  staticContext: undefined;
};

type TGitAuth = {
  props: TCallback;
  setLogged: (lstate: boolean) => void;
  setGithubId: (githubId: string) => void;
  setToken: (githubId: string) => void;
};

// const Callback:React.FC<fCallback> = ({ location }) => {
const Callback: React.FC<TGitAuth> = ({ props, setLogged, setGithubId, setToken }) => {

  const {location: {search} } = props;
  // console.log('Callback:', search);
  const url = new URLSearchParams(search);
  const code = url.get('code');
  let token = 'not ready'; 
  //  !!!!!!!
  // const state = url.get('state') || '';
  // if (state !== verify_state) then exit;

  if (code) {
    getAccessToken(code) // state
      .then((data) => {
        token = data?.data.token;
        setToken(token);
        const github = getGitUser(token);
        return github;
      })
      .then((data) => {
        const {data: {login}} = data;
        console.log('then', login);
        
        setGithubId( login);
        setLogged(true);
        // const exp = (new Date(Date.now() + 86400e3)).toUTCString();
        document.cookie = `login=${login}; max-age=3600; secure`;   // expires=${exp}`;
        // encodeURIComponent(name) + '=' + encodeURIComponent(value);        
        // write 2 db



      })
      .catch((data) => console.log('catch', data));
  }

  return <Redirect to="/" />;
  
};

export default Callback;
