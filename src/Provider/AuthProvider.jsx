import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Config/firebase.Config";

export const AuthContext = createContext(null); //creating context
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setLoggedUser] = useState({});
  const [loading, setLoading] = useState(true);

  //google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //github login
  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  //create new user with email and password
  const createUser = (email, password) => {
    setLoading(true); //login true kore dite hbe jate dynamic routing er smoy user set hbr age porjonto loding activate thake and user set hbr time pay
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login with email and password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleUpdateProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //Log Out / Sign out
  const logOut = () => {
    return signOut(auth);
  };

  //Observer /Stay User Logged In
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoggedUser(user);
      setLoading(false); // user set korar pore loading false kore dite hbe
    });
  }, []);

  //recommended----------------------
  //observer /Stay User Logged In----work similar
  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, (user) => {
  //     setLoggedUser(user);
  //setLoading(false);
  //   });
  //   return () => {
  //     unSubscribe();
  //   };
  // }, []);

  const authentications = {
    googleLogin,
    githubLogin,
    createUser,
    loginUser,
    logOut,
    user,
    loading,
    handleUpdateProfile,
  };

  return (
    <AuthContext.Provider value={authentications}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
