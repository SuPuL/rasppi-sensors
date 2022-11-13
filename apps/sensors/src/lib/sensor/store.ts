import { writable } from 'svelte/store';
import type { SensorCollection, SensorState } from './types';

export const sensors = writable<SensorState>({
    entries: [],
    isLoading: true
});

export const sensorCollection = writable<SensorCollection<string> | undefined>();
