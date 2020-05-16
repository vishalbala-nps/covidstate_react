import React from 'react';
import {AppBar,Card,CardActions,CardContent, Typography} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Line } from 'react-chartjs-2';

function DeathCard(mainprops) {
    const [tabvalue, settabvalue] = React.useState(0);
    function handleChange(event, newValue) {
        settabvalue(newValue);
    }
    function TabPanel(props) {
        let tstamp = mainprops.stats["timestamp"]["latest_updated_date"];
        let chartjsx;
        if (props.value == 0){
            let labels = [];
            let cdata= [];
            for (let key in mainprops.stats["data"] ) {
                labels.push(key)
                cdata.push(mainprops.stats["data"][key]["India"]["deaths"])
            }
            chartjsx = (
                <div>
                    <Line data={
                        {
                            datasets: [{
                                label: 'Total Deaths',
                                data: cdata,
                                backgroundColor: [
                                    'rgba(255, 255, 255, 0.0)'
                                ],
                                borderColor: [
                                    'rgba(254, 30, 31, 1)'
                                ],
                                borderWidth: 2
                            }],
                            labels: labels
                        }
                    } options={{
                        responsive: true
                    }}/>
                </div>
            )
        } else if (props.value == 1){
            chartjsx = <p>Insert daily chart</p>
        }
        return (
            <Card>
                <CardContent>
                    <Typography variant="h4" align="center">Deaths</Typography>
                    <Typography variant="h5" align="center">{mainprops.stats["data"][tstamp]["India"]["deaths"]} (+{mainprops.stats["data"][tstamp]["India"]["new_deaths"]})</Typography>
                    {chartjsx}
                </CardContent>
            </Card>
        )
        
    }
    
    return (
        <div>
            <AppBar position="static" elevation={0}>
                <Tabs value={tabvalue} onChange={handleChange} aria-label="simple tabs example" style={{backgroundColor:"#FD2D2D"}}>
                    <Tab label="Cumulative"/>
                    <Tab label="Daily"/>
                </Tabs>
            </AppBar>
            <TabPanel value={tabvalue} />
        </div>
    )
}

export default DeathCard;