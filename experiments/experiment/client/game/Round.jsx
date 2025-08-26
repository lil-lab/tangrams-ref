import React from "react";

import SocialInteractions from "./SocialInteractions.jsx";
import Task from "./Task.jsx";
import Phase2Instruction from "./Phase2Instruction.jsx";
import Phase3Instruction from "./Phase3Instruction.jsx";

const roundSound = new Audio("experiment/round-sound.mp3");
const gameSound = new Audio("experiment/bell.mp3");
const setTimeout = function (player) {
  if (!player.get("exitTimeoutId")) {
    player.set(
      "exitTimeoutId",
      Meteor.setTimeout(() => {
        player.set("exited", true);
        player.exit(
          "It looks like one of your partners disconnected before you could finish the experiment!"
        );
      }, 300000)
    );
  }
};
const cancelTimeout = function (player) {
  const id = player.get("exitTimeoutId");
  if (id) {
    Meteor.clearTimeout(id);
    player.set("exitTimeoutId", null);
  }
};

export default class Round extends React.Component {
  componentDidMount() {
    const { game } = this.props;
    if (game.get("justStarted")) {
      //play the bell sound only once when the game starts
      gameSound.play();
      game.set("justStarted", false);
    } else {
      roundSound.play();
    }
  }

  constructor() {
    super();
    this.state = { timeRemaining: -1, stageTimePassed: 0 };
  }

  getTimeRemaining = (time) => {
    this.setState({ timeRemaining: time });
  };

  getStageTimePassed = (time) => {
    this.setState({ stageTimePassed: time });
  };

  render() {
    const { round, stage, player, game } = this.props;
    const allPlayersOnline = game.players.every(
      (player) => player.online || player.bot
    );
    const anyPlayersExited = game.players.some((player) =>
      player.get("exited")
    );

    if (!allPlayersOnline || anyPlayersExited) {
      setTimeout(player);
    } else {
      cancelTimeout(player);
    }

    // INSTRUCTION (between phase 2 and 3)
    if (stage.name === "phase2-instruction") {
      return <Phase2Instruction player={player}></Phase2Instruction>;
    }

    // INSTRUCTION (between phase 2 and 3)
    if (stage.name === "phase3-instruction") {
      return <Phase3Instruction player={player}></Phase3Instruction>;
    }

    // DESCRIPTION TASK
    // end the trial if the speaker didn't send messages.
    // console.log(
    //   `round: ${this.state.timeRemaining}`,
    //   this.state.timeRemaining !== -1 && this.state.timeRemaining <= 0
    // );
    console.log(this.state.timeRemaining);
    if (this.state.timeRemaining <= -2 && !player.stage.submitted) {
      //delay 2s to show feedback
      // const speakerMsgs = _.filter(round.get("chat"), (msg) => {
      //   return msg.role == "speaker";
      // });
      // if (speakerMsgs.length === 0) {
      const partner = _.find(
        game.players,
        (p) => p._id === player.get("partner")
      );

      !player.stage.submitted && player.stage.submit();
      !partner.stage.submitted && partner.stage.submit();
      round.set("lastRefreshTime", undefined);
    }

    return (
      <div className="round">
        <SocialInteractions
          game={game}
          round={round}
          stage={stage}
          player={player}
          getTimeRemaining={this.getTimeRemaining}
          getStageTimePassed={this.getStageTimePassed}
        />
        <Task
          game={game}
          round={round}
          stage={stage}
          player={player}
          timeRemaining={this.state.timeRemaining}
          stageTimePassed={this.state.stageTimePassed}
        />
      </div>
    );
  }
}
