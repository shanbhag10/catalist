import React, { Component } from "react";
import Item from "./Item";
import { submitButton } from "../styles"

const boxDiv = {
  margin: "20px 12px 10px 10px",
}

const box = {
  padding: "10px 5px",
  alignItems: "center"
}

class List extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          listId: this.props.listId,
          items: [],
          name: "",
          description: "",
          newItemName: ""
        };
    }

    componentDidMount() {
      this.showList();
    }

    showListAsync = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ listId: this.state.listId })
        };
        const response = await fetch('https://0xo69ga71b.execute-api.us-west-1.amazonaws.com/dev/show', requestOptions);
        const json = await response.json();
        return json.body
    }

    showList = async () => {
        const response = await this.showListAsync();
        let json = JSON.parse(response);
        console.log(json);

        let name = "";
        let description = "";
        let items = [];
        for (let i = 0; i < json.length; i++) {
          let jsonItem = json[i];
          if (jsonItem["isList"]) {
            name = jsonItem["name"];
            description = jsonItem["description"];
          } else {
            let item = {"name": jsonItem["name"], "id": jsonItem["uuid"]};
            items.push(item);
          }
        } 

        this.setState({
          listId: this.props.listId,
          items: items,
          name: name,
          description: description,
          newItemName: this.state.newItemName
        })
    }

    addToList = async () => {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ listId: this.state.listId, name: this.state.newItemName })
      };
      
      fetch('https://0xo69ga71b.execute-api.us-west-1.amazonaws.com/dev/add', requestOptions);

      let current = this.state;
      current.items.push({"name": this.state.newItemName, "id": this.state.newItemName})
      current.newItemName = ""
      this.setState(current);
    }

    handleItemNameChange = event => {
      let current = this.state;
      current.newItemName = event.target.value
      this.setState(current);
    }

    handleDelete = (itemId, listId) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "itemId" : itemId, "listId" : listId })
      };
    
      fetch('https://0xo69ga71b.execute-api.us-west-1.amazonaws.com/dev/delete', requestOptions);

      const items = this.state.items.filter((item) => item.id !== itemId);
      this.setState({ items: items });
    };

    renderList() {
      return (
        <div>
          <div>
            {this.state.items.map((item) => (
              <Item
                key={item.id}
                item={item}
                listId={this.state.listId}
                onDelete={this.handleDelete}
              />
            ))}
          </div>
          <div>
            <div style={boxDiv}>
              <input style={box} type="text" name="name" value={this.state.newItemName} onChange={this.handleItemNameChange}/>
            </div>
            
            <div>
              <button style={submitButton} onClick={this.addToList}>Add Item</button>  
            </div>
          </div>
        </div>
      );
    }

    render() {
        return (
          <div>
            <h3>{this.state.name} (<span style={{color:"green"}}>{this.state.listId})</span></h3>
            <p style={{padding: "5px"}}>{this.state.description}</p>
            {this.renderList()}
          </div>
        );
    }
}

export default List;
