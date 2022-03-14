import type { Hex } from 'svelte-awesome-color-picker/type/types';

export interface Position {
    x: number;
    y: number;
}

export interface Measure<T> {
    value: number;
    datetime: T;
}

export interface DbSensorInfo {
    id: string;
    datetime: Date;
    label: string;
    x: number;
    y: number;
    color?: string;
    hide?: boolean;
    sensorData: DbSensorData[];
}

export interface DbSensorData {
    id: number;
    datetime: Date;
    value: number;
    sensor?: DbSensorInfo;
    sensorId: string;
}

export interface Sensor<T> extends Position {
    id: string;
    label: string;
    datetime: T;
    color: Hex;
    hide: boolean;
    measure?: Measure<T>;
}

export const toSensor = (sensor: SensorInfo, measure: Measure<Date>): Sensor<Date> => ({
    ...sensor,
    color: { hex: sensor.color || '#444444' },
    measure
});

export const getColorString = ({ hex }: Hex) => hex.substring(0, 7);

export const formatDate = (dateString: string): string => new Date(dateString).toLocaleDateString();
export interface SensorState {
    entries: Sensor<string>[];
    isLoading: boolean;
}

export interface SensorData<T> {
    id: number;
    datetime: T;
    value: number;
    sensorId: string;
}

export interface SensorMeasures<T> {
    sensor: Sensor<T>;
    values: SensorData<T>[];
    min: SensorData<T>;
    max: SensorData<T>;
    avg: number;
    count: number;
}

export type TimeRange = 'day' | 'week' | 'month' | '3month';
export interface SensorCollection<T> {
    range: TimeRange;
    values: SensorMeasures<T>[];
}
