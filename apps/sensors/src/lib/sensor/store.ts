import { writable } from 'svelte/store';
import type { SensorState } from './types';

export const sensors = writable<SensorState>({
    entries: [],
    isLoading: true
});
