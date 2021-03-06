import React from 'react';
import {AppBar,Card,CardContent, Typography} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Line } from 'react-chartjs-2';

function ActiveCard(mainprops) {
    const [tabvalue, settabvalue] = React.useState(0);
    function handleChange(event, newValue) {
        settabvalue(newValue);
    }
    function TabPanel(props) {
        let tstamp = mainprops.stats["timestamp"]["latest_updated_date"];
        let chartjsx;
        let labels = [];
        let cdata= [];
        for (let key in mainprops.stats["data"] ) {
            labels.push(key)
            cdata.push(mainprops.stats["data"][key]["India"]["active_cases"])
        }
        if (props.value === 0){
            chartjsx = (
                <div>
                    <Line data={
                        {
                            datasets: [{
                                label: 'Active Patients',
                                data: cdata,
                                backgroundColor: [
                                    'rgba(255, 255, 255, 0.0)'
                                ],
                                borderColor: [
                                    'rgba(255, 187, 51, 1)'
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
        } 
        return (
            <Card className="cardchart">
                <CardContent>
                    <Typography variant="h4" align="center">Active Patients</Typography>
                    <Typography variant="h5" align="center">{mainprops.stats["data"][tstamp]["India"]["active_cases"]}</Typography>
                    {chartjsx}
                </CardContent>
            </Card>
        )
        
    }
    
    return (
        <div className="activecard">
            <AppBar position="static" elevation={0}>
                <Tabs value={tabvalue} onChange={handleChange} aria-label="simple tabs example" className="activecardtab">
                    <Tab label="Active Patients"/>
                </Tabs>
            </AppBar>
            <TabPanel value={tabvalue} />
        </div>
    )
}

export default ActiveCard;