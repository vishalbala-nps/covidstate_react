import React from 'react';
import TitleBar from '../components/titlebar.js'
import {CircularProgress,Box,Card,CardContent,Typography,Link,List,ListItem,ListItemText,Divider} from '@material-ui/core';
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
  //Functions
  function Createlist(props) {
    let websitejsx;
    let emailjsx;
    let wajsx;
    if (props.contactjson.contacts["website"] != null) {
      websitejsx = (
          <ListItem button component="a" href={props.contactjson.contacts["website"]}>
            <ListItemText primary={<Typography style={{color:"#4B48B7"}}><Language /> {props.contactjson.contacts["website"]}</Typography>}></ListItemText>
          </ListItem>
      )
    }
    if (props.contactjson.contacts["email"] != null) {
      emailjsx = (
          <ListItem button component="a" href={"mailto:"+props.contactjson.contacts["email"]}>
            <ListItemText primary={<Typography style={{color:"#4B48B7"}}><Email /> {props.contactjson.contacts["email"]}</Typography>}></ListItemText>
          </ListItem>
      )
    }
    if (props.contactjson.contacts["whatsapp"] != null) {
      wajsx = (
          <ListItem button component="a" href={"wa.me/"+props.contactjson.contacts["whatsapp"]}>
            <ListItemText primary={<Typography style={{color:"#4B48B7"}}><WhatsApp /> {props.contactjson.contacts["whatsapp"]}</Typography>}></ListItemText>
          </ListItem>
      )
    }
    return (
      <>
        <ListItem>
          <List>
            <ListItem>
              <ListItemText primary={<Typography><b>{props.contactjson.state}</b></Typography>}/>
            </ListItem>
            <ListItem button component="a" href={"tel:"+props.contactjson.contacts["phone"]}>
              <ListItemText primary={<Typography style={{color:"#4B48B7"}}><Phone /> {props.contactjson.contacts["phone"]}</Typography>} />
            </ListItem>
            {websitejsx}
            {emailjsx}
            {wajsx}
          </List>
        </ListItem>
        <Divider />
      </>
    )
  }
  if (getcontacts.loading == true) {
    contactsjsx = (<CircularProgress />)
  } else {
    if (getcontacts.error == true) {
      contactsjsx = (<h1>Error</h1>)
    } else {
        let contactslist = []
        for (let key in getcontacts.messageslist) {
          if (getcontacts.messageslist.hasOwnProperty(key)) {
            contactslist.push({state:key,contacts:getcontacts.messageslist[key]})
          }
        }
        contactsjsx = (
          <Box m={1}>
            <br />
            <Card>
              <CardContent>
                <Typography variant="h4" align="center">National Contacts</Typography>
                <br />
                <Typography variant="h6"><Phone style={{color:"#4B48B7"}}/> <Link href={"tel:"+getcontacts.messageslist["India"]["phone"]}>{getcontacts.messageslist["India"]["phone"]}</Link></Typography>
                <Typography variant="h6"><WhatsApp style={{color:"#4B48B7"}}/> <Link href={"http://wa.me/"+getcontacts.messageslist["India"]["whatsapp"]}>{getcontacts.messageslist["India"]["whatsapp"]}</Link></Typography>
                <Typography variant="h6"><Email style={{color:"#4B48B7"}}/> <Link href={"mailto:"+getcontacts.messageslist["India"]["email"]}>{getcontacts.messageslist["India"]["email"]}</Link></Typography>
                <Typography variant="h6"><Language style={{color:"#4B48B7"}}/> <Link href={getcontacts.messageslist["India"]["website"]}>{getcontacts.messageslist["India"]["website"]}</Link></Typography>
              </CardContent>
            </Card>
            <List>
              {contactslist.map(function(item,index) {
                return (<Createlist contactjson={item} key={index}/>)
              })}
            </List>
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