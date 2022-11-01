import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";
import { AuthContext } from "./authContext";

export const TeamAndUserContext = createContext();

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const TeamAndUserProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState(null);
  const [userData, setUserData] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user !== null) {
      getTeams(user.organization);
      getUsersByGroup(user.organization);
    }
  }, [user]);

  const getTeams = async (organization) => {
    try {
      const { data } = await axios.get(`${API_SERVICE}/api/getTeams/${organization}`);
      setTeams(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUsersByGroup = async (organization) => {
    try {
      const { data } = await axios.get(`${API_SERVICE}/api/teamUsersByGroup/${organization}`);
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getUserDetails = async (id) => {
    try {
      const { data } = await axios.get(`${API_SERVICE}/api/teamUser/${id}`);
      setUserData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateUserDetails = async (body) => {
    try {
      await axios.post(`${API_SERVICE}/api/teamUser/update`, body, config);
      getUsersByGroup(user.organization);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addNewUser = async (body) => {
    try {
      await axios.post(`${API_SERVICE}/api/teamUser/create`, body, config);
      getUsersByGroup(user.organization);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.put(`${API_SERVICE}/api/teamUser/delete/${id}`);
      getUsersByGroup(user.organization);
    } catch (error) {
      console.log(error.message);
    }
  };

  const resetId = async (newId, currentId) => {
    try {
      const body = {
        currentId: currentId,
        newId: newId,
      };

      const { data } = await axios.put(`${API_SERVICE}/api/teamUser/resetId`, body, config);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TeamAndUserContext.Provider
      value={{
        getTeams,
        teams,
        getUsersByGroup,
        users,
        getUserDetails,
        userData,
        setUserData,
        updateUserDetails,
        deleteUser,
        addNewUser,
        resetId,
      }}
    >
      {children}
    </TeamAndUserContext.Provider>
  );
};

export default TeamAndUserProvider;
