import React from 'react';
import {AppBar,Toolbar,Typography,IconButton,ListItem,List,Drawer,ListItemIcon,ListItemText} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PhoneIcon from '@material-ui/icons/Phone';
import InfoIcon from '@material-ui/icons/Info';
import CodeIcon from '@material-ui/icons/Code';
import { useHistory } from "react-router-dom";

function TitleBar(props) {
  const [draweropen,setdraweropen] = React.useState(false);
  let history = useHistory();
  if (props.type === "hometitle"){
    return (
        <>
        <Drawer open={draweropen} onClose={function() {setdraweropen(false);}}>
            <List>
                <ListItem button key="title">
                    <h3>COVID-19 India Statistics</h3>
                </ListItem>
                <ListItem button key="contacts" onClick={function() {setdraweropen(false);history.push("/contacts")}}>
                    <ListItemIcon><PhoneIcon /></ListItemIcon>
                    <ListItemText primary="Contacts" />
                </ListItem>
                <ListItem button key="faq" onClick={function() {setdraweropen(false);history.push("/faq")}}>
                    <ListItemIcon><InfoIcon /></ListItemIcon>
                    <ListItemText primary="FAQ" />
                </ListItem>
                <ListItem button key="api" component="a" href="http://covidstate.in/api/docs">
                    <ListItemIcon><CodeIcon /></ListItemIcon>
                    <ListItemText primary="API" />
                </ListItem>
            </List>
        </Drawer>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={function() {
                    setdraweropen(true);
                }}><MenuIcon /></IconButton>
                <Typography variant="h6" color="inherit">COVID-19 India Statistics</Typography>
            </Toolbar>
        </AppBar>
        </>
    );
  } else if (props.type === "backbar") {
      return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={function() {
                    history.push("/")
                }}><ArrowBackIcon /></IconButton>
                <Typography variant="h6" color="inherit">{props.title}</Typography>
            </Toolbar>
        </AppBar>
      )
  }
}

export default TitleBar;
