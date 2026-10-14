import { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import ExportDialog from "../components/ExportDialog";
import FilterPanel from "../components/FilterPanel";
import ParameterTable from "../components/ParameterTable";
import { Parameter, ParameterFilter } from "../models/Parameter";
import { ReportHistoryItem, ReportRequest } from "../models/Report";
import { exportReport, getParameters } from "../services/reportService";

// Business purpose: Report Export. Lets users filter parameters and export them
// as a file for audits, shift handovers or sharing with other teams.

const defaultFilter: ParameterFilter = {
  search: "",
  category: "All",
  status: "All",
};

export default function ReportExport() {
  const [filter, setFilter] = useState<ParameterFilter>(defaultFilter);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [history, setHistory] = useState<ReportHistoryItem[]>([]);

  useEffect(() => {
    getParameters(filter).then(setParameters);
  }, [filter]);

  const handleExport = async (request: ReportRequest) => {
    const item = await exportReport(parameters, request);
    setHistory((prev) => [item, ...prev]);
    setDialogOpen(false);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Report Export
      </Typography>

      <FilterPanel filter={filter} onChange={setFilter} />
      <ParameterTable parameters={parameters} />

      <Button
        variant="contained"
        sx={{ my: 2 }}
        disabled={parameters.length === 0}
        onClick={() => setDialogOpen(true)}
      >
        Export Report
      </Button>

      <Typography variant="h6">Export History</Typography>
      <Paper>
        <List dense>
          {history.length === 0 && (
            <ListItem>
              <ListItemText primary="No reports exported yet." />
            </ListItem>
          )}
          {history.map((h) => (
            <ListItem key={h.id}>
              <ListItemText
                primary={`${h.reportName}.${h.format.toLowerCase()}`}
                secondary={`${h.parameterCount} parameters, ${new Date(h.generatedAt).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <ExportDialog
        open={dialogOpen}
        parameterCount={parameters.length}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleExport}
      />
    </>
  );
}
