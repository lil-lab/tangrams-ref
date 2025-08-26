import React from "react";

import { Centered } from "meteor/empirica:core";
import { Button } from "@blueprintjs/core";

export default class OverviewTask extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"}> Game Overview </h1>
          <h2>Game Description</h2>
          <p>
            In this study, you will be paired up with a partner for a
            communication game.
          </p>
          <p>
            You will both see a grid of little pictures, which will look
            something like this:
          </p>

          <div className="image">
            <center>
              <img width="300px" src="/experiment/gray_tangrams.PNG" />
            </center>
          </div>

          <p>
            You will play a number of rounds. In each round of the task, one of
            you will be assigned the <strong>Speaker</strong> role and the other
            will be assigned the <strong>Listener</strong> role.
          </p>

          <p>
            If you are the Speaker, you will privately see one of these pictures
            highlighted with a little black box. This is the{" "}
            <strong>target</strong> image:
          </p>
          <div className="image">
            <center>
              <img width="300px" src="/experiment/target.PNG" />
            </center>
          </div>
          <p>
            {/* The <strong>Speaker's goal</strong> is to describe the highlighted
            target image to the Listener. The Listener doesn't see the black
            frame.
            <br />
            The <strong>Listener's goal</strong> is to correctly click on the
            target image being described by the Speaker.
            <br />
            <br />
            Remember that the Speaker can't use the position of the image (e.g.
            "bottom-left"), because the Listener sees the images in a different
            order.
            <br />
            Also, please limit your description to the current target picture:
            do not discuss previous trials or chat about any other topics! */}
            The Listener can't see the box, so your job as the Speaker is to
            describe what the target image looks like so that the Listener can
            figure out which one is the target and avoid picking one of the
            other images.
          </p>

          <p>
            You will earn a $0.03 bonus for each correct guess, so pay attention
            and try to provide a helpful description!
          </p>

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
}
