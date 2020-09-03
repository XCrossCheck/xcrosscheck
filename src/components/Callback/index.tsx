import React from 'react';
import axios from 'axios';
import { exit } from 'process';

async function getAccessToken(code: string) {
  const authurl = 'https://github.com/login/oauth/access_token';
  let res;
  try {
    res = await axios.post(authurl, {
      code,
      client_id: 'f4ecf84a7ba9d4e393f2',
      client_secret: 'e636e6260894895446c8805faeb4988e302f309a',
    });
    console.log('res',res);
  } catch (e) {
    console.log(`Axios request failed: ${e}`);
  }
  return res;
}

// const Callback:React.FC<fCallback> = ({ setLogged }) => {
const Callback = (props:any) => {
  console.log('Callback:', props);
  console.log(props.location.search);
  const url = new URLSearchParams(props.location.search);
  const code = url.get('code');
  const state = url.get('state');

//  !!!!!!!
  // if (state !== verify_state) then exit;

  // code  client_id  client_secret
  // POST https://github.com/login/oauth/access_token

  // create // let res = await axios.post(url, { id: "111u0O45bv", author: "cwwwardamo", state: "DRAFT",} );
  // read // let res = await axios.get(url+"u0O45bv");
  // update //let res = await axios.put(url+"lzmsCbm", {author: "Conan D", state: "DRAFT"});
  let rs;
  if (code) {
    getAccessToken(code)
    .then(data => console.log(data))
    .catch(data => console.log(data));
    
    // console.log(rs);
  }


  return (
    <div className="login-form">
      CALLBACK detected {code}  {state} {rs}

    </div>
  );
};

export default Callback;
