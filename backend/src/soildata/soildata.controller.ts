import { 
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpException,
  ParseUUIDPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SoilDataService } from './soildata.service';
import { CreateSoilDataDto } from './dto/create-soildata.dto';
import { UpdateSoilDataDto } from './dto/update-soildata.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { SoilDataFilterDto } from './dto/soildata-filter.dto';

@ApiTags('soil-data')
@Controller('api/soildatas')
export class SoilDataController {
  constructor(private readonly soilDataService: SoilDataService) {}

  @Get()
  @ApiOperation({ summary: 'Get all soil data measurements with pagination and filtering' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns paginated list of soil data measurements'
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Query() filterDto: SoilDataFilterDto
  ) {
    try {
      return await this.soilDataService.findAll(paginationQuery, filterDto);
    } catch (error) {
      throw new HttpException(
        'Error fetching soil data',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get soil data measurement by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns a single soil data measurement'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Soil data measurement not found'
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const soilData = await this.soilDataService.findOne(id);
      if (!soilData) {
        throw new HttpException(
          'Soil data measurement not found',
          HttpStatus.NOT_FOUND
        );
      }
      return soilData;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Error fetching soil data measurement',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new soil data measurement' })
  @ApiResponse({ 
    status: 201, 
    description: 'Soil data measurement created successfully'
  })
  async create(@Body() createSoilDataDto: CreateSoilDataDto) {
    try {
      return await this.soilDataService.create(createSoilDataDto);
    } catch (error) {
      throw new HttpException(
        'Error creating soil data measurement',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update soil data measurement' })
  @ApiResponse({ 
    status: 200, 
    description: 'Soil data measurement updated successfully'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Soil data measurement not found'
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSoilDataDto: UpdateSoilDataDto
  ) {
    try {
      const soilData = await this.soilDataService.update(id, updateSoilDataDto);
      if (!soilData) {
        throw new HttpException(
          'Soil data measurement not found',
          HttpStatus.NOT_FOUND
        );
      }
      return soilData;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Error updating soil data measurement',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete soil data measurement' })
  @ApiResponse({ 
    status: 200, 
    description: 'Soil data measurement deleted successfully'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Soil data measurement not found'
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const soilData = await this.soilDataService.remove(id);
      if (!soilData) {
        throw new HttpException(
          'Soil data measurement not found',
          HttpStatus.NOT_FOUND
        );
      }
      return {
        message: 'Soil data measurement deleted successfully'
      };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Error deleting soil data measurement',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}