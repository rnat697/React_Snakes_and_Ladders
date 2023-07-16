import "../css/HomePage.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppContextProvider";
import Wave from "react-wavify";

function HomePage() {
  const { players, removePlayer } = useContext(AppContext);

  // Different layers for wave on homepage
  const waveoptions = {
    height: 50,
    amplitude: 40,
    speed: 0.2,
    points: 18,
  };

  const waveoptions2 = {
    height: 50,
    amplitude: 40,
    speed: 0.2,
    points: 18,
  };
  const waveoptions3 = {
    height: 30,
    amplitude: 40,
    speed: 0.2,
    points: 18,
  };

  // Removes all existing players from the database
  async function clearDatabase() {
    for (let i = 0; i < players.length; i++) {
      const id = players[i]["_id"];
      removePlayer(id);
    }
  }

  return (
    <div className="home-page">
      <h1 className="title">Seaweed and Bubbles</h1>
      <Link className="button-start" to="/players">
        <button
          className="button-start"
          aria-label="button-start"
          onClick={() => clearDatabase()}
        >
          PLAY
        </button>
      </Link>


      {/* Waves */}
      <Wave
        className="layer1"
        fill="#99A0C4"
        paused={false}
        options={waveoptions}
      />

      <Wave
        className="layer2"
        fill="#F6E1A7"
        paused={false}
        options={waveoptions2}
      />

      <Wave
        className="layer3"
        fill="#BBC3DB"
        paused={false}
        options={waveoptions2}
      />

      <Wave
        className="layer4"
        fill="#596391"
        paused={false}
        options={waveoptions2}
      />

      <Wave
        className="layer5"
        fill="#99A0C4"
        paused={false}
        options={waveoptions2}
      />

      <Wave
        className="layer6"
        fill="#F6E1A7"
        paused={false}
        options={waveoptions3}
      />
    </div>
  );
}

export default HomePage;
