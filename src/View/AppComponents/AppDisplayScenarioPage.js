import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {load, updateData, updateTime} from "../../Action/Actions/firebase";

import MaterialTable, { MTableBodyRow, MTableHeader}  from 'material-table';
import TablePagination from '@material-ui/core/TablePagination';

import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';


import AppScenarioAddDialog from './AppScenarioAddDialog'
import AppShowScenario from './AppShowScenario'
import moment from 'moment'

import {Edit} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: "60vw",
    hight: "70vh"
  },
  TablePagination: {
    display: "flex",
    justifyContent: "center",
  }
});

function AppDisplayScenarioPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const {test, time} = useSelector(state => state.fireBaseReducer);
  useEffect(
    () => {
      dispatch(load())
    },
    [inputRef]
  );
  const [state, setState] = React.useState({
    columns: [
      { title: 'シナリオ名', field: 'name', sorting: false},
      {
        title: '作成日/編集日',
        field: 'day',
        type: 'numeric',
        customSort: (a, b) =>{
          return a.date.getTime() - b.date.getTime()
        }
      },
      {
        title: '動作数',
        field: 'num',
        type: 'numeric'
      },
    ],
    dialagFlag: false,
    showFlag: false,
    showTarget: 0,
    edit_target: -1,
  });
  console.log(test);
  console.log((test.length !== 0) ? test[0].day : "");
  return (
    <div className={classes.root}>
    <MaterialTable
      title="作成したシナリオ一覧"
      className={classes.root}
      columns={state.columns}
      data={test.map((v)=>{
        return {
          name: v.name,
          day:  moment(v.day).format('YYYY年MM月DD日HH時mm分'),
          date: v.day,
          num: v.tasks.length}
      })}
      options={{
        pageSize: 10,
      }}
      localization={{
       toolbar: {
           nRowsSelected: '{0} row(s) selected'
       },
       header: {
           actions: '動作'
       },
       body: {
           emptyDataSourceMessage: 'No records to display',
           filterRow: {
               filterTooltip: 'Filter'
           },
           editRow: {
             deleteText: "本当に削除しますか？",
             saveTooltip: "削除",
             cancelTooltip:"キャンセル"
           }
       }
     }}
      actions={[
        {
          icon: 'add',
          tooltip: 'Add',
          isFreeAction: true,
          onClick: (event) => {
            setState({ ...state, dialagFlag: true})
          }
        },
        {
          icon: 'edit',
          tooltip: 'edit',
          onClick: (event, rowData) => {
            let index = test.findIndex(item => item.name === rowData.name)
            setState({ ...state, dialagFlag: true, edit_target: index})
          }
        }
      ]}
      editable={{
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              let data = test.filter((v) => {
                return oldData.name !== v.name
              })
              let tdata = time.filter((v) => {
                return oldData.name !== v
              })
              dispatch((updateData(data)))
              dispatch((updateTime(tdata)))
              /*
              console.log(data.indexOf(oldData))
              data.splice(data.indexOf(oldData), 1);
              console.log(data)
              /*
              if(time.indexOf(oldData) !== -1){
                let ctime = time.slice()
                ctime.splice(ctime.indexOf(oldData), 1);
                dispatch((updateTime(ctime)))
                */
            }, 600);
          }),
      }}
      components={{
        Row: props => (
          <MTableBodyRow {...props} onRowClick={()=>{
            console.log(props.data);
            let index = test.findIndex(item => item.name === props.data.name)
            setState({ ...state, showFlag: true, showTarget: index})
          }}/>
        ),
        Pagination: props => (
          <TableFooter className={classes.TablePagination}>
            <TableRow>
              <TablePagination  {...props} rowsPerPageOptions = {[]}/>
            </TableRow>
         </TableFooter>
        ),
      }}
    />
    {(state.dialagFlag)?
      <AppScenarioAddDialog
        flag={state.dialagFlag}
        data={test}
        handleClose={()=>{
          setState({ ...state, dialagFlag: false, edit_target: -1})
        }}
        edit_target={state.edit_target}
        addScenario={(data)=>{
          if(state.edit_target < 0){
            let c_data = test.slice();
            c_data.push(data)
            dispatch((updateData(c_data)))
          }else {
            let c_test = test.filter((v) => {
              return data.name !== v.name
            })
            c_test.push(data);
            dispatch((updateData(c_test)))
          }
        }}
      />
      : ""
    }
    {
      (state.showFlag)?
        <AppShowScenario
          data={(test.length !== 0)? test: [{name: "name1", day: "day", num: 4, tasks: []}]}
          handleClose={()=>{setState({ ...state, showFlag: false})}}
          showFlag={state.showFlag}
          showTarget={state.showTarget}
        />
        : ""
    }
    </div>
  );
}
export default AppDisplayScenarioPage











