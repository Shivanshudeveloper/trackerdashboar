import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_SERVICE, Application_Id } from "src/config/uri";
import { isJwtExpired } from 'jwt-check-expiration';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signedUpUser, setSignedUpUser] = useState(null);
  const [org, setOrg] = useState(null);
  const [teams, setTeams] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userData = window.localStorage.getItem("user")
      ? JSON.parse(window.localStorage.getItem("user"))
      : null;

    const organization = window.localStorage.getItem("org")
      ? JSON.parse(window.localStorage.getItem("org"))
      : null;

    const authToken = window.localStorage.getItem("token")
    ? window.localStorage.getItem("token")
    : null;

    setOrg(organization);
    setUser(userData);
    setToken(authToken);
  }, []);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const isAuthenticated = () => {
    console.log(isJwtExpired(token))
    if (token) {
      return !isJwtExpired(token)
    }
    return false;
  }

  const signIn = async (obj) => {
    try {
      const { data } = await axios.post(`${API_SERVICE}/api/login`, obj, config);
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("user", JSON.stringify({ ...data.user, role: "Admin" }));
      setUser(data.user);
      return true
    } catch (error) {
      console.log(error.message);
      return false
    }
  };

  const signUp = async (obj) => {
    try {
      const body = {
        user: {
          fullName: obj.fullName,
          email: obj.email,
          password: obj.password,
        },
        sendSetPasswordEmail: false,
        skipVerification: false,
        registration: {
          applicationId: Application_Id,
        },
      };

      const res = await axios.post(`${API_SERVICE}/api/register`, body, config);

      const token = res.data?.token
      if (token) {
        localStorage.setItem('token', token)
      }

      const userData = {
        id: res.data?.user.id,
        fullName: res.data?.user.fullName,
        email: res.data?.user.email,
      };

      const { data } = await axios.post(`${API_SERVICE}/api/admin/register`, userData, config);
      setSignedUpUser(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateOrgName = async (org) => {
    try {
      const res = await axios.post(
        `${API_SERVICE}/api/organization/create`,
        { data: { name: org } },
        config
      );

      setOrg(res.data);

      const body = {
        organization: res.data.id,
        email: signedUpUser.email,
      };

      const { data } = await axios.put(`${API_SERVICE}/api/admin/update`, body, config);
      console.log(data);
      setSignedUpUser(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const addTeams = async (body) => {
    try {
      const { data } = await axios.post(`${API_SERVICE}/api/team/create`, body, config);
      setTeams(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ signIn, user, signUp, signedUpUser, updateOrgName, org, addTeams, teams, isAuthenticated, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
