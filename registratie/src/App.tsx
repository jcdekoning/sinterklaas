import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Intro from './steps/Intro';
import Volwassene from './steps/Volwassene';
import Kind from './steps/Kind';
import Vrijwilliger from './steps/Vrijwilliger';
import Samenvatting from './steps/Samenvatting';

import Header from './components/Header';

const App = () => {
  return <>
    <Header />
    <main>
      <Router>
        <Switch>
          <Route path="/volwassene" component={Volwassene} />
          <Route path="/kind/:kind" component={Kind} />
          <Route path="/vrijwilliger" component={Vrijwilliger} />
          <Route path="/samenvatting" component={Samenvatting} />
          <Route component={Intro} />
        </Switch>
      </Router>
    </main>
    Vector illustration credit: <a href="https://www.vecteezy.com">Vecteezy!</a>
  </>
}

export default App;
