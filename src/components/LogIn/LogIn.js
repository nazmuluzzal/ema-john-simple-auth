import React, { useContext, useState } from "react";
import "./LogIn.css";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  initializeLogInFramework,
  handleGoogleSignIn,
  handleFbSignIn,
  handleSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./LogInManager";

function LogIn() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });

  initializeLogInFramework();

  // Context Api
  // eslint-disable-next-line
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  //
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  // google
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };
  // facebook
  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  // sign Out
  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const handleSubmit = (e) => {
    //console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }

    e.preventDefault();
  };

  // const handleChange = (event) => {
  //   console.log(event.target.name, event.target.value);
  // };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const handleBlur = (e) => {
    //console.log(e.target.name, e.target.value);
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPassWordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPassWordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  return (
    <div className="login">
      <h1>Fire Base </h1>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}{" "}
      <br />
      <button onClick={fbSignIn}>Sign In using FaceBook</button>
      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <h1>Our Own Authentication</h1>
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}
      <input
        onChange={() => setNewUser(!newUser)}
        type="checkbox"
        name="newUSer"
        id=""
      />
      <label htmlFor="newUser">New User Sign Up</label>
      <br />
      {newUser && (
        <input
          onBlur={handleBlur}
          name="name"
          type="text"
          placeholder="Your Name"
        />
      )}
      <br />
      <form onSubmit={handleSubmit}>
        <input
          // onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="email"
          placeholder="Your Email Address"
          required
        />
        <br />
        <input
          // onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          name="password"
          placeholder="Your Password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Crated" : "Logged In"} Successfully
        </p>
      )}
    </div>
  );
}

export default LogIn;
