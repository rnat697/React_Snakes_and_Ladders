import "../css/GamePage.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../AppContextProvider";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Die from "../components/Die";
import GameBoard from "../components/GameBoard";
import TutorialPopUp from "./TutorialPopUp";
import BackToHomePopUp from "./BackToHomePopUp";
import bgm from "../music/baby-shark-bgm.mp3";
import seaweedSound from "../music/whistle-down.mp3";
import bubbleSound from "../music/soap-bubbles-pop.mp3";
import crowdClappingSound from "../music/crowd-clapping.mp4";
import bubblesBackground from "../assets/bubbles.png";
import seaweedBackground from "../assets/seaweed_popup.png";

function GamePage() {
  // Set the background color of the body
  document.body.style.backgroundColor = "#A5ACCD";

  // Add font awesome icons to the library
  library.add(fas);

  // Access data from the AppContext
  const {
    currentID,
    nextID,
    players,
    setCurrentID,
    setNextID,
    movePlayer,
    seaweeds,
    bubbles,
  } = useContext(AppContext);

  // State variables
  const [tutorialButtonPopup, setTutorialButtonPopup] = useState(true);
  const [backToHomeButtonPopUp, setBackToHomeButtonPopUp] = useState(false);
  const [rollCount, setRollCount] = useState(0); // New state variable
  const [rollDiceBtnEnabled, setRollDiceBtnEnabled] = useState(true);

  // Audio mute button
  const button = document.querySelector(".sound");
  const audioMute = () => {
    document.getElementById("player").muted =
      !document.getElementById("player").muted;
    button.classList.toggle("active");
  };

  // Define the faces of the die
  const sides = ["one", "two", "three", "four", "five", "six"];

  // State variables for the dice and rolling state
  const [die1, setDie1] = useState("one");
  const [die2, setDie2] = useState("two");
  const [rolling, setRolling] = useState(false);

  // Use the useNavigate hook to navigate to different pages
  const navigate = useNavigate();

  // Function to roll the dice
  function roll(isHuman) {
    const s1 = Math.floor(Math.random() * sides.length);
    const s2 = Math.floor(Math.random() * sides.length);
    setDie1(sides[s1]);
    setDie2(sides[s2]);
    setRolling(true);

    setTimeout(() => {
      setRolling(false);
      step(s1 + 1, s2 + 1, isHuman);
    }, 700);
  }

  // Function to move the player
  async function step(step1, step2, isHuman) {
    const step = step1 + step2;
    var id, para;
    if (isHuman) {
      id = players[currentID]["_id"];
      para = players[currentID]["placement"] + step;
    } else {
      id = players[nextID]["_id"];
      para = players[nextID]["placement"] + step;
    }
    movePlayer(id, para);
  }

  // Function to check if it's the computer's turn
  function checkCom() {
    if (!players[nextID]["isHuman"]) {
      setRollDiceBtnEnabled(false);
      setTimeout(() => {
        roll(false);
      }, 700);
    }
  }
  const [newPosition, setNewPosition] = useState("-1");

  // Function to check if the player landed on seaweeds or bubbles
  async function checkSeaweedsBubbles() {
    for (let i = 0; i < seaweeds.length; i++) {
      if (players[currentID]["placement"] == seaweeds[i][0]) {
        movePlayer(players[currentID]["_id"], seaweeds[i][1]);
        new Audio(seaweedSound).play();
        setNewPosition(seaweeds[i][1]);
        document.getElementById("game-page-content").style.opacity = "50%";
        document.getElementById("seaweed-pop-up").style.display = "block";
        document.getElementById("seaweed-animation").style.display = "block";
      }
    }

    for (let i = 0; i < bubbles.length; i++) {
      if (players[currentID]["placement"] == bubbles[i][0]) {
        movePlayer(players[currentID]["_id"], bubbles[i][1]);
        new Audio(bubbleSound).play();
        setNewPosition(bubbles[i][1]);
        document.getElementById("game-page-content").style.opacity = "50%";
        document.getElementById("bubbles-pop-up").style.display = "block";
        document.getElementById("bubbles-animation").style.display = "block";
      }
    }
  }

  // Function to check if there's a winner
  function checkWinner() {
    if (players[currentID]["placement"] >= 100) {
      new Audio(crowdClappingSound).play();
      setTimeout(() => {
        navigate("/results"); // Navigate to the results page
      }, 1000);
    }
  }

  // Function to re-render the page
  async function reRender() {
    setRollCount(rollCount + 1); // Use functional form of setRollCount
  }

  // Function to close the pop-ups
  function closePopUps() {
    document.getElementById("game-page-content").style.opacity = "100%";
    document.getElementById("seaweed-pop-up").style.display = "none";
    document.getElementById("bubbles-pop-up").style.display = "none";
    document.getElementById("seaweed-animation").style.display = "none";
    document.getElementById("bubbles-animation").style.display = "none";
  }

  const handleBtn = rolling ? "roll-dice-rolling" : "";

  return (
    <div className="game-page">
      <img
        id="bubbles-animation"
        className="bubbles-popup-animation"
        src={bubblesBackground}
      />
      <img
        id="seaweed-animation"
        className="seaweed-popup-animation"
        src={seaweedBackground}
      />
      <div id="game-page-content" className="game-page-content">
        <div className="div-1">
          <div className="container roll-dice">
            <button
              className={handleBtn}
              disabled={!rollDiceBtnEnabled}
              onClick={() => {
                setRollDiceBtnEnabled(false);
                roll(true);
              }}>
              Click to Roll!
            </button>
          </div>
          <div className="container white-bgr">
            <div className="roll-dice-container">
              <Die face={die1} rolling={rolling} />
              <Die face={die2} rolling={rolling} />
            </div>
          </div>
          <div className="container">
            <button
              className="swim-btn"
              disabled={rollDiceBtnEnabled}
              onClick={() => {
                setRollDiceBtnEnabled(true);
                reRender();
                checkWinner();
                checkSeaweedsBubbles();
                checkCom();

                // setTimeout(() => {
                setCurrentID((current) =>
                  current + 1 >= players.length ? 0 : current + 1
                );
                setNextID((next) =>
                  next + 1 >= players.length ? 0 : next + 1
                );
                // }, 300);
              }}>
              Swim!
            </button>
          </div>
          <div className="container">
            <p className="current-player-tag">
              Current Player: {players[currentID]["name"]}
            </p>
            <div className="div-players">
              <div className="current-player">
                <img
                  className="current-player-image"
                  src={`/src/assets/selectable_avatars/${players[currentID]["image"]}`}
                  alt="Current Player"
                />
              </div>
              <div className="next-player">
                <img
                  className="next-player-image"
                  src={`/src/assets/selectable_avatars/${players[nextID]["image"]}`}
                  alt="Next Player"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="div-2">
          <GameBoard key={rollCount} />
        </div>

        <div className="div-3">
          <div className="justify-left">
            <button
              className="pop-up-button gold-dark-bgr home btn"
              aria-label="home-btn"
              onClick={() => setBackToHomeButtonPopUp(true)}
            />
            <BackToHomePopUp
              trigger={backToHomeButtonPopUp}
              setTrigger={setBackToHomeButtonPopUp}
            />
          </div>

          <div className="justify-right">
            <audio id="player" src={bgm} autoPlay loop></audio>
            <div>
              <button
                id="sound-button"
                className="pop-up-button purple-light-bgr sound btn"
                onClick={audioMute}></button>
            </div>
          </div>

          <div className="justify-left">
            <button
              className="pop-up-button white-bgr tutorial btn"
              onClick={() => setTutorialButtonPopup(true)}
            />
            <TutorialPopUp
              trigger={tutorialButtonPopup}
              setTrigger={setTutorialButtonPopup}
            />
          </div>
        </div>
      </div>

      {/* Seaweed Pop Up */}
      <div id="seaweed-pop-up" className="seaweed-bubbles-pop-up">
        <div className="seaweed-bubbles-pop-up-inner">
          <p>{`Slide down to ${newPosition} :(`}</p>
          <button
            className="continue-button"
            onClick={() => {
              closePopUps();
              reRender();
            }}>
            {" "}
            CONTINUE{" "}
          </button>
        </div>
      </div>

      {/* Bubbles Pop Up */}
      <div id="bubbles-pop-up" className="seaweed-bubbles-pop-up">
        <div className="seaweed-bubbles-pop-up-inner">
          <p>{`Float up to ${newPosition} !`}</p>
          <button
            className="continue-button"
            onClick={() => {
              closePopUps();
              reRender();
            }}>
            {" "}
            CONTINUE{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GamePage;
