import React from 'react';
import { Router, Route, IndexRedirect, hashHistory} from 'react-router';

import Main from './Main';
import AppGrid from './components/app-grid';
import ServerGrid from './components/server-grid';
import ServerTable from './components/server-table';
import AppDetalhe from './components/app-detalhe';


export default (
    <Router history={hashHistory}>
        <Route path='/' component={Main}>
            <Route path='app' component={AppGrid}/>
            <Route path='app/:app' component={AppDetalhe}/>
            <Route path='server' component={ServerGrid}/>
            <Route path='server-table' component={ServerTable}/>
            <IndexRedirect to='app'/>
        </Route>
    </Router>

);
