import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ReportFormat, ReportRequest } from "../models/Report";

// Business purpose: collects the report name and file format before a report is exported.

interface ExportDialogProps {
  open: boolean;
  parameterCount: number;
  onClose: () => void;
  onConfirm: (request: ReportRequest) => void;
}

export default function ExportDialog({
  open,
  parameterCount,
  onClose,
  onConfirm,
}: ExportDialogProps) {
  const [reportName, setReportName] = useState("parameter-report");
  const [format, setFormat] = useState<ReportFormat>("CSV");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Export Report</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography variant="body2">
            {parameterCount} parameter(s) will be included.
          </Typography>
          <TextField
            label="Report name"
            size="small"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
          />
          <TextField
            select
            label="Format"
            size="small"
            value={format}
            onChange={(e) => setFormat(e.target.value as ReportFormat)}
          >
            <MenuItem value="CSV">CSV</MenuItem>
            <MenuItem value="JSON">JSON</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!reportName.trim()}
          onClick={() => onConfirm({ reportName: reportName.trim(), format })}
        >
          Export
        </Button>
      </DialogActions>
    </Dialog>
  );
}
