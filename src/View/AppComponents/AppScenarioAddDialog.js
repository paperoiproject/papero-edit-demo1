import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import AppEditScenarioPage from "./AppEditScenarioPage"

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  EditSpace: {
    width: "100vw",
    marginTop: "10px",
    display: "flex",
    justifyContent: "center"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppScenarioAddDialog(props) {
  const classes = useStyles();
  const [data, setValue] = React.useState({
    tasks: (props.edit_target < 0)? [] : props.data[props.edit_target].tasks,
    name: (props.edit_target < 0)? "" : props.data[props.edit_target].name,
  });
  const changeTasks = (tasks) => {
    setValue({...data, tasks: tasks})
  }
  const changeName = (name) => {
    setValue({...data, name: name})
  }
  return (
    <div>
      <Dialog fullScreen open={props.flag} onClose={() => {props.handleClose()}} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => {props.handleClose()}} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {(props.edit_target < 0)? "シナリオ追加" : "シナリオ編集"}
            </Typography>
            <Button color="inherit" onClick={() => {
              console.log(data.name)
              props.addScenario({name: data.name, day: new Date(), tasks: data.tasks})
              props.handleClose();
            }}>
              追加
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.EditSpace}>
          <AppEditScenarioPage
            data={data.tasks} name={data.name}
            changeData={(tasks) => changeTasks(tasks)}
            changeName={(name) => changeName(name)}
          />
        </div>
      </Dialog>
    </div>
  );
}
