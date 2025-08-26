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
          <h2>Task Description</h2>
          <p>In this task, you will play a series of games with a partner.</p>
          <p>
            Both of you will see the same set of pictures. There may be
            different number of pictures in each set.
          </p>
          <p>Sometimes they will be in dark color:</p>

          <div className="image">
            <center>
              <img width="300px" src="/experiment/gray_tangrams.PNG" />
            </center>
          </div>

          <p>and sometimes they will be colored:</p>

          <div className="image">
            <center>
              <img width="300px" src="/experiment/colored_tangrams.PNG" />
            </center>
          </div>
          <p>
            In each round of the task, one of you will be randomly assigned to
            the <strong>Speaker</strong> role and the other will be assigned the{" "}
            <strong>Listener</strong> role.
          </p>

          <p>
            If you are the Speaker, one image will be highlighted with a black
            frame. This is the target image.
          </p>
          <div className="image">
            <center>
              <img width="300px" src="/experiment/target.PNG" />
            </center>
          </div>
          <p>
            As a speaker, your goal is to describe the highlighted target image
            to the follower. The listener doesn't see the black frame. You can't
            use the position of the image, because the listener sees the images
            in a different order.
          </p>
          <p>
            Also, please limit your description to the current target picture:
            do <strong>not</strong> discuss previous trials or chat about any
            other topics!
          </p>
          <p>
            As a listener, your goal is to select the image described by the
            speaker. If the listener selects correctly, you both get points!
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
