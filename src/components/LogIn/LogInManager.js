import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLogInFramework = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
};

// Google
export const handleGoogleSignIn = () => {
  //console.log("sign in Clicked");
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      const { displayName, email, photoURL } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        // password: password,
        photo: photoURL,
        success: true,
      };
      return signedInUser;
      //console.log(displayName, email, photoURL);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};

// Facebook

export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      var credential = result.credential;
      var accessToken = credential.accessToken;
      var user = result.user;
      user.success = true;
      return user;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};

// sign out

export const handleSignOut = () => {
  console.log("SignOut clicked");
  return firebase
    .auth()
    .signOut()
    .then(() => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        // password: "",
        photo: "",
      };
      return signedOutUser;
    })
    .catch((error) => {
      console.log(error);
    });
};

//
export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

//
export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

//

export const updateUserName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(function () {
      console.log("User Name updated successfully");
    })
    .catch(function (error) {
      console.log(error);
    });
};
