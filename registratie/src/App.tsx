import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FormProvider } from './FormContext';
import ConfigLoader from './ConfigLoader';

import Stap1 from './steps/Stap1';
import Stap2 from './steps/Stap2';
import Stap3 from './steps/Stap3';
import Stap4 from './steps/Stap4';

import SuccessPage from './SuccessPage';
import ErrorPage from './ErrorPage';

import Header from './components/Header';

const App = () => {
  return (
    <ConfigLoader>
      <FormProvider>
        <Router>
          <Header />
          <Switch>
            <Route path="/stap2" component={Stap2} />
            <Route path="/stap3" component={Stap3} />
            <Route path="/stap4" component={Stap4} />
            <Route path="/success" component={SuccessPage} />
            <Route path="/error" component={ErrorPage} />
            <Route component={Stap1} />
          </Switch>
        </Router>
      </FormProvider>
    </ConfigLoader>
  )
}

export default App;