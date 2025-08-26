import React from "react";
import Author from "./Author";
import Timer from "./Timer";

export default class ChatLog extends React.Component {
  state = { comment: "" };

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
      secUntilSend: 60 - timeRemaining,
    });
  };

  handleChange = (e) => {
    const el = e.currentTarget;
    this.setState({ [el.name]: el.value });

    const { round, timeRemaining } = this.props;
    round.set("lastKeyPressedTime", timeRemaining);
    round.set("keyPressed", true);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const text = this.state.comment.trim();
    const { round, player, stage, timeRemaining } = this.props;

    if (text !== "") {
      console.log("message sent after seconds: ", 60 - timeRemaining);
      // const room = player.get('roomId')
      round.append("chat", {
        text,
        playerId: player._id,
        // roomId: room,
        target: round.get("target"),
        role: player.get("role"),
        time: new Date(),
        secUntilSend: 60 - timeRemaining,
      });
      this.setState({ comment: "" });
    }
  };

  render() {
    const { comment } = this.state;
    const { messages, player, round, stage, timeRemaining } = this.props;

    var placeholder = "Enter chat message";

    var disableAttribute = null;
    if (player.get("role") == "listener") {
      if (
        round.get("chatMode") == "multi-utterance-unidirectional" ||
        round.get("chatMode") == "single-utterance-unidirectional"
      ) {
        disableAttribute = "disabled";
        placeholder = "You are the listener. You can't send a message";
      }
    }

    if (player.get("role") == "speaker") {
      if (round.get("chatMode") == "single-utterance-unidirectional") {
        if (messages.length == 0) {
          placeholder = "You can send only one message";
        } else {
          disableAttribute = "disabled";
          placeholder = "You have already sent one message";
        }
      }
    }

    if (
      timeRemaining !== -1 &&
      timeRemaining <= 15 &&
      player.get("role") === "speaker"
    ) {
      disableAttribute = "disabled";
      placeholder =
        "The next 15s is the selection stage. You can't send messages.";
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
