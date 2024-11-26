# Data Directory

This directory contains CSV files for network analysis.

## Included Files (< 100MB)
- S1_MME_11_12_output_new.csv (2.6 KB)
- S5_S8__device_model_output.csv (232 KB)
- formatted_output_sgw_pgw_64_Context_new.csv (4.6 KB)
- formatted_output_sgw_pgw_64_Context_notfound.csv (3.9 KB)
- s1_mme_protol_state_98_summary.csv (3.8 KB)
- sgw_pgw_30.csv (10.9 KB)
- sgw_pgw_30_fails_brand.csv (57.5 KB)
- ps_mme_attach_fail_brand_samsung_*.csv files (~8 KB each)

## Large Files Not Included (> 100MB)
These files are required but not included in the repository due to size constraints:

### S5_S8 Directory
- S5_S8_2024_11_20_15_27_33.csv (887 MB)
- S5_S8_2024_11_25_10_10_12.csv (976 MB)

To obtain these files, please:
1. Contact the repository administrator
2. Place them in the `public/data/S5_S8/` directory
3. Ensure the filenames match exactly

## Data Structure
Each CSV file contains specific network metrics:
- MME files contain Mobile Management Entity data
- SGW/PGW files contain Serving and PDN Gateway metrics
- S5_S8 files contain interface traffic data

## Setup Instructions
1. Clone the repository
2. Create the `public/data/S5_S8` directory if it doesn't exist
3. Copy the large files into the S5_S8 directory
4. All other files are included in the repository