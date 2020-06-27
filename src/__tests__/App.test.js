import React from 'react';
import { render } from '@testing-library/react';
import StatsDisplay from '../components/homepage/statsdisplay.js';
import StatePageDisplay from '../components/statepage/statepagedisplay.js';
import MessagesDisplay from '../components/messages/messagesdisplay.js';
import Titlebar from '../components/titlebar.js';

var testingdatastats = {
  "data": {
    "03/10":{
      "Andhra Pradesh": {
        "active_cases": 1,
        "cured": 0,
        "deaths": 0,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 1
    },
    "Delhi": {
        "active_cases": 4,
        "cured": 2,
        "deaths": 1,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 7
    },
    "Haryana": {
        "active_cases": 14,
        "cured": 0,
        "deaths": 0,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 14
    },
    "India": {
        "active_cases": 99,
        "cured": 13,
        "deaths": 2,
        "new_cases": 4,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 114
    },
    "Jammu and Kashmir": {
        "active_cases": 3,
        "cured": 0,
        "deaths": 0,
        "new_cases": 1,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 3
    },
    "Karnataka": {
        "active_cases": 5,
        "cured": 0,
        "deaths": 1,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 6
    },
    "Kerala": {
        "active_cases": 20,
        "cured": 3,
        "deaths": 0,
        "new_cases": 1,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 23
    },
    "Ladakh": {
        "active_cases": 4,
        "cured": 0,
        "deaths": 0,
        "new_cases": 1,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 4
    },
    "Maharashtra": {
        "active_cases": 32,
        "cured": 0,
        "deaths": 0,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 32
    },
    "Odisha": {
        "active_cases": 1,
        "cured": 0,
        "deaths": 0,
        "new_cases": 1,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 1
    },
    "Punjab": {
        "active_cases": 1,
        "cured": 0,
        "deaths": 0,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 1
    }
    },
    "03/11":{
      "Andhra Pradesh": {
        "active_cases": 1,
        "cured": 0,
        "deaths": 0,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 1
    },
    "Delhi": {
        "active_cases": 4,
        "cured": 2,
        "deaths": 1,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 7
    },
    "Haryana": {
        "active_cases": 14,
        "cured": 0,
        "deaths": 0,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 14
    },
    "India": {
        "active_cases": 99,
        "cured": 13,
        "deaths": 2,
        "new_cases": 4,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 114
    },
    "Jammu and Kashmir": {
        "active_cases": 3,
        "cured": 0,
        "deaths": 0,
        "new_cases": 1,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 3
    },
    "Karnataka": {
        "active_cases": 5,
        "cured": 0,
        "deaths": 1,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 6
    },
    "Kerala": {
        "active_cases": 20,
        "cured": 3,
        "deaths": 0,
        "new_cases": 1,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 23
    },
    "Ladakh": {
        "active_cases": 4,
        "cured": 0,
        "deaths": 0,
        "new_cases": 1,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 4
    },
    "Maharashtra": {
        "active_cases": 32,
        "cured": 0,
        "deaths": 0,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 32
    },
    "Odisha": {
        "active_cases": 1,
        "cured": 0,
        "deaths": 0,
        "new_cases": 1,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 1
    },
    "Punjab": {
        "active_cases": 1,
        "cured": 0,
        "deaths": 0,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 1
    }
    },
    "03/12":{
      "Andhra Pradesh": {
        "active_cases": 1,
        "cured": 0,
        "deaths": 0,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 1
    },
    "Delhi": {
        "active_cases": 4,
        "cured": 2,
        "deaths": 1,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 7
    },
    "Haryana": {
        "active_cases": 14,
        "cured": 0,
        "deaths": 0,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 14
    },
    "India": {
        "active_cases": 99,
        "cured": 13,
        "deaths": 2,
        "new_cases": 4,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 114
    },
    "Jammu and Kashmir": {
        "active_cases": 3,
        "cured": 0,
        "deaths": 0,
        "new_cases": 1,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 3
    },
    "Karnataka": {
        "active_cases": 5,
        "cured": 0,
        "deaths": 1,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 6
    },
    "Kerala": {
        "active_cases": 20,
        "cured": 3,
        "deaths": 0,
        "new_cases": 1,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 23
    },
    "Ladakh": {
        "active_cases": 4,
        "cured": 0,
        "deaths": 0,
        "new_cases": 1,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 4
    },
    "Maharashtra": {
        "active_cases": 32,
        "cured": 0,
        "deaths": 0,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 32
    },
    "Odisha": {
        "active_cases": 1,
        "cured": 0,
        "deaths": 0,
        "new_cases": 1,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 1
    },
    "Punjab": {
        "active_cases": 1,
        "cured": 0,
        "deaths": 0,
        "new_cases": 0,
        "new_cured": 0,
        "new_deaths": 0,
        "total": 1
    }
    }
  },
  "timestamp": {
    "latest_updated_time": "2020-06-26 09:15 AM",
    "latest_updated_date": "03/12"
}
}

var testingdatamessages = ["this is a message"]

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

test('Render Titlebar - Homepage', () => {
  render(<Titlebar type="hometitle" />);
});

test('Render Titlebar - Other Screens', () => {
  render(<Titlebar type="backbar" />);
});

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
  

test('Render Messages - Loading', () => {
    const { getByText } = render(<MessagesDisplay messagejson={{loading:true,error:false,messageslist:[]}} />);
    const linkElement = getByText("Loading..");
});

test('Render Messages - On Error', () => {
    const { getByText } = render(<MessagesDisplay messagejson={{loading:false,error:true,messageslist:[]}} />);
    const linkElement = getByText("An Error Occured. Please try again soon");
});

test('Render Messages - On Success with data', () => {
    const { getByText } = render(<MessagesDisplay messagejson={{loading:false,error:false,messageslist:testingdatamessages}} />);
    const linkElement = getByText("this is a message");
});

