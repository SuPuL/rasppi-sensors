export interface Position {
  x: number;
  y: number;
}

export interface SensorValue {
  amount: string;
  measure: string;
  timestamp: Date;
}

export interface Sensor extends Position {
  id: string;
  label: string;
  value?: SensorValue;
}
