import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
  },
  DialogActions: {
    padding: 0,
    justifyContent: "flex-start"
  },
  back_button: {
    marginLeft: 0,
    marginRignt: 0,
  },
  edit_button: {
    marginLeft: 0,
    marginRight: 50,
  },
  delete_button: {
  }
});

const AppShowScenario = props => {
  const { classes } = props;
  const chText =  {
    1: '頷く', 2: '首を振る',3: '見渡す',
    4: '話を聞く',5: 'もぐもぐ', 6: '右を向く',7: '左を向く', 8: '上を向く', 9:'下を向く'};
    if(props.type !== "timeTable"){
      return (
          <Dialog className={classes.root} open={props.showFlag} onClose={() => props.handleClose()} scroll="paper">
            <DialogTitle id="dialog-title">{props.data[props.showTarget].name}</DialogTitle>
            <DialogContent dividers="true">
              <List>
                {props.data[props.showTarget].tasks.map(detail => {
                  return (
                    <ListItem>
                      <ListItemText primary={chText[detail.act] + ": " + detail.text} />
                    </ListItem>
                  );
                })}
              </List>
            </DialogContent>
            <DialogActions className={classes.DialogActions}>
              <Button className={classes.back_button} onClick={() => props.handleClose()} color="primary">
                Back
              </Button>
              {(typeof props.type !== "undefined") ?
                <Button className={classes.edit_button}
                  onClick={
                    () =>{
                      props.handleClose()
                      props.addTimeTable()
                    }
                  }
                  color="primary">追加する</Button>
                : ""}
            </DialogActions>
          </Dialog>
      );
    } else {
    return(
      <Dialog className={classes.root} open={props.showFlag} onClose={() => props.handleClose()} scroll="paper">
        <DialogTitle id="dialog-title">{props.data.name}</DialogTitle>
        <DialogContent dividers="true">
          <List>
            {(props.data.tasks.length !== 0)? props.data.tasks.map(detail => {
              return (
                <ListItem>
                  <ListItemText primary={chText[detail.act] + ": " + detail.text} />
                </ListItem>
              );
            }): ""}
          </List>
        </DialogContent>
        <DialogActions className={classes.DialogActions}>
          <Button className={classes.back_button} onClick={() => props.handleClose()} color="primary">
            Back
          </Button>
          <Button className={classes.edit_button}
              onClick={
                () =>{
                  props.handleClose()
                  props.move()
                }
              }
              color="primary">移動する</Button>
        </DialogActions>
      </Dialog>);
    }
};

export default withStyles(styles)(AppShowScenario);
