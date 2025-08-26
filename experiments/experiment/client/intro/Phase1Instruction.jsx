import React from "react";
import { Centered } from "meteor/empirica:core";

export default class Phase1Instruction extends React.Component {
  render() {
    return (
      <Centered>
        <div className="phase-instructions">
          <h3 className={"bp3-heading"}> Instructions (Phase 1) </h3>
          <p>
            Congrats, you passed the quiz! Before we introduce you to your
            partner and allow you to chat back and forth interactively, we'll
            ask you to provide some initial descriptions. We'll show these
            descriptions to your partner later on, using the same sets of
            images.
          </p>
          <p>
            You will be the <strong>Speaker</strong> on every round of this
            initial phase and must write a single message that will allow your
            partner to successfully pick out the target and avoid picking one of
            the other images. You won't receive any feedback right now, but we
            will determine your bonus based on their ability to successfully
            pick the target when we show it to them later.
          </p>
          <p>Please click "Continue" to begin!</p>
          <button
            type="button"
            className="bp3-button bp3-intent-primary"
            onClick={() => {
              this.props.onNext();
            }}
          >
            Continue
            <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right" />
          </button>
        </div>
      </Centered>
    );
  }
}
