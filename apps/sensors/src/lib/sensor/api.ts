import { sensors } from './store';
import type { Sensor } from './types';

export const loadSensors = async (): Promise<Sensor[]> => {
  const res = await fetch('/sensorConfig.json');
  if (!res.ok) {
    return Promise.reject(`Can not load sensor config.`);
  }

  const sensorList = await res.json();

  // now fetch current values from database
  sensors.set(sensorList);

  return sensorList;
};
