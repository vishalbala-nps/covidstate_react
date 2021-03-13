import React from 'react';
import Statstable from './table.js'
import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider,DatePicker } from '@material-ui/pickers';
import InfectedCard from './stats_cards/infected_card.js'
import DeathCard from './stats_cards/deaths_card.js'
import CuredCard from './stats_cards/cured_card.js'
import ActiveCard from './stats_cards/active_card.js'
import PieCard from './stats_cards/pie_card.js'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import Box from '@material-ui/core/Box';
import MomentUtils from '@date-io/moment';
import moment from "moment";

let fromDate = moment("10/Mar/2020","DD/MMM/yyyy");
let toDate = moment()

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
        React.useEffect(function() {
            fromDate = moment("10/Mar/2020","DD/MMM/yyyy")
            toDate = moment(moment(props.statsstate.stats.apistats.timestamp.latest_updated_date,"mm/DD/yyyy").format("DD/mm/yyyy"))
        },[])
        const [fromselectedDate,setfromselectedDate] = React.useState(fromDate)
        const [toselectedDate,settoselectedDate] = React.useState(toDate)
        let firstmount = React.useRef(true)
        let sdate = React.useRef({from:fromselectedDate,to:toselectedDate})
        React.useEffect(function() {
            if (firstmount.current) {
                firstmount.current = false
            } else {
                betweenDate(sdate.current.from,sdate.current.to)
            }
        },[fromselectedDate,toselectedDate])
        return (
            <Box m={1}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item>
                            <DatePicker
                                variant="inline"
                                disableToolbar
                                format="DD/MMM/yyyy"
                                margin="normal"
                                label="From"
                                minDate={moment("10/Mar/2020","DD/MMM/yyyy")}
                                InputProps={{ readOnly: true }}
                                value={fromselectedDate}
                                onChange={function(d) {
                                    if (d.valueOf() < toselectedDate.valueOf()) {
                                        if (d.format("DD/MMM/yyyy") !== toselectedDate.format("DD/MMM/yyyy")) {
                                            fromDate = d
                                            sdate.current.from = d
                                            setfromselectedDate(d)
                                        }
                                    }
                                }}/>
                        </Grid>
                        <Grid item>
                            <DatePicker
                                variant="inline"
                                disableToolbar
                                format="DD/MMM/yyyy"
                                margin="normal"
                                label="To"
                                maxDate={moment(moment(props.statsstate.stats.apistats.timestamp.latest_updated_date,"mm/DD/yyyy").format("DD/mm/yyyy"))}
                                InputProps={{ readOnly: true }}
                                value={toselectedDate}
                                onChange={function(d) {
                                    console.log(d.format("DD/MMM/yyyy"))
                                    console.log(fromselectedDate.format("DD/MMM/yyyy"))
                                    if (d.valueOf() > fromselectedDate.valueOf()) {
                                        if (d.format("DD/MMM/yyyy") !== fromselectedDate.format("DD/MMM/yyyy")) {
                                            toDate = d
                                            sdate.current.to = d
                                            settoselectedDate(d)
                                        }
                                    }
                                }}/>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={function() {
                                resetDate()
                            }}><RefreshIcon /></IconButton>
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
            </Box>
        )
    }
    return (
        <>
            <br />
            <DatePickers cback={function() {
                console.log("h")
            }} />
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
            <Statstable statsstate={props.statsstate.stats.apistats} fromd={fromDate.format("DD-MMM-yyyy")} tod={toDate.format("DD-MMM-yyyy")}/>
            <br />
            <Grid container justify="center">
                <Grid item md={9}>
                    <PieCard align="center" stats={props.statsstate.stats.apistats} />
                </Grid>
            </Grid>
        </>
        )
}

export default Statsdisplay;