import React from 'react';
import { render } from '@testing-library/react';
import StatePageDisplay from '../components/statepage/statepagedisplay.js';
import testingdatastats from '../apisampledata.js'


test('Render Statewise Statistics - Loading', () => {
    const { getByTestId } = render(<StatePageDisplay stats={{loading:true,error:false,stats:[]}} state="Abc" />);
    const linkElement = getByTestId("loadingscreen");
});
  
test('Render Statewise - On Error', () => {
    const { getByTestId } = render(<StatePageDisplay stats={{loading:false,error:true,stats:[]}} state="Abc" />);
    const linkElement = getByTestId("errorscreen");
});
  
test('Render Statewise - On Success with data', () => {
    const { getByTestId } = render(<StatePageDisplay stats={{loading:false,error:false,stats:testingdatastats}} state="Abc" />);
    const statcard = getByTestId("statestatscard");
});