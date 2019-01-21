import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Page from './components/Page';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="page" component={Page} />
    </Route>
);
