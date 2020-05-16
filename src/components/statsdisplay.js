import React from 'react';
import Statstable from './table.js'
import {CircularProgress,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';

function Statsdisplay(props){
    if (props.statsstate.loading == true) {
        return (<CircularProgress />)
    } else {
        if (props.statsstate.error == true) {
            return (<h1>Error</h1>)
        } else {
            return (<Statstable statsstate={props.statsstate.stats}/>)
        }
    }
}

export default Statsdisplay;