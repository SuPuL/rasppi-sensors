import type { Hex } from 'svelte-awesome-color-picker/type/types';

export interface Position {
    x: number;
    y: number;
}

export interface SensorValue {
    id: string;
    data: string;
    timestamp: Date;
}

export interface Sensor extends Position {
    id: string;
    label: string;
    color: Hex;
    hide: boolean;
}

export interface SensorState {
    entries: Sensor[];
    isLoading: boolean;
}
