import React from "react";
import useGet from "./hooks/useGet";
import axios from "axios";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const AppContext = React.createContext({
  articles: [],
});

function AppContextProvider({ children }) {
  // Sets up the app to fetch the players from a REST API.
  const {
    data: players,
    isLoading: playersLoading,
    refresh: refreshPlayers,
  } = useGet(`${API_BASE_URL}/player`, []);

  async function addPlayer(name, placement, image, isHuman) {
    const playerToUpload = {
      name,
      placement,
      image,
      isHuman,
    };

    const playerResponse = await axios.post(
      `${API_BASE_URL}/player`,
      playerToUpload
    );
    refreshPlayers();
    return playerResponse.data;
  }

  async function editPlayer(id, inputName, newPlacement, avatar) {
    const playerToEdit = {
      name: inputName,
      placement: newPlacement,
      image: avatar,
      isHuman: true,
    };

    const playerResponse = await axios.put(
      `${API_BASE_URL}/player/${id}`,
      playerToEdit
    );
    refreshPlayers();
    return playerResponse.data;
  }

  async function removePlayer(id) {
    const playerResponse = await axios.delete(
      `${API_BASE_URL}/player/${id}`
      // playerToEdit
    );
    refreshPlayers();
    return playerResponse.data;
  }

  async function movePlayer(id, newPlacement) {
    if (newPlacement > 100) {
      newPlacement = 100;
    }
    const playerToMove = {
      placement: newPlacement,
    };

    const playerResponse = await axios.put(
      `${API_BASE_URL}/player/${id}`,
      playerToMove
    );
    refreshPlayers();
    return playerResponse.data;
  }

  const seaweeds = [
    [16, 6],
    [49, 11],
    [62, 19],
    [87, 24],
    [47, 26],
    [56, 53],
    [64, 60],
    [93, 73],
    [95, 76],
    [98, 78],
  ];

  const bubbles = [
    [2, 38],
    [4, 14],
    [9, 31],
    [28, 76],
    [21, 42],
    [36, 44],
    [51, 67],
    [71, 91],
    [80, 82],
  ];

  const [currentID, setCurrentID] = useState(0);
  const [nextID, setNextID] = useState(1);
  const [maxPlayers, setMaxPlayers] = useState(1);
  const [maxCommies, changeCom] = useState(0);

  // The context value that will be supplied to any descendants of this component.
  const context = {
    players,
    playersLoading,
    addPlayer,
    editPlayer,
    removePlayer,
    movePlayer,
    currentID,
    setCurrentID,
    nextID,
    setNextID,
    maxPlayers,
    setMaxPlayers,
    maxCommies,
    changeCom,
    seaweeds,
    bubbles,
  };

  // Wraps the given child components in a Provider for the above context.
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider };
