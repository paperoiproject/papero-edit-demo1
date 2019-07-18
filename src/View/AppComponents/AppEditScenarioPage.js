import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import MaterialTable, { MTableBodyRow}  from 'material-table';
import TablePagination from '@material-ui/core/TablePagination';

import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

import {Add} from '@material-ui/icons';

import AppNameField from './AppNameField';


/*
const useStyles = makeStyles({
  TablePagination: {
    display: "flex",
    justifyContent: "center",
    padding: "5px"
  },
  act: {
    marginRight: "10px"
  }
});*/

class AppEditScenarioPage extends React.Component {
  child = React.createRef()
  nameref = React.createRef()
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Act',
          field: 'act',
          lookup: { 1: '頷く', 2: '首を振る',3: '見渡す', 4: '話を聞く',5: 'もぐもぐ', 6: '右を向く',7: '左を向く', 8: '上を向く', 9:'下を向く'},
          cellStyle: {padding: 0, width: 150},
          headerStyle: {padding: 0, width: 150}
        },
        { title: 'Text', field: 'text' },
      ],
      name: this.props.name
    };
  }
  testAdd(){
    console.log(this.child.current.state)
    this.child.current.dataManager.changeRowEditing();
    this.child.current.setState({
      ...this.child.current.dataManager.getRenderState(),
      showAddRow: !this.child.current.showAddRow
    });
  }
  changeName(name){
    this.setState({name: name})
    this.props.changeName(name);
  }

  render(){
    console.log(this.state)
    return (
      <div style={{width: "60vw"}}>
      <MaterialTable
        tableRef = {this.child}
        title="作成したシナリオ一覧"
        columns={this.state.columns}
        data={this.props.data}
        options={{
          pageSize: this.props.data.length
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
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.props.data];
                data.push(newData);
                console.log(data)
                this.props.changeData(data);
                let le = {target: {value: data.length}}
                this.child.current.onChangeRowsPerPage(le)
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.props.data];
                data[data.indexOf(oldData)] = newData;
                this.props.changeData(data);
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.props.data];
                data.splice(data.indexOf(oldData), 1);
                this.props.changeData(data);
              }, 600);
            }),
        }}
        components={{
          Pagination: props => (
            <TableFooter style={{
              display: "flex",
              justifyContent: "center",
              padding: "5px"
            }}>
              <TableRow>
              <Button variant="outlined"
                onClick={
                  () => {
                    this.testAdd()
                    this.changeName(this.nameref.current.state.name)
                  }
                }>
                シーンの追加
              </Button>
              </TableRow>
           </TableFooter>
          ),
          Toolbar: props => (
            <div>
             <AppNameField name={this.state.name} ref={this.nameref}/>
            </div>
          ),
        }}
      />
      </div>
    )
  }
}
export default AppEditScenarioPage