import sendHttpRequest from "../utilities/sendHttpRequest";
import ReactError from "../utilities/reactError";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const construct = (endpoint) =>
  "https://identitytoolkit.googleapis.com/v1/" + endpoint + "?key=" + API_KEY;

const URL = {
  REGISTER: construct("accounts:signUp"),
  LOGIN: construct("accounts:signInWithPassword"),
  UPDATE_ACCOUNT: construct("accounts:update"),
};

const authServerApi = {
  register: async ({ email, password }) => {
    try {
      const response = await sendHttpRequest({
        method: "POST",
        url: URL.REGISTER,
        headers: {
          "content-type": "application/json",
        },
        body: { email, password, returnSecureToken: true },
      });
      return response;
    } catch (error) {
      let niceErrMessage;
      switch (error?.error?.message) {
        case "EMAIL_EXISTS":
          niceErrMessage =
            "That email exists. Please login or try a different email address.";
          break;
        case "INVALID_EMAIL":
          niceErrMessage =
            "That email is invalid. Please enter a valid email address.";
          break;
        case "ADMIN_ONLY_OPERATION":
          niceErrMessage =
            "Unfortunately we cannot register you right now.  Please try again later.";
          break;
        default:
          niceErrMessage = error?.error?.message || "Something went wrong!";
          break;
      }
      throw new ReactError({
        statusCode: error.code || 500,
        message: niceErrMessage,
      });
    }
  },
  login: async ({ email, password }) => {
    try {
      const response = await sendHttpRequest({
        method: "POST",
        url: URL.LOGIN,
        headers: {
          "content-type": "application/json",
        },
        body: { email, password, returnSecureToken: true },
      });
      return response;
    } catch (error) {
      let niceErrMessage;
      switch (error?.error?.message) {
        case "INVALID_EMAIL":
          niceErrMessage =
            "Either that username cannot be found or the password is incorrect.";
          break;
        case "EMAIL_NOT_FOUND":
          niceErrMessage =
            "Either that username cannot be found or the password is incorrect.";
          break;
        case "INVALID_PASSWORD":
          niceErrMessage =
            "Either that username cannot be found or the password is incorrect.";
          break;
        default:
          niceErrMessage = error?.error?.message || "Something went wrong!";
          break;
      }
      throw new ReactError({
        statusCode: error.code || 500,
        message: niceErrMessage,
      });
    }
  },
};

export default authServerApi;
