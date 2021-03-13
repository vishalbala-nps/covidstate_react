import React from 'react';
import { render } from '@testing-library/react';
import StatsDisplay from '../components/homepage/statsdisplay.js';
import testingdatastats from '../apisampledata.js'

test('Render Statistics - Loading', () => {
  const { getByTestId } = render(<StatsDisplay statsstate={{loading:true,error:false,stats:[]}} />);
  const linkElement = getByTestId("loadingscreen");
});

test('Render Statistics - On Error', () => {
  const { getByTestId } = render(<StatsDisplay statsstate={{loading:false,error:true,stats:[]}} />);
  const linkElement = getByTestId("errorscreen");
});

test('Render Statistics - On Success with data', () => {
  const { getByTestId } = render(<StatsDisplay statsstate={{loading:false,error:false,stats:testingdatastats}} />);
  const statcard = getByTestId("stat-cards");
  const statcardm = getByTestId("stat-cards-more");
  const statcardtable = getByTestId("stats-table");
  const statsdate = getByTestId("stats-date");
});

