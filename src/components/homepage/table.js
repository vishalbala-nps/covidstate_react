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
            return [...cstate]
        }
    },[])
    const [sort,setsort] = React.useState({row:"active_cases",order:"desc"})
    let history = useHistory();
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
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
        <div id="stats" data-testid="stats-table">
            <br />
            <Container maxWidth="lg">
                <TextField InputProps={{style:{backgroundColor: "#E8E8E8"}}} style={{width:"100%"}} label="Filter by states" variant="filled" onChange={function(event) {
                    let curlist = createstatsrows(props.statsstate)
                    let searched = curlist.filter(function(state) {
                        return state["state"].includes(capitalizeFirstLetter(event.target.value))
                    })
                    settablejson({
                        type: "SET_SEARCH",
                        payload: searched
                    })
                }}/>
                <br/><br/>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table" className="statstable">
                        <TableHead className="statstabletext">
                            <TableRow>
                                <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("state")}}><b className="statstabletext">State</b></TableSortLabel></TableCell>
                                <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("active_cases")}}><b className="statstabletext">Active Patients</b></TableSortLabel></TableCell>
                                <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("total")}}><b className="statstabletext">Infected People</b></TableSortLabel></TableCell>
                                <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("new_cases")}}><b className="statstabletext">New Patients</b></TableSortLabel></TableCell>
                                <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("deaths")}}><b className="statstabletext">Total Deaths</b></TableSortLabel></TableCell>
                                <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("new_deaths")}}><b className="statstabletext">New Deaths</b></TableSortLabel></TableCell>
                                <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("cured")}}><b className="statstabletext">Cured</b></TableSortLabel></TableCell>
                                <TableCell><TableSortLabel active={true} IconComponent={HeightIcon} onClick={function() {sorttable("new_cured")}}><b className="statstabletext">New Cured</b></TableSortLabel></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="statstabletext">
                            {tablejson.map(function(row) {
                                let retjsx;
                                if (row.state !== "India") {
                                    let new_cases;
                                    let new_cases_bg = "";
                                    let new_cases_text = "white";
                                    let new_deaths;
                                    let new_deaths_bg = "";
                                    let new_deaths_text = "white";
                                    let new_cured;
                                    let new_cured_bg = "";
                                    let new_cured_text = "white";
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
                                        <TableRow hover key={row.state} onClick={function() {
                                            history.push("/state/"+row.state+"/"+props.fromd+"/"+props.tod)
                                        }}>
                                            <TableCell className="statstabletext"  component="th" scope="row">
                                                {row.state}
                                            </TableCell>
                                            <TableCell className="statstabletext" align="right">{row.active_cases}</TableCell>
                                            <TableCell className="statstabletext" align="right">{row.total}</TableCell>
                                            <TableCell align="right" style={{backgroundColor:new_cases_bg,color:new_cases_text}}>{new_cases}</TableCell>
                                            <TableCell className="statstabletext" align="right">{row.deaths}</TableCell>
                                            <TableCell align="right" style={{backgroundColor:new_deaths_bg,color:new_deaths_text}}>{new_deaths}</TableCell>
                                            <TableCell className="statstabletext" align="right">{row.cured}</TableCell>
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
      </div>
    )
}

export default Statstable;



