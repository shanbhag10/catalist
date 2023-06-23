import React from "react";

const Item = (props) => {
  const cross = {
    fontSize: 18,
    color: "white",
    backgroundColor: "#CA0101",
    border: "#CA0101 solid 0px",
    borderRadius: "5px",
    float: "right"
  };

  const itemStyle = {
    padding: "10px",
    margin: "10px 30px",
    backgroundColor: "rgb(240, 240, 240)",
    borderRadius: "5px",
    border: "rgb(220, 220, 220) solid 1px"
  };

  return (
    <div>
      <div style={itemStyle}>
        <span style={{fontSize: 18}}>
          <b>{props.item.name}</b>
        </span>
        <button
          style={cross}
          className="btn btn-danger m-2"
          onClick={() => props.onDelete(props.item.id)}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default Item;
