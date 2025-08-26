import React from "react";
import EventLog from "./EventLog";
import ChatLog from "./ChatLog";
import Timer from "./Timer";

export default class SocialInteractions extends React.Component {
  renderPlayer(player, self = false) {
    var key, color, avatar, playerName;
    if (!player) {
      key = undefined;
      color = undefined;
      avatar = undefined;
      playerName = undefined;
    } else {
      key = player._id;
      color = player.get("nameColor");
      avatar = player.get("avatar");
      playerName = player.get("name");
    }
    return (
      <div className="player" key={key}>
        <span className="image"></span>
        <img src={avatar} />
        <span className="name" style={{ color: color }}>
          {playerName}
          {self ? " (You)" : " (Partner)"}
        </span>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: -1,
      lastRefreshTime: 0,
      stageTimePassed: 0,
    };
  }

  setTimeRemaining = (time) => {
    this.props.getTimeRemaining(time); // pass time remaining up to Round component
    this.setState({ timeRemaining: time });
  };

  // pass on stage total time passed from Timer
  setStageTimePassed = (time) => {
    this.props.getStageTimePassed(time); // pass stage time passed up to Round component
    this.setState({ stageTimePassed: time });
  };

  render() {
    const { game, round, stage, player } = this.props;
    const partnerId = player.get("partner");
    const partner = _.filter(game.players, (p) => p._id === partnerId)[0];
    const messages = round
      .get("chat")
      .filter(
        ({ playerId }) => playerId === partnerId || playerId === player._id
      )
      .map(({ text, playerId }) => ({
        text,
        subject: game.players.find((p) => p._id === playerId),
      }));
    const events = stage.get("log").map(({ subjectId, ...rest }) => ({
      subject: subjectId && game.players.find((p) => p._id === subjectId),
      ...rest,
    }));

    //update last refresh time (total time)
    // const refreshTime = round.get("lastRefreshTime");
    // if (refreshTime && refreshTime !== this.state.lastRefreshTime) {
    //   this.setState({
    //     lastRefreshTime: refreshTime,
    //   });
    // }

    return (
      <div
        className="social-interactions"
        style={{ width: "30%", display: "inline-block" }}
      >
        <div className="status">
          <div className="players bp3-card">
            {this.renderPlayer(player, true)}
            {this.renderPlayer(partner)}
          </div>

          <Timer
            stage={stage}
            round={round}
            player={player}
            setTimeRemaining={this.setTimeRemaining}
            setStageTimePassed={this.setStageTimePassed}
            // lastRefreshTime={this.state.lastRefreshTime}
          />

          {stage.name === "description" ? (
            <div className="total-score bp3-card">
              <h5 className="bp3-heading">Bonus</h5>

              <h2 className="bp3-heading">
                ${(player.get("bonus") || 0).toFixed(2)}
              </h2>
            </div>
          ) : (
            <div
              className="total-score bp3-card"
              style={{ overflow: "scroll" }}
            >
              <h5 className="bp3-heading" style={{ marginBottom: 0 }}>
                Bonus
              </h5>

              <p>{"Earn up to $0.60. Bonus will be determined later."}</p>
            </div>
          )}
        </div>

        <ChatLog
          messages={messages}
          round={round}
          stage={stage}
          player={player}
          timeRemaining={this.state.timeRemaining}
          stageTimePassed={this.state.stageTimePassed}
        />
        <EventLog
          events={events}
          round={round}
          game={game}
          stage={stage}
          player={player}
        />
      </div>
    );
  }
}
