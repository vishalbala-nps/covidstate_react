import React from 'react';
import {AppBar,Toolbar,Typography,IconButton,ListItem,List,Drawer,ListItemIcon,ListItemText,Dialog,DialogTitle,ListItemAvatar,Avatar} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PhoneIcon from '@material-ui/icons/Phone';
import InfoIcon from '@material-ui/icons/Info';
import CodeIcon from '@material-ui/icons/Code';
import ShareIcon from '@material-ui/icons/Share';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

import { useHistory } from "react-router-dom";

function TitleBar(props) {
  const [draweropen,setdraweropen] = React.useState(false);
  const [sharedialog,setsharedialog] = React.useState(false);
  let history = useHistory();
  if (props.type === "hometitle"){
    return (
        <>
        <Dialog open={sharedialog} onClose={function(){setsharedialog(false)}}>
            <DialogTitle>Share covidstate.in</DialogTitle>
            <List>
                <ListItem button key={"whatsapp"} component="a" href="https://wa.me/?text=Here%20is%20a%20website%20giving%20latest%20and%20trending%20details%20of%20COVID-19%20in%20India%20and%20it%27s%20states.%20You%20can%20visit%20it%20at:http://covidstate.in">
                    <ListItemAvatar>
                        <Avatar>
                            <WhatsAppIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Whatsapp"/>
                </ListItem>
                <ListItem button key={"twitter"} component="a" href="https://twitter.com/intent/tweet?text=Here%20is%20a%20website%20giving%20latest%20and%20trending%20details%20of%20COVID-19%20in%20India%20and%20it%27s%20states.%20You%20can%20visit%20it%20at:http://covidstate.in">
                    <ListItemAvatar>
                        <Avatar>
                            <TwitterIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Twitter"/>
                </ListItem>
                <ListItem button key={"facebook"} component="a" href="http://www.facebook.com/sharer/sharer.php?u=http://covidstate.in">
                    <ListItemAvatar>
                        <Avatar>
                            <FacebookIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Facebook"/>
                </ListItem>
            </List>
        </Dialog>
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
                <ListItem button key="share" onClick={function() {setdraweropen(false);setsharedialog(true)}}>
                    <ListItemIcon><ShareIcon /></ListItemIcon>
                    <ListItemText primary="Share" />
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
