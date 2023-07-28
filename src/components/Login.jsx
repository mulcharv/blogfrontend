import { useState, useEffect } from "react";
import { redirect, Link } from "react-router-dom";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';


function Login(props) {
    const userDetails = props.data;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const [error, setError] = useState(false);

    const handleToggle = () => {
        if (type==='password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeOff);
            setType('password')
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError([]);
        const url = 'blogapi-production-8080.up.railway.app/login';
        let data = {
            username: username,
            password: password,
        }

        let fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }

        fetch(url, fetchData)
        .then((response) => {
            return response
        })
        .then(() => {
            props.onLogIn(username, password);
            return redirect("/home");
        }
        )
        .catch((error) => {
            setError(true)
        })
    }

    return (
        <div className="logincont">
            {userDetails.length > 0 && (
                <div>You are already logged in!</div>
            )}
            {userDetails.length === 0 && (
                <div className="loginformcont">
                    <div className="logintitle">LOGIN</div>
                    <form className="loginform">
                        <label className="usernamelabel"> Username:
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"></input>
                        </label>
                        <label className="passwordlabel"> Password:
                            <input type={type} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******"></input>
                            <button className="passwordtoggle" onClick={handleToggle}>
                                <Icon className='toggleicon' icon={icon}></Icon>
                            </button>
                        </label>
                        <button type='submit' className="loginbtn" onClick={handleSubmit}>LOGIN</button>
                    </form>
                    {error &&
                    <div className="errorcont">User not found.</div>
                    }
                    <div className="loginfooter">
                        <div className="loginfootertext">Don't have an account?</div>
                        <Link to="/signup">
                            <div className="loginfooterlink">Register Now!</div>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login;