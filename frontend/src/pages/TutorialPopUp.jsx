import "../css/TutorialPopUp.css";
import bubbleCornerTop from "../assets/bubble_top_left.png";
import bubbleCornerBtm from "../assets/bubble_btm_right.png";
import TutorialImage from "../assets/tutorial_image.png";
import HowToPlay from "../assets/how_to_play.png";

function TutorialPopUp(props) {
  return props.trigger ? (
    <div className="tutorial-popup">
      <div className="popup-inner">
        <div>
          {/* Tutorials heading */}
          <div className="tutorial-header">
            <h1>
              HOW TO PLAY
              <img className="how-to-play" src={HowToPlay} />
            </h1>
          </div>
          {/* Tutorials content  */}
          <div className="tutorial-content">
            <div className="board-image">
              <img className="board-image" src={TutorialImage} />
            </div>
            <p className="instruction">
              Roll the dice and Swim to make your way to the treasure!
              <br />
              <br />
              If you land on a square with seaweed, you slide down.
              <br />
              <br />
              If you land on a square with bubbles, you float up.
              <br />
              <br />
              First one to 100 is the winner!
            </p>
          </div>
          {props.children}
        </div>
      </div>

      {/* The close button */}
      <div>
        <img className="bubble-top-left" src={bubbleCornerTop} />
        <button className="close-btn" aria-label="closeTutorialBtn" onClick={() => props.setTrigger(false)}>
          {/* {'X'} */}
        </button>
      </div>

      {/* Bubble corner effects */}
      <div>
        <div className="placing-btn"></div>
        <img className="bubble-bot-right" src={bubbleCornerBtm} />
      </div>
    </div>
  ) : (
    ""
  );
}

export default TutorialPopUp;
