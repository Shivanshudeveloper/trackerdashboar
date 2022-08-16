import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_SERVICE, Application_Id } from "src/config/uri";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signedUpUser, setSignedUpUser] = useState(null);
  const [org, setOrg] = useState(null);
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    const userData = window.sessionStorage.getItem("user")
      ? JSON.parse(window.sessionStorage.getItem("user"))
      : null;

    const organization = window.sessionStorage.getItem("org")
      ? JSON.parse(window.sessionStorage.getItem("org"))
      : null;

    setOrg(organization);
    setUser(userData);
  }, []);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const signIn = async (obj) => {
    try {
      const { data } = await axios.post(`${API_SERVICE}/api/login`, obj, config);
      window.sessionStorage.setItem("authToken", data.token);
      window.sessionStorage.setItem("user", JSON.stringify({ ...data.user, role: "Admin" }));
      setUser(data.user);
    } catch (error) {
      console.log(error.message);
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

      const userData = {
        id: res.data.user.id,
        fullName: res.data.user.fullName,
        email: res.data.user.email,
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
      value={{ signIn, user, signUp, signedUpUser, updateOrgName, org, addTeams, teams }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
