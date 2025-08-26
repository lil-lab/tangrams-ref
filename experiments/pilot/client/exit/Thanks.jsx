import React from "react";

import { Centered } from "meteor/empirica:core";

export default class Thanks extends React.Component {
  static stepName = "Thanks";

  componentWillMount() {}

  exitMessage = (player, game) => {
    return (
      <div>
        {" "}
        <h1> Experiment Completed </h1>
        <br />
        <h3>
          Please{" "}
          <a href={"https://app.prolific.co/submissions/complete?cc=CSOMOAPK"}>
            click here
          </a>{" "}
          to receive your pay.
        </h3>
        <p>
          <strong>
            Your final pay is ${+player.get("bonus").toFixed(2) + 4.25 || 4.25}.
          </strong>{" "}
        </p>
        <p>
          Thank you again for participating! If you were curious, you were
          always interacting in real time with real human partners. The aim of
          our study was to understand how language is used to communicate
          abstract shapes and how segmentation of abstract shapes is perceived.
          Please email us at{" "}
          <a href="mailto: yoav@cs.cornell.edu">yoav@cs.cornell.edu</a> or{" "}
          <a href="mailto: rdhawkins@princeton.edu">rdhawkins@princeton.edu</a>{" "}
          if you have any questions or concerns.
        </p>
      </div>
    );
  };

  render() {
    const { player, game } = this.props;
    if (!game) {
      return <h1> Error generating code! Please contact requester. </h1>;
    }
    return (
      <Centered>
        <div className="game finished">
          {this.exitMessage(player, game)}
          <hr />
          <div className="pt-non-ideal-state-description"></div>
        </div>
      </Centered>
    );
  }
}
