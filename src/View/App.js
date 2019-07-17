import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';


import AppEditScenarioPage from './AppComponents/AppEditScenarioPage'
import AppDisplayScenarioPage from './AppComponents/AppDisplayScenarioPage'
import AppTimeTablePage from './AppComponents/AppTimeTablePage'

import AppTabBar from './AppComponents/AppTabBar'


const useStyles = makeStyles({
  App: {
    textAlign: "center",
    paddingTop: "8vh",
    display: "flex",
    justifyContent: "center",
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <BrowserRouter>
        <AppTabBar />
        <Switch>
          <Route exact path='/' component={AppDisplayScenarioPage} />
          <Route exact path='/addscenario' component={AppEditScenarioPage} />
          <Route exact path='/timetable' component={AppTimeTablePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
