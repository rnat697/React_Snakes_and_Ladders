import "../css/NumPlayersPage.css";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppContextProvider";
import bubbleCornerTop from "../assets/bubble_top_left.png";
import bubbleCornerBtm from "../assets/bubble_btm_right.png";
import Wave from "react-wavify";

function NumPlayersPage() {
  const {
    currentID,
    setCurrentID,
    maxPlayers,
    setMaxPlayers,
    maxCommies,
    changeCom,
    addPlayer,
  } = useContext(AppContext);

  const waveoptions = {
    height: 40,
    amplitude: 60,
    speed: 0.15,
    points: 6,
};

  // Increases/decrease number of players accordingly
  // Ensures total number of players (including COM) is max 6
  function handlePlayerCount(string) {
    if (string == ">" && maxPlayers + maxCommies != 6) setMaxPlayers(maxPlayers + 1);
    else if (string == "<" && maxPlayers != 1) setMaxPlayers(maxPlayers - 1);
    console.log("maxPlayers: " + maxPlayers);
  }

  // Increases/decrease number of COM players accordingly
  // Ensures total number of players (including human players) is max 6
  function handleComCount(string) {
    if (string == ">" && maxPlayers + maxCommies != 6) changeCom(maxCommies + 1);
    else if (string == "<" && maxCommies != 0) changeCom(maxCommies - 1);
    console.log("maxCommies: " + maxCommies);
  }

  // Adds players (including COM) to database with default name, placement and image
  async function handleAddPlayer() {
    for (let i = 0; i < maxPlayers; i++) {
      const newPlayer = await addPlayer(`Player ${i + 1}`, 0, "", true);
      console.log(newPlayer);
    }
    for (let i = 0; i < maxCommies; i++) {
      const newPlayer = await addPlayer(`COM ${i + 1}`, 0, "avatar_com.png", false);
      console.log(newPlayer);
    }
  }


  return (
    <div className="num-players-page">
      {/* ------ Back Button ------ */}
      <img className="bubble-top" src={bubbleCornerTop} />
      <Link to="/">
        <button className="back-btn">
        </button>
      </Link>

      <div className="bubbles-div">
        {/* ------ Players Bubble ------ */}
        <div className="bubble-p">
          <div className="player-type">
            <p> PLAYERS </p>
          </div>
          <div className="bubble-flex">
            <button
              className="decrease-btn"
              onClick={() => handlePlayerCount("<")}>
              <img className="decrease-img" src="../src/assets/decrease.png" />
            </button>
            <p className="player-count">{maxPlayers}</p>
            <button
              className="increase-btn"
              aria-label="increase-btn1"
              onClick={() => handlePlayerCount(">")}>
              <img className="increase-img" src="../src/assets/increase.png" />
            </button>
          </div>
        </div>
        {/* ------ Com Players Bubble ------ */}
        <div className="bubble-c">
          <div className="player-type">
            <p> COM PLAYERS </p>
          </div>
          <div className="bubble-flex">
            <button className="decrease-btn" onClick={() => handleComCount("<")}>
              <img className="decrease-img" src="../src/assets/decrease.png" />
            </button>
            <p className="player-count">{maxCommies}</p>
            <button className="increase-btn" onClick={() => handleComCount(">")}>
              <img className="increase-img" src="../src/assets/increase.png" />
            </button>
          </div>
        </div>
      </div>

      {/* ------ Next Button ------ */}
      <img className="bubble-bot" src={bubbleCornerBtm} />
      <NavLink to={"/avatar/" + currentID + "/" + maxPlayers}>
        <button
          className="next-btn"
          disabled={maxPlayers + maxCommies < 2}
          onClick={() => {
            handleAddPlayer();
            setCurrentID(0);
          }}>
        </button>
      </NavLink>

      <div className="test">
        <Wave
          className="test"
          fill="#99A0C4"
          paused={false}
          options={waveoptions}
        />
      </div>
    </div>
  );
}

export default NumPlayersPage;
