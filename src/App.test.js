// src/App.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

// Mock Firebase auth
jest.mock('./firebase', () => ({
  auth: {
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { email: 'test@example.com' } })),
    signOut: jest.fn(() => Promise.resolve()),
  },
}));

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// --- App Component ---
test('renders App without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // Check for an element that exists in your App
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});

// --- Login Component ---
describe('Login Component', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(navigate);
  });

  test('renders Login heading', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('renders email and password inputs', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/Your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your password/i)).toBeInTheDocument();
  });

  test('shows error on invalid login', async () => {
    auth.signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid credentials'));
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Your email/i), { target: { value: 'wrong@test.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Your password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByText(/Login/i));

    const errorMessage = await screen.findByText(/Invalid email or password!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('calls navigate on successful login', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Your email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Your password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/Login/i));

    await new Promise(process.nextTick);

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
