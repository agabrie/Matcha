import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

function Header() {
    return(
        <header style={headerStyle}>
            <h1>Matcha</h1>
                <nav>
                    <div className="nav-links">
                        <Link style={linkStyle} to="/">Home</Link>
                        <Link style={linkStyle} to="/ProfileCarousel">View Potential Matches</Link>
                    </div>
                </nav>
        </header>
    )
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    textTransform: 'uppercase'
  }
// const linkStyle = {
//     color: '#fff',
//     textDecoration: 'none'
// }

export default Header;