import { useNavigate } from "react-router-dom";
import React from "react";
import { borderbox } from "../styles";
import Login from "../components/Login";
import Homepage from "./Homepage";

export default function LandingPage() {
    const navigate = useNavigate();

    const FirstScreen = () => {
        let username = localStorage.getItem('username');

        if (username === null) {
            return <Login navigate={navigate}/>
        } 

        return <Homepage navigate={navigate}/>
    };
    
    return (
        <div style={borderbox}>
            <FirstScreen />
        </div>
    );
}