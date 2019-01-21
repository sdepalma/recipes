import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

const Nav = () => {
    return (
        <nav>
            <ul>
                <li><IndexLink to="/">Home</IndexLink></li>
                <li><Link to="/page">Page</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;
