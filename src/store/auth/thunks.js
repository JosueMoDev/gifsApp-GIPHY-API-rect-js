import {
  loginWithEmailAndPassword,
  logoutFirebase,
  registerUserWithEmailAndPassword,
  singInWithGoogle,
  signInWithFacebook
} from "../../firebase/providers";
import { checkingCrendentials, login, logout } from "./auth-slice";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCrendentials());
  };
};
export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCrendentials());
    const result = await singInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));
    dispatch(login(result));
  };
};
export const startFacebookSignIn = () => {
    return async (dispatch) => {
    dispatch(checkingCrendentials());
      const result = await signInWithFacebook();
      console.log(result)
    if (!result.ok) return dispatch(logout(result.errorMessage));
    dispatch(login(result));
  };
};

export const startCreateUserWithEmailAndPassword = ({
  email,
  password,
  displayName,
}) => {
  console.log(email, password, displayName)
  return async (dispatch) => {
    dispatch(checkingCrendentials());
    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailAndPassword({ email, password, displayName });
    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailandPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCrendentials());
    const { ok, uid, photoURL, displayName, errorMessage } =
      await loginWithEmailAndPassword({ email, password });
    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLogOut = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
  };
};