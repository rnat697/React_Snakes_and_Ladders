import "../css/AvatarPage.css";
import { Link, NavLink } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import { AppContext } from "../AppContextProvider";
import bubbleCornerTop from "../assets/bubble_top_left.png";
import bubbleCornerBtm from "../assets/bubble_btm_right.png";
import Wave from "react-wavify";

const avatarImageFiles = [
  "avatar_pufferfish.png",
  "avatar_dolphin.png",
  "avatar_otter.png",
  "avatar_squid.png",
  "avatar_seal.png",
  "avatar_octopus.png",
  "avatar_shark.png",
  "avatar_tropic_fish.png",
];

function AvatarPage() {
  const {
    currentID,
    setCurrentID,
    maxPlayers,
    players,
    editPlayer,
  } = useContext(AppContext);

  const waveoptions = {
    height: 40,
    amplitude: 60,
    speed: 0.15,
    points: 6,
  };


  const nextID = currentID + 1;
  const previousID = currentID - 1;

  const [gameBtnState, setGameBtnState] = useState(false); // To control enablement/disablement of start game button
  const [activeAvatar, setActiveAvatar] = useState(""); // To control visual indicator for avatar selection
  const [nextPlayerBtnState, setNextBtnState] = useState(false); // To control visual indicator for next avatar selection
  const refNameInput = useRef(null);
  const [inputName, setInputName] = useState("Player "+(currentID+1));

  // Updates player name if user input custom name
  function handleNameChange(newName) {
    newName.length > 0
      ? (setInputName(newName))
      : (setInputName("Player " + (currentID + 1)));
  }

  // Updates player avatar when user confirms avatar selection
  function handleAvatarBtnClick(avatarFileName) {
    setActiveAvatar(avatarFileName);
    if (currentID + 1 < maxPlayers) { // only enable the next button if the current ID is not the max number of players and an avatar is selected
      setNextBtnState(true);
    }
    canPlayersStartGame(true); // Checks if last player has chosen avatar in order to play game
  }

  // Enables "Start game" button if last player has chosen an avatar
  function canPlayersStartGame(hasChosen) {
    if (hasChosen && currentID + 1 == maxPlayers) {
      setGameBtnState(true);   // Last player has selected avatar
    } else {
      setGameBtnState(false);  // More players need to select avatar
    }
  }

  // Clears previous player avatar and name
  function clearAvatarSelectionAndNameInput() {
    refNameInput.current.value = ""; // Clears input field
    if (activeAvatar.length > 0) {
      setActiveAvatar(""); // Clears avatar
    }
  }

  // Modifies player's name and avatar in database
  async function editAvatar(currentID, inputName, activeAvatar) {
    const id = players[currentID]["_id"];
    editPlayer(id, inputName, 0, activeAvatar);
  }

  // To check if avatar has already been selected by a previous player and disable the button if it has
  function checkAvatarAlreadySelected(file) {
    let hasAlreadySelected = false;

    for (let i = 0; i < currentID; i++) {
      if (players[i]["image"] == file) {
        hasAlreadySelected = true;
      }
    }
    return hasAlreadySelected;
  }

  return (
    <div className="avatar-page">
      <img className="bubble-top" src={bubbleCornerTop} />
      <Link
        to={
          currentID == 0
            ? "/players"
            : "/avatar/" + previousID.toString() + "/" + maxPlayers.toString()
        }>
        <button
          className="back-btn"
          onClick={() => {
            clearAvatarSelectionAndNameInput();
            if (currentID > 0) {
              setCurrentID(currentID - 1);
              setInputName(players[currentID-1]['name']);
            }
          }}>
        </button>
      </Link>

      <div className="avatar-container">
        {/* ------ Headings -----*/}
        <h1 className="heading-title">SELECT AVATAR</h1>
        <h2 className="heading-subtitle" aria-label="nameSubtitle">
          {inputName}
        </h2>
        <input
          aria-label="nicknameInput"
          className="nickname-input"
          type="text"
          ref={refNameInput}
          placeholder="Enter a nickname..."
          onChange={(e) => handleNameChange(e.target.value)}
        />
        {/* ------ Avatar Selection -----*/}
        <div className="avatar-content">
          {avatarImageFiles.map((file) => (
            <div className="avatar-circles" key={"avatar-circle" + file}>
              <button
                className={
                  activeAvatar == file
                    ? "selected-avatar-img-btn"
                    : "default-avatar-img-btn"
                }
                key={"button" + file}
                onClick={() => handleAvatarBtnClick(file)}
                disabled={checkAvatarAlreadySelected(file)}
                aria-label={file}>
                <img
                  className="avatar-images"
                  key={file}
                  src={`/src/assets/selectable_avatars/${file}`}
                // alt={file}
                />
              </button>
            </div>
          ))}
        </div>

        {/* ------ Next button -----*/}
        <img className="bubble-bot" src={bubbleCornerBtm} />
        <NavLink
          to={"/avatar/" + nextID.toString() + "/" + maxPlayers.toString()}>
          <button
            className="next-btn"
            disabled={!nextPlayerBtnState}
            aria-label="nextPlayerAvatarBtn"
            onClick={() => {
              editAvatar(currentID, inputName, activeAvatar);
              clearAvatarSelectionAndNameInput();
              setInputName("Player " + (currentID+2)); // reset for next player's default name
              setCurrentID(currentID + 1);
              setNextBtnState(false); // reset for next page
            }}>
          </button>
        </NavLink>
                {/* ------ Start game button -----*/}
        <Link to="/game">
          <button
            className="start-game-btn"
            disabled={!gameBtnState}
            aria-label="startGameBtn"
            onClick={() => {
              editAvatar(currentID, inputName, activeAvatar);
              setCurrentID(0);
            }}>
            {"PLAY GAME"}
          </button>
        </Link>
      </div>
      <div className="test1">
        <Wave
          className="test1"
          fill="#99A0C4"
          paused={false}
          options={waveoptions}
        />
      </div>

    </div>
  );
}

export default AvatarPage;
