import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Page from './Page';

const App = () => (
    <Router>
        <div id="main">
            <nav>
                <ul>
                    <Link to="/">Home</Link>
                    <Link to="/page">Page</Link>
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
