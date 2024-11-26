# Network Analysis Dashboard

A React-based dashboard for analyzing network traffic and performance data.

## Features

- Interactive timeline visualization
- Network performance dashboard
- S1 MME Protocol analysis
- SGW PGW traffic analysis
- Device and vendor analytics
- CSV data processing capabilities

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/syedazharmbnr1/react-slides-dashboard.git
cd react-slides-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up data directory:
Create a `data` directory in `public/` and add your CSV files.

4. Start the development server:
```bash
export NODE_OPTIONS=--openssl-legacy-provider
npm start
```

## Data Files Setup

The following files should be placed in `public/data/`:
- S1_MME_11_12_output_new.csv
- S5_S8__device_model_output.csv
- formatted_output_sgw_pgw_64_Context_new.csv
- formatted_output_sgw_pgw_64_Context_notfound.csv
- s1_mme_protol_state_98_summary.csv
- sgw_pgw_30.csv
- sgw_pgw_30_fails_brand.csv

Note: Data files are not included in the repository due to size constraints.

## Development

Built with:
- React 17
- Tailwind CSS
- CRACO
- Recharts for visualizations