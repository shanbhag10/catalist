import React, { Component } from "react";
import { label, submitButton, topMargin } from "../styles"

class CreateForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listId: "",
            name: "",
            description: ""
        }
    }

    createListAsync = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.state.name, description: this.state.description })
        };
        const response = await fetch('https://0xo69ga71b.execute-api.us-west-1.amazonaws.com/dev/create', requestOptions);
        const json = await response.json();
        return json.body
    }

    createList = async () => {
        const response = await this.createListAsync();
        let json = JSON.parse(response);
        console.log(json["listId"]);
        this.setState({listId:json["listId"]});
        alert('Your list code is ' + this.state.listId);
        this.props.navigate('/view/' + this.state.listId);
    }

    handleNameChange = event => {
        this.setState({name: event.target.value});
        console.log(this.state);
    }

    handleDescriptionChange = event => {
        this.setState({description: event.target.value});
        console.log(this.state);
    }

    render() {
        console.log(this.state)

        return (
            <div>
                <div style={topMargin}>
                    <span style={label}>Name<span style={{color:"#CA0101"}}>*</span></span>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange}/>
                </div>
                <div style={topMargin}>
                    <span style={label}>Description</span>
                    <textarea name="description" rows="3" value={this.state.description} onChange={this.handleDescriptionChange}/>
                </div> 
                <div style={topMargin}>
                    <button style={submitButton} onClick={this.createList}>Create</button>  
                </div>
            </div>
        );
    }
}

export default CreateForm;