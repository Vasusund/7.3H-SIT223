// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock react-codemirror and codemirror packages
jest.mock('@uiw/react-codemirror', () => () => <div>CodeMirror</div>);
jest.mock('@codemirror/lang-javascript', () => ({}));
jest.mock('@codemirror/theme-one-dark', () => ({}));
jest.mock('react-markdown', () => (props) => <div>{props.children}</div>);

// Simple test
test('renders header bar', () => {
  render(<App />);
  const header = screen.getByText(/Newsletter/i); // pick any text that always renders
  expect(header).toBeInTheDocument();
});
