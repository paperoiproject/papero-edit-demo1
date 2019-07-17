import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import MaterialTable, { MTableBodyRow, MTableHeader}  from 'material-table';
import TablePagination from '@material-ui/core/TablePagination';

import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';


import AppScenarioAddDialog from './AppScenarioAddDialog'
import AppShowScenario from './AppShowScenario'
import moment from 'moment'

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

function AddTimeTable(props) {
  const classes = useStyles();
  const {test} = useSelector(state => state.fireBaseReducer);
  const [state, setState] = React.useState({
    columns: [
      { title: 'シナリオ名', field: 'name', sorting: false},
      {
        title: '作成日',
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
  });
  return (
    <div className={classes.root}>
    <MaterialTable
      title="作成したシナリオ一覧"
      className={classes.root}
      columns={state.columns}
      data={props.test.map((v)=>{
        return {
          name: v.name,
          day:  moment(v.day).format('YYYY年MM月DD日HH時mm分'),
          num: v.tasks.length,
          date: v.day
        }
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
           }
       }
     }}
      actions={[
      ]}
      editable={{
      }}
      components={{
        Row: props => (
          <MTableBodyRow {...props} onRowClick={()=>{
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
    <AppShowScenario
      data={props.test}
      type="time"
      handleClose={()=>{setState({ ...state, showFlag: false})}}
      showFlag={state.showFlag}
      showTarget={state.showTarget}
      addTimeTable={()=>props.addData(state.showTarget)}
    />
    </div>
  );
}
export default AddTimeTable