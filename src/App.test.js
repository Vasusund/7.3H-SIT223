// src/App.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './components/Login';

// Mock all complex/ESM dependencies to prevent parsing errors
jest.mock('@uiw/react-codemirror', () => () => <div>CodeMirror</div>);
jest.mock('@codemirror/lang-javascript', () => ({}));
jest.mock('@codemirror/theme-one-dark', () => ({}));
jest.mock('react-markdown', () => (props) => <div>{props.children}</div>);
jest.mock('react-syntax-highlighter', () => ({
  Prism: (props) => <div>{props.children}</div>,
}));
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

test('renders Login heading', () => {
  render(<Login />);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});

test('renders email and password inputs', () => {
  render(<Login />);
  expect(screen.getByPlaceholderText(/Your email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Your password/i)).toBeInTheDocument();
});

test('login button exists', () => {
  render(<Login />);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});
