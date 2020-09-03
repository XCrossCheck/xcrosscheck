
const firebaseConfig = {
  apiKey: "AIzaSyC66GldVYNAivKMja9SoxEcPUwi3hSvIPg",
  authDomain: "xcrosscheck.firebaseapp.com",
  databaseURL: "https://xcrosscheck.firebaseio.com",
  projectId: "xcrosscheck",
  storageBucket: "xcrosscheck.appspot.com",
  messagingSenderId: "574503113520",
  appId: "1:574503113520:web:fec589504a0957041ceef5",
  measurementId: "G-V8MD605SGQ"
};

const axios = require('axios').default;
const url = 'https://xcrosscheck.firebaseio.com/';

const {google} = require("googleapis");

// Load the service account key JSON file.
const serviceAccount = require("./xcrosscheck-firebase-adminsdk-b6us4-e48e5f3ad4.json");

// Define the required scopes.
const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/firebase.database"
];

// Authenticate a JWT client with the service account.
const jwtClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  scopes
);
let access_token = null;
// Use the JWT client to generate an access token.
jwtClient.authorize(function(error, tokens) {
  if (error) {
    console.log("Error making request to generate access token:", error);
  } else if (tokens.access_token === null) {
    console.log("Provided service account does not have permission to generate access tokens");
  } else {
    // const accessToken = tokens.access_token;
    access_token = `?access_token=${tokens.access_token}`;
    console.log('44',access_token );
    makeGetRequest('users');
    makeGetRequest('roles');
    makeGetRequest('tasks');
    // See the "Using the access token" section below for information
    // on how to use the access token to send authenticated requests to
    // the Realtime Database REST API.
  }

}
);

// .then(data => {
// console.log(data);
//   console.log('52',access_token );

// })


async function makeGetRequest(req) {

  // const instance = axios.create({
  //   baseURL: 'https://some-domain.com/api/',
  //   timeout: 1000,
  //   headers: {'X-Custom-Header': 'foobar'}
  // });

// work
// create // let res = await axios.post(url, { id: "111u0O45bv", author: "cwwwardamo", state: "DRAFT",} );
// read // let res = await axios.get(url+"u0O45bv");
// update //let res = await axios.put(url+"lzmsCbm", {author: "Conan D", state: "DRAFT"});
// delete // let res = await axios.delete(url+ "u0O45bv" );
try {
let res = await axios.get(url+req+".json"+access_token, {credentials: "include", withCredentials: true });
// let res = await axios.get(url);
console.log(`Status code:`, res.status);
console.log(`Status text:`,res.statusText);
// console.log(`Request method: `,res.request.method);
// console.log(`Path: `,res.request.path);

// console.log(`Date: `,res.headers.date);
console.log(`Data: `, res.data );
// console.log(res);

} catch (e) {
  console.log(`😱 Axios request failed: ${e}`);
}


  // return res;
  
}

// makePostRequest();
  
// });
return;
