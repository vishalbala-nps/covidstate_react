import React from 'react';
import axios from 'axios'
import apiUrl from './api_url.js'
import MessagesDisplay from "./messages/messagesdisplay.js"
function Messages() {
    const [getmessages,setmessages] = React.useReducer(function(state,action) {
        if (action.type === "DATA_LOADED") {
          return {loading:false,error:false,messageslist:action.payload}
        } else if (action.type === "DATA_ERROR") {
          return {loading:false,error:true,messageslist:[]}
        } else {
          return new Error()
        }
      },{loading:true,error:false,messageslist:[]})
    React.useEffect(function() {
        axios.get(apiUrl+"/messages").then(function(result) {
            setmessages({
                type: "DATA_LOADED",
                payload: result.data["messages"]
            })
        }).catch(function() {
            setmessages({type: "DATA_ERROR"})
        })
    },[])
    return (<MessagesDisplay messagejson={getmessages} />)
}

export default Messages;