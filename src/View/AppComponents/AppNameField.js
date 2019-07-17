import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
});

// TODO: 位置の調整
class AppNameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
    };
  }
  handleChange(e){
    this.setState({name: e.target.value});
  };
  render(){
    return (
      <TextField
          defaultValue={this.props.name}
          id="standard-name"
          label="シナリオ名"
          value={this.value}
          onChange={
            (e) => {
              this.handleChange(e);
            }
          }
          margin="normal"
          style={{
             marginLeft: "1vw"
          }}
       />
     )
  }
}

export default AppNameField
