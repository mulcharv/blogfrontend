import { useState, useEffect } from "react";
import { redirect, Link } from "react-router-dom";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import uniqid from 'uniqid';


function Signup(props) {
    const userDetails = props.data;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const [confirmType, setConfirmType] = useState('password');
    const [passwordIcon, setPasswordIcon] = useState(eyeOff);
    const [confirmIcon, setConfirmIcon] = useState(eyeOff);
    const [errors, setErrors] = useState('');

    const handleToggle = (version, type) => {
        if (version==='password') {
            if (type==="password") {
            setPasswordIcon(eye);
            setPasswordType('text')
        } else {
            setPasswordIcon(eyeOff);
            setPasswordType('password')
        }
        } else {
            if (type==='password') {
            setConfirmIcon(eye);
            setConfirmType('text')
        } else {
            setConfirmIcon(eyeOff);
            setConfirmType('password')
        }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors([]);
        const url = 'blogapi-production-8080.up.railway.app/signup';
        let data = {
            username: username,
            password: password,
            confirmPassword: confirmPassword
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
            return response;
        })
        .then(data => {
            if (data.errors.length > 0) {
            let errors = data.errors;
            setErrors(errors);
            return;
            } else {
                return redirect("/login");
            }
        }).catch((error) => alert(error))
    }

    return(
        <div className="signupcont">
             {userDetails.length > 0 && (
                <div>You are already logged in!</div>
            )}
            {userDetails.length === 0 && (
                <div className="signupformcont">
                    <div className="signuptitle">SIGNUP</div>
                    <form className="signupform">
                        <label className="usernamelabel"> Username:
                            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"></input>
                        </label>
                        <label className="passwordlabel"> Password:
                            <input type={passwordType} name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="*******"></input>
                            <button className="passwordtoggle" onClick={() => handleToggle('password', passwordType)}>
                                <Icon className="toggleicon" icon={passwordIcon}></Icon>
                            </button>
                        </label>
                        <label className="confirmlabel">Confirm Password:
                            <input type={confirmType} name="passwordConfirmation" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} placeholder="*******"></input>
                            <button className="confirmtoggle" onClick={() => handleToggle('confirm', confirmType)}>
                                <Icon className="toggleicon" icon={confirmIcon}></Icon>
                            </button>
                        </label>
                        <button type="submit" className="signupbtn" onClick={handleSubmit}>SIGNUP</button>
                    </form>
                    {errors.length > 0 &&
                    <ul className="errorslist">
                        {errors.map(error => (
                            <li key={uniqid()} className="signerror">
                                {error.msg}
                            </li>
                        ))}
                    </ul>
                    }
                </div>
            )}
        </div>
    )
}

export default Signup;