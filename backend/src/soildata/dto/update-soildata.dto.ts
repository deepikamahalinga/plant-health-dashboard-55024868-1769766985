import { IsDecimal, IsNumber, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSoilDataDto {
  @IsOptional()
  @IsUUID(4)
  plotId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  moisture?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(14)
  @Type(() => Number)
  pH?: number;

  @IsOptional()
  @IsNumber()
  @Min(-50)
  @Max(100)
  @Type(() => Number)
  temperature?: number;

  @IsOptional()
  timestamp?: Date;
}