import React from 'react';
import {AppBar,Card, Typography,CardContent} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Pie } from 'react-chartjs-2';
import "chartjs-plugin-labels";

const statecolors = {
    "Arunachal Pradesh":"#808080",
    "Mizoram":"#808080",
    "Jharkhand":"#808080",
    "Manipur":"#808080",
    "Odisha":"#808080",
    "Puducherry":"#808080",
    "Himachal Pradesh":"#808080",
    "Goa":"#808080",
    "Chhattisgarh":"#808080",
    "Andaman and Nicobar Islands":"#808080",
    "Ladakh":"#808080",
    "Uttarakhand":"#7cb342",
    "Chandigarh":"#46BFBD",
    "Assam":"#FDB45C",
    "Bihar":"#949FB1",
    "Haryana":"#4D5360",
    "Punjab":"#d5429b",
    "West Bengal":"#6f52b8",
    "Jammu and Kashmir":"#1c7cd5",
    "Madhya Pradesh":"#56b9f7",
    "Gujarat":"#0ae8eb",
    "Karnataka":"#FF8800",
    "Telengana":"#ffab00",
    "Andhra Pradesh":"#0099CC",
    "Uttar Pradesh":"#2BBBAD",
    "Rajasthan":"#3f51b5",
    "Kerala":"#c0ca33",
    "Tamil Nadu":"#fdd835",
    "Delhi":"#007E33",
    "Maharashtra":"#F7464A",
    "Others":"#808080"
};

function PieCard(mainprops) {
    const [tabvalue, settabvalue] = React.useState(0);
    function handleChange(event, newValue) {
        settabvalue(newValue);
    }
    function TabPanel(props) {
        let tstamp = mainprops.stats["timestamp"]["latest_updated_date"];
        let chartjsx;
        let ipievals = [];
        let cpievals = [];
        let dpievals = [];
        let apievals = [];
        console.log(mainprops.stats["data"])
        for (let key in mainprops.stats["data"][tstamp] ) {
            ipievals.push({"state": key,"data":mainprops.stats["data"][tstamp][key]["total"]})
            cpievals.push({"state": key,"data":mainprops.stats["data"][tstamp][key]["cured"]})
            dpievals.push({"state": key,"data":mainprops.stats["data"][tstamp][key]["deaths"]})
            apievals.push({"state": key,"data":mainprops.stats["data"][tstamp][key]["active_cases"]})
        }
        ipievals.sort(function(a,b) {
            return b["data"] - a["data"];
        });
        cpievals.sort(function(a,b) {
            return b["data"] - a["data"];
        });
        dpievals.sort(function(a,b) {
            return b["data"] - a["data"];
        });
        apievals.sort(function(a,b) {
            return b["data"] - a["data"];
        });

        if (props.value === 0){
            let pietotal = apievals[1]["data"]+apievals[2]["data"]+apievals[3]["data"]+apievals[4]["data"]+apievals[5]["data"]+apievals[6]["data"]+apievals[7]["data"]+apievals[8]["data"]+apievals[9]["data"]
            let piearr = [apievals[1]["data"],apievals[2]["data"],apievals[3]["data"],apievals[4]["data"],apievals[5]["data"],apievals[6]["data"],apievals[7]["data"],apievals[8]["data"],apievals[9]["data"],apievals[0]["data"]-pietotal]
            let colors = [statecolors[apievals[1]["state"]],statecolors[apievals[2]["state"]],statecolors[apievals[3]["state"]],statecolors[apievals[4]["state"]],statecolors[apievals[5]["state"]],statecolors[apievals[6]["state"]],statecolors[apievals[7]["state"]],statecolors[apievals[8]["state"]],statecolors[apievals[9]["state"]],statecolors["Others"]]
            let labels = [apievals[1]["state"],apievals[2]["state"],apievals[3]["state"],apievals[4]["state"],apievals[5]["state"],apievals[6]["state"],apievals[7]["state"],apievals[8]["state"],apievals[9]["state"],"Others"]
            chartjsx = (
                <div>
                    <Pie data={{datasets:[
                        {
                            data: piearr,
                            backgroundColor: colors
                        }
                    ],
                    labels: labels
                }} options={{
                            plugins: {
                                labels: {
                                    fontColor: '#fff'
                                }
                            },
                            legend: {
                                display: false,
                                overlap: false
                            }
                    }}/>
                </div>
            )
        } else if (props.value === 1){
            let pietotal = ipievals[1]["data"]+ipievals[2]["data"]+ipievals[3]["data"]+ipievals[4]["data"]+ipievals[5]["data"]+ipievals[6]["data"]+ipievals[7]["data"]+ipievals[8]["data"]+ipievals[9]["data"]
            let piearr = [ipievals[1]["data"],ipievals[2]["data"],ipievals[3]["data"],ipievals[4]["data"],ipievals[5]["data"],ipievals[6]["data"],ipievals[7]["data"],ipievals[8]["data"],ipievals[9]["data"],ipievals[0]["data"]-pietotal]
            let colors = [statecolors[ipievals[1]["state"]],statecolors[ipievals[2]["state"]],statecolors[ipievals[3]["state"]],statecolors[ipievals[4]["state"]],statecolors[ipievals[5]["state"]],statecolors[ipievals[6]["state"]],statecolors[ipievals[7]["state"]],statecolors[ipievals[8]["state"]],statecolors[ipievals[9]["state"]],statecolors["Others"]]
            let labels = [ipievals[1]["state"],ipievals[2]["state"],ipievals[3]["state"],ipievals[4]["state"],ipievals[5]["state"],ipievals[6]["state"],ipievals[7]["state"],ipievals[8]["state"],ipievals[9]["state"],"Others"]
            console.log(labels)
            chartjsx = (
                <div>
                    <Pie data={{datasets:[
                        {
                            data: piearr,
                            backgroundColor: colors
                        }
                    ],
                    labels: labels
                }} options={{
                            plugins: {
                                labels: {
                                    fontColor: '#fff'
                                }
                            },
                            legend: {
                                display: false,
                                overlap: false
                            }
                    }}/>
                </div>
            )
        } else if (props.value === 2){
            let pietotal = dpievals[1]["data"]+dpievals[2]["data"]+dpievals[3]["data"]+dpievals[4]["data"]+dpievals[5]["data"]+dpievals[6]["data"]+dpievals[7]["data"]+dpievals[8]["data"]+dpievals[9]["data"]
            let piearr = [dpievals[1]["data"],dpievals[2]["data"],dpievals[3]["data"],dpievals[4]["data"],dpievals[5]["data"],dpievals[6]["data"],dpievals[7]["data"],dpievals[8]["data"],dpievals[9]["data"],dpievals[0]["data"]-pietotal]
            let colors = [statecolors[dpievals[1]["state"]],statecolors[dpievals[2]["state"]],statecolors[dpievals[3]["state"]],statecolors[dpievals[4]["state"]],statecolors[dpievals[5]["state"]],statecolors[dpievals[6]["state"]],statecolors[dpievals[7]["state"]],statecolors[dpievals[8]["state"]],statecolors[dpievals[9]["state"]],statecolors["Others"]]
            let labels = [dpievals[1]["state"],dpievals[2]["state"],dpievals[3]["state"],dpievals[4]["state"],dpievals[5]["state"],dpievals[6]["state"],dpievals[7]["state"],dpievals[8]["state"],dpievals[9]["state"],"Others"]
            console.log(labels)
            chartjsx = (
                <div>
                    <Pie data={{datasets:[
                        {
                            data: piearr,
                            backgroundColor: colors
                        }
                    ],
                    labels: labels
                }} options={{
                            plugins: {
                                labels: {
                                    fontColor: '#fff'
                                }
                            },
                            legend: {
                                display: false,
                                overlap: false
                            }
                    }}/>
                </div>
            )
        } else if (props.value === 3){
            let pietotal = cpievals[1]["data"]+cpievals[2]["data"]+cpievals[3]["data"]+cpievals[4]["data"]+cpievals[5]["data"]+cpievals[6]["data"]+cpievals[7]["data"]+cpievals[8]["data"]+cpievals[9]["data"]
            let piearr = [cpievals[1]["data"],cpievals[2]["data"],cpievals[3]["data"],cpievals[4]["data"],cpievals[5]["data"],cpievals[6]["data"],cpievals[7]["data"],cpievals[8]["data"],cpievals[9]["data"],cpievals[0]["data"]-pietotal]
            let colors = [statecolors[cpievals[1]["state"]],statecolors[cpievals[2]["state"]],statecolors[cpievals[3]["state"]],statecolors[cpievals[4]["state"]],statecolors[cpievals[5]["state"]],statecolors[cpievals[6]["state"]],statecolors[cpievals[7]["state"]],statecolors[cpievals[8]["state"]],statecolors[cpievals[9]["state"]],statecolors["Others"]]
            let labels = [cpievals[1]["state"],cpievals[2]["state"],cpievals[3]["state"],cpievals[4]["state"],cpievals[5]["state"],cpievals[6]["state"],cpievals[7]["state"],cpievals[8]["state"],cpievals[9]["state"],"Others"]
            console.log(labels)
            chartjsx = (
                <div>
                    <Pie data={{datasets:[
                        {
                            data: piearr,
                            backgroundColor: colors
                        }
                    ],
                    labels: labels
                }} options={{
                            plugins: {
                                labels: {
                                    fontColor: '#fff'
                                }
                            },
                            legend: {
                                display: false,
                                overlap: false
                            }
                    }}/>
                </div>
            )
        }
        return (
            <Card className="cardchart">
                <CardContent>
                    <Typography variant="h5" align="center">Statewise Pie Charts</Typography>
                    {chartjsx}
                    <br />
                    <br />
                </CardContent>
            </Card>
        )
        
    }
    
    return (
        <div className="piecard">
            <AppBar position="static" elevation={0}>
                <Tabs variant="scrollable" scrollButtons="auto" value={tabvalue} onChange={handleChange} aria-label="simple tabs example" className="piecardtab">
                    <Tab label="Active"/>
                    <Tab label="Infected"/>
                    <Tab label="Deaths"/>
                    <Tab label="Cured"/>
                </Tabs>
            </AppBar>
            <TabPanel value={tabvalue} />
        </div>
    )
}

export default PieCard;