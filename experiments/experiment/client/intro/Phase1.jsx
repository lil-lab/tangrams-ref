import React from "react";
import trialsConfig from "./phase_data.json";
import TangramSVG from "./TangramSVG";
import svgData from "./tangrams.json";
import Timer from "../game/Timer";
import { Breadcrumb as Crumb, Classes } from "@blueprintjs/core";

export default class Phase1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: false,
      currentTrial: this.props.player.data.phase1
        ? this.props.player.data.phase1.length
        : 0,
      tangramsToRender: [],
      comment: "",
      remainingSeconds: 45,
      firstKeyPress: -1,
      trials: trialsConfig[props.treatment.configIndex]["trials"],
    };
  }

  handleChange = (e) => {
    const el = e.currentTarget;
    this.setState({ [el.name]: el.value });
    if (this.state.firstKeyPress === -1) {
      this.setState({ firstKeyPress: 45 - this.state.remainingSeconds });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const text = this.state.comment.trim();
    const { player } = this.props;

    // append data
    player.append("phase1", {
      description: text,
      secUntilSend: 45 - this.state.remainingSeconds,
      trial: this.state.currentTrial,
      target: this.state.trials[this.state.currentTrial]["target"],
      firstKeyPress: this.state.firstKeyPress,
    });

    // prepare for next round
    this.setState({ comment: "" });
    if (this.state.currentTrial + 1 === this.state.trials.length) {
      this.props.onNext();
    } else {
      this.setState({
        currentTrial: this.state.currentTrial + 1,
        remainingSeconds: 45,
        comment: "",
        activeButton: false,
        firstKeyPress: -1,
      });
    }
  };

  componentDidMount() {
    const { player } = this.props;
    setInterval(() => {
      this.setState({ remainingSeconds: this.state.remainingSeconds - 1 });

      if (this.state.remainingSeconds === 0) {
        // append data
        player.append("phase1", {
          description: this.state.comment.trim(),
          secUntilSend: 45 - this.state.remainingSeconds,
          trial: this.state.currentTrial,
          target: this.state.trials[this.state.currentTrial]["target"],
          firstKeyPress: this.state.firstKeyPress,
          timeout: true,
        });
        // continue to next round
        if (this.state.currentTrial + 1 === this.state.trials.length) {
          this.props.onNext();
        }
        this.setState({
          currentTrial: this.state.currentTrial + 1,
          remainingSeconds: 45,
          comment: "",
          activeButton: false,
          firstKeyPress: -1,
        });
      }
    }, 1000);
  }

  render() {
    const { game, player, treatment } = this.props;
    // console.log(game, player);
    let tangramsToRender;
    if (this.state.currentTrial === this.state.trials.length) {
      this.props.onNext();
    }
    if (
      trialsConfig &&
      svgData &&
      this.state.currentTrial < this.state.trials.length
    ) {
      // console.log(trialsConfig["trials"][this.state.currentTrial]);

      let target = this.state.trials[this.state.currentTrial]["target"];
      let tangramsOrder =
        this.state.trials[this.state.currentTrial]["tangrams_order"][1];
      tangramsToRender = tangramsOrder.map((index) => {
        let tangramObj =
          this.state.trials[this.state.currentTrial]["images"][index];
        let tangramData = svgData[tangramObj["path"]];
        return (
          // using another Tangram component + using tangram json instead of reading svg using fs, bc fs is not available on client side..
          <TangramSVG
            viewBox={tangramData["viewBox"]}
            points={tangramData["points"]}
            colors={[
              "#1C1C1C",
              "#1C1C1C",
              "#1C1C1C",
              "#1C1C1C",
              "#1C1C1C",
              "#1C1C1C",
              "#1C1C1C",
            ]}
            transform={tangramData["transform"]}
            isTarget={target === tangramObj["path"]}
          ></TangramSVG>
        );
      });
      // this.setState({ tangramsToRender: tangramObjects });
    }

    return (
      trialsConfig && (
        <div style={{ height: "100%", width: "100%" }}>
          {/********* Breadcrumb *********/}
          <nav className="round-nav">
            <ul className={Classes.BREADCRUMBS}>
              <li>
                <Crumb
                  text={
                    "Round " +
                    (this.state.currentTrial + 1) +
                    " / " +
                    this.state.trials.length
                  }
                  className={Classes.BREADCRUMB_CURRENT}
                />
              </li>
            </ul>
          </nav>
          <div className="round">
            {/* left side */}
            {/********* SocialInteraction *********/}
            <div
              className="social-interactions"
              style={{ width: "30%", display: "inline-block" }}
            >
              <div className="status">
                <div className="players bp3-card">
                  <div className="player" key={1}>
                    <span className="image"></span>
                    <img src={`/avatars/jdenticon/Colton`} />
                    <span className="name" style={{ color: "Blue" }}>
                      {"Colton"}
                      {" (You)"}
                    </span>
                  </div>
                </div>

                <Timer
                  stage={undefined}
                  player={undefined}
                  setTimeRemaining={() => {}}
                  remainingSeconds={this.state.remainingSeconds}
                />

                <div
                  className="total-score bp3-card"
                  style={{ overflow: "scroll" }}
                >
                  <h5 className="bp3-heading" style={{ marginBottom: 0 }}>
                    Bonus
                  </h5>

                  <p>{"Earn up to $0.60. Bonus will be determined later."}</p>
                </div>
              </div>
              {/********* Chatlog **********/}
              <div className="chat bp3-card">
                <form onSubmit={this.handleSubmit}>
                  <div className="bp3-control-group">
                    <input
                      name="comment"
                      type="text"
                      className="bp3-input bp3-fill"
                      placeholder={"You can send only one message"}
                      value={this.state.comment}
                      onChange={this.handleChange}
                      autoComplete="off"
                      disabled={false}
                    />
                    <button
                      type="submit"
                      className="bp3-button bp3-intent-primary"
                      disabled={this.state.comment.length === 0}
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
              {/********* EventLog ********/}
              <div className="eventlog bp3-card">
                <div className="events">
                  <div className="event">
                    <div className="timestamp">
                      {/* {moment(at).format("hh:mm:ss")} */}
                    </div>
                    <div style={{ fontWeight: "normal" }}>
                      <strong>Instruction (phase 1):</strong> In this part of
                      the study, please describe the tangram highlighted by
                      black borders. <br />
                      Your description should allow your Phase 2 partner to pick the
                      highlighted image out of this context when they see it
                      later.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* right side */}
            <div className="task" style={{ display: "inline-block" }}>
              <div className="board">
                <h1 className="roleIndicator">
                  {" "}
                  You are the{" "}
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    speaker
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
                {/* <h3 className="feedbackIndicator">{feedback}</h3> */}
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}
