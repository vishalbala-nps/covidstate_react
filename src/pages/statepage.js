import React from 'react';
import TitleBar from '../components/titlebar.js'
import axios from 'axios'
import apiUrl from '../components/api_url.js'
import StatePageDisplay from '../components/statepage/statepagedisplay.js'

function Statepage(props) {
  const state = props.match.params.statename
  const [stats,setstats] = React.useReducer(
    function(state,action) {
      if (action.type === "DATA_LOADING") {
        return {loading:true,error:false,stats:{}}
      } else if (action.type === "DATA_ERROR") {
        return {loading:false,error:true,stats:{}}
      } else if (action.type === "DATA_LOADED") {
        return {loading:false,error:false,stats:action.payload}
      }
    },{loading:true,error:false,stats:{}}
  )
  //Functions
  React.useEffect(function() {
    axios.get(apiUrl+"/data?type=historical&state="+state).then(function(result) {
      setstats({
        type: "DATA_LOADED",
        payload: result.data
      })
    }).catch(function() {
      setstats({
        type: "DATA_ERROR"
      }) 
    })
  },[state])

  return (
    <>
      <TitleBar type="backbar" title={state} clickfunc={function() {
        if (stats.loading === false) {
          setstats({
            type: "DATA_LOADING"
          })
          axios.get(apiUrl+"/data?type=historical&state="+state).then(function(result) {
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
      }
    } />
      <StatePageDisplay stats={stats} state={state} />
    </>
  )
}
  
export default Statepage;