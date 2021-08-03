import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DetailPage from './components/DetailPage';
import PhoneticsAndMeaning from './components/PhoneticsAndMeaning';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={PhoneticsAndMeaning} />
        <Route path='/:word' component={DetailPage} />
      </Switch>
    </Router>
  )
}

export default App
