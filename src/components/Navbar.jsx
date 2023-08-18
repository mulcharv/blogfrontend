import React from "react";
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import {useState, useEffect } from 'react';

function Navbar(props) {
    const [userInfo, setUserInfo] = useState(localStorage.getItem('jwt') || false);
    const onLo = props.onLogOut;


    const handleLogOut = () => {
        onLo();
        setUserInfo(false);
    }

    const jwtGet = () => {
        let jwt = localStorage.getItem('jwt');
        if (jwt) {
            setUserInfo(jwt)
        }
        else {
            setUserInfo(false)
        }
    }

    const navStyle = {
        color: '#000000'
    };

    useEffect(() => {
        jwtGet();
    })

    return (
        <nav className="sitenav">
            <div className="titlecont">
                <Link style={navStyle} to= '/'>
                    <div className="titleinfo">
                    <img src={'record.svg'} alt='' className="recordimg"/>
                    <div className="titletext">The Big Record</div>
                    </div>
                </Link> 
            </div>
            <div className="sitelinks">
                {userInfo &&
                <Link style={navStyle} to= '/user'>
                    <div className="userlink">Profile</div>
                </Link> 
                }
                {userInfo && 
                <Link style={navStyle} to='/login'>
                    <button className='logoutbtn' type="button" onClick={handleLogOut}>Logout</button>
                </Link> 
                }
                {!userInfo &&
                <Link style={navStyle} to='/login'>
                    <button className='loginbtn' type="button">Login</button>
                </Link>
                }
                {!userInfo && 
                <Link style={navStyle} to='/signup'>
                    <button className='signupbtn' type="button">Signup</button>
                </Link>
                }
            </div>
        </nav>
    )
}

export default Navbar