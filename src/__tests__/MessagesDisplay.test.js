import React from 'react';
import { render } from '@testing-library/react';
import MessagesDisplay from '../components/messages/messagesdisplay.js';

var testingdatamessages = ["this is a message"]

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