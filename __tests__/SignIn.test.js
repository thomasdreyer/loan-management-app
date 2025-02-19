// __tests__/SignIn.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import SignIn from '../src/app/auth/signin/page';

jest.mock('next-auth/react');

describe('SignIn Component', () => {
  it('renders sign-in button', () => {
    render(<SignIn />);
    const button = screen.getByRole('button', { name: /sign in/i });
    expect(button).toBeInTheDocument();
  });

  it('calls signIn function when button is clicked', () => {
    render(<SignIn />);
    const button = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(button);
    expect(signIn).toHaveBeenCalled();
  });
});
