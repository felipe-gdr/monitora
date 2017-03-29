var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRedirect = ReactRouter.IndexRedirect;
var hashHistory = ReactRouter.hashHistory;

var Main = require('./Main')
var AppGrid = require('./components/app-grid');
var ServerGrid = require('./components/server-grid');
var ServerTable = require('./components/server-table');
var AppDetalhe = require('./components/app-detalhe');


module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="app" component={AppGrid} />
      <Route path="app/:app" component={AppDetalhe} />
      <Route path="server" component={ServerGrid} />
      <Route path="server-table" component={ServerTable} />
      <IndexRedirect to="app" />
    </Route>
  </Router>

);