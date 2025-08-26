import React from "react";
import { Centered } from "meteor/empirica:core";

export default class Phase3Instruction extends React.Component {
  render() {
    return (
      <Centered>
        <div className="phase-instructions">
          <h3 className={"bp3-heading"}> Instructions (Phase 3) </h3>
          <p>That's it for the main phase of the study!</p>
          <p>
            We just have a few more questions before you go. Now that you've
            gotten to know your partner a bit, we're interested in your ability
            to communicate about a new set of pictures.
          </p>
          <p>
            Like the previous phase, you will take turns as Speaker and
            Listener, but now you will only be able to send <strong>one</strong>{" "}
            message as the Speaker, instead of chatting freely, and you will no
            longer receive feedback.
          </p>
          <p>
            The final phase will start automatically in 30 seconds… Good luck!
          </p>
          {/* <button
            type="button"
            className="bp3-button bp3-intent-primary"
            onClick={() => {
              Meteor.setTimeout(() => player.stage.submit(), 3000);
            }}
          >
            Continue
            <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right" />
          </button> */}
        </div>
      </Centered>
    );
  }
}
