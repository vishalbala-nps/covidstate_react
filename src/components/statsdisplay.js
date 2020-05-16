import React from 'react';
import Statstable from './table.js'
import {CircularProgress} from '@material-ui/core';
import InfectedCard from './stats_cards/infected_card.js'
import DeathCard from './stats_cards/deaths_card.js'
import CuredCard from './stats_cards/cured_card.js'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

function Statsdisplay(props){
    if (props.statsstate.loading == true) {
        return (<CircularProgress />)
    } else {
        if (props.statsstate.error == true) {
            return (<h1>Error</h1>)
        } else {
            return (
            <>
                <br />
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
                <Statstable statsstate={props.statsstate.stats}/>
            </>
            )
        }
    }
}

export default Statsdisplay;