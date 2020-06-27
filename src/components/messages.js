import React from 'react';
import { Typography,Box } from '@material-ui/core';
import axios from 'axios'
import apiUrl from './api_url.js'
function MessagesDisplay() {
    const [getmessages,setmessages] = React.useReducer(function(state,action) {
        if (action.type === "DATA_LOADED") {
          return {loading:false,error:false,messageslist:action.payload}
        } else if (action.type === "DATA_ERROR") {
          return {loading:false,error:true,messageslist:[]}
        } else {
          return new Error()
        }
      },{loading:true,error:false,messageslist:[]})
    const [getmessage,setmessage] = React.useState("Loading..")
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
    if (getmessages.loading === false && getmessage === "Loading..") {
        if (getmessages.error === true) {
            setmessage("An Error Occured. Please try again soon")
        } else {
            setmessage(getmessages.messageslist[Math.floor(Math.random()*getmessages.messageslist.length)])
        }
    }
    return (
        <>
            <br />
            <Box className="messages" onClick={function() {
                if (getmessages.loading === false && getmessages.error === false) {
                    setmessage(getmessages.messageslist[Math.floor(Math.random()*getmessages.messageslist.length)])
                }
            }}>
                <Typography align="center" variant="h6"><b>{getmessage}</b></Typography>
            </Box>
        </>
    )
}

export default MessagesDisplay;