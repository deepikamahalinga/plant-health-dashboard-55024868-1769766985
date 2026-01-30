import { Module } from '@nestjs/common';
import { SoilDataController } from './soildata.controller';
import { SoilDataService } from './soildata.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PlotModule } from '../plot/plot.module';

@Module({
  imports: [
    PrismaModule,
    PlotModule // Import PlotModule for Plot relationship
  ],
  controllers: [SoilDataController],
  providers: [SoilDataService],
  exports: [SoilDataService] // Export service for use in other modules
})
export class SoilDataModule {}