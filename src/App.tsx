import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

// Business purpose: application shell with top navigation between the three modules:
// Parameter Dashboard, Parameter Comparison and Report Export.

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Comparison", path: "/comparison" },
  { label: "Report Export", path: "/export" },
];

export default function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ mr: 4 }}>
            Parameter Analytics
          </Typography>
          <Box>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                color="inherit"
                sx={{
                  "&.active": {
                    borderBottom: "2px solid white",
                    borderRadius: 0,
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }}>
        <AppRoutes />
      </Container>
    </>
  );
}
