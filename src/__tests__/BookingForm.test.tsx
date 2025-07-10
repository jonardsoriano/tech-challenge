import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../app/page';

describe('Booking Form', () => {
  it('renders all form fields', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Licence Plate')).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
  });

  it('shows error if required fields are missing', async () => {
    render(<Home />);
    fireEvent.click(screen.getByRole('button', { name: /book/i }));
    expect(await screen.findByText(/required/i)).toBeInTheDocument();
  });
});
