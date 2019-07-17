import React from 'react';
import TabBar from '../Components/TabBar'
import { withRouter } from 'react-router-dom'

function AppTabBar(props){
  const [value, setValue] = React.useState(props.history.location.pathname);
  return (
    <TabBar
      value={value}
      urlChange={(e, v) => {
        console.log(v)
        setValue(v);
        props.history.push(v);
      }} />
  );
}
export default withRouter(AppTabBar)