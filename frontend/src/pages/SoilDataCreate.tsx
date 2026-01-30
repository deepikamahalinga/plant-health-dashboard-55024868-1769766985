import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SoilDataForm {
  plotId: string;
  moisture: number;
  pH: number;
  temperature: number;
}

const SoilDataCreate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<SoilDataForm>({
    plotId: '',
    moisture: 0,
    pH: 0,
    temperature: 0
  });

  const [formErrors, setFormErrors] = useState<Partial<SoilDataForm>>({});

  const validateForm = (): boolean => {
    const errors: Partial<SoilDataForm> = {};
    
    if (!formData.plotId) {
      errors.plotId = 'Plot ID is required';
    }
    
    if (formData.moisture < 0 || formData.moisture > 100) {
      errors.moisture = 'Moisture must be between 0 and 100';
    }
    
    if (formData.pH < 0 || formData.pH > 14) {
      errors.pH = 'pH must be between 0 and 14';
    }
    
    if (formData.temperature < -50 || formData.temperature > 100) {
      errors.temperature = 'Temperature must be between -50 and 100';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'plotId' ? value : parseFloat(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post('/api/soil-data', formData);
      navigate('/soil-data');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create Soil Data Record</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Plot ID */}
          <div className="mb-4">
            <label htmlFor="plotId" className="block text-sm font-medium text-gray-700">
              Plot ID
            </label>
            <input
              type="text"
              id="plotId"
              name="plotId"
              value={formData.plotId}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                ${formErrors.plotId ? 'border-red-500' : ''}`}
            />
            {formErrors.plotId && (
              <p className="mt-1 text-sm text-red-600">{formErrors.plotId}</p>
            )}
          </div>

          {/* Measurements Group */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Moisture */}
            <div>
              <label htmlFor="moisture" className="block text-sm font-medium text-gray-700">
                Moisture (%)
              </label>
              <input
                type="number"
                id="moisture"
                name="moisture"
                value={formData.moisture}
                onChange={handleChange}
                step="0.01"
                min="0"
                max="100"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                  ${formErrors.moisture ? 'border-red-500' : ''}`}
              />
              {formErrors.moisture && (
                <p className="mt-1 text-sm text-red-600">{formErrors.moisture}</p>
              )}
            </div>

            {/* pH */}
            <div>
              <label htmlFor="pH" className="block text-sm font-medium text-gray-700">
                pH Level
              </label>
              <input
                type="number"
                id="pH"
                name="pH"
                value={formData.pH}
                onChange={handleChange}
                step="0.01"
                min="0"
                max="14"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                  ${formErrors.pH ? 'border-red-500' : ''}`}
              />
              {formErrors.pH && (
                <p className="mt-1 text-sm text-red-600">{formErrors.pH}</p>
              )}
            </div>

            {/* Temperature */}
            <div>
              <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
                Temperature (°C)
              </label>
              <input
                type="number"
                id="temperature"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                step="0.1"
                min="-50"
                max="100"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                  ${formErrors.temperature ? 'border-red-500' : ''}`}
              />
              {formErrors.temperature && (
                <p className="mt-1 text-sm text-red-600">{formErrors.temperature}</p>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/soil-data')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SoilDataCreate;