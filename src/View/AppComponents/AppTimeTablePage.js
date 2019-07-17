import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import {load, updateData, updateTime} from "../../Action/Actions/firebase";
import {send, sendWORK} from "../../Action/Actions/papero";

import green from '@material-ui/core/colors/green'

import MaterialTable, { MTableBodyRow, MTableHeader, MTableBody}  from 'material-table';
import TablePagination from '@material-ui/core/TablePagination';

import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';


import AppSearchDialog from './AppSearchDialog'
import AppShowScenario from './AppShowScenario'
import Toggleon from "@material-ui/icons/ToggleOn";
import Toggleoff from "@material-ui/icons/ToggleOff";
import Typography from "@material-ui/core/Typography";


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import FlagIcon from "@material-ui/icons/Flag";
import ForwardIcon from "@material-ui/icons/Forward";

import Paper from '@material-ui/core/Paper';


import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from './utils';


const useStyles = makeStyles({
  root: {
    width: "60vw",
    hight: "70vh"
  },
  header: {
    display: "flex",
    paddingTop: 15,
  },
  TablePagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
});

function AppTimeTablePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const {test, time} = useSelector(state => state.fireBaseReducer);
  const {working} = useSelector(state => state.PaperoReducer);
  useEffect(
    () => {
      dispatch(load())
    },
    [inputRef]
  );

  useEffect(
    () => {
      setState({...state, time: time})
    },
    [time]
  );

  /*
  function Post(work){

  }
  */
  /*
  function Post(work){
      let data = await fetch("https://5aa940d9.ngrok.io",{
          method: 'POST',
          mode: "cors",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(work)
      }).then(response => response.json());
    }
    */
  console.log(working)
  const [state, setState] = React.useState({
    columns: [
      { title: 'シナリオ名', field: 'name' },
      { title: '作成日', field: 'day', type: 'numeric'},
      {
        title: '動作数',
        field: 'num',
        type: 'numeric'
      },
    ],
    time: [],
    power: false,
    point: 0,
    next_point: 1,
    chmove: false,
    searchFlag: false,
    showFlag: false,
    showTarget: {name: "load", num: 0}
  });
  console.log(state.time)
  function drop(e){
    setState({...state, time: applyDrag(state.time, e)})
    dispatch(updateTime(applyDrag(time, e)));
  }

  function iconMove(i){
      if(state.point === i){
        return (<FlagIcon color={(state.power)? "primary": ""}/>)
      }
      else if(state.next_point === i){
        return (<ForwardIcon color={(state.power)? "primary": ""}/>)
      }
      else {
        return ""
      }
  }

  if(!(working) && state.chmove){
    console.log("a")
    if(state.next_point < state.time.length - 1){
      setState({ ...state, point: state.next_point, next_point: state.next_point + 1, chmove: false});
    } else {
      setState({ ...state, point: state.next_point, next_point: 0, chmove: false});
    }
  }

  if(!(working) && test.length !== 0 && time.length !== 0 && state.power && !(state.chmove)){
    console.log("OK")
    let work = test.find((v)=>{return v.name === time[state.point]}).tasks
    dispatch(sendWORK());
    dispatch(send(work));
    setState({...state, chmove: true})
  }
  return (
    <div className={classes.root}>
    <Paper className={classes.root}>
    <div className={classes.header}>
    <Typography variant="h6" style={{width: "15vw"}}>
      タイムテーブル
    </Typography>
    <IconButton edge="end" aria-label="Comments" style={{marginLeft: "36vw", marginRight: "1vw"}} onClick={()=>{setState({ ...state, searchFlag: true})}}>
      <AddIcon />
    </IconButton>
    <IconButton edge="end" aria-label="Comments"
      onClick={()=>{
        if(state.power){
          setState({ ...state, power: false, point: 0})
        } else {
          setState({ ...state, power: true})
        }
      }}>
      {(state.power)? <Toggleon htmlColor={green[500]}/> : <Toggleoff />}
    </IconButton>
    </div>
    <List>
    <Container onDrop={e => drop(e)}>
      {state.time.map((value, i) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <Draggable >
          <ListItem key={value} dense button divider
            onClick={()=>{setState({ ...state, showTarget: {name: value, num: i}, showFlag: true})}}>
            <ListItemIcon>
            <IconButton edge="end" aria-label="Comments" onClick={(e)=>{
              e.stopPropagation()
              let ctime = state.time.slice()
              ctime.splice(i, 1);
              setState({...state, time: ctime})
              dispatch(updateTime(ctime));}}>
              <DeleteIcon/>
            </IconButton>
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${value}`} />
            <ListItemSecondaryAction>
              {iconMove(i)}
            </ListItemSecondaryAction>
          </ListItem>
          </Draggable >
        );
      })}
    </Container>
    </List>
    </Paper>
    <AppSearchDialog
      data={test}
      flag={state.searchFlag}
      handleClose={()=>{setState({ ...state, searchFlag: false})}}
      addData={(index) => {
        let data = test[index].name
        let c_data = time.slice()
        c_data.push(data)
        dispatch(updateTime(c_data));
      }}
    />
    <AppShowScenario
      type="timeTable"
      data={(state.showTarget.name !== "load")? test.find((v)=>{return v.name === state.showTarget.name}): {name: "load", tasks: []}}
      handleClose={()=>{setState({ ...state, showFlag: false})}}
      showFlag={state.showFlag}
      move={() =>{
        if(state.power){
          setState({ ...state, showFlag: false, next_point: state.showTarget.num});
        } else {
          setState({ ...state, showFlag: false, point: state.showTarget.num, next_point: (state.showTarget.num + 1 < state.time.length)? state.showTarget.num + 1 : 0});
        }
      }}
    />
    </div>
  );
}
export default AppTimeTablePage