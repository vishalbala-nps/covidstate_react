import React from 'react';
import { Typography,Box } from '@material-ui/core';

function MessagesDisplay(props) {
    const [getmessage,setmessage] = React.useState("Loading..")
    let getmessages = props.messagejson;
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