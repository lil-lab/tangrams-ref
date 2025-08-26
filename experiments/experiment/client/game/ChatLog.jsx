import React from "react";
import Author from "./Author";
import Timer from "./Timer";

export default class ChatLog extends React.Component {
  state = { comment: "" };
  TURN_TIME = 30;

  handleEmoji = (e) => {
    e.preventDefault();
    const text = e.currentTarget.value;
    console.log(text);
    const { round, player, stage, timeRemaining } = this.props;
    //const room = player.get('roomId')
    console.log(stage);
    console.log(timeRemaining);
    round.append("chat", {
      text,
      playerId: player._id,
      target: round.get("target"),
      role: player.get("role"),
      type: "message",
      time: new Date(),
      secUntilSend: null,
      // round.get("lastRefreshTime") == undefined ||
      // round.get("lastRefreshTime") <= 15
      //   ? this.TURN_TIME + 15 - timeRemaining
      //   : this.TURN_TIME - timeRemaining,
    });
  };

  handleChange = (e) => {
    const el = e.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const text = this.state.comment.trim();
    const { round, player, stage, timeRemaining, stageTimePassed } = this.props;

    const lastRefreshTime = round.get("lastRefreshTime");
    var secUntilSend = -1;
    if (stage.name === "descriptionNoFeedback") {
      //phase 3
      secUntilSend = 60 - timeRemaining;
    } else if (stage.name === "description") {
      //phase 2: if no msg sent yet, 45 - remaining time; if prev msg exsits, total time passed - last refresh time
      secUntilSend = lastRefreshTime
        ? stageTimePassed - lastRefreshTime
        : this.TURN_TIME + 15 - timeRemaining;
    }

    if (text !== "") {
      console.log("message sent after seconds: ", secUntilSend);
      round.append("chat", {
        text,
        playerId: player._id,
        // roomId: room,
        target: round.get("target"),
        role: player.get("role"),
        time: new Date(),
        secUntilSend: secUntilSend,
      });
      this.setState({ comment: "" });
      // SET TURNS
      // round.set(
      //   "turn",
      //   player.get("role") === "speaker" ? "listener" : "speaker"
      // );
      round.set("lastRefreshTime", stageTimePassed);
    }
  };

  render() {
    const { comment } = this.state;
    const { messages, player, round, stage, timeRemaining } = this.props;

    var placeholder = "Enter chat message";

    var disableAttribute = null;
    // LISTENER
    if (player.get("role") == "listener") {
      if (
        round.get("chatMode") == "multi-utterance-unidirectional" ||
        round.get("chatMode") == "single-utterance-unidirectional"
      ) {
        disableAttribute = "disabled";
        placeholder = "You are the listener. You can't send a message";
      }
    }

    // SPEAKER
    if (player.get("role") == "speaker") {
      if (round.get("chatMode") == "single-utterance-unidirectional") {
        if (messages.length == 0) {
          placeholder = "You can send only one message";
        } else {
          disableAttribute = "disabled";
          placeholder = "You have already sent one message";
        }
      }

      if (
        round.get("chatMode") == "full-bidirectional" ||
        stage.name === "descriptionNoFeedback"
      ) {
        if (timeRemaining !== -1 && timeRemaining <= 15) {
          disableAttribute = "disabled";
          placeholder =
            "The next 15s is the selection stage. You can't send messages.";
        }
      }
    }

    // switch-bidirectional (BOTH)
    // console.log(round.get("turn"));
    if (round.get("chatMode") == "switch-bidirectional") {
      if (timeRemaining <= 0) {
        disableAttribute = "disabled";
        placeholder = "Time's up!";
      } else if (player.get("clicked")) {
        disableAttribute = "disabled";
      }
      // else if (
      //   round.get("chat").length === 0 &&
      //   player.get("role") === "speaker"
      // ) {
      //   disableAttribute = null;
      // } else if (round.get("turn") !== player.get("role")) {
      //   disableAttribute = "disabled";
      //   placeholder =
      //     "You can send a message only when your partner has sent one.";
      // }
    }

    if (
      round.get("chatMode") != "multi-utterance-backchannel" ||
      player.get("role") == "speaker"
    ) {
      return (
        <div className="chat bp3-card">
          <Messages messages={messages} player={player} />
          <form onSubmit={this.handleSubmit}>
            <div className="bp3-control-group">
              <input
                name="comment"
                type="text"
                className="bp3-input bp3-fill"
                placeholder={placeholder}
                value={comment}
                onChange={this.handleChange}
                autoComplete="off"
                disabled={disableAttribute}
              />
              <button
                type="submit"
                className="bp3-button bp3-intent-primary"
                disabled={disableAttribute}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="chat bp3-card">
          <Messages messages={messages} player={player} />
          <div className="bp3-button-group bp3-fill bp3-fill">
            <button
              type="button"
              className="bp3-button"
              value="&#10060;"
              onClick={this.handleEmoji}
            >
              &#10060;
            </button>
            <button
              type="button"
              className="bp3-button"
              value="&#129300;"
              onClick={this.handleEmoji}
            >
              &#129300;
            </button>
            <button
              type="button"
              className="bp3-button"
              value="	&#9989;
              "
              onClick={this.handleEmoji}
            >
              &#9989;
            </button>
            <button
              type="button"
              className="bp3-button"
              value="	&#128514;"
              onClick={this.handleEmoji}
            >
              &#128514;
            </button>
          </div>
        </div>
      );
    }
  }
}

const chatSound = new Audio("experiment/unsure.mp3");
class Messages extends React.Component {
  componentDidMount() {
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length < this.props.messages.length) {
      this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
      chatSound.play();
    }
  }
  render() {
    const { messages, player } = this.props;

    return (
      <div className="messages" ref={(el) => (this.messagesEl = el)}>
        {messages.length === 0 ? (
          <div className="empty">No messages yet...</div>
        ) : null}
        {messages.map((message, i) => (
          <Message
            key={i}
            message={message}
            self={message.subject ? player._id === message.subject._id : null}
          />
        ))}
      </div>
    );
  }
}

class Message extends React.Component {
  render() {
    const { text, subject } = this.props.message;
    const { self } = this.props;
    return (
      <div className="message">
        <Author player={subject} self={self} />
        {text}
      </div>
    );
  }
}
