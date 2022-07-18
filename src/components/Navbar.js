import React from 'react'
import '../Navbar.css'
import { Link,useLocation } from "react-router-dom";

export default function Navbar() {
    let location = useLocation()
    return (
        <div>
            <nav style={{zIndex:"1"}} className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className='borderSet'>
                    <i className="fa fa-search" aria-hidden="true"></i>
                </div>
                <div className='borderSet1'>
                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                </div>
                <div className="collapse navbar-collapse bg-dark" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className={`nav-link ${(location.pathname === '/')?"active":""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname === '/about')?"active":""}`} to="/about">About</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
