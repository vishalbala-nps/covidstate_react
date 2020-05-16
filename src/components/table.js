import React from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';

function Statstable(props){
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
                tablelist.push({state,active_cases,cured,deaths,new_cases,new_cured,new_deaths,total})
            }
        }
        return tablelist
    }
    React.useEffect(function() {
        console.log(createstatsrows(props.statsstate))
    },[])
    return (<h1>abc</h1>)
}

export default Statstable;