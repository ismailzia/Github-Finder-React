import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({icon, title}) => {

        return (
            <nav className="navbar bg-primary">
                <h1>
                    <Link to="/"> <i className={icon}/> {title} </Link>
                </h1>
                <ul>
                    <Link to="/">Home</Link>  
                    <Link to="/about">About</Link>
                </ul>
            </nav>
        )
    }
    
    Navbar.defaultProps = {
        title: "Github Finder",
        icon:"p fab fa-github"
    };

    Navbar.propTypes = {    
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    };


    export default Navbar
