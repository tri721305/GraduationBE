import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyA2Y8W0Or_zNmL8FLvFSZUSdQD4f8FoJH0",
  authDomain: "graduation-8d481.firebaseapp.com",
  projectId: "graduation-8d481",
  storageBucket: "graduation-8d481.appspot.com",
  messagingSenderId: "430392756908",
  appId: "1:430392756908:web:e3af872f9d4a8273296d09",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
