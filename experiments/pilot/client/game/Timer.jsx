import React from "react";

import {StageTimeWrapper} from "meteor/empirica:core";
import Timer from "./Timer.jsx";

class timer extends React.Component {
  render() {
    let { remainingSeconds, player, setTimeRemaining } = this.props;

    setTimeRemaining(remainingSeconds) // "actual" time remaining (out of 60s)

    if (player.get("role") == 'speaker') {
      remainingSeconds -= 15 // speaker timer is 15s less than listener
    }

    let minutes = ("0" + Math.floor(remainingSeconds / 60)).slice(-2);
    let seconds = ("0" + (remainingSeconds - minutes * 60)).slice(-2);
    if (remainingSeconds < 0){
      // speaker timer goes to 00:00; listener still has 15s for selection
      minutes = "00"
      seconds = "00"
    }
  
    const classes = ["timer", "bp3-card"];
    if (remainingSeconds <= 5) {
      classes.push("lessThan5");
    } else if (remainingSeconds <= 10) {
      classes.push("lessThan10");
    }

    return (
      <div className={classes.join(" ")}>
        <h5 className='bp3-heading'>Timer</h5>
        <span className="seconds">{minutes}:{seconds}</span>
      </div>
    );
  }
}

export default (Timer = StageTimeWrapper(timer));
