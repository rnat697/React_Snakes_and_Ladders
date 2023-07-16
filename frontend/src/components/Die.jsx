import "../css//Die.css";
import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Die extends Component {
  render() {
    const { face, rolling } = this.props;

    // Using font awesome icon to show the exact number of dots
    return (
      <div>
        <FontAwesomeIcon
          icon={["fas", `fa-dice-${face}`]}
          className={`die ${rolling && "die-shaking"}`}
        />
      </div>
    );
  }
}

export default Die;
