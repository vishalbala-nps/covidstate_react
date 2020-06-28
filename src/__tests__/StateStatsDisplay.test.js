import React from 'react';
import { render } from '@testing-library/react';
import StatePageDisplay from '../components/statepage/statepagedisplay.js';

var testingdatastatestats = {
    "data": {
        "03/10": {
            "active_cases": 9,
            "cured": 0,
            "deaths": 0,
            "new_cases": 9,
            "new_cured": 0,
            "new_deaths": 0,
            "total": 9
        },
        "03/11": {
            "active_cases": 17,
            "cured": 0,
            "deaths": 0,
            "new_cases": 8,
            "new_cured": 0,
            "new_deaths": 0,
            "total": 17
        },
        "03/12": {
            "active_cases": 17,
            "cured": 0,
            "deaths": 0,
            "new_cases": 0,
            "new_cured": 0,
            "new_deaths": 0,
            "total": 17
        }
    },
    "timestamp": {
        "updated_date": "03/12",
        "updated_time": "2020-06-27 09:20 AM"
    }
}
test('Render Statewise Statistics - Loading', () => {
    const { getByTestId } = render(<StatePageDisplay stats={{loading:true,error:false,stats:[]}} state="Abc" />);
    const linkElement = getByTestId("loadingscreen");
});
  
test('Render Statewise - On Error', () => {
    const { getByTestId } = render(<StatePageDisplay stats={{loading:false,error:true,stats:[]}} state="Abc" />);
    const linkElement = getByTestId("errorscreen");
});
  
test('Render Statewise - On Success with data', () => {
    const { getByTestId } = render(<StatePageDisplay stats={{loading:false,error:false,stats:testingdatastatestats}} state="Abc" />);
    const statcard = getByTestId("statestatscard");
});