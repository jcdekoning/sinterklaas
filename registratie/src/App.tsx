import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Intro from './steps/Intro';
import Stap1 from './steps/Stap1';
import Stap2 from './steps/Stap2';
import Stap3 from './steps/Stap3';
import Stap4 from './steps/Stap4';

import Header from './components/Header';

const App = () => {
  return <>
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/stap1" component={Stap1} />
          <Route path="/stap2" component={Stap2} />
          <Route path="/stap3" component={Stap3} />
          <Route path="/stap4" component={Stap4} />
          <Route component={Intro} />
        </Switch>
      </main>
      Vector illustration credit: <a href="https://www.vecteezy.com">Vecteezy!</a>
    </Router>
  </>
}

export default App;
