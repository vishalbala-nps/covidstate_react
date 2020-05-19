import React from 'react';
import TitleBar from '../components/titlebar.js'
import {CircularProgress,Box,Card,CardContent,Typography,Link} from '@material-ui/core';
import {Phone,WhatsApp,Email,Language} from '@material-ui/icons';
import axios from 'axios'

function Contacts(props) {
  let contactsjsx;
  const [getcontacts,setcontacts] = React.useReducer(function(state,action) {
    if (action.type == "DATA_LOADED") {
      return {loading:false,error:false,messageslist:action.payload}
    } else if (action.type == "DATA_ERROR") {
      return {loading:false,error:true,messageslist:[]}
    } else {
      return new Error()
    }
  },{loading:true,error:false,messageslist:[]})
  React.useEffect(function() {
    axios.get("http://covidstate.in/api/v1/contacts").then(function(result) {
      setcontacts({
        type: "DATA_LOADED",
        payload: result.data
      })
    }).catch(function() {
      setcontacts({
        type: "DATA_ERROR"
      }) 
    })
  },[])

  if (getcontacts.loading == true) {
    contactsjsx = (<CircularProgress />)
  } else {
    if (getcontacts.error == true) {
      contactsjsx = (<h1>Error</h1>)
    } else {
        contactsjsx = (
          <Box m={1}>
            <br />
            <Card>
              <CardContent>
                <Typography variant="h4" align="center">National Contacts</Typography>
                <br />
                <Typography variant="h6"><Phone /> <Link href={"tel:"+getcontacts.messageslist["India"]["phone"]}>{getcontacts.messageslist["India"]["phone"]}</Link></Typography>
                <Typography variant="h6"><WhatsApp /> <Link href={"http://wa.me/"+getcontacts.messageslist["India"]["whatsapp"]}>{getcontacts.messageslist["India"]["whatsapp"]}</Link></Typography>
                <Typography variant="h6"><Email /> <Link href={"mailto:"+getcontacts.messageslist["India"]["email"]}>{getcontacts.messageslist["India"]["email"]}</Link></Typography>
                <Typography variant="h6"><Language /> <Link href={getcontacts.messageslist["India"]["website"]}>{getcontacts.messageslist["India"]["website"]}</Link></Typography>
              </CardContent>
            </Card>
          </Box>
        )
    }
  }
  return (
    <>
      <TitleBar type="backbar" title="Contacts" />
      {contactsjsx}
    </>
  )
}
  
export default Contacts;