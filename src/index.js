import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Users from './components/Users';
// import { Page404 } from './jsx/component/Page404';


const App = () =>(
    <Provider store={ store }>
        <Router history={browserHistory}>
            <div>
                <Switch>
                    <Route exact path={'/'} render={props => <Users {...props} />} />
                    {/* <Route component={Page404}/> */}
                </Switch>
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(<App/>, document.getElementById("index"));

// Initial Redux Setup - step 1
// set provider and load store