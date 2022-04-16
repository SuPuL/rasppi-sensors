import groupBy from 'lodash/groupBy.js';
import map from 'lodash/map.js';
import reduce from 'lodash/reduce.js';
import first from 'lodash/first.js';
import minBy from 'lodash/minBy.js';
import maxBy from 'lodash/maxBy.js';
import { error, success, SuccessOrError } from '../../../lib/response';
import { SensorCollection, TimeRange, toSensor } from '../../../lib/sensor';
import { getDb } from '../../../lib/db';
import dayjs from 'dayjs';

export const get = async ({ params, url }): SuccessOrError<SensorCollection<Date>> => {
    const range: TimeRange = params.range || 'week';
    const sensors = await getDb().sensorInfo.findMany({ where: { hide: false } });
    const groupedSensors = reduce(
        groupBy(sensors, 'id'),
        (result, value, key) => ({ ...result, [key]: first(value) }),
        {}
    );

    const where = {
        where: {
            sensorId: { in: map(sensors, 'id') },
            datetime: getDateRange(range)
        }
    };
    const data = await getDb().sensorData.findMany(where);
    const calcs = await getDb().sensorData.groupBy({
        by: ['sensorId'],
        _count: {
            value: true
        },
        _avg: {
            value: true
        },
        ...where
    });
    const calcsById = groupBy(calcs, 'sensorId');
    const dataById = groupBy(data, 'sensorId');

    const groupedData = map(dataById, (values, sensorId) => {
        const calc = calcsById[sensorId];
        const min = minBy(values, ({ value }) => value);
        const max = maxBy(values, ({ value }) => value);
        const measure = maxBy(values, ({ datetime }) => datetime);

        return {
            sensor: toSensor(groupedSensors[sensorId], measure),
            values,
            min,
            max,
            avg: Math.round(calc?.[0]?.['_avg']?.value || 0) as number,
            count: Math.round(calc?.[0]?.['_count']?.value || 0) as number
        };
    });

    return groupedData
        ? success({
              range,
              values: groupedData
          })
        : error('No sensor measures found.');
};

const getDateRange = (range: TimeRange) => {
    const now = dayjs();
    let from = now.clone();

    switch (range) {
        case 'day':
            from = now.clone();
            break;
        case 'week':
            from = now.subtract(1, 'week');
            break;
        case 'month':
            from = now.subtract(1, 'month');
            break;
        case '3month':
            from = now.subtract(3, 'month');
            break;
    }

    return {
        gte: from.toDate(),
        lte: now.toDate()
    };
};
