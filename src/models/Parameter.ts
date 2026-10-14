// Business purpose: describes a monitored process parameter
// (e.g. temperature, pressure) tracked on the production floor.

export type ParameterCategory =
  | "Thermal"
  | "Mechanical"
  | "Fluid"
  | "Electrical"
  | "Environmental";

export type ParameterStatus = "Normal" | "Warning" | "Critical";

export interface Parameter {
  id: number;
  name: string;
  category: ParameterCategory;
  plant: string;
  unit: string;
  currentValue: number;
  minLimit: number; // lower operating limit
  maxLimit: number; // upper operating limit
  status: ParameterStatus;
  recentReadings: number[]; // last readings, used for comparison
}

// Filter criteria shared by the dashboard and the report export screens.
export interface ParameterFilter {
  search: string;
  category: ParameterCategory | "All";
  status: ParameterStatus | "All";
}
