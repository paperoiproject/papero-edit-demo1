import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const TabBar = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Tabs variant="fullWidth" value={props.value} onChange={(e, v) => {props.urlChange(e, v)}}>
          <Tab label="シナリオ一覧" value="/"/>
          <Tab label="タイムテーブル" value="/timetable" />
        </Tabs>
      </AppBar>
    </div>
  );
}
export default TabBar