import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, SoilData } from '@prisma/client';
import { CreateSoilDataDto } from './dto/create-soil-data.dto';
import { UpdateSoilDataDto } from './dto/update-soil-data.dto';

@Injectable()
export class SoilDataService {
  private readonly logger = new Logger(SoilDataService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    filters?: {
      plotId?: string;
      fromDate?: Date;
      toDate?: Date;
      minMoisture?: number;
      maxMoisture?: number;
      minPh?: number;
      maxPh?: number;
      minTemperature?: number; 
      maxTemperature?: number;
    },
    pagination?: {
      skip?: number;
      take?: number;
    }
  ): Promise<SoilData[]> {
    try {
      const where: Prisma.SoilDataWhereInput = {};

      if (filters) {
        if (filters.plotId) {
          where.plotId = filters.plotId;
        }
        if (filters.fromDate || filters.toDate) {
          where.timestamp = {
            gte: filters.fromDate,
            lte: filters.toDate
          };
        }
        if (filters.minMoisture || filters.maxMoisture) {
          where.moisture = {
            gte: filters.minMoisture,
            lte: filters.maxMoisture
          };
        }
        if (filters.minPh || filters.maxPh) {
          where.pH = {
            gte: filters.minPh,
            lte: filters.maxPh
          };
        }
        if (filters.minTemperature || filters.maxTemperature) {
          where.temperature = {
            gte: filters.minTemperature,
            lte: filters.maxTemperature
          };
        }
      }

      const soilData = await this.prisma.soilData.findMany({
        where,
        include: {
          plot: true
        },
        skip: pagination?.skip || 0,
        take: pagination?.take || 50,
        orderBy: {
          timestamp: 'desc'
        }
      });

      this.logger.log(`Retrieved ${soilData.length} soil data records`);
      return soilData;

    } catch (error) {
      this.logger.error(`Error retrieving soil data: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: string): Promise<SoilData> {
    try {
      const soilData = await this.prisma.soilData.findUnique({
        where: { id },
        include: {
          plot: true
        }
      });

      if (!soilData) {
        this.logger.warn(`Soil data with ID ${id} not found`);
        throw new NotFoundException(`Soil data with ID ${id} not found`);
      }

      return soilData;

    } catch (error) {
      this.logger.error(`Error retrieving soil data ${id}: ${error.message}`);
      throw error;
    }
  }

  async create(createSoilDataDto: CreateSoilDataDto): Promise<SoilData> {
    try {
      // Validate plot exists
      const plot = await this.prisma.plot.findUnique({
        where: { id: createSoilDataDto.plotId }
      });

      if (!plot) {
        throw new NotFoundException(`Plot with ID ${createSoilDataDto.plotId} not found`);
      }

      // Validate data ranges
      if (createSoilDataDto.moisture < 0 || createSoilDataDto.moisture > 100) {
        throw new Error('Moisture must be between 0 and 100');
      }
      if (createSoilDataDto.pH < 0 || createSoilDataDto.pH > 14) {
        throw new Error('pH must be between 0 and 14');
      }

      const soilData = await this.prisma.soilData.create({
        data: createSoilDataDto,
        include: {
          plot: true
        }
      });

      this.logger.log(`Created soil data record with ID ${soilData.id}`);
      return soilData;

    } catch (error) {
      this.logger.error(`Error creating soil data: ${error.message}`);
      throw error;
    }
  }

  async update(id: string, updateSoilDataDto: UpdateSoilDataDto): Promise<SoilData> {
    try {
      // Check if record exists
      const exists = await this.prisma.soilData.findUnique({
        where: { id }
      });

      if (!exists) {
        throw new NotFoundException(`Soil data with ID ${id} not found`);
      }

      // Validate data ranges if provided
      if (updateSoilDataDto.moisture !== undefined && 
          (updateSoilDataDto.moisture < 0 || updateSoilDataDto.moisture > 100)) {
        throw new Error('Moisture must be between 0 and 100');
      }
      if (updateSoilDataDto.pH !== undefined && 
          (updateSoilDataDto.pH < 0 || updateSoilDataDto.pH > 14)) {
        throw new Error('pH must be between 0 and 14');
      }

      const updated = await this.prisma.soilData.update({
        where: { id },
        data: updateSoilDataDto,
        include: {
          plot: true
        }
      });

      this.logger.log(`Updated soil data record with ID ${id}`);
      return updated;

    } catch (error) {
      this.logger.error(`Error updating soil data ${id}: ${error.message}`);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const soilData = await this.prisma.soilData.findUnique({
        where: { id }
      });

      if (!soilData) {
        throw new NotFoundException(`Soil data with ID ${id} not found`);
      }

      await this.prisma.soilData.delete({
        where: { id }
      });

      this.logger.log(`Deleted soil data record with ID ${id}`);

    } catch (error) {
      this.logger.error(`Error deleting soil data ${id}: ${error.message}`);
      throw error;
    }
  }

  async bulkCreate(data: CreateSoilDataDto[]): Promise<SoilData[]> {
    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        const createdRecords = [];
        
        for (const record of data) {
          // Validate plot exists
          const plot = await prisma.plot.findUnique({
            where: { id: record.plotId }
          });

          if (!plot) {
            throw new NotFoundException(`Plot with ID ${record.plotId} not found`);
          }

          // Validate data ranges
          if (record.moisture < 0 || record.moisture > 100) {
            throw new Error('Moisture must be between 0 and 100');
          }
          if (record.pH < 0 || record.pH > 14) {
            throw new Error('pH must be between 0 and 14');
          }

          const created = await prisma.soilData.create({
            data: record,
            include: {
              plot: true
            }
          });

          createdRecords.push(created);
        }

        return createdRecords;
      });

      this.logger.log(`Bulk created ${result.length} soil data records`);
      return result;

    } catch (error) {
      this.logger.error(`Error in bulk create: ${error.message}`);
      throw error;
    }
  }
}