import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PredictionForm from './PredictionForm';
import axios from 'axios';

vi.mock('axios');

describe('PredictionForm', () => {
  it('renders all form fields', () => {
    render(<PredictionForm />);
    expect(screen.getByLabelText('Pregnancies')).toBeInTheDocument();
    expect(screen.getByLabelText('Glucose')).toBeInTheDocument();
    expect(screen.getByLabelText('BloodPressure')).toBeInTheDocument();
    expect(screen.getByLabelText('SkinThickness')).toBeInTheDocument();
    expect(screen.getByLabelText('Insulin')).toBeInTheDocument();
    expect(screen.getByLabelText('BMI')).toBeInTheDocument();
    expect(screen.getByLabelText('DiabetesPedigreeFunction')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
  });

  it('shows validation error for empty fields', async () => {
    render(<PredictionForm />);
    
    fireEvent.click(screen.getByText('Predict'));
    
    await waitFor(() => {
      expect(screen.getByText(/is required/)).toBeInTheDocument();
    });
  });

  it('shows prediction result on successful submission', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        prediction: 1,
        probability: 0.75,
        message: 'Diabetes'
      }
    });

    render(<PredictionForm />);
    
    // Fill in all required fields
    const fields = [
      'Pregnancies',
      'Glucose',
      'BloodPressure',
      'SkinThickness',
      'Insulin',
      'BMI',
      'DiabetesPedigreeFunction',
      'Age'
    ];

    fields.forEach(field => {
      fireEvent.change(screen.getByLabelText(field), {
        target: { value: '1' }
      });
    });

    fireEvent.click(screen.getByText('Predict'));

    await waitFor(() => {
      expect(screen.getByText('Result: Diabetes')).toBeInTheDocument();
      expect(screen.getByText('Probability: 75.00%')).toBeInTheDocument();
    });
  });

  it('shows error message on API failure', async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Server error'
        }
      }
    });

    render(<PredictionForm />);
    
    // Fill in all required fields
    const fields = [
      'Pregnancies',
      'Glucose',
      'BloodPressure',
      'SkinThickness',
      'Insulin',
      'BMI',
      'DiabetesPedigreeFunction',
      'Age'
    ];

    fields.forEach(field => {
      fireEvent.change(screen.getByLabelText(field), {
        target: { value: '1' }
      });
    });

    fireEvent.click(screen.getByText('Predict'));

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });
  });
});