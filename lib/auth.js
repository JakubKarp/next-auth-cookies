import axios from 'axios';
import Router from 'next/router';

// dla funckji getUserProfile
axios.defaults.withCredentials = true;

const WINDOW_USER_SCRIPT_VARIABLE = '__USER__';

export const getUserScript = user => {
  return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)} `
}

export const getServerSideToken = (req) => {
  if (req === undefined) {
    return {};
  } else {
    const { signedCookies = {} } = req;
    if (!signedCookies) {
      return {};
    } else if (!signedCookies.token) {
      return {};
    }
    return { user: signedCookies.token };
  }
};


// export const  getClientSideToken = async () => {
//   if (typeof window !== 'undefined') {
//     const user = await window[WINDOW_USER_SCRIPT_VARIABLE] || {};
//     return {user}
//   }
//   return { user: {}}
// }



// export const  authInitialProps =  () => {
//   ({req, res}) =>  {
//     const auth = req ? getServerSideToken(req) : getClientSideToken()
//     return { auth }
//   }
// }

export const loginUser = async (email, password) => {
  const { data } = await axios.post('/api/login', {email, password});
  console.log(data);
  if (typeof window !== 'undefined') {
    window[WINDOW_USER_SCRIPT_VARIABLE] = data || {}
  }
}

export const getUserProfile = async () => {
  const { data } = await axios.get('/api/profile')
  console.log("getUserProfile -> data", data)
  return data
}

export const logoutUser = async () => {
  if (typeof window !== "undefined") {
    window[WINDOW_USER_SCRIPT_VARIABLE] = {};
  }
  await axios.post("/api/logout");
  Router.push("/login");
};