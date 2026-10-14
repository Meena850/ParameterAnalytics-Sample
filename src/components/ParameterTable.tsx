import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Parameter, ParameterStatus } from "../models/Parameter";

// Business purpose: reusable table showing parameter values against their operating limits.
// Used by the dashboard and the report export screens.

interface ParameterTableProps {
  parameters: Parameter[];
}

const statusColor: Record<ParameterStatus, "success" | "warning" | "error"> = {
  Normal: "success",
  Warning: "warning",
  Critical: "error",
};

export default function ParameterTable({ parameters }: ParameterTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Parameter</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Plant</TableCell>
            <TableCell align="right">Current Value</TableCell>
            <TableCell align="right">Limits</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parameters.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>{p.plant}</TableCell>
              <TableCell align="right">
                {p.currentValue} {p.unit}
              </TableCell>
              <TableCell align="right">
                {p.minLimit} – {p.maxLimit} {p.unit}
              </TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={p.status}
                  color={statusColor[p.status]}
                />
              </TableCell>
            </TableRow>
          ))}
          {parameters.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No parameters match the selected filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
