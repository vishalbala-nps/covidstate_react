import React from 'react';
import TitleBar from '../components/titlebar.js'
import ActiveCard from '../components/state_cards/active_card.js'
import CuredCard from '../components/state_cards/cured_card.js'
import DeathsCard from '../components/state_cards/deaths_card.js'
import InfectedCard from '../components/state_cards/infected_card.js'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import apiUrl from '../components/api_url.js'
import LoadingScreen from '../components/loading_screen.js'
import ErrorScreen from '../components/onerror.js'

function Statepage(props) {
  const state = props.match.params.statename
  let resjsx;
  const [stats,setstats] = React.useReducer(
    function(state,action) {
      if (action.type == "DATA_LOADING") {
        return {loading:true,error:false,stats:{}}
      } else if (action.type == "DATA_ERROR") {
        return {loading:false,error:true,stats:{}}
      } else if (action.type == "DATA_LOADED") {
        return {loading:false,error:false,stats:action.payload}
      }
    },{loading:true,error:false,stats:{}}
  )
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
  },[])
  if (stats.loading == true) {
    resjsx = (<LoadingScreen />)
  } else if (stats.loading == false) {
    if (stats.error == true) {
      resjsx = (<ErrorScreen />)
    } else {
      resjsx = (
        <>
          <Box m={1}>
            <Grid container justify="center" spacing={2}>
              <Grid item md={6}>
                <InfectedCard stats={stats.stats} state={state}/>
              </Grid>
              <Grid item md={6}>
                <CuredCard stats={stats.stats} state={state}/>
              </Grid>
              <Grid item md={6}>
                <DeathsCard stats={stats.stats} state={state}/>
              </Grid>
              <Grid item md={6}>
                <ActiveCard stats={stats.stats} state={state}/>
              </Grid>
            </Grid>
          </Box>
        </>
      )
    }
  }
  return (
    <>
      <TitleBar type="backbar" title={state} />
      {resjsx}
    </>
  )
}
  
export default Statepage;