import { Parameter, ParameterFilter } from "../models/Parameter";
import { ReportHistoryItem, ReportRequest } from "../models/Report";

// Business purpose: single data access point for parameter analytics.
// Uses mocked data only. A real integration would replace these functions with API calls.

const mockParameters: Parameter[] = [
  {
    id: 1,
    name: "Reactor Temperature",
    category: "Thermal",
    plant: "Plant A",
    unit: "°C",
    currentValue: 182,
    minLimit: 150,
    maxLimit: 200,
    status: "Normal",
    recentReadings: [178, 180, 181, 183, 182],
  },
  {
    id: 2,
    name: "Furnace Temperature",
    category: "Thermal",
    plant: "Plant A",
    unit: "°C",
    currentValue: 915,
    minLimit: 800,
    maxLimit: 900,
    status: "Critical",
    recentReadings: [880, 890, 902, 910, 915],
  },
  {
    id: 3,
    name: "Line Pressure",
    category: "Fluid",
    plant: "Plant B",
    unit: "bar",
    currentValue: 6.4,
    minLimit: 5,
    maxLimit: 8,
    status: "Normal",
    recentReadings: [6.1, 6.3, 6.2, 6.5, 6.4],
  },
  {
    id: 4,
    name: "Coolant Flow Rate",
    category: "Fluid",
    plant: "Plant B",
    unit: "L/min",
    currentValue: 41,
    minLimit: 40,
    maxLimit: 80,
    status: "Warning",
    recentReadings: [55, 50, 46, 43, 41],
  },
  {
    id: 5,
    name: "Motor Vibration",
    category: "Mechanical",
    plant: "Plant A",
    unit: "mm/s",
    currentValue: 4.8,
    minLimit: 0,
    maxLimit: 7,
    status: "Normal",
    recentReadings: [4.2, 4.4, 4.5, 4.7, 4.8],
  },
  {
    id: 6,
    name: "Conveyor Speed",
    category: "Mechanical",
    plant: "Plant C",
    unit: "m/min",
    currentValue: 32,
    minLimit: 25,
    maxLimit: 40,
    status: "Normal",
    recentReadings: [30, 31, 32, 32, 32],
  },
  {
    id: 7,
    name: "Panel Voltage",
    category: "Electrical",
    plant: "Plant C",
    unit: "V",
    currentValue: 428,
    minLimit: 380,
    maxLimit: 420,
    status: "Warning",
    recentReadings: [415, 419, 422, 425, 428],
  },
  {
    id: 8,
    name: "Warehouse Humidity",
    category: "Environmental",
    plant: "Plant C",
    unit: "%",
    currentValue: 47,
    minLimit: 30,
    maxLimit: 60,
    status: "Normal",
    recentReadings: [45, 46, 46, 47, 47],
  },
];

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

// Returns parameters matching the dashboard filter.
export async function getParameters(
  filter?: ParameterFilter,
): Promise<Parameter[]> {
  await delay();
  return mockParameters.filter((p) => {
    if (!filter) return true;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(filter.search.toLowerCase());
    const matchesCategory =
      filter.category === "All" || p.category === filter.category;
    const matchesStatus = filter.status === "All" || p.status === filter.status;
    return matchesSearch && matchesCategory && matchesStatus;
  });
}

// Returns the selected parameters so they can be compared side by side.
export async function getParametersByIds(ids: number[]): Promise<Parameter[]> {
  await delay();
  return mockParameters.filter((p) => ids.includes(p.id));
}

// Builds the report file in the browser and triggers a download.
// Returns a history entry describing the generated report.
export async function exportReport(
  parameters: Parameter[],
  request: ReportRequest,
): Promise<ReportHistoryItem> {
  await delay();

  const content =
    request.format === "JSON"
      ? JSON.stringify(parameters, null, 2)
      : buildCsv(parameters);
  const mimeType = request.format === "JSON" ? "application/json" : "text/csv";

  const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${request.reportName}.${request.format.toLowerCase()}`;
  link.click();
  URL.revokeObjectURL(url);

  return {
    id: Date.now(),
    reportName: request.reportName,
    format: request.format,
    parameterCount: parameters.length,
    generatedAt: new Date().toISOString(),
  };
}

function buildCsv(parameters: Parameter[]): string {
  const header =
    "Name,Category,Plant,Unit,Current Value,Min Limit,Max Limit,Status";
  const rows = parameters.map((p) =>
    [
      p.name,
      p.category,
      p.plant,
      p.unit,
      p.currentValue,
      p.minLimit,
      p.maxLimit,
      p.status,
    ].join(","),
  );
  return [header, ...rows].join("\n");
}
