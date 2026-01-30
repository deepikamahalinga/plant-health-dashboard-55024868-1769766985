import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface SoilData {
  id: string;
  plotId: string;
  moisture: number;
  pH: number;
  temperature: number;
  timestamp: string;
}

interface FormErrors {
  plotId?: string;
  moisture?: string;
  pH?: string;
  temperature?: string;
}

const SoilDataEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<SoilData>({
    id: '',
    plotId: '',
    moisture: 0,
    pH: 0,
    temperature: 0,
    timestamp: new Date().toISOString()
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSoilData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(`/api/soil-data/${id}`);
        if (!response.ok) throw new Error('Failed to fetch soil data');
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        toast.error('Error loading soil data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSoilData();
  }, [id]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.plotId) {
      newErrors.plotId = 'Plot ID is required';
    }

    if (formData.moisture < 0 || formData.moisture > 100) {
      newErrors.moisture = 'Moisture must be between 0 and 100';
    }

    if (formData.pH < 0 || formData.pH > 14) {
      newErrors.pH = 'pH must be between 0 and 14';
    }

    if (formData.temperature < -50 || formData.temperature > 100) {
      newErrors.temperature = 'Temperature must be between -50 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/soil-data/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update soil data');
      
      toast.success('Soil data updated successfully');
      navigate('/soil-data');
    } catch (error) {
      toast.error('Error updating soil data');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Soil Data</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plot ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Plot ID
            </label>
            <input
              type="text"
              name="plotId"
              value={formData.plotId}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.plotId ? 'border-red-500' : ''
              }`}
            />
            {errors.plotId && (
              <p className="mt-1 text-sm text-red-500">{errors.plotId}</p>
            )}
          </div>

          {/* Moisture */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Moisture (%)
            </label>
            <input
              type="number"
              name="moisture"
              value={formData.moisture}
              onChange={handleChange}
              step="0.01"
              min="0"
              max="100"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.moisture ? 'border-red-500' : ''
              }`}
            />
            {errors.moisture && (
              <p className="mt-1 text-sm text-red-500">{errors.moisture}</p>
            )}
          </div>

          {/* pH */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              pH Level
            </label>
            <input
              type="number"
              name="pH"
              value={formData.pH}
              onChange={handleChange}
              step="0.01"
              min="0"
              max="14"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.pH ? 'border-red-500' : ''
              }`}
            />
            {errors.pH && (
              <p className="mt-1 text-sm text-red-500">{errors.pH}</p>
            )}
          </div>

          {/* Temperature */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Temperature (°C)
            </label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              step="0.1"
              min="-50"
              max="100"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.temperature ? 'border-red-500' : ''
              }`}
            />
            {errors.temperature && (
              <p className="mt-1 text-sm text-red-500">{errors.temperature}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/soil-data')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SoilDataEdit;