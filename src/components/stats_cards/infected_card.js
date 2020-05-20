import React from 'react';
import {AppBar,Card, Typography,CardContent} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Line,Bar } from 'react-chartjs-2';

function InfectedCard(mainprops) {
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
            cdata.push(mainprops.stats["data"][key]["India"]["total"])
            cbdata.push(mainprops.stats["data"][key]["India"]["new_cases"])
        }
        if (props.value === 0){
            chartjsx = (
                <div>
                    <Line data={
                        {
                            datasets: [{
                                label: 'Total Infected',
                                data: cdata,
                                backgroundColor: [
                                    'rgba(255, 255, 255, 0.0)'
                                ],
                                borderColor: [
                                    'rgba(174, 93, 201, 1)'
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
                    }} />
                </div>
            )
        } else if (props.value === 1){
            chartjsx = (
                <div>
                    <Bar data={{
                        datasets: [{
                            label: 'Daily Increase',
                            data: cbdata,
                            backgroundColor: 'rgba(174, 93, 201, 1)',
                            borderColor: 'rgba(174, 93, 201, 1)'
                        }],
                        labels: labels
                    }}  options={{
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
                    <Typography variant="h4" align="center">Infected</Typography>
                    <Typography variant="h5" align="center">{mainprops.stats["data"][tstamp]["India"]["total"]} <small style={{color:"#AE5DC9"}}>(+{mainprops.stats["data"][tstamp]["India"]["new_cases"]})</small></Typography>
                    {chartjsx}
                </CardContent>
            </Card>
        )
        
    }
    
    return (
        <div>
            <AppBar position="static" elevation={0}>
                <Tabs value={tabvalue} onChange={handleChange} aria-label="simple tabs example" style={{backgroundColor:"#AE5DC9"}}>
                    <Tab label="Cumulative"/>
                    <Tab label="Daily"/>
                </Tabs>
            </AppBar>
            <TabPanel value={tabvalue} />
        </div>
    )
}

export default InfectedCard;