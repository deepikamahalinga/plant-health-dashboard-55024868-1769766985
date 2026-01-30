import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { apiClient } from '../api/apiClient';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';

interface SoilData {
  id: string;
  plotId: string;
  moisture: number;
  pH: number;
  temperature: number;
  timestamp: string;
  plot?: {
    id: string;
    name: string;
  };
}

export const SoilDataDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSoilData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/soil-data/${id}`);
        setSoilData(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch soil data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSoilData();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this soil data record?')) {
      return;
    }

    try {
      await apiClient.delete(`/soil-data/${id}`);
      navigate('/soil-data');
    } catch (err: any) {
      setError(err.message || 'Failed to delete soil data');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!soilData) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold text-gray-700">Soil Data Not Found</h2>
        <button
          onClick={() => navigate('/soil-data')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Soil Data Details
            </h2>
            <div className="space-x-2">
              <button
                onClick={() => navigate(`/soil-data/${id}/edit`)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">ID</label>
              <div className="mt-1 text-gray-900">{soilData.id}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Plot ID</label>
              <div className="mt-1 text-gray-900">
                {soilData.plot ? (
                  <a 
                    href={`/plots/${soilData.plotId}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {soilData.plot.name}
                  </a>
                ) : (
                  soilData.plotId
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Moisture</label>
              <div className="mt-1 text-gray-900">{soilData.moisture.toFixed(2)}%</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">pH Level</label>
              <div className="mt-1 text-gray-900">{soilData.pH.toFixed(2)}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Temperature</label>
              <div className="mt-1 text-gray-900">{soilData.temperature.toFixed(1)}°C</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Timestamp</label>
              <div className="mt-1 text-gray-900">
                {format(new Date(soilData.timestamp), 'PPpp')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate('/soil-data')}
          className="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <svg 
            className="w-5 h-5 mr-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to List
        </button>
      </div>
    </div>
  );
};