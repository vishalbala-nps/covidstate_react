import React from 'react';
import ActiveCard from './state_cards/active_card.js'
import CuredCard from './state_cards/cured_card.js'
import DeathsCard from './state_cards/deaths_card.js'
import InfectedCard from './state_cards/infected_card.js'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LoadingScreen from '../loading_screen.js'
import ErrorScreen from '../onerror.js'

function StatePageDisplay(props) {
  let stats = props.stats
  let state = props.state
  let resjsx;
  if (stats.loading === true) {
    resjsx = (<LoadingScreen />)
  } else if (stats.loading === false) {
    if (stats.error === true) {
      resjsx = (<ErrorScreen />)
    } else {
      resjsx = (
        <>
          <Box m={1} data-testid="statestatscard">
            <Grid container justify="center" spacing={2}>
              <Grid item md={6}>
                <InfectedCard stats={stats.stats} state={state}/>
              </Grid>
              <Grid item md={6}>
                <DeathsCard stats={stats.stats} state={state}/>
              </Grid>
              <Grid item md={6}>
                <CuredCard stats={stats.stats} state={state}/>
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
  return resjsx
}

export default StatePageDisplay;