import { Command, Flags } from '@oclif/core';
import pWaitFor from 'p-wait-for';
import { PromisedDatabase } from 'promised-sqlite3';
// @ts-ignore: no types avaiable
import sensor from 'ds18b20-raspi';
import random from 'lodash/random';
import { constants } from 'fs';
import { mkdir, writeFile, access } from 'fs/promises';
import { resolve } from 'path';

interface SensorValue {
    id: string;
    t: number;
}

interface Context {
    mock: boolean;
    interval: number;
}

const db = new PromisedDatabase();

process.once('SIGINT', () => {
    db.close();
});

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
        }),
        dbPath: Flags.string({
            char: 'f',
            description: 'Path to folder of the database.',
            default: './db/'
        })
    };

    static args = [];

    async run(): Promise<void> {
        const { flags } = await this.parse(Read);

        try {
            await this.startDb(flags.dbPath);
            await this.readSensorIds(flags);
            this.startReadLoop(flags);
        } catch (err) {
            await db.close();
            return console.error(err.message);
        }
    }

    startDb = async (dir: string) => {
        await mkdir(dir, { recursive: true });
        const sensorDbFile = resolve(dir, 'sensorDb.db');
        await access(sensorDbFile, constants.R_OK | constants.W_OK).catch(() => writeFile(sensorDbFile, ''));

        this.log('Connected to the database.');
        await db.open(sensorDbFile);

        this.log('Ensure tables exists.');
        await db.run(
            'CREATE TABLE IF NOT EXISTS sensor_data (id INTEGER PRIMARY KEY AUTOINCREMENT, dt datetime default current_timestamp, data TEXT NOT NULL)'
        );
        await db.run(
            'CREATE TABLE IF NOT EXISTS sensor_info (id TEXT PRIMARY KEY, dt datetime default current_timestamp, label TEXT, x INTEGER, y INTEGER)'
        );
    };

    readSensorIds = async ({ mock }: Context) => {
        this.log(`Start read sensor info.`);

        return Promise.all(
            readSensorInfo(mock).map((id) =>
                db.run('INSERT OR IGNORE INTO sensor_info (id, label, x, y) VALUES (?, ?, 0, 0)', id, id)
            )
        );
    };

    startReadLoop = async ({ mock, interval }: Context) => {
        this.log(`Start reading sensor data.`);
        await pWaitFor(
            async () => {
                const temps = JSON.stringify(readSensors(mock));
                this.log(`${new Date()}: Temps are`);
                this.log(temps);

                await db.run('INSERT INTO sensor_data (data) VALUES (?)', JSON.stringify(temps));

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
