import React from "react";

import { StageTimeWrapper } from "meteor/empirica:core";
import Timer from "./Timer.jsx";

class timer extends React.Component {
  render() {
    let { remainingSeconds, player, setTimeRemaining, round } = this.props;

    if (round && round.get("chatMode") === "switch-bidirectional") {
      const STAGE_TIME = 99999999999;
      var TURN_TIME = 30;
      let { remainingSeconds, setTimeRemaining, setStageTimePassed } =
        this.props;
      const timePassed = STAGE_TIME - remainingSeconds; // total time 0-99999999
      let turnRemaining;
      const lastRefreshTime = round.get("lastRefreshTime");
      if (
        lastRefreshTime == undefined || // no msg sent yet
        lastRefreshTime <= 15 // it's the first 15s (45->30)
      ) {
        turnRemaining = TURN_TIME + 15 - timePassed; // 45 - total time passed
      } else {
        turnRemaining = TURN_TIME - (timePassed - lastRefreshTime); // 30 - time since last refresh
      }

      setTimeRemaining(turnRemaining); // turn time remaining
      setStageTimePassed(timePassed); // total time

      let minutes = ("0" + Math.floor(turnRemaining / 60)).slice(-2);
      let seconds = ("0" + (turnRemaining - minutes * 60)).slice(-2);
      if (turnRemaining < 0) {
        minutes = "00";
        seconds = "00";
      }

      const classes = ["timer", "bp3-card"];
      if (turnRemaining <= 5) {
        classes.push("lessThan5");
      } else if (turnRemaining <= 10) {
        classes.push("lessThan10");
      }

      return (
        <div className={classes.join(" ")}>
          <h5 className="bp3-heading">Timer</h5>
          <span className="seconds">
            {minutes}:{seconds}
          </span>
        </div>
      );
    } else {
      setTimeRemaining(remainingSeconds); // "actual" time remaining (out of 60s)

      if (player && player.get("role") == "speaker") {
        remainingSeconds -= 15; // speaker timer is 15s less than listener
      }

      let minutes = ("0" + Math.floor(remainingSeconds / 60)).slice(-2);
      let seconds = ("0" + (remainingSeconds - minutes * 60)).slice(-2);
      if (remainingSeconds < 0) {
        // speaker timer goes to 00:00; listener still has 15s for selection
        minutes = "00";
        seconds = "00";
      }

      const classes = ["timer", "bp3-card"];
      if (remainingSeconds <= 5) {
        classes.push("lessThan5");
      } else if (remainingSeconds <= 10) {
        classes.push("lessThan10");
      }

      return (
        <div className={classes.join(" ")}>
          <h5 className="bp3-heading">Timer</h5>
          <span className="seconds">
            {minutes}:{seconds}
          </span>
        </div>
      );
    }
  }
}

export default Timer = StageTimeWrapper(timer);
