import "../css/ResultsPage.css";
import { Link } from "react-router-dom";
import bubblesBackground from "../assets/bubbles.png";
import comAvatar from "../assets/selectable_avatars/avatar_com.png"; //placeholder
import seaweed from "../assets/results_seaweed.gif";

import resultSound from "../music/tadaa.mp3";
import { AppContext } from "../AppContextProvider";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";

function ResultsPage() {
  const { players } = useContext(AppContext);

  // Function to check the player winner
  var winner;
  for (let i = 0; i < players.length; i++) {
    // Navigate through list of players to find current player on last hundredth grid.
    if (players[i]["placement"] >= 100) {
      winner = players[i];
    }
  }

  return (
    <div className="results-page">
      {/* Play music on start result page */}
      <audio id="player" src={resultSound} autoPlay></audio>
      {/* Play animated bubbles background */}
      <img className="bubbles-animation" src={bubblesBackground} />

      <div className="results-content">
        <div className="winner-player-image-div">
          <img
            className="winner-player-image"
            src={`/src/assets/selectable_avatars/${winner["image"]}`}></img>
        </div>
        <img className="seaweed" src={seaweed} />
        <div className="podium">
          <h1 className="winner-tag">Winner</h1>
          <h2 className="winner-player-tag">{winner["name"]}</h2>
        </div>
      </div>

      {/* Move back to home page */}
      <Link to="/">
        <button className="next-btn"></button>
      </Link>
    </div>
  );
}

export default ResultsPage;
