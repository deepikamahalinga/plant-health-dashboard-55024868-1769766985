import axios, { AxiosError, AxiosResponse } from 'axios';

// Types
export interface SoilData {
  id: string;
  plotId: string;
  moisture: number;
  pH: number;
  temperature: number;
  timestamp: string;
}

export type CreateSoilDataDTO = Omit<SoilData, 'id' | 'timestamp'>;
export type UpdateSoilDataDTO = Partial<CreateSoilDataDTO>;

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface FilterParams {
  plotId?: string;
  fromDate?: string;
  toDate?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// API client setup
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler
const handleError = (error: AxiosError) => {
  if (error.response) {
    // Server responded with error status
    throw new Error(`API Error: ${error.response.status} - ${error.response.data}`);
  } else if (error.request) {
    // Request made but no response
    throw new Error('No response received from server');
  } else {
    // Request setup error
    throw new Error(`Request failed: ${error.message}`);
  }
};

// API functions
export const getAllSoilDatas = async (
  filters?: FilterParams,
  pagination?: PaginationParams
): Promise<PaginatedResponse<SoilData>> => {
  try {
    const response: AxiosResponse<PaginatedResponse<SoilData>> = await apiClient.get('/soildatas', {
      params: {
        ...filters,
        ...pagination,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

export const getSoilDataById = async (id: string): Promise<SoilData> => {
  try {
    const response: AxiosResponse<SoilData> = await apiClient.get(`/soildatas/${id}`);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

export const createSoilData = async (data: CreateSoilDataDTO): Promise<SoilData> => {
  try {
    const response: AxiosResponse<SoilData> = await apiClient.post('/soildatas', data);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

export const updateSoilData = async (
  id: string,
  data: UpdateSoilDataDTO
): Promise<SoilData> => {
  try {
    const response: AxiosResponse<SoilData> = await apiClient.put(`/soildatas/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

export const deleteSoilData = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/soildatas/${id}`);
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);