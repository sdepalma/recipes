import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import Page from './Page';

const App = () => (
    <Router>
        <div id="main">
            <nav>
                <ul>
                    <li>
                        <NavLink exact={true} activeClassName='active' to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact={true} activeClassName='active' to='/page'>
                            Page
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/page' component={Page} />
            </Switch>
        </div>
    </Router>
);

export default App;
