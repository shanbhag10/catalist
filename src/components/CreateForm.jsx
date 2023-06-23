import { useState } from "react"; 
import Menu from "../components/Menu";
import { label, submitButton, topMargin } from "../styles"

const CreateForm = (props) => {

    const [listId, setListId] = useState("");
    const [listType, setListType] = useState("");
    const [description, setDescription] = useState("");
    
    const createListAsync = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                listId: listId, 
                description: description,
                listType: listType,
                createdBy: localStorage.getItem('username')
             })
        };
        const response = await fetch('https://0xo69ga71b.execute-api.us-west-1.amazonaws.com/dev/create', requestOptions);
        const json = await response.json();
        return json.body
    }

    const createList = async () => {
        const response = await this.createListAsync();
        let json = JSON.parse(response);
        console.log(json["listId"]);
        this.setState({listId:json["listId"]});
        alert('Your new list code is ' + this.state.listId);
        this.props.navigate('/view/' + this.state.listId);
    }

    const handleListIdChange = event => {
        setListId(event.target.value)
    }

    const handleListTypeChange = event => {
        setListType(event.target.value)
    }

    const handleDescriptionChange = event => {
        setDescription(event.target.value)
    }

    return (
        <div>
            <Menu navigate={props.navigate} selected="create_button"/>
            <div style={topMargin}>
                <span style={label}>Unique List Name<span style={{color:"#CA0101"}}>*</span></span>
                <p style={{fontSize:"10px"}}>Provide a unique name which can be used as the list identifier</p>
                <input type="text" name="listId" value={listId} onChange={handleListIdChange}/>
            </div>
            <div style={topMargin}>
                <span style={label}>List Type<span style={{color:"#CA0101"}}>*</span></span>
                <input type="text" name="listType" value={listType} onChange={handleListTypeChange}/>
            </div>
            <div style={topMargin}>
                <span style={label}>Description</span>
                <textarea name="description" rows="3" value={description} onChange={handleDescriptionChange}/>
            </div> 
            <div style={topMargin}>
                <button style={submitButton} onClick={createList}>Create</button>  
            </div>
        </div>
    );
}

export default CreateForm;
