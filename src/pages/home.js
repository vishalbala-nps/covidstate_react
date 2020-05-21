import React from 'react';
import TitleBar from '../components/titlebar.js'
import MessagesDisplay from '../components/messages.js'
import Statsdisplay from '../components/statsdisplay.js'
import axios from 'axios'
import apiUrl from '../components/api_url.js'

function HomePage() {
  const [getstats,setstats] = React.useReducer(function(state,action) {
    if (action.type === "DATA_LOADED") {
      return {loading:false,error:false,stats:action.payload}
    } else if (action.type === "DATA_ERROR") {
      return {loading:false,error:true,stats:[]}
    } else {
      return new Error()
    }
  },{loading:true,error:false,stats:[]})
  React.useEffect(function() {
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
  },[])
  return (
    <>
        <TitleBar type="hometitle" />
        <MessagesDisplay/>
        <Statsdisplay statsstate={getstats} />
    </>
  );
}

export default HomePage;
