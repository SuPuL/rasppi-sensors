import { Command, Flags } from '@oclif/core';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
// @ts-ignore: no types avaiable
import sensor from 'ds18b20-raspi';
import random from 'lodash/random';
import pWaitFor from 'p-wait-for';

interface SensorValue {
    id: string;
    t: number;
}

interface Context {
    mock: boolean;
    interval: number;
}

const db = new PrismaClient();

export default class Read extends Command {
    static description = 'Read all sensor values and store them in a local database on a regular basis.';

    static examples = [`$ rasppi-sensor-reader read --interval=300`];

    static flags = {
        interval: Flags.integer({
            char: 'i',
            description: 'Interval in seconds between two read operations.',
            required: true,
            default: 300
        }),
        mock: Flags.boolean({
            char: 'm',
            description: 'Mock the sesnor data instead of read them.'
        })
    };

    static args = [];

    async run(): Promise<void> {
        const { flags } = await this.parse(Read);

        try {
            await this.readSensorIds(flags);
            this.startReadLoop(flags);
        } catch (err) {
            return console.error(err.message);
        }
    }

    readSensorIds = async ({ mock }: Context) => {
        this.log(`Start read sensor info.`);

        return Promise.all(
            readSensorInfo(mock).map((id) =>
                db.sensorInfo.upsert({
                    where: {
                        id
                    },
                    update: {},
                    create: {
                        id,
                        label: id,
                        x: 0,
                        y: 0,
                        fontSize: 1
                    }
                })
            )
        );
    };

    startReadLoop = async ({ mock, interval }: Context) => {
        this.log(`Start reading sensor data.`);
        await pWaitFor(
            async () => {
                const data = readSensors(mock);
                this.log(`${new Date()} - measures are:`);
                this.log(JSON.stringify(data, null, 2));
                await Promise.all(
                    data.map(({ id, t }) =>
                        db.sensorData.create({
                            data: {
                                sensorId: id,
                                value: t
                            }
                        })
                    )
                );
                const oldDate = dayjs().subtract(3, 'month').subtract(1, 'week');
                const { count } = await db.sensorData.deleteMany({
                    where: {
                        datetime: { lte: oldDate.toDate() }
                    }
                });
                this.log(`Deleted ${count} sensor measures from before ${oldDate.toISOString()}.`);

                return false;
            },
            {
                interval: interval * 1000
            }
        );
    };
}

const readSensorInfo = (mock: boolean = false): string[] => {
    if (mock) {
        return ['1', '2', 'v3'];
    }

    return sensor.list();
};

const readSensors = (mock: boolean = false): SensorValue[] => {
    if (mock) {
        return [
            {
                id: '1',
                t: random(1, 100, true)
            },
            {
                id: '2',
                t: random(1, 100, true)
            },
            {
                id: 'v3',
                t: random(1, 100, true)
            }
        ];
    }

    return sensor.readAllC();
};
