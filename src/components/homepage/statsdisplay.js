import React from 'react';
import Statstable from './table.js'
import {Typography} from '@material-ui/core';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers';
import InfectedCard from './stats_cards/infected_card.js'
import DeathCard from './stats_cards/deaths_card.js'
import CuredCard from './stats_cards/cured_card.js'
import ActiveCard from './stats_cards/active_card.js'
import PieCard from './stats_cards/pie_card.js'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LoadingScreen from '../../components/loading_screen.js'
import ErrorScreen from '../../components/onerror.js'
import MomentUtils from '@date-io/moment';
import moment from "moment";
function Statsdisplay(props){
    const [fromselectedDate,setfromselectedDate] = React.useState(moment("10/Mar/2020","DD/MMM/yyyy"))
    const [toselectedDate,settoselectedDate] = React.useState()
    if (props.statsstate.loading === true) {
        return (<LoadingScreen />)
    } else {
        if (props.statsstate.error === true) {
            return (<ErrorScreen />)
        } else {
            return (
            <>
                <br />
                <Box m={1}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item>
                            <KeyboardDatePicker
                                variant="inline"
                                disableToolbar
                                format="DD/MMM/yyyy"
                                margin="normal"
                                label="From"
                                value={fromselectedDate}
                                onChange={setfromselectedDate}/>
                        </Grid>
                        <Grid item>
                            <KeyboardDatePicker
                                variant="inline"
                                disableToolbar
                                format="DD/MMM/yyyy"
                                margin="normal"
                                label="To"
                                value={moment(props.statsstate.stats.timestamp.latest_updated_date,"DD/mm/yyyy").format("DD/mm/yyyy")}
                                onChange={settoselectedDate}/>
                        </Grid>
                    </Grid>
                    </MuiPickersUtilsProvider>
                </Box>
                <Box m={1} data-testid="stat-cards">
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
                <Box m={1} data-testid="stat-cards-more">
                    <Grid container justify="center" spacing={2}>
                        <Grid item sm={6}>
                            <ActiveCard stats={props.statsstate.stats} />
                        </Grid>
                    </Grid>
                </Box>
                <br />
                <Typography data-testid="stats-date" variant="h5" align="center"><b>As on: {props.statsstate.stats["timestamp"]["latest_updated_time"]}</b></Typography>
                <Statstable statsstate={props.statsstate.stats}/>
                <br />
                <Grid container justify="center" spacing={2}>
                    <Grid item md={9}>
                        <PieCard stats={props.statsstate.stats} />
                    </Grid>
                </Grid>
            </>
            )
        }
    }
}

export default Statsdisplay;