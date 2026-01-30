import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting database seed...');

    // Clear existing data
    console.log('Clearing existing data...');
    await prisma.soilData.deleteMany();
    
    // Create sample plot IDs (assuming Plot table exists)
    const plotIds = [
      uuidv4(),
      uuidv4(),
      uuidv4() 
    ];

    // Create sample soil data records
    console.log('Creating soil data records...');
    const soilDataRecords = [];

    for (const plotId of plotIds) {
      // Create multiple readings per plot over time
      const now = new Date();
      
      for (let i = 0; i < 3; i++) {
        const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000); // Past 3 days

        soilDataRecords.push({
          id: uuidv4(),
          plotId: plotId,
          moisture: Number((Math.random() * (45.0 - 20.0) + 20.0).toFixed(2)), // 20-45% moisture
          pH: Number((Math.random() * (8.5 - 5.5) + 5.5).toFixed(2)), // pH 5.5-8.5
          temperature: Number((Math.random() * (30.0 - 15.0) + 15.0).toFixed(1)), // 15-30°C
          timestamp: timestamp
        });
      }
    }

    const createdRecords = await prisma.soilData.createMany({
      data: soilDataRecords
    });

    console.log(`Created ${createdRecords.count} soil data records`);
    console.log('Seeding completed successfully');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error('Fatal error during seeding:', error);
    process.exit(1);
  });