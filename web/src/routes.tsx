import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanatesMap from './pages/OrphanatesMap';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing}/>
                <Route path="/app" component={OrphanatesMap}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;