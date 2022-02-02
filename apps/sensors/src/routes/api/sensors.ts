import { PrismaClient } from '@prisma/client';

export const get = async () => {
    const prisma = new PrismaClient();
    const dbData = await prisma.sensorInfo.findMany();
    const sensors = dbData.map((sensor) => ({
        ...sensor,
        color: { hex: sensor.color || '#444444' },
        hide: sensor.hide || true
    }));

    if (!sensors) {
        return {
            status: 500
        };
    }

    return {
        body: {
            sensors
        }
    };
};

export async function post() {
    try {
        const prisma = new PrismaClient();
        const sensors = await prisma.sensorInfo.findMany();

        return {
            status: 200,
            body: JSON.stringify({
                message: 'Sensors saved.'
            })
        };
    } catch (error) {
        return {
            status: 500,
            body: JSON.stringify({
                message: 'something went wrong with the email submit!'
            })
        };
    }
}
