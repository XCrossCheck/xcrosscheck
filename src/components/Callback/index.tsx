import React from 'react';
import axios from 'axios';
// import { exit } from 'process';

async function getAccessToken(code: string, state: string) {
  // const authurl = 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token';
  // const authurl = 'https://github.com/login/oauth/access_token';
  // const authurl = 'https://cors-anywhere.herokuapp.com/https://lmaa.ru';
  const authurl = 'http://localhost:9999/authenticate/'+code;
  let res;
  try {
    // debugger;
    // res = await axios('https://localhost:3000');
    res = await axios(authurl,
      {
        method: 'get'
        // withCredentials: true,
        // data: {
        //   code,
        //   client_id: 'f4ecf84a7ba9d4e393f2',
        //   client_secret: 'e636e6260894895446c8805faeb4988e302f309a',
        //   // redirect_uri: 'https://localhost',
        //   state,
        // },
        // headers: {
        //   'Access-Control-Allow-Origin': '*',
        //   Accept: 'application/json',
        //   // 'Content-Type': 'application/json',
        //   'Content-Type': 'application/x-www-form-urlencoded',
        //   'X-Requested-With': 'XMLHttpRequest',
        //   'Access-Control-Allow-Headers': 'x-request-with, x-request-by',
        // }
      });

    console.log('res', res);
  } catch (e) {
    console.log(`Axios request failed: ${e}`);
  }
  return res;
}

type fCallback = {
  history: {}; // {length: number, action: string, location: {…}, createHref: ƒ, push: ƒ, …}
  location: {pathname: string, search: string, hash: string, state: undefined};
  match: {path: string, url: string, isExact: boolean, params: {}};
  staticContext: undefined;
}

// const Callback:React.FC<fCallback> = ({ location }) => {
const Callback:React.FC<any> = ( {props} ) => {
  

//   let res = axios('https://lmaa.ru')
//     .then(data => console.log('then', data))
//     .catch(data => console.log('catch', data));
// console.log(res);


  console.log('Callback:', props.location);
  console.log(props.location.search);

  const url = new URLSearchParams(props.location.search);
  const code = url.get('code');
  const state = url.get('state')||'';

  let token='not ready';
  //  !!!!!!!
  // if (state !== verify_state) then exit;

  // code  client_id  client_secret
  // POST https://github.com/login/oauth/access_token

  // create // let res = await axios.post(url, { id: "111u0O45bv", author: "cwwwardamo", state: "DRAFT",} );
  // read // let res = await axios.get(url+"u0O45bv");
  // update //let res = await axios.put(url+"lzmsCbm", {author: "Conan D", state: "DRAFT"});
  let rs;
  console.log('code', code, state);

  // create // let res = await axios.post(url, { id: "111u0O45bv", author: "cwwwardamo", state: "DRAFT",} );

  if (code) {
    getAccessToken(code, state)
      .then(data => { token = data?.data.token; console.log('then', data?.data)})
      .catch(data => console.log('catch', data));

    // console.log(rs);
  }

  return (
    <div className="login-form">
      CALLBACK detected token={token}

    </div>
  );
};

export default Callback;
