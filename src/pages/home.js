import React from 'react';
import TitleBar from '../components/titlebar.js'
import MessagesDisplay from '../components/messages.js'
import Statsdisplay from '../components/statsdisplay.js'
import axios from 'axios'
import apiUrl from '../components/api_url.js'
import { Box,Button } from "@material-ui/core";

function HomePage() {
  const [getstats,setstats] = React.useReducer(function(state,action) {
    if (action.type === "DATA_LOADED") {
      return {loading:false,error:false,stats:action.payload}
    } else if (action.type === "DATA_ERROR") {
      return {loading:false,error:true,stats:[]}
    } else if (action.type === "DATA_LOADING") {
      return {loading:true,error:false,stats:[]}
    } else {
      return new Error()
    }
  },{loading:true,error:false,stats:[]})
  //Functions
  function getdata() {
    axios.get(apiUrl+"/data?type=historical").then(function(result){
      setstats({
        type: "DATA_LOADED",
        payload: result.data
      })
    }).catch(function() {
      setstats({
        type: "DATA_ERROR"
      })  
    })
  }
  React.useEffect(function() {
    getdata()
  },[])
  return (
    <>
        <TitleBar type="hometitle" clickfunc={function() {
          if (getstats.loading === false) {
            setstats({
              type: "DATA_LOADING"
            })
            getdata()
        }
        }}/>
        <MessagesDisplay/>
        <Box align="center" display={{ xs: 'block', md: 'none' }}><br /><Button variant="outlined" color="secondary" component="a" href="#stats">Statewise Statistics</Button></Box>
        <Statsdisplay statsstate={getstats} />
    </>
  );
}

export default HomePage;
