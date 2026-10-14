import { MenuItem, Paper, Stack, TextField } from "@mui/material";
import {
  ParameterCategory,
  ParameterFilter,
  ParameterStatus,
} from "../models/Parameter";

// Business purpose: lets analysts narrow parameters by name, category and status.
// Shared by the dashboard and the report export screens.

interface FilterPanelProps {
  filter: ParameterFilter;
  onChange: (filter: ParameterFilter) => void;
}

const categories: Array<ParameterCategory | "All"> = [
  "All",
  "Thermal",
  "Mechanical",
  "Fluid",
  "Electrical",
  "Environmental",
];
const statuses: Array<ParameterStatus | "All"> = [
  "All",
  "Normal",
  "Warning",
  "Critical",
];

export default function FilterPanel({ filter, onChange }: FilterPanelProps) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Search parameter"
          size="small"
          fullWidth
          value={filter.search}
          onChange={(e) => onChange({ ...filter, search: e.target.value })}
        />
        <TextField
          select
          label="Category"
          size="small"
          sx={{ minWidth: 180 }}
          value={filter.category}
          onChange={(e) =>
            onChange({
              ...filter,
              category: e.target.value as ParameterFilter["category"],
            })
          }
        >
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Status"
          size="small"
          sx={{ minWidth: 160 }}
          value={filter.status}
          onChange={(e) =>
            onChange({
              ...filter,
              status: e.target.value as ParameterFilter["status"],
            })
          }
        >
          {statuses.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </Paper>
  );
}
