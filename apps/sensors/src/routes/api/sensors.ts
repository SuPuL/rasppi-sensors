import pick from 'lodash/pick.js';
import omit from 'lodash/omit.js';
import type { Sensor, DbSensorInfo } from '../../lib/sensor/types';
import { error, SuccessOrError, success, successMsg, MessageBody } from '../../lib/response';
import { getDb } from '../../lib/db';

export const get = async (): SuccessOrError<Sensor<Date>[]> => {
    const dbData = await getDb().sensorData.findMany({
        distinct: ['sensorId'],
        orderBy: {
            datetime: 'desc'
        },
        include: {
            sensor: true
        }
    });

    const sensors = dbData.map(({ sensor, value, datetime }) => ({
        ...sensor,
        color: { hex: sensor.color || '#444444' },
        measure: {
            value,
            datetime
        }
    }));

    return sensors ? success(sensors) : error('No Sensors found.');
};

export async function post({ request }): SuccessOrError<MessageBody> {
    try {
        const body = (await request.json()) as DbSensorInfo[];
        await body.reduce(async (prior, info) => {
            const where = pick(info, ['id']);
            const data = omit(info, ['id']);
            return prior.then(async () => await getDb().sensorInfo.update({ where, data }));
        }, Promise.resolve());

        return successMsg('Sensors saved.');
    } catch (e) {
        console.error(e);
        return error('Somthing went wrong while updating the sensor data.');
    }
}
