import { writable } from 'svelte/store';
import type { Sensor } from './types';

export const sensors = writable<Sensor[]>([]);
