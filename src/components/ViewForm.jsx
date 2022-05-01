import React, { Component } from "react";
import { label1, submitButton, topMargin, right1 } from "../styles"

class ViewForm extends Component {
    state = {listId : ""}

    handleListIdChange = event => {
        this.setState({listId: event.target.value});
    }

    handleOnClick = () => {
        this.props.navigate('/view/' + this.state.listId)
    }

    render() {
        return (
            <div>
                <div style={topMargin}>
                    <span style={label1}>List ID<span style={{color:"#CA0101"}}>*</span></span>
                    <input style={right1} type="text" name="listId" value={this.state.listId} onChange={this.handleListIdChange}/>
                </div>
                
                <div style={topMargin}>
                    <button type="submit" style={submitButton} onClick={this.handleOnClick}>View</button>  
                </div>
            </div>
        );
    }
}

export default ViewForm;