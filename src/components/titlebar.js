import React from 'react';
import {AppBar,Toolbar,Typography,IconButton,ListItem,List,Drawer,ListItemIcon,ListItemText,Dialog,DialogTitle,ListItemAvatar,Avatar,Tooltip} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PhoneIcon from '@material-ui/icons/Phone';
import InfoIcon from '@material-ui/icons/Info';
import CodeIcon from '@material-ui/icons/Code';
import ShareIcon from '@material-ui/icons/Share';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import RefreshIcon from '@material-ui/icons/Refresh';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { useHistory } from "react-router-dom";
import useDarkMode from 'use-dark-mode';

function TitleBar(props) {
  const [draweropen,setdraweropen] = React.useState(false);
  const [sharedialog,setsharedialog] = React.useState(false);
  let darkmodeconfig = {}
  if (navigator.cookieEnabled === false) {
    darkmodeconfig = {storageKey:null}
  }
  const darkMode = useDarkMode(false,darkmodeconfig);
  let history = useHistory();
  if (props.type === "hometitle"){
    let darkmodetext = "Enable Dark Mode"
    let darkmodeicon = <Brightness2Icon />
    if (darkMode.value) {
        darkmodetext = "Disable Dark Mode"
        darkmodeicon = <WbSunnyIcon />
    }
    return (
        <>
        <Dialog open={sharedialog} onClose={function(){setsharedialog(false)}}>
            <DialogTitle>Share covidstate.in</DialogTitle>
            <List>
                <ListItem button key={"whatsapp"} component="a" href="https://wa.me/?text=Here%20is%20a%20website%20giving%20latest%20and%20trending%20details%20of%20COVID-19%20in%20India%20and%20it%27s%20states.%20You%20can%20visit%20it%20at:https://covidstate.in">
                    <ListItemAvatar>
                        <Avatar style={{backgroundColor:"#FFFFFF"}}>
                            <WhatsAppIcon style={{color:"#25D366"}} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Whatsapp"/>
                </ListItem>
                <ListItem button key={"twitter"} component="a" href="https://twitter.com/intent/tweet?text=Here%20is%20a%20website%20giving%20latest%20and%20trending%20details%20of%20COVID-19%20in%20India%20and%20it%27s%20states.%20You%20can%20visit%20it%20at:https://covidstate.in">
                    <ListItemAvatar>
                        <Avatar style={{backgroundColor:"#FFFFFF"}}>
                            <TwitterIcon style={{color:"#1DA1F2"}} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Twitter"/>
                </ListItem>
                <ListItem button key={"facebook"} component="a" href="https://www.facebook.com/sharer/sharer.php?u=https://covidstate.in">
                    <ListItemAvatar>
                        <Avatar style={{backgroundColor:"#FFFFFF"}}>
                            <FacebookIcon style={{color:"#3b5998"}}/>
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
                <ListItem button key="api" component="a" href="https://covidstate.in/api/docs">
                    <ListItemIcon><CodeIcon /></ListItemIcon>
                    <ListItemText primary="API" />
                </ListItem>
                <ListItem button key="share" onClick={function() {setdraweropen(false);setsharedialog(true)}}>
                    <ListItemIcon><ShareIcon /></ListItemIcon>
                    <ListItemText primary="Share" />
                </ListItem>
                <ListItem button key="github" component="a" href="https://github.com/vishalbala-nps/covidstate_react">
                    <ListItemIcon><GitHubIcon /></ListItemIcon>
                    <ListItemText primary="View Github Repository" />
                </ListItem>
                <ListItem button key="darkmode" onClick={darkMode.toggle}>
                    <ListItemIcon>{darkmodeicon}</ListItemIcon>
                    <ListItemText primary={darkmodetext}/>
                </ListItem>
            </List>
        </Drawer>
        <AppBar position="static" className="navstyle">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={function() {
                    setdraweropen(true);
                }}><MenuIcon /></IconButton>
                <Typography variant="h6" color="inherit">COVID-19 India Statistics</Typography>
                <Tooltip title="Refresh">
                    <IconButton color="inherit" style={{marginLeft: "auto",marginRight: -12}} onClick={props.clickfunc}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
        </>
    );
  } else if (props.type === "backbar") {
      return (
        <AppBar position="static" className="navstyle">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={function() {
                    history.push("/")
                }}><ArrowBackIcon /></IconButton>
                <Typography variant="h6" color="inherit">{props.title}</Typography>
                <Tooltip title="Refresh">
                    <IconButton color="inherit" style={{marginLeft: "auto",marginRight: -12}} onClick={props.clickfunc}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
      )
  }
}

export default TitleBar;
