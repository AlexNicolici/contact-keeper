import React, { useCallback, useContext, useEffect } from "react";
import { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";
import AlertContext from "../alert/AlertContext";

const AuthState = (props) => {
  const token = localStorage.getItem("token");
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const initialState = {
    token: token,
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = useCallback(async () => {
    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      const errorMessage = err.response.data.msg;
      setAlert(errorMessage, "danger");
      dispatch({ type: AUTH_ERROR });
    }
  }, [setAlert]);

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);

      setAuthToken(res.data.token);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errorMessage = err.response.data.msg;
      setAlert(errorMessage, "danger");
      dispatch({
        type: REGISTER_FAIL,
        payload: errorMessage,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    try {
      const res = await axios.post("/api/auth", formData);

      setAuthToken(res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errorMessage = err.response.data.msg;
      setAlert(errorMessage, "danger");
      dispatch({
        type: LOGIN_FAIL,
        payload: errorMessage,
      });
    }
  };

  // Logout
  const logout = () =>
    dispatch({
      type: LOGOUT,
    });

  // Clear Errors
  const clearErrors = useCallback(() => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  }, []);

  useEffect(() => {
    if (token) {
      loadUser();
    }
  }, [token, loadUser]);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
