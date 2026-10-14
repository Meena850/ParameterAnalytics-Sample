import { useEffect, useState } from "react";
import {
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Parameter } from "../models/Parameter";
import { getParameters, getParametersByIds } from "../services/reportService";

// Business purpose: Parameter Comparison. Lets engineers compare several parameters
// side by side to spot drift, e.g. a parameter approaching its operating limit.

export default function ParameterComparison() {
  const [allParameters, setAllParameters] = useState<Parameter[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 2]);
  const [selected, setSelected] = useState<Parameter[]>([]);

  useEffect(() => {
    getParameters().then(setAllParameters);
  }, []);

  useEffect(() => {
    getParametersByIds(selectedIds).then(setSelected);
  }, [selectedIds]);

  const average = (values: number[]) =>
    values.reduce((a, b) => a + b, 0) / values.length;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Parameter Comparison
      </Typography>

      <TextField
        select
        label="Parameters to compare"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        SelectProps={{ multiple: true }}
        value={selectedIds}
        onChange={(e) => setSelectedIds(e.target.value as unknown as number[])}
      >
        {allParameters.map((p) => (
          <MenuItem key={p.id} value={p.id}>
            {p.name}
          </MenuItem>
        ))}
      </TextField>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Metric</TableCell>
              {selected.map((p) => (
                <TableCell key={p.id} align="right">
                  {p.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Current value</TableCell>
              {selected.map((p) => (
                <TableCell key={p.id} align="right">
                  {p.currentValue} {p.unit}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Average of recent readings</TableCell>
              {selected.map((p) => (
                <TableCell key={p.id} align="right">
                  {average(p.recentReadings).toFixed(1)} {p.unit}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Operating limits</TableCell>
              {selected.map((p) => (
                <TableCell key={p.id} align="right">
                  {p.minLimit} – {p.maxLimit} {p.unit}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Distance to upper limit</TableCell>
              {selected.map((p) => (
                <TableCell key={p.id} align="right">
                  {(p.maxLimit - p.currentValue).toFixed(1)} {p.unit}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              {selected.map((p) => (
                <TableCell key={p.id} align="right">
                  {p.status}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
