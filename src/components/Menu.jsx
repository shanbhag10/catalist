import { toggles, topMargin, tinyButton } from ".././styles";
import { useEffect } from "react";

const Menu = (props) => {
    useEffect(
        () => {
            const ids = ["create_button", "view_button", "home_button"];

            let element = document.getElementById(props.selected);
            element.style.color = "#CA0101"
            element.style.fontWeight = "bold"
            element.style.borderColor = "black"

            for (let i = 0; i < 3; i++) {
                if (ids[i] !== props.selected) {
                    let other_element = document.getElementById(ids[i]);
                    other_element.style.color = "black"
                    other_element.style.fontWeight = "normal"
                    other_element.style.borderColor = "rgb(220, 220, 220)"
                }
            }
        }
    );

    const logout = () => {
        localStorage.removeItem('username')
        props.navigate('/home')
    }

    return (
        <div>
            <div>
                <p style={topMargin}>Username : <b>{ localStorage.getItem('username') }</b>
                    <button style={tinyButton} onClick={logout}> Logout </button>
                </p>
            </div>
            <div>
                <button id="create_button" style={toggles} onClick={() => {props.navigate('/create')}}>Create</button>
                <button id="view_button" style={toggles} onClick={() => {props.navigate('/view')}}>View</button>
                <button id="home_button" style={toggles} onClick={() => {props.navigate('/home')}}>Home</button>
            </div>
        </div>
    );
}

export default Menu;