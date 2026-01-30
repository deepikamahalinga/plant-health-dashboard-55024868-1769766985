import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import { LoggerModule } from 'nestjs-pino';
import { validate } from './config/env.validation';
import { PrismaModule } from './prisma/prisma.module';
import { SoilDataModule } from './soil-data/soil-data.module';
import { HealthModule } from './health/health.module';
import { RedisModule } from './redis/redis.module';
import { DatadogTraceModule } from 'nestjs-ddtrace';

@Module({
  imports: [
    // Core configuration
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate,
    }),

    // Rate limiting
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),

    // Logging
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),

    // APM & Monitoring
    DatadogTraceModule.forRoot({
      isGlobal: true,
    }),

    // Health checks
    TerminusModule,
    HealthModule,

    // Database & Cache
    PrismaModule,
    RedisModule,

    // Feature modules
    SoilDataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}