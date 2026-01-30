import { IsNotEmpty, IsUUID, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO for creating new soil data measurements
 * @class CreateSoilDataDto
 */
export class CreateSoilDataDto {
  /**
   * UUID of the plot this soil data belongs to
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @IsNotEmpty()
  @IsUUID('4')
  plotId: string;

  /**
   * Soil moisture percentage (0-100)
   * @example 45.67
   */
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  @Type(() => Number)
  moisture: number;

  /**
   * Soil pH level (0-14)
   * @example 7.2
   */
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(14)
  @Type(() => Number)
  pH: number;

  /**
   * Soil temperature in Celsius
   * @example 23.5
   */
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(-50)
  @Max(100)
  @Type(() => Number)
  temperature: number;
}