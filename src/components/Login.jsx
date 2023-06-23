import { useState } from "react"; 
import { label, submitButton, topMargin } from "../styles"

const Login = (props) => {

    const [username, setName] = useState("");
    const [password, setPassword] = useState("");

    const loginAsync = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };
        const response = await fetch('https://0xo69ga71b.execute-api.us-west-1.amazonaws.com/dev/login', requestOptions);
        const json = await response.json();
        return json
    }

    const login = async () => {
        if (username === null || username === "") {
            alert("Empty username or password")
        }

        const response = await loginAsync();
        console.log(response)

        if (response.statusCode === 400) {
            alert("Username Already Exists! \nIncorrect Credentials.")
        } else {
            let username = JSON.parse(response.body)['username'];
            console.log("Username : ", username)
            localStorage.setItem('username', username);
            props.navigate('/home');
        }
    }

    const handleUsernameChange = event => {
        setName(event.target.value)
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }

    return (
        <div>
            <div style={topMargin}>
                <span style={label}>Username<span style={{color:"#CA0101"}}>*</span></span>
                <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
            </div>
            <div style={topMargin}>
                <span style={label}>Password<span style={{color:"#CA0101"}}>*</span></span>
                <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
            </div>

            <div>
                <p style={{fontSize : "10px" }}>'Sign In' will create a new account if username is not found.</p>
                <p style={{fontSize : "10px" }}>This session will be saved on this device, until sign out.</p>
            </div>

            <div>
                <button style={submitButton} onClick={login}>Sign In</button>  
            </div>
        </div>
    );
}

export default Login;