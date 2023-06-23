import { useState } from "react";
import { label1, submitButton, topMargin, right1 } from "../styles"
import Menu from "./Menu";


const ViewForm = (props) => {
    const [listId, setListId] = useState("");

    const handleListIdChange = event => {
        setListId(event.target.value);
    }

    const handleOnClick = () => {
        props.navigate('/view/' + listId)
    }

    return (
        <div>
            <Menu navigate={props.navigate} selected="view_button"/>
            <div style={topMargin}>
                <span style={label1}>List ID<span style={{color:"#CA0101"}}>*</span></span>
                <input style={right1} type="text" name="listId" value={listId} onChange={handleListIdChange}/>
            </div>
            
            <div style={topMargin}>
                <button type="submit" style={submitButton} onClick={handleOnClick}>View</button>  
            </div>
        </div>
    );
}

export default ViewForm;