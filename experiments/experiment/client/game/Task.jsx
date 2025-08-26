import React from "react";

import Tangram from "./Tangram.jsx";
// import Timer from "./Timer.jsx";
// import { HTMLTable } from "@blueprintjs/core";
// import { StageTimeWrapper } from "meteor/empirica:core";

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    // We want each participant to see tangrams in a random but stable order
    // so we shuffle at the beginning and save in state
    this.state = {
      activeButton: false,
    };
  }

  render() {
    const { game, round, stage, player, timeRemaining, stageTimePassed } =
      this.props;
    const target = round.get("target");
    // console.log(target);
    if (player.get("role") == "speaker") {
      var tangramURLs = round.get("tangrams")[0];
    } else {
      var tangramURLs = round.get("tangrams")[1];
    }
    var correct;
    if (player.get("clicked")) {
      correct = player.get("clicked")["path"] == target;
    } else {
      correct = false;
    }
    let tangramsToRender;
    if (tangramURLs) {
      tangramsToRender = tangramURLs.map((tangram, i) => (
        <Tangram
          key={tangram["path"]}
          tangram={tangram}
          tangram_num={i}
          round={round}
          stage={stage}
          game={game}
          player={player}
          target={target}
          timeRemaining={timeRemaining}
          stageTimePassed={stageTimePassed}
        />
      ));
    }

    const speakerMsgs = _.filter(round.get("chat"), (msg) => {
      return msg.role == "speaker";
    });

    let feedback = "";
    if (stage.name === "descriptionNoFeedback") {
      // the only feedback in "no feedback" rounds
      if (
        !player.get("clicked") &&
        stage.name === "descriptionNoFeedback" &&
        timeRemaining !== -1 &&
        timeRemaining < 15 &&
        speakerMsgs.length === 0
      ) {
        feedback =
          "Sorry, the speaker didn't sent a description in time. You earned no bonus this round.";
      }
    } else {
      if (!player.get("clicked")) {
        if (timeRemaining <= 0) {
          feedback = "Time's up! You earned no bonus this round.";
        }
      } else {
        if (correct) {
          feedback = "Correct! You earned $0.03 bonus!";
        } else {
          feedback =
            "Oops, that wasn't the target! You earned no bonus this round.";
        }
      }
    }

    return (
      <div className="task" style={{ display: "inline-block" }}>
        <div className="board">
          <h1 className="roleIndicator">
            {" "}
            You are the{" "}
            <span
              style={{
                color: player.get("role") === "speaker" ? "red" : "blue",
                fontWeight: "bold",
              }}
            >
              {player.get("role")}
            </span>
            .
          </h1>
          <div className="all-tangrams">
            <div className="tangrams">
              <div style={{ marginLeft: "80px" }}>
                {tangramsToRender[0]}
                {tangramsToRender[1]}
                {tangramsToRender[2]}
              </div>
              <div style={{}}>
                {tangramsToRender[3]}
                {tangramsToRender[4]}
                {tangramsToRender[5]}
                {tangramsToRender[6]}
              </div>
              <div style={{ marginLeft: "80px" }}>
                {tangramsToRender[7]}
                {tangramsToRender[8]}
                {tangramsToRender[9]}
              </div>
            </div>
          </div>
          {stage.name.includes("description") && (
            <h3 className="feedbackIndicator">{feedback}</h3>
          )}
        </div>
      </div>
    );
  }
}
