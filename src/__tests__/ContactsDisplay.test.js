import React from 'react';
import { render } from '@testing-library/react';
import ContactsDisplay from '../components/contacts/contactsdisplay.js';

let testingdatacontacts = {
    "India": {
        "comments": null,
        "email": "abc@abc.com",
        "phone": "1234",
        "website": "http://example.com",
        "whatsapp": "1234"
    },
    "State1": {
        "comments": null,
        "email": "abc@abc.com",
        "phone": "1234",
        "website": "http://example.com",
        "whatsapp": null
    },
    "State1": {
        "comments": null,
        "email": null,
        "phone": "1234",
        "website": "http://example.com",
        "whatsapp": null
    }
}

test('Render Contacts - Loading', () => {
  const { getByTestId } = render(<ContactsDisplay contactjson={{loading:true,error:false,messageslist:[]}} />);
  const linkElement = getByTestId("loadingscreen");
});

test('Render Contacts - On Error', () => {
  const { getByTestId } = render(<ContactsDisplay contactjson={{loading:false,error:true,messageslist:[]}} />);
  const linkElement = getByTestId("errorscreen");
});

test('Render Contacts - On Success with data', () => {
  const { getByTestId } = render(<ContactsDisplay contactjson={{loading:false,error:false,messageslist:testingdatacontacts}} />);
  const linkElement = getByTestId("contacts");
});
