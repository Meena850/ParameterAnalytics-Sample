// Business purpose: describes report requests and the history of generated reports.

export type ReportFormat = "CSV" | "JSON";

// What the user asks for in the export dialog.
export interface ReportRequest {
  reportName: string;
  format: ReportFormat;
}

// A record of a report that was generated, shown in the export history.
export interface ReportHistoryItem {
  id: number;
  reportName: string;
  format: ReportFormat;
  parameterCount: number;
  generatedAt: string; // ISO date string
}
