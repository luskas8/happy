import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanatesMap from './pages/OrphanatesMap';
import CreateOrphanate from './pages/CreateOrphanate';
import Orphanate from './pages/Orphanate';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing}/>
                <Route path="/app" component={OrphanatesMap}/>
                <Route path="/orphanates/create" component={CreateOrphanate}/>
                <Route path="/orphanates/:id" component={Orphanate}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;