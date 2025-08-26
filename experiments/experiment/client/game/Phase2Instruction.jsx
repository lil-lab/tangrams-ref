import React from "react";
import { Centered } from "meteor/empirica:core";

export default class Phase2Instruction extends React.Component {
  render() {
    return (
      <Centered>
        <div className="phase-instructions">
          <h3 className={"bp3-heading"}> Instructions (Phase 2) </h3>
          <p>
            Great work! Thanks for all the great descriptions. Now we're ready
            to introduce you to your partner to play the interactive game!
          </p>
          <p>
            In this phase of the study, you will take turns as the Speaker and
            the Listener. Pay attention to the top of the screen, which will
            tell you which role you are playing in the current round.
          </p>
          <p>
            You can <strong>both</strong> use the chat box as much as you want
            to ask questions, clarify descriptions, or provide additional
            information. We would like to get you through the experiment in a
            timely manner so that our estimated hourly payment rates are
            accurate, so you will see a timer counting down.
          </p>
          <p>
            The timer will <strong>reset</strong> each time one of you sends a
            message, and the round will conclude when either (1) the Listener
            clicks on an image, or (2) the timer runs out.
          </p>
          <p>
            At the end of the round, both of you will receive feedback. The
            Speaker will see which one the Listener picked, and the Listener
            will get to see the correct target.
          </p>

          <p>Phase 2 will start automatically in 45 seconds...</p>
        </div>
      </Centered>
    );
  }
}
