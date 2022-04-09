// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABP4Axl8MQeG1Q-UiCx1N6TGis8VDOF-E",
  authDomain: "fir-user-password.firebaseapp.com",
  projectId: "fir-user-password",
  storageBucket: "fir-user-password.appspot.com",
  messagingSenderId: "793444640543",
  appId: "1:793444640543:web:b1d6a85919f41c122b722a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;