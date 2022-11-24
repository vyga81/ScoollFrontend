import React from 'react';
import { Link } from 'react-router-dom';



const Header = () => {
    return (
        <nav className="navbar navbar-expand-xl navbar-expand-lg navbar-light  px-5" style={{ backgroundColor: '#C6FF00' }}>

            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/register" >
                            Register
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login" >
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;