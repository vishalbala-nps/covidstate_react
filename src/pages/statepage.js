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
      } else if (action.type === "DATA_UPDATE") {
        let nstate = state
        nstate.stats = action.payload
        return {...nstate}
      } else if (action.type === "DATA_LOADED") {
          let apid = {...action.payload.data}
          let tstamps = []
          for (let key in apid) {
              if (apid.hasOwnProperty(key)) {
                  if (moment(key,"DD/MM/YY").isBetween(moment(fromd,"DD-MMM-YYYY"),moment(tod,"DD-MMM-YYYY"),null,"[]")) {
                  } else {
                      delete apid[key]
                  }
              }     
        }
        for (let key in action.payload.data) {
          if (apid.hasOwnProperty(key)) {
              if (moment(key,"DD/MM/YY").isBetween(moment(fromd,"DD-MMM-YYYY"),moment(tod,"DD-MMM-YYYY"),null,"[]")) {
                tstamps.push(moment(key,"DD/MM/YY").valueOf())
              }
          }     
    }
        return {loading:false,error:false,stats:{data:apid,timestamp:{updated_date:moment(tod,"DD-MMM-YYYY").format("DD/MM/YY")}},last_upd_time_server:action.payload.timestamp.updated_date,initdata:action.payload,min_date:moment.utc(Math.min(...tstamps)).local().format("DD/MMM/yyyy")}
      }
    },{loading:true,error:false,stats:{},last_upd_time_server:"",initdata:{},min_date:""}
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
      <StatePageDisplay stats={stats} state={state} setstats={setstats} fromd={moment(fromd,"DD-MMM-YYYY")} tod={moment(tod,"DD-MMM-YYYY")}/>
    </>
  )
}
  
export default Statepage;