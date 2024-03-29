import React from 'react';
import ActiveCard from './state_cards/active_card.js'
import CuredCard from './state_cards/cured_card.js'
import DeathsCard from './state_cards/deaths_card.js'
import InfectedCard from './state_cards/infected_card.js'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LoadingScreen from '../loading_screen.js'
import ErrorScreen from '../onerror.js'
import DateAdapter from '@mui/lab/AdapterMoment';
import DatePicker from '@mui/lab/DatePicker';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import moment from "moment";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
function StatePageDisplay(props) {
  let stats = props.stats
  let state = props.state
  let fromd = props.fromd
  let tod = props.tod
  const minDate = props.stats.min_date
  let resjsx;
  const [fromselectedDate,setfromselectedDate] = React.useState(fromd)
  const [toselectedDate,settoselectedDate] = React.useState(tod)
  let maxd = React.useRef()
  let firstdataload = React.useRef(false)
  let sdate = React.useRef({from:fromselectedDate,to:toselectedDate})
  let firstmount = React.useRef(true)
  //Functions
  function betweenDate(fromdate,todate) {
    let apid = {...stats.initdata.data}
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
    console.log({type:"DATA_UPDATE",payload:{data:apid,timestamp:{updated_date:moment.utc(Math.max(...tstamps)).local().format("DD/MM/YY")}}})
    props.setstats({type:"DATA_UPDATE",payload:{data:apid,timestamp:{updated_date:moment.utc(Math.max(...tstamps)).local().format("DD/MM/YY")}}})
  }
  function RenderMinDateMsg() {
    const d = moment(minDate,"DD/MMM/yyyy").format("DD MMM")
    if (d === "10 Mar") {
      return null
    } else {
      return <p style={{fontSize:10}}>{"Data before "+d+" unavailable"}</p>
    }
  }
  //Effects
  React.useEffect(function() {
    if (firstmount.current) {
        firstmount.current = false
    } else {
        betweenDate(sdate.current.from,sdate.current.to)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fromselectedDate,toselectedDate])
  if (stats.loading === true) {
    resjsx = (<LoadingScreen />)
  } else if (stats.loading === false) {
    if (stats.error === true) {
      resjsx = (<ErrorScreen />)
    } else {
      if (firstdataload.current === false) {
        maxd.current = props.stats.stats.timestamp.updated_date
        firstdataload.current = true
      } 
      resjsx = (
        <>
          <Box m={1} data-testid="statestatscard">
          <LocalizationProvider dateAdapter={DateAdapter}>
            <br />
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <DatePicker
                    label="From"
                    format="DD/MMM/yyyy"
                    error={false}
                    InputProps={{ readOnly: true }}
                    value={fromselectedDate}
                    className="datepicker"
                    onChange={function(d) {
                      if (d.valueOf() < toselectedDate.valueOf()) {
                        if (d.format("DD/MMM/yyyy") !== toselectedDate.format("DD/MMM/yyyy")) {
                          fromd = d
                          sdate.current.from = d
                          setfromselectedDate(d)
                        }
                      }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <RenderMinDateMsg />
              </Grid>
              <Grid item>
                <DatePicker
                    label="To"
                    format="DD/MMM/yyyy"
                    autoOk={true}
                    maxDate={moment(moment(props.stats.last_upd_time_server,"mm/DD/yyyy").format("DD/mm/yyyy"))}
                    InputProps={{ readOnly: true }}
                    value={toselectedDate}
                    className="datepicker"
                    onChange={function(d) {
                      if (d.valueOf() > fromselectedDate.valueOf()) {
                        if (d.format("DD/MMM/yyyy") !== fromselectedDate.format("DD/MMM/yyyy")) {
                          tod = d
                          sdate.current.to = d
                          settoselectedDate(d)
                        }
                      }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item>
                <IconButton className="datepickericon" onClick={function() {
                  props.setstats({type:"DATA_LOADED",payload:props.stats.initdata})
                }}><RefreshIcon /></IconButton>
              </Grid>
            </Grid>
            </LocalizationProvider>
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