import React from 'react';
import Statstable from './table.js'
import {Typography} from '@material-ui/core';
import InfectedCard from './stats_cards/infected_card.js'
import DeathCard from './stats_cards/deaths_card.js'
import CuredCard from './stats_cards/cured_card.js'
import ActiveCard from './stats_cards/active_card.js'
import PieCard from './stats_cards/pie_card.js'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LoadingScreen from '../components/loading_screen.js'
import ErrorScreen from '../components/onerror.js'

function Statsdisplay(props){
    if (props.statsstate.loading === true) {
        return (<LoadingScreen />)
    } else {
        if (props.statsstate.error === true) {
            return (<ErrorScreen />)
        } else {
            return (
            <>
                <br />
                <Typography variant="h5" align="center">As on: {props.statsstate.stats["timestamp"]["latest_updated_time"]}</Typography>
                <Box m={1}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item md={4}>
                            <InfectedCard stats={props.statsstate.stats} />
                        </Grid>
                        <Grid item md={4}>
                            <DeathCard stats={props.statsstate.stats} />
                        </Grid>
                        <Grid item md={4}>
                            <CuredCard stats={props.statsstate.stats} />
                        </Grid>
                    </Grid>
                </Box>
                <Box m={1}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item sm={6}>
                            <PieCard stats={props.statsstate.stats} />
                        </Grid>
                        <Grid item sm={6}>
                            <ActiveCard stats={props.statsstate.stats} />
                        </Grid>
                    </Grid>
                </Box>
                <Statstable statsstate={props.statsstate.stats}/>
            </>
            )
        }
    }
}

export default Statsdisplay;