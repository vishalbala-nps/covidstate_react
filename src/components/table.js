import React from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Container} from '@material-ui/core';

function Statstable(props){
    const [tablejson,settablejson] = React.useState([])
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
                        {tablejson.map((row) => (
                            <TableRow key={row.state} onClick={function() {
                                console.log("Hi")
                            }}>
                                <TableCell component="th" scope="row">
                                    {row.state}
                                </TableCell>
                                <TableCell align="right">{row.active_cases}</TableCell>
                                <TableCell align="right">{row.total}</TableCell>
                                <TableCell align="right">{row.new_cases}</TableCell>
                                <TableCell align="right">{row.deaths}</TableCell>
                                <TableCell align="right">{row.new_deaths}</TableCell>
                                <TableCell align="right">{row.cured}</TableCell>
                                <TableCell align="right">{row.new_cured}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
            </TableContainer>
        </Container>
      </>
    )
}

export default Statstable;



