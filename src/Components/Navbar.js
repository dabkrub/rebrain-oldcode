import React from 'react';
import '../css/Navbar.css'
export default function Navbar() {
    return (
        <>
            <div className="topnav" id="myTopnav">
                <a href="/" className="active">หน้าแรก</a>
                <div className="dropdown">
                    <button className="dropbtn">Login
                    <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="/loginadmin">Admin Login</a>
                        <a href="/loginuser">User Login</a>
                    </div>
                </div>
                <a href="#about">ติดต่อ</a>
                <a href="javascript:void(0);" className="icon" onclick="myFunction()">&#9776;</a>
            </div>
        </>
    );
}
