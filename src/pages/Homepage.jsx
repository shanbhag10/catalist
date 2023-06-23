import { useNavigate, useParams } from "react-router-dom";
import CreateForm from "../components/CreateForm";
import React from "react";
import {
  Route,
  Routes
} from "react-router-dom";
import ViewForm from "../components/ViewForm";
import HomeView from "../components/HomeView";
import List from "../components/List";

const Homepage = () => {
    const navigate = useNavigate();

    const ViewList = () => {
        const { listId } = useParams();
        return <List listId={listId} navigate={navigate} />;
    };
    
    return (
        <div>
            <Routes>
                <Route path="/create" element={<CreateForm navigate={navigate}/>} />
                <Route path="/" element={<HomeView navigate={navigate}/>} />
                <Route path="/home" element={<HomeView navigate={navigate}/>} />
                <Route path="/view" element={<ViewForm navigate={navigate} />} />
                <Route path="/view/:listId" element={<ViewList/>} />
            </Routes>
        </div>
    );
}

export default Homepage;