import React from "react";

function htmlToElements(html) {
  var template = document.createElement("template");
  template.innerHTML = html;
  return template.content.childNodes;
}
export default class Tangram extends React.Component {
  TURN_TIME = 30;
  handleClick = (e) => {
    const {
      game,
      tangram,
      tangram_num,
      stage,
      player,
      round,
      timeRemaining,
      stageTimePassed,
    } = this.props;
    const speakerMsgs = _.filter(round.get("chat"), (msg) => {
      return (msg.role == "speaker") & (msg.playerId == player.get("partner"));
    });
    const partner = _.find(
      game.players,
      (p) => p._id === player.get("partner")
    );

    // only register click for listener and only after the speaker has sent a message
    if (
      (speakerMsgs.length > 0) &
      (player.get("clicked") === false) &
      (player.get("role") == "listener")
    ) {
      partner.set("clicked", tangram);
      console.log("partner clicked", partner.get("clicked"));
      player.set("clicked", tangram);
      round.set("clickedTime", new Date());

      const lastRefreshTime = round.get("lastRefreshTime");

      var secUntilClick = -1;
      if (stage.name === "descriptionNoFeedback") {
        //phase 3
        secUntilClick = 60 - timeRemaining;
      } else if (stage.name === "description") {
        //phase 2
        secUntilClick = lastRefreshTime
          ? stageTimePassed - lastRefreshTime
          : this.TURN_TIME + 15 - timeRemaining;
      }

      console.log("selected after seconds: ", secUntilClick);
      if (
        stage.name === "description" ||
        stage.name === "descriptionNoFeedback"
      ) {
        round.set("secUntilClick", secUntilClick);
      }

      // round.set("turn", undefined);

      Meteor.setTimeout(() => {
        !player.stage.submitted && player.stage.submit();
        !partner.stage.submitted && partner.stage.submit();
        round.set("lastRefreshTime", undefined);
      }, 3000);
    }
  };

  render() {
    const {
      game,
      tangram,
      tangram_num,
      round,
      stage,
      player,
      target,
      timeRemaining,
    } = this.props;
    const tangram_path = tangram["path"];
    const tangram_data = tangram["data"];
    var colors = undefined;
    if ("coloring-reassigment" in tangram) {
      colors = tangram["coloring-reassigment"];
    }
    const tangramPositions = {
      0: { row: 1, column: 1 },
      1: { row: 1, column: 2 },
      2: { row: 1, column: 3 },
      3: { row: 1, column: 1 },
      4: { row: 1, column: 2 },
      5: { row: 1, column: 3 },
      6: { row: 1, column: 4 },
      7: { row: 1, column: 1 },
      8: { row: 1, column: 2 },
      9: { row: 1, column: 3 },
    };

    const mystyle = {
      backgroundSize: "cover",
      width: "auto",
      height: "auto",
      display: "inline-block",
      margin: "15px",
      // gridRow: currentPosition["row"],
      // gridColumn: currentPosition["column"],
    };

    // Highlight target object for speaker at selection stage
    // Show it to both players at feedback stage (phase 2) / only speaker sees target (phase 3).
    // console.log(target, tangram_path);
    if (
      (target == tangram_path) & (player.get("role") == "speaker") ||
      (target == tangram_path) &
        (player.get("clicked") != "") &
        (stage.name !== "descriptionNoFeedback")
    ) {
      _.extend(mystyle, {
        outline: "10px solid #000",
        outlineOffset: "4px",
        zIndex: "9",
      });
    }

    // Highlight clicked object in green if correct; red if incorrect
    if (
      !(
        stage.name === "descriptionNoFeedback" &&
        player.get("role") === "speaker"
      )
    ) {
      // don't show selection for SPEAKER in PHASE 3
      var clickedPath = undefined;
      if (player.get("clicked")) {
        clickedPath = player.get("clicked")["path"];
      }
      if (tangram_path == clickedPath) {
        const color =
          stage.name === "descriptionNoFeedback"
            ? "black"
            : tangram_path == target
            ? "green"
            : "red";
        _.extend(mystyle, {
          outline: `10px solid ${color}`,
          zIndex: "9",
        });
      }
    }

    var elements = htmlToElements(tangram_data);
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].nodeName == "svg") {
        var svg = elements[i];
      }
    }
    var childrenArray = Array.prototype.slice.call(svg.childNodes);

    var bodyElement = document.evaluate(
      "/html/body",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    var numRows = 3;
    var minSize, tangramWidth, tangramHeight;
    // console.log("offsetWidth", bodyElement.offsetWidth)
    // console.log("offsetHeight", bodyElement.offsetHeight)
    minSize = Math.min(bodyElement.offsetWidth, bodyElement.offsetHeight);
    tangramWidth = minSize / 2 / numRows;
    tangramHeight = minSize / 2 / numRows;

    // console.log("4 * tangramWidth: ", 4 * tangramWidth);
    // console.log(" 0.5 * minSize: ",  0.5 * minSize);
    if (
      4 * tangramWidth >= 0.5 * bodyElement.offsetWidth ||
      3 * tangramHeight >= bodyElement.offsetHeight
    ) {
      tangramWidth = minSize / 4 / numRows;
      // console.log("yes");
      tangramHeight = minSize / 4 / numRows;
    }

    // var numRows = 3 ;
    // var minSize, tangramWidth, tangramHeight;
    // console.log("offsetWidth", bodyElement.offsetWidth)
    // console.log("offsetHeight", bodyElement.offsetHeight)
    // var maxWidth = bodyElement.offsetWidth / 2 / 5;
    // var maxHeight = bodyElement.offsetHeight / 10;
    // var minSize = Math.min(maxWidth, maxHeight);
    // var tangramWidth =  0.9 * minSize;
    // var tangramHeight = 0.9 * minSize;
    // console.log("new");

    // console.log("4 * tangramWidth: ", 4 * tangramWidth);
    // console.log(" 0.5 * minSize: ",  0.5 * minSize);
    // if ((4 * tangramWidth >= 0.5 * bodyElement.offsetWidth) || (3 * tangramHeight >= bodyElement.offsetHeight)) {
    //   tangramWidth =  minSize / 4 / numRows;
    //   console.log("yes");
    //   tangramHeight = minSize / 4 / numRows;
    // }

    // xmlnsBx="https://boxy-svg.com" xmlnsEv="http://www.w3.org/2001/xml-events" xmlnsXlink="http://www.w3.org/1999/xlink"
    // bxOrigin={node.getAttribute("bx:origin")}

    return (
      <div id={tangram_path} onClick={this.handleClick} style={mystyle}>
        <svg
          baseProfile="full"
          viewBox={svg.getAttribute("viewBox")}
          width={tangramWidth}
          height={tangramHeight}
          xmlns="http://www.w3.org/2000/svg"
        >
          {childrenArray.map((node, index) => {
            if (node.nodeName == "polygon") {
              if (
                colors === undefined ||
                !(node.getAttribute("id") in colors)
              ) {
                var colorFill = "#1C1C1C"; //node.getAttribute("fill"), "black", lightgray
              } else {
                var colorFill = colors[node.getAttribute("id")];
              }
              var id = tangram_path + "_" + node.getAttribute("id");
              return (
                <polygon
                  key={id}
                  id={id}
                  fill={colorFill}
                  points={node.getAttribute("points")}
                  stroke={colorFill} //{node.getAttribute("stroke")}
                  strokeWidth={"2"} //{node.getAttribute("strokeWidth")}
                  transform={node.getAttribute("transform")}
                />
              );
            }
          })}
        </svg>
      </div>
    );
  }
}
