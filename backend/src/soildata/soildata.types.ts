/**
 * Represents a soil data measurement record
 * @interface SoilData
 */
export interface SoilData {
  /** Unique identifier */
  id: string;
  
  /** Reference to plot ID */
  plotId: string;
  
  /** Soil moisture percentage (0-100) */
  moisture: number;
  
  /** Soil pH level (0-14) */
  pH: number;
  
  /** Soil temperature in Celsius */
  temperature: number;
  
  /** Timestamp when measurement was taken */
  timestamp: Date;
}

/**
 * Represents soil data without auto-generated fields
 * Used when creating new records
 */
export type SoilDataCreate = Omit<SoilData, 'id' | 'timestamp'>;

/**
 * Represents partial soil data for updates
 * All fields are optional except id
 */
export type SoilDataUpdate = {
  id: string;
} & Partial<Omit<SoilData, 'id' | 'timestamp'>>;

/**
 * Represents core soil data without timestamps
 */
export type SoilDataWithoutTimestamp = Omit<SoilData, 'timestamp'>;

/**
 * Represents soil data with related entities
 */
export interface SoilDataWithRelations extends SoilData {
  /** Related plot data */
  plot?: {
    id: string;
    name: string;
  };
}

/**
 * Represents a filter for querying soil data
 */
export type SoilDataFilter = Partial<{
  plotId: string;
  minMoisture: number;
  maxMoisture: number;
  minPH: number;
  maxPH: number;
  minTemperature: number;
  maxTemperature: number;
  fromDate: Date;
  toDate: Date;
}>;

/**
 * Valid sort fields for soil data
 */
export type SoilDataSortField = keyof Omit<SoilData, 'id'>;