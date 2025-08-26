import * as React from "react";

function SvgComponent(props) {
  // border
  const mystyle = {
    backgroundSize: "cover",
    width: "auto",
    height: "auto",
    display: "inline-block",
    margin: "15px",
  };

  if (props.isTarget) {
    _.extend(mystyle, {
      outline: "10px solid #000",
      outlineOffset: "4px",
      zIndex: "9",
    });
  }

  // layout
  var numRows = 3;
  var bodyElement = document.evaluate(
    "/html/body",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  var minSize, tangramWidth, tangramHeight;

  minSize = Math.min(bodyElement.offsetWidth, bodyElement.offsetHeight);
  tangramWidth = minSize / 2 / numRows;
  tangramHeight = minSize / 2 / numRows;

  if (
    4 * tangramWidth >= 0.5 * bodyElement.offsetWidth ||
    3 * tangramHeight >= bodyElement.offsetHeight
  ) {
    tangramWidth = minSize / 4 / numRows;
    // console.log("yes");
    tangramHeight = minSize / 4 / numRows;
  }
  return (
    <div style={mystyle}>
      <svg
        baseProfile="full"
        viewBox={props.viewBox}
        width={tangramWidth}
        height={tangramHeight}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs />
        <polygon
          fill={props.colors[0]}
          id={1}
          points={props.points[0]}
          stroke="#1C1C1C"
          strokeWidth={1}
          transform={props.transform[0]}
        />
        <polygon
          fill={props.colors[1]}
          id={2}
          points={props.points[1]}
          stroke="#1C1C1C"
          strokeWidth={1}
          transform={props.transform[1]}
        />
        <polygon
          fill={props.colors[2]}
          id={3}
          points={props.points[2]}
          stroke="#1C1C1C"
          strokeWidth={1}
          transform={props.transform[2]}
        />
        <polygon
          fill={props.colors[3]}
          id={4}
          points={props.points[3]}
          stroke="#1C1C1C"
          strokeWidth={1}
          transform={props.transform[3]}
        />
        <polygon
          fill={props.colors[4]}
          id={5}
          points={props.points[4]}
          stroke="#1C1C1C"
          strokeWidth={1}
          transform={props.transform[4]}
        />
        <polygon
          fill={props.colors[5]}
          id={6}
          points={props.points[5]}
          stroke="#1C1C1C"
          strokeWidth={1}
          transform={props.transform[5]}
        />
        <polygon
          fill={props.colors[6]}
          id={7}
          points={props.points[6]}
          stroke="#1C1C1C"
          strokeWidth={1}
          transform={props.transform[6]}
        />
      </svg>
    </div>
  );
}

export default SvgComponent;
