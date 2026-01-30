/**
 * Represents a soil data measurement record
 * @interface SoilData
 */
export interface SoilData {
  /** Unique identifier */
  id: string;
  
  /** Associated plot ID */
  plotId: string;
  
  /** Soil moisture percentage (0-100) */
  moisture: number;
  
  /** Soil pH level (0-14) */
  pH: number;
  
  /** Soil temperature in Celsius */
  temperature: number;
  
  /** Measurement timestamp */
  timestamp: string;
}

/**
 * Data transfer object for creating new soil data records
 * @interface CreateSoilDataDto
 */
export type CreateSoilDataDto = Omit<SoilData, 'id' | 'timestamp'>;

/**
 * Data transfer object for updating existing soil data records
 * @interface UpdateSoilDataDto  
 */
export type UpdateSoilDataDto = Partial<CreateSoilDataDto>;

/**
 * Filter parameters for querying soil data
 * @interface SoilDataFilterParams
 */
export interface SoilDataFilterParams {
  /** Filter by plot ID */
  plotId?: string;
  
  /** Filter by minimum moisture value */
  minMoisture?: number;
  
  /** Filter by maximum moisture value */
  maxMoisture?: number;
  
  /** Filter by minimum pH value */
  minPH?: number;
  
  /** Filter by maximum pH value */
  maxPH?: number;
  
  /** Filter by minimum temperature */
  minTemperature?: number;
  
  /** Filter by maximum temperature */
  maxTemperature?: number;
  
  /** Filter by start date */
  startDate?: string;
  
  /** Filter by end date */
  endDate?: string;
}

/**
 * Pagination parameters for list queries
 * @interface PaginationParams
 */
export interface PaginationParams {
  /** Page number (1-based) */
  page: number;
  
  /** Number of items per page */
  limit: number;
  
  /** Sort field */
  sortBy?: keyof SoilData;
  
  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Validation constants for soil data
 */
export const SOIL_DATA_VALIDATION = {
  MOISTURE: {
    MIN: 0,
    MAX: 100
  },
  PH: {
    MIN: 0,
    MAX: 14
  },
  TEMPERATURE: {
    MIN: -50,
    MAX: 100
  }
} as const;

/**
 * Response format for paginated soil data lists
 * @interface PaginatedSoilDataResponse
 */
export interface PaginatedSoilDataResponse {
  /** List of soil data records */
  data: SoilData[];
  
  /** Total number of records */
  total: number;
  
  /** Current page number */
  page: number;
  
  /** Number of items per page */
  limit: number;
  
  /** Total number of pages */
  totalPages: number;
}