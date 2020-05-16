import React from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Container} from '@material-ui/core';
import { useHistory } from "react-router-dom";

function Statstable(props){
    const [tablejson,settablejson] = React.useState([])
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
        return tablelist
    }
    React.useEffect(function() {
        settablejson(createstatsrows(props.statsstate))
    },[])
    return (
        <>
            <br />
            <Container maxWidth="lg">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                    <TableHead style={{backgroundColor:"black"}}>
                        <TableRow>
                            <TableCell style={{color:"white"}}>State</TableCell>
                            <TableCell style={{color:"white"}} align="right">Active Patients</TableCell>
                            <TableCell style={{color:"white"}} align="right">Infected People </TableCell>
                            <TableCell style={{color:"white"}} align="right">New Patients</TableCell>
                            <TableCell style={{color:"white"}} align="right">Total Deaths</TableCell>
                            <TableCell style={{color:"white"}} align="right">New Deaths</TableCell>
                            <TableCell style={{color:"white"}} align="right">Cured</TableCell>
                            <TableCell style={{color:"white"}} align="right">New Cured</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {tablejson.map(function(row) {
                                if (row.state != "India") {
                                    let new_cases;
                                    let new_cases_bg = "white";
                                    let new_cases_text = "black";
                                    let new_deaths;
                                    let new_deaths_bg = "white";
                                    let new_deaths_text = "black";
                                    let new_cured;
                                    let new_cured_bg = "white";
                                    let new_cured_text = "black";
                                    if (row.new_cases != 0) {
                                        new_cases="+"+row.new_cases
                                        new_cases_bg = "purple"
                                        new_cases_text="white"
                                    }
                                    if (row.new_deaths != 0) {
                                        new_deaths="+"+row.new_deaths
                                        new_deaths_bg="red"
                                        new_deaths_text="white"
                                    }
                                    if (row.new_cured != 0) {
                                        new_cured="+"+row.new_cured
                                        new_cured_bg="green"
                                        new_cured_text="white"
                                    }
                                    return (
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
                            })}
                        </TableBody>
                    </Table>
            </TableContainer>
        </Container>
      </>
    )
}

export default Statstable;



