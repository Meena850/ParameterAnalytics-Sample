# ParameterAnalytics

Sample reporting and analytics module (React + TypeScript + Material UI + React Router) that is intended to be integrated into another application. Uses mocked data only.

## Run

```powershell
npm install
npm run dev
```

## Structure

| Folder | Responsibility |
|---|---|
| `src/routes` | Route map (`/dashboard`, `/comparison`, `/export`) |
| `src/pages` | One page per business feature |
| `src/components` | Reusable UI parts (table, filters, export dialog) |
| `src/services` | `reportService.ts`: the only data access point (mocked) |
| `src/models` | TypeScript interfaces (`Parameter`, `Report`) |

## Features

1. **Parameter Dashboard**: status summary and a filterable parameter table.
2. **Parameter Comparison**: side-by-side comparison of selected parameters.
3. **Report Export**: filter, then export to CSV or JSON, with export history.
