import React, { Component } from "react";

class Item extends Component {
  state = {};

  cross = {
    fontSize: 18,
    color: "white",
    backgroundColor: "#CA0101",
    border: "#CA0101 solid 0px",
    borderRadius: "5px",
    float: "right"
  };

  itemStyle = {
    padding: "10px",
    margin: "10px 20px",
    backgroundColor: "rgb(231, 231, 231)"
  };

  getBadgeClasses() {
    let classes = "badge m-2 ";
    classes += this.props.item.count === 0 ? "badge-warning" : "badge-primary";
    return classes;
  }

  renderName() {
    let name = this.props.item.name ? this.props.item.name : "No Name";
    return (
      <span style={{fontSize: 18}}>
        <b>{name}</b>
      </span>
    );
  }

  render() {
    return (
      <div>
        <div style={this.itemStyle}>
          {this.renderName()}
          <button
            style={this.cross}
            className="btn btn-danger m-2"
            onClick={() => this.props.onDelete(this.props.item.id, this.props.listId)}
          >
            X
          </button>
        </div>
      </div>
    );
  }
}

export default Item;
