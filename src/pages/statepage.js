import React from 'react';
import TitleBar from '../components/titlebar.js'
import axios from 'axios'
import apiUrl from '../components/api_url.js'
import StatePageDisplay from '../components/statepage/statepagedisplay.js'
import moment from "moment";

function Statepage(props) {
  const state = props.match.params.statename
  let fromd = props.match.params.fromd
  let tod = props.match.params.tod
  if (fromd === undefined) {
    fromd = "10-Mar-2020"
  }
  if (tod === undefined) {
    tod = moment().format("DD-MMM-YYYY")
  } 
  const [stats,setstats] = React.useReducer(
    function(state,action) {
      if (action.type === "DATA_LOADING") {
        return {loading:true,error:false,stats:{}}
      } else if (action.type === "DATA_ERROR") {
        return {loading:false,error:true,stats:{}}
      } else if (action.type === "DATA_LOADED") {
          let tstamps = []
          let apid = {...action.payload.data}
          for (let key in apid) {
              if (apid.hasOwnProperty(key)) {
                  if (moment(key,"DD/MM/YY").isBetween(moment(fromd,"DD-MMM-YYYY"),moment(tod,"DD-MMM-YYYY"),null,"[]")) {
                      tstamps.push(moment(key,"DD/MM/YY").valueOf())
                  } else {
                      delete apid[key]
                  }
              }
        }
        return {loading:false,error:false,stats:{data:apid,timestamp:{updated_date:moment.utc(Math.max(...tstamps)).format("DD/MM/YY")}}}
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