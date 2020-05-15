import React from 'react';
import TitleBar from '../components/titlebar.js'
import MessagesDisplay from '../components/messages.js'
import axios from 'axios'

function HomePage() {
  const [getmessages,setmessages] = React.useReducer(function(state,action) {
    if (action.type == "DATA_LOADED") {
      return {loading:false,error:false,messageslist:action.payload}
    } else if (action.type == "DATA_ERROR") {
      return {loading:false,error:true,messageslist:[]}
    } else {
      return new Error()
    }
  },{loading:true,error:false,messageslist:[]})
  React.useEffect(function() {
    axios.get("http://covidstate.in/api/v1/messages").then(function(result) {
      setmessages({
        type: "DATA_LOADED",
        payload: result.data["messages"]
      })
    }).catch(function() {
      setmessages({type: "DATA_ERROR"})
    })
  },[])
  return (
    <>
        <TitleBar type="hometitle" />
        <MessagesDisplay messagestate={getmessages}/>
    </>
  );
}

export default HomePage;
