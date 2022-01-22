import { PrismaClient } from '@prisma/client';

export const get = async () => {
    const prisma = new PrismaClient();

    const sensors = await prisma.sensorInfo.findMany();
    //const db = new Database(sensorDbFile);
    console.log('Connected to the database.');
    // await db.open(sensorDbFile);

    //db.close();

    return {
        body: {
            sensors
        }
    };
};
