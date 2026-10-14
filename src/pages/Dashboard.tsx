import { useEffect, useState } from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import FilterPanel from "../components/FilterPanel";
import ParameterTable from "../components/ParameterTable";
import { Parameter, ParameterFilter } from "../models/Parameter";
import { getParameters } from "../services/reportService";

// Business purpose: Parameter Dashboard. Gives engineers a quick view of
// how many parameters are normal, in warning, or critical.

const defaultFilter: ParameterFilter = {
  search: "",
  category: "All",
  status: "All",
};

export default function Dashboard() {
  const [filter, setFilter] = useState<ParameterFilter>(defaultFilter);
  const [parameters, setParameters] = useState<Parameter[]>([]);

  useEffect(() => {
    getParameters(filter).then(setParameters);
  }, [filter]);

  const count = (status: Parameter["status"]) =>
    parameters.filter((p) => p.status === status).length;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Parameter Dashboard
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
        <SummaryCard label="Total Parameters" value={parameters.length} />
        <SummaryCard label="Normal" value={count("Normal")} />
        <SummaryCard label="Warning" value={count("Warning")} />
        <SummaryCard label="Critical" value={count("Critical")} />
      </Stack>

      <FilterPanel filter={filter} onChange={setFilter} />
      <ParameterTable parameters={parameters} />
    </>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <Card sx={{ flex: 1 }}>
      <CardContent>
        <Typography color="text.secondary">{label}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
}
