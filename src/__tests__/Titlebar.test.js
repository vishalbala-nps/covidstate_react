import React from 'react';
import { render } from '@testing-library/react';
import Titlebar from '../components/titlebar.js';

test('Render Titlebar - Homepage', () => {
    render(<Titlebar type="hometitle" />);
});
  
test('Render Titlebar - Other Screens', () => {
    render(<Titlebar type="backbar" />);
});
