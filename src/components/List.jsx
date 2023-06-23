import React from "react";
import Item from "./Item";
import { clearButton, submitButton, tinyButton } from "../styles"
import { useEffect, useState } from "react";
import { topMargin } from "../styles"
import Menu from "./Menu";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Loader from "./Loader";

const boxDiv = {
  margin: "20px 12px 10px 10px",
}

const box = {
  padding: "10px 5px",
  alignItems: "center"
}

const List = (props) => {
    const listId = props.listId;
    const [newItemName, setNewItemName] = useState("");
    const [description, setDescription] = useState("");
    const [listType, setListType] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect( () =>
        { 
            setIsLoading(true);
            async function fetchData() {
                const showListAsync = async () => {
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ listId: listId, username: localStorage.getItem('username') })
                    };
                
                    const response = await fetch('https://0xo69ga71b.execute-api.us-west-1.amazonaws.com/dev/show', requestOptions);
                    const json = await response.json();
                    return json.body
                }

                const response = await showListAsync();
                let json = JSON.parse(response);
            
                let currentItems = [];
                for (let i = 0; i < json.length; i++) {
                    let jsonItem = json[i];
                    if (jsonItem["isList"]) {
                        setDescription(jsonItem["description"]);
                        setListType(jsonItem["listType"]);
                        setCreatedBy(jsonItem["createdBy"]);
                    } else {
                        let item = {"name": jsonItem["name"], "id": jsonItem["uuid"]};
                        currentItems.push(item);
                    }
                } 
            
                setItems(currentItems);
                setIsLoading(false);
            }
            fetchData();
    }, [listId])

    const handleItemNameChange = event => {
        setNewItemName(event.target.value)
    }

    const handleDelete = (itemId) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "itemId" : itemId, "listId" : listId })
        };
      
        fetch('https://0xo69ga71b.execute-api.us-west-1.amazonaws.com/dev/delete', requestOptions);
    
        const filtered = items.filter((item) => item.id !== itemId);
        setItems(filtered)
    };

    const getDescription = () => {
        if (description !== null && description !== "") {
            return <p style={{marginTop: "2px", fontSize: "12px"}}>{description}</p>
        }
        return <div></div>
    }

    const addToList = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ listId: listId, name: newItemName })
        };
        
        fetch('https://0xo69ga71b.execute-api.us-west-1.amazonaws.com/dev/add', requestOptions);
    
        let current = items;
        current.push({"name": newItemName, "id": newItemName})
        setItems(current)
        setNewItemName("")
    }

    const clearButton1 = {
        ...clearButton,
        fontSize: "22px",
        color: "rgb(200, 200, 200)",
        marginLeft: '10px'
    }

    const url = "https://www.catalist.in/view/" + listId.replaceAll(" ", "%20")

    const TopPage = () => {
        return (
            <div>
                <Menu navigate={props.navigate} selected="view_button"/>
                <h2 style={{ ...topMargin, marginLeft: "7%"}}>
                    Name : <span style={{color:"green"}}>{listId}</span>
                
                    <CopyToClipboard text={url}
                    onCopy={() => alert("List link copied to clipboard! You can now share it. :D")}>
                    <button style={tinyButton}>
                        Share
                    </button>
                    </CopyToClipboard>
                </h2>
                {getDescription()} 
                <h5>
                    Created By : <span style={{color:"green"}}>{createdBy}</span>
                    <span style={{marginLeft:"10%"}}></span>
                    Type : <span style={{color:"green"}}>{listType}</span>
                </h5>
            </div>
        );
    }

    const ItemsPage = () => {
        return (
            <div>
                <div>
                    { items.map((item) => (
                        <Item
                        key={item.id}
                        item={item}
                        listId={listId}
                        onDelete={handleDelete}
                        />
                    ))}
                </div>
                <div>
                    <div style={boxDiv}>
                        <input style={{ ...box, margin: "5.5%", width : "85%"}} type="text" name="name" value={newItemName} onChange={handleItemNameChange}/>
                    </div>
                    
                    <div>
                        <button style={submitButton} onClick={addToList}>Add Item</button>  
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <TopPage/>
            {isLoading ? <Loader/> : <ItemsPage/>}
        </div>
    )
}

export default List;
