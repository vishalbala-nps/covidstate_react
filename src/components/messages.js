import React from 'react';
import { Typography,Box } from '@material-ui/core';

function MessagesDisplay(props) {
    const [getmessage,setmessage] = React.useState("Loading..")
    if (props.messagestate.loading === false && getmessage === "Loading..") {
        if (props.messagestate.error === true) {
            setmessage("An Error Occured. Please try again soon")
        } else {
            setmessage(props.messagestate.messageslist[Math.floor(Math.random()*props.messagestate.messageslist.length)])
            // eslint-disable-next-line
            let periodicID = setInterval(function() {
                setmessage(props.messagestate.messageslist[Math.floor(Math.random()*props.messagestate.messageslist.length)])
            },5000)
        }
    }
    return (
        <>
            <br />
            <Box bgcolor="#CEE3FE" color="#253883">
                <Typography align="center" variant="h6"><b>{getmessage}</b></Typography>
            </Box>
        </>
    )
}

export default MessagesDisplay;