import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AlarmList from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AlarmList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
