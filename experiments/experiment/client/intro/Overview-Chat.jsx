import React from "react";

import { Centered } from "meteor/empirica:core";
import { Button } from "@blueprintjs/core";
// import {useEffect} from 'react';

export default class OverviewChat extends React.Component {
  // for scroll up
  // constructor(props) {
  //   super(props)
  //   this.myRef = React.createRef()   // Create a ref object
  // }

  // componentDidMount() {
  //   window.scrollTo(0, 0);
  // }

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    const { hasPrev, hasNext, onNext, onPrev, player, treatment } = this.props;
    // useEffect(() => {
    //   // 👇️ scroll to top on page load
    //   window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    // }, []);
    return (
      <Centered>
        <div ref={this.myRef}></div> {/*Element to scroll to*/}
        <div className="instructions">
          <h1 className={"bp3-heading"}> Game Overview </h1>
          <h2>Chatbox</h2>

          <p>
            All communication happens through a chat box on the left of the game
            interface.
          </p>
          <p>
            In the interaction game, you are both free to use the chatbox as
            much as you'd like. you can write anything at any time!
          </p>
          <div className="image">
            <center>
              <img width="250px" src="/experiment/typing.PNG" />
            </center>
          </div>
          {/* <p>
            The game consists of <strong>3 phases</strong>. Each phase has a{" "}
            <strong>different chat mode</strong>. There will be specific
            instructions before each phase.
          </p> */}

          {/* <p>
            The game consists of <strong>3 phases</strong>:
            <br />
            <br />
            1. <strong>Phase 1</strong> has 20 rounds: You are the Speaker. You
            will have 45s each round to describe the target image to your Phase
            2 partner in <u>1</u> message, <strong>without</strong> instant
            Listener feedback. We will show your description to your Phase 2
            partner later, using the same context, and we will determine your
            bonus based on their ability to successfully pick the highlighted
            image.
            <br />
            <br />
            2. <strong>Phase 2</strong> has 30 rounds: You can be either the
            Speaker or Listener in each round according to the prompt. In each
            round, the Speaker will have maximum 30s to describe the target.
            Both players take turns to send messages. Each turn is 30s and
            allows only 1 player to send 1 message. Once the message is sent,
            the timer resets back to 30s, and the other person will be allowed
            to type their message.
            <br />
            The round concludes when (1) the Listener clicks on an image, or (2)
            the 30s timer runs out. Both players will receive a feedback on if
            the selection was correct at the end of each round.
            <br />
            <br />
            3. <strong>Phase 3</strong> has 20 rounds: You will now switch
            Speaker and Listener roles after every round. The Speaker can send
            only <u>1</u> message per round within 45s, and the Listener cannot
            send anything back. The Listener will have additional 15s to make
            the selection. You won't get any feedback about whether the target
            was correctly selected.
          </p> */}

          <p>
            Two quick clarifications: <br />
            <br />
            First, you can't use the position of the image (e.g. "the one in the
            bottom-left corner"), because the Listener will see the same images
            in different locations in the grid. <br />
            <br />
            Second, please limit your description to the current target picture:
            do not discuss previous trials and minimize conversations about any
            other topics!
          </p>

          {/* <p>
            If you cannot get paired for Phase 2 because all games have filled
            up, or if the waiting time is too long, we will give you a special
            code to enter and ask you to <strong>return the submission</strong>{" "}
            so that we can compensate you for your work in Phase 1.
          </p> */}

          <button
            type="button"
            className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
            onClick={onPrev}
            disabled={!hasPrev}
          >
            Previous
          </button>
          <button
            type="button"
            className="bp3-button bp3-intent-primary"
            onClick={onNext}
            disabled={!hasNext}
          >
            Next
            <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right" />
          </button>
        </div>
      </Centered>
    );
  }
  executeScroll = () => this.myRef.current.scrollIntoView();
}
