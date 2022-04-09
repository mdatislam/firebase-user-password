// import logo from './logo.svg';
import "./App.css";
import app from "./firebase.init";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword, 
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
// import { Button } from 'react-bootstrap';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const [email,setEmail]= useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const [register,setRegister]=useState(false)
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {
        setUser({});
      });
  };

  // Form Part Start Here
  
  const handlemailblur = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordblur = (e) => {
    setPassword(e.target.value);
  };
  const handleFormSubmit = (e) => {
    if(register){
      signInWithEmailAndPassword(auth,email,password)
      .then(result=>{
        const user = result.user;
        console.log(user)
        setEmail('')
        setPassword('')
      })
      .catch(error=>{
        console.error(error)
        setError(error.message)
      })
    }
    else{
      createUserWithEmailAndPassword(auth,email,password)
      .then(result=>{
        const user=result.user;
        console.log(user)
        setEmail('')
        setPassword('')
      })
      .catch(error=>{
        console.error(error)
        setError(error.message)
      })
    }
    
    console.log("form submit");
    e.preventDefault();
  };

  const handleRegister = event=>{
    setRegister( event.target.checked )
  }
  return (
    <div >
      <div className="registration w-50 mx-auto">
        <h3>Please {register?'Log-In':'Register'}</h3>
      <Form onSubmit={ handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handlemailblur} type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handlePasswordblur} type="password" placeholder="Password"  required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check onChange={handleRegister} type="checkbox" label="Already have Registered ?" />
  </Form.Group>
        <Button variant="primary" type="submit">
        {register?'Log-In':'Register'}
        </Button>
      </Form>
      <p className="text-danger">{error}</p>
      </div>

      <div className="container mt-5 py-4">
        {user.uid ? (
          <button onClick={handleSingOut}> Sing-Out</button>
        ) : (
          <button onClick={handleGoogleSingIn}>Sing-in-Google</button>
        )}

        <h3>Name:{user.displayName}</h3>
        <p>email: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>
    </div>
  );
}

export default App;
