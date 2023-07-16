import "../css/BackToHomePopUp.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppContextProvider";

function BackToHomePopUp(props) {
    
    const {
        players,
        removePlayer,
    } = useContext(AppContext);

    // Removes all existing players from the database
    async function clearDatabse() {
        for (let i = 0; i < players.length; i++) {
            const id = players[i]["_id"];
            removePlayer(id);
        }
    }

    return props.trigger ? (
        <div className="backtohome-popup">
            <div className="popup-inner">
                <div className="popup-content">
                    <div className="backtohome-message">
                        Are you sure you want to quit this game?<br />
                        Your game progress will <b>NOT</b> be saved
                    </div>

                    {/* Resumes game. Exits popup */}
                    <button className="cancel-button"
                        aria-label="resumeGameBtn"
                        onClick={() => props.setTrigger(false)}>
                        Resume
                    </button>

                    {/* Quits game. Users are directed back to home page and all data is removed from database. */}
                    <Link to="/">
                        <button className="backtohome-button" 
                        aria-label="quiteGameBtn"
                        onClick={() => clearDatabse()}
                        >
                            Quit
                        </button>
                    </Link>
                    {props.children}
                </div>
            </div>
        </div>
    ) : (
        ""
    );
}

export default BackToHomePopUp;
