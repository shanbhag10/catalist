import { useNavigate, useParams } from "react-router-dom";
import CreateForm from "../components/CreateForm";
import React from "react";
import {
  Route,
  Routes
} from "react-router-dom";
import { borderbox, toggles } from ".././styles";
import ViewForm from "../components/ViewForm";
import List from "../components/List";

export default function Homepage() {
    const navigate = useNavigate();

    const setSelectedButtonStyle = (selected_id, other_id) => {    
        let element = document.getElementById(selected_id);
        element.style.color = "#CA0101"
        element.style.fontWeight = "bold"
        element.style.borderColor = "black"

        let other_element = document.getElementById(other_id);
        other_element.style.color = "black"
        other_element.style.fontWeight = "normal"
        other_element.style.borderColor = "rgb(231, 231, 231)"
    }

    const ViewList = () => {
        const { listId } = useParams();
        return <List listId={listId} />;
    };
    
    return (
        <div style={borderbox}>
            
            <button id="create_button" style={toggles} onClick={() => {navigate('/create'); setSelectedButtonStyle("create_button", "view_button")}}>Create List</button>
            <button id="view_button" style={toggles} onClick={() => {navigate('/view'); setSelectedButtonStyle("view_button", "create_button")}}>View List</button>
            
            <Routes>
                <Route path="/create" element={<CreateForm navigate={navigate}/>} />
                <Route path="/" element={<ViewForm navigate={navigate}/>} />
                <Route path="/view" element={<ViewForm navigate={navigate} />} />
                <Route path="/view/:listId" element={<ViewList/>} />
            </Routes>
        </div>
    );
}