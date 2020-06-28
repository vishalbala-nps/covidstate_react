import React from 'react';
import { render } from '@testing-library/react';
import FAQDisplay from '../components/faq/faqdisplay.js';

let testingdatafaq = [{"question":"q1","answer":"a1"},{"question":"q2","answer":"a2"}]

test('Render FAQs - Loading', () => {
  const { getByTestId } = render(<FAQDisplay faqjson={{loading:true,error:false,faqlist:[]}} />);
  const linkElement = getByTestId("loadingscreen");
});

test('Render FAQs - On Error', () => {
  const { getByTestId } = render(<FAQDisplay faqjson={{loading:false,error:true,faqlist:[]}} />);
  const linkElement = getByTestId("errorscreen");
});

test('Render FAQs - On Success with data', () => {
  const { getByTestId } = render(<FAQDisplay faqjson={{loading:false,error:false,faqlist:testingdatafaq}} />);
  const linkElement = getByTestId("faqs");
});
