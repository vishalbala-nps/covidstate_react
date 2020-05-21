import React from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Container,TextField,TableSortLabel} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import sortarray from 'sort-array'
import HeightIcon from '@material-ui/icons/Height';
function Statstable(props){
    const [tablejson,settablejson] = React.useReducer(function(state,action) {
        if (action.type === "ADD_TO_TABLE") {
            return createstatsrows(props.statsstate)
        } else if (action.type === "SET_SEARCH") {
            return action.payload
        } else if (action.type === "SORT_DATA") {
            let cstate = []
            cstate = sortarray(state,{
                by: action.payload.key,
                order: action.payload.order
            })
            console.log(cstate)
            return [...cstate]
        }
    },[])
    const [sort,setsort] = React.useState({row:"active_cases",order:"desc"})
    let history = useHistory();
    function createstatsrows(statsjson) {
        let tstamp = statsjson["timestamp"]
        let statslist = statsjson["data"][tstamp["latest_updated_date"]]
        let tablelist = [];
        for (let key in statslist) {
            if (statslist.hasOwnProperty(key)) {
                let state = key
                let active_cases = statslist[key]["active_cases"]
                let cured = statslist[key]["cured"]
                let deaths = statslist[key]["deaths"]
                let new_cases = statslist[key]["new_cases"]
                let new_cured = statslist[key]["new_cured"]
                let new_deaths = statslist[key]["new_deaths"]
                let total = statslist[key]["total"]
                tablelist.push({state,active_cases,total,new_cases,deaths,new_deaths,cured,new_cured})
            }
        }
        sortarray(tablelist,{
            by: "active_cases",
            order: "desc"
        })
        return tablelist
    }
    function sorttable(row) {
        if (sort.row === row) {
            console.log("in if")
            if (sort.order === "desc") {
                settablejson({
                    type: "SORT_DATA",
                    payload: {
                        key: row,
                        order: "asc"
                    }
                })
                setsort({row:row,order:"asc"})
            } else {
                settablejson({
                    type: "SORT_DATA",
                    payload: {
                        key: row,
                        order: "desc"
                    }
                })
                setsort({row:row,order:"desc"})
            }
        } else {
            setsort({row:row,order:"desc"})
            settablejson({
                type: "SORT_DATA",
                payload: {
                    key: row,
                    order: "desc"
                }
            })  
        }
    }

    React.useEffect(function() {
        settablejson({
            type: "ADD_TO_TABLE"
        })
    },[])
    return (
        <>
            <br />
            <Container maxWidth="lg">
                <TextField label="Filter by states" variant="filled" style={{width:"100%"}} onChange={function(event) {
                    let curlist = createstatsrows(props.statsstate)
                    let searched = curlist.filter(function(state) {
                        return state["state"].includes(event.target.value)
                    })
                    settablejson({
                        type: "SET_SEARCH",
                        payload: searched
                    })
                }}/>
                <br/><br/>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("state")}}><b>State</b></TableSortLabel></TableCell>
                            <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("active_cases")}}><b>Active Patients</b></TableSortLabel></TableCell>
                            <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("total")}}><b>Infected People</b></TableSortLabel></TableCell>
                            <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("new_cases")}}><b>New Patients</b></TableSortLabel></TableCell>
                            <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("deaths")}}><b>Total Deaths</b></TableSortLabel></TableCell>
                            <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("new_deaths")}}><b>New Deaths</b></TableSortLabel></TableCell>
                            <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("cured")}}><b>Cured</b></TableSortLabel></TableCell>
                            <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("new_cured")}}><b>New Cured</b></TableSortLabel></TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {tablejson.map(function(row) {
                                let retjsx;
                                if (row.state !== "India") {
                                    let new_cases;
                                    let new_cases_bg = "white";
                                    let new_cases_text = "black";
                                    let new_deaths;
                                    let new_deaths_bg = "white";
                                    let new_deaths_text = "black";
                                    let new_cured;
                                    let new_cured_bg = "white";
                                    let new_cured_text = "black";
                                    if (row.new_cases !== 0) {
                                        new_cases="+"+row.new_cases
                                        new_cases_bg = "purple"
                                        new_cases_text="white"
                                    }
                                    if (row.new_deaths !== 0) {
                                        new_deaths="+"+row.new_deaths
                                        new_deaths_bg="red"
                                        new_deaths_text="white"
                                    }
                                    if (row.new_cured !== 0) {
                                        new_cured="+"+row.new_cured
                                        new_cured_bg="green"
                                        new_cured_text="white"
                                    }
                                    retjsx = (
                                        <TableRow key={row.state} onClick={function() {
                                            history.push("/state/"+row.state)
                                        }}>
                                            <TableCell component="th" scope="row">
                                                {row.state}
                                            </TableCell>
                                            <TableCell align="right">{row.active_cases}</TableCell>
                                            <TableCell align="right">{row.total}</TableCell>
                                            <TableCell align="right" style={{backgroundColor:new_cases_bg,color:new_cases_text}}>{new_cases}</TableCell>
                                            <TableCell align="right">{row.deaths}</TableCell>
                                            <TableCell align="right" style={{backgroundColor:new_deaths_bg,color:new_deaths_text}}>{new_deaths}</TableCell>
                                            <TableCell align="right">{row.cured}</TableCell>
                                            <TableCell align="right" style={{backgroundColor:new_cured_bg,color:new_cured_text}}>{new_cured}</TableCell>
                                        </TableRow>
                                    )
                                }
                                return retjsx
                            })}
                        </TableBody>
                    </Table>
            </TableContainer>
        </Container>
      </>
    )
}

export default Statstable;



