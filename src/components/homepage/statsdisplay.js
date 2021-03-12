import React from 'react';
import Statstable from './table.js'
import {Typography,Button} from '@material-ui/core';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers';
import InfectedCard from './stats_cards/infected_card.js'
import DeathCard from './stats_cards/deaths_card.js'
import CuredCard from './stats_cards/cured_card.js'
import ActiveCard from './stats_cards/active_card.js'
import PieCard from './stats_cards/pie_card.js'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import MomentUtils from '@date-io/moment';
import moment from "moment";
function Statsdisplay(props){
    //Functions
    function betweenDate(fromdate,todate) {
        let apid = {...props.statsstate.stats.apistats.data}
        let tstamps = []
        for (let key in apid) {
            if (apid.hasOwnProperty(key)) {
                if (moment(key,"DD/MM/YY").isBetween(fromdate,todate,null,"[]")) {
                    tstamps.push(moment(key,"DD/MM/YY").valueOf())
                } else {
                    delete apid[key]
                }
            }
        }
        props.setstatsstate({type:"DATA_UPDATE",payload:{data:apid,timestamp:{latest_updated_date:moment.utc(Math.max(...tstamps)).format("DD/MM/YY")}}})
    }
    function resetDate() {
        let apid = {...props.statsstate.stats.apistats}
        props.setstatsstate({type:"DATA_UPDATE",payload:apid})
    }
    //Components
    function DatePickers() {
        const [fromselectedDate,setfromselectedDate] = React.useState(moment("10/Mar/2020","DD/MMM/yyyy"))
        const [toselectedDate,settoselectedDate] = React.useState(moment(moment(props.statsstate.stats.apistats.timestamp.latest_updated_date,"mm/DD/yyyy").format("DD/mm/yyyy")))
        let firstmount = React.useRef(true)
        React.useEffect(function() {
            if (firstmount.current) {
                firstmount.current = false
            } else {
                betweenDate(fromselectedDate,toselectedDate)
            }
        },[fromselectedDate,toselectedDate])
        console.log(firstmount)
        return (
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
                            onChange={function(d) {
                                setfromselectedDate(d)
                            }}/>
                    </Grid>
                    <Grid item>
                        <KeyboardDatePicker
                            variant="inline"
                            disableToolbar
                            format="DD/MMM/yyyy"
                            margin="normal"
                            label="To"
                            value={toselectedDate}
                            onChange={function(d) {
                                settoselectedDate(d)
                            }}/>
                    </Grid>
                    <Grid item>
                        <Button onClick={function() {
                            resetDate()
                        }}>Reset</Button>
                    </Grid>
                </Grid>
                </MuiPickersUtilsProvider>
            </Box>
        )
    }
    return (
        <>
            <br />
            <DatePickers />
            <Box m={1} data-testid="stat-cards">
                <Grid container justify="center" spacing={2}>
                    <Grid item md={4}>
                        <InfectedCard stats={props.statsstate.stats.filteredstats} />
                    </Grid>
                    <Grid item md={4}>
                        <DeathCard stats={props.statsstate.stats.filteredstats} />
                    </Grid>
                    <Grid item md={4}>
                        <CuredCard stats={props.statsstate.stats.filteredstats} />
                    </Grid>
                </Grid>
            </Box>
            <Box m={1} data-testid="stat-cards-more">
                <Grid container justify="center" spacing={2}>
                    <Grid item sm={6}>
                        <ActiveCard stats={props.statsstate.stats.filteredstats} />
                    </Grid>
                </Grid>
            </Box>
            <br />
            <Typography data-testid="stats-date" variant="h5" align="center"><b>As on: {props.statsstate.stats.apistats["timestamp"]["latest_updated_time"]}</b></Typography>
            <Statstable statsstate={props.statsstate.stats.apistats}/>
            <br />
            <Grid container justify="center" spacing={2}>
                <Grid item md={9}>
                    <PieCard stats={props.statsstate.stats.apistats} />
                </Grid>
            </Grid>
        </>
        )
}

export default Statsdisplay;