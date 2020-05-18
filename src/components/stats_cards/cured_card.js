import React from 'react';
import {AppBar,Card,CardActions,CardContent, Typography} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Line,Bar } from 'react-chartjs-2';

function CuredCard(mainprops) {
    const [tabvalue, settabvalue] = React.useState(0);
    function handleChange(event, newValue) {
        settabvalue(newValue);
    }
    function TabPanel(props) {
        let tstamp = mainprops.stats["timestamp"]["latest_updated_date"];
        let chartjsx;
        let labels = [];
        let cdata= [];
        let cbdata= [];
        for (let key in mainprops.stats["data"] ) {
            labels.push(key)
            cdata.push(mainprops.stats["data"][key]["India"]["cured"])
            cbdata.push(mainprops.stats["data"][key]["India"]["new_cured"])
        }
        if (props.value == 0){
            chartjsx = (
                <div>
                    <Line data={
                        {
                            datasets: [{
                                label: 'Total Cured',
                                data: cdata,
                                backgroundColor: [
                                    'rgba(255, 255, 255, 0.0)'
                                ],
                                borderColor: [
                                    'rgba(0, 203, 88, 1)'
                                ],
                                borderWidth: 2
                            }],
                            labels: labels
                        }
                    } options={{
                        scales:{
                            yAxes: [{
                                ticks: {
                                    maxTicksLimit: 6
                                },
                            }]
                        }
                    }}/>
                </div>
            )
        } else if (props.value == 1){
            chartjsx = (
                <div>
                    <Bar data={{
                        datasets: [{
                            label: 'Daily Increase',
                            data: cbdata,
                            backgroundColor: 'rgba(0, 203, 88, 1)',
                            borderColor: 'rgba(0, 203, 88, 1)'
                        }],
                        labels: labels
                    }} options={{
                        plugins: {
                            labels: false
                        }
                    }}/>
                </div>
            )
        }
        return (
            <Card>
                <CardContent>
                    <Typography variant="h4" align="center">Cured</Typography>
                    <Typography variant="h5" align="center">{mainprops.stats["data"][tstamp]["India"]["cured"]} <small style={{color:"#00CB58"}}>(+{mainprops.stats["data"][tstamp]["India"]["new_cured"]})</small></Typography>
                    {chartjsx}
                </CardContent>
            </Card>
        )
        
    }
    
    return (
        <div>
            <AppBar position="static" elevation={0}>
                <Tabs value={tabvalue} onChange={handleChange} aria-label="simple tabs example" style={{backgroundColor:"#00CB58"}}>
                    <Tab label="Cumulative"/>
                    <Tab label="Daily"/>
                </Tabs>
            </AppBar>
            <TabPanel value={tabvalue} />
        </div>
    )
}

export default CuredCard;