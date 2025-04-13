import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateInputs = () => {
    const errors = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (value === '') {
        errors.push(`${key} is required`);
      } else if (isNaN(value) || value < 0) {
        errors.push(`${key} must be a positive number`);
      }
    });
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const validationErrors = validateInputs();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/predict`, formData);
      setPrediction(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while making the prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Diabetes Prediction
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {Object.keys(formData).map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field}
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name={field}
                    id={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                    step="any"
                  />
                </div>
              </div>
            ))}

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {loading ? 'Processing...' : 'Predict'}
              </button>
            </div>
          </form>

          {prediction && !error && (
            <div className="mt-6">
              <div className={`rounded-md p-4 ${
                prediction.prediction === 1 ? 'bg-red-50' : 'bg-green-50'
              }`}>
                <div className={`text-sm ${
                  prediction.prediction === 1 ? 'text-red-700' : 'text-green-700'
                }`}>
                  <p className="font-medium">
                    Result: {prediction.message}
                  </p>
                  <p>
                    Probability: {(prediction.probability * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;