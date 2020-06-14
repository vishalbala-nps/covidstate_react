import React from 'react';
import HomePage from './pages/home.js'
import Statepage from './pages/statepage.js'
import Contacts from './pages/contacts.js'
import FAQ from './pages/faq.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path="/state/:statename" component={Statepage}/>
          <Route path="/contacts" component={Contacts}/>
          <Route path="/faq" component={FAQ}/>
          <Route path="/" component={HomePage}/>
        </Switch>
      </Router>
  );
}


export default App;
