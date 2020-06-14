import React from 'react';
import TitleBar from '../components/titlebar.js'
import {Box,Card,CardContent,Typography,Link,List,ListItem,ListItemText,Divider,TextField} from '@material-ui/core';
import {Phone,WhatsApp,Email,Language} from '@material-ui/icons';
import axios from 'axios'
import apiUrl from '../components/api_url.js'
import LoadingScreen from '../components/loading_screen.js'
import ErrorScreen from '../components/onerror.js'

function Contacts(props) {
  let contactsjsx;
  const [getcontacts,setcontacts] = React.useReducer(function(state,action) {
    if (action.type === "DATA_LOADED") {
      return {loading:false,error:false,messageslist:action.payload}
    } else if (action.type === "DATA_ERROR") {
      return {loading:false,error:true,messageslist:[]}
    } else if (action.type === "DATA_LOADING") {
      return {loading:true,error:false,messageslist:[]}
    } else {
      return new Error()
    }
  },{loading:true,error:false,messageslist:[]})
  const [getsearch,setsearch] = React.useState("")
  //Functions
  function getdata() {
    axios.get(apiUrl+"/contacts").then(function(result) {
      setcontacts({
        type: "DATA_LOADED",
        payload: result.data
      })
    }).catch(function() {
      setcontacts({
        type: "DATA_ERROR"
      }) 
    })
  }
  React.useEffect(function() {
    getdata()
  },[])
  //Functions
  function Createlist(props) {
      let websitejsx;
      let emailjsx;
      let wajsx;
      if (props.contactjson.contacts["website"] !== null) {
        websitejsx = (
            <ListItem button component="a" href={props.contactjson.contacts["website"]} target="_blank">
              <ListItemText primary={<Typography style={{color:"#4B48B7"}}><Language /> {props.contactjson.contacts["website"]}</Typography>}></ListItemText>
            </ListItem>
        )
      }
      if (props.contactjson.contacts["email"] !== null) {
        emailjsx = (
            <ListItem button component="a" href={"mailto:"+props.contactjson.contacts["email"]}>
              <ListItemText primary={<Typography style={{color:"#4B48B7"}}><Email /> {props.contactjson.contacts["email"]}</Typography>}></ListItemText>
            </ListItem>
        )
      }
      if (props.contactjson.contacts["whatsapp"] !== null) {
        wajsx = (
            <ListItem button component="a" href={"wa.me/91"+props.contactjson.contacts["whatsapp"]} target="_blank">
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
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  if (getcontacts.loading === true) {
    contactsjsx = (<LoadingScreen />)
  } else {
    if (getcontacts.error === true) {
      contactsjsx = (<ErrorScreen />)
    } else {
        let contactslist = []
        for (let key in getcontacts.messageslist) {
          if (getcontacts.messageslist.hasOwnProperty(key)) {
            if (key !== "India") {
              contactslist.push({state:key,contacts:getcontacts.messageslist[key]})
            }
          }
        }
        const curcontact = contactslist
        contactslist = curcontact.filter(function(state) {
          return state["state"].includes(capitalizeFirstLetter(getsearch))
        })
        contactsjsx = (
          <Box m={1}>
            <br />
            <Card className="natcontacts">
              <CardContent>
                <Typography variant="h4" align="center">National Contacts</Typography>
                <br />
                <Typography variant="h6"><Phone style={{color:"#4B48B7"}}/> <Link href={"tel:"+getcontacts.messageslist["India"]["phone"]}>{getcontacts.messageslist["India"]["phone"]}</Link></Typography>
                <Typography variant="h6"><WhatsApp style={{color:"#4B48B7"}}/> <Link href={"http://wa.me/91"+getcontacts.messageslist["India"]["whatsapp"]} target="_blank">{getcontacts.messageslist["India"]["whatsapp"]}</Link></Typography>
                <Typography variant="h6"><Email style={{color:"#4B48B7"}}/> <Link href={"mailto:"+getcontacts.messageslist["India"]["email"]}>{getcontacts.messageslist["India"]["email"]}</Link></Typography>
                <Typography variant="h6"><Language style={{color:"#4B48B7"}}/> <Link href={getcontacts.messageslist["India"]["website"]} target="_blank">{getcontacts.messageslist["India"]["website"]}</Link></Typography>
              </CardContent>
            </Card>
            <br />
            <TextField InputProps={{style:{backgroundColor: "#E8E8E8"}}} style={{width:"100%"}} label="Filter by states" variant="filled" onChange={function(event) {
              setsearch(event.target.value)
            }} />
            <br />
            <List className="natcontacts">
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
      <TitleBar type="backbar" title="Contacts" clickfunc={function() {
        if (getcontacts.loading === false) {
          setcontacts({
            type: "DATA_LOADING"
          })
          getdata()
        }
      }} />
      {contactsjsx}
    </>
  )
}
  
export default Contacts;