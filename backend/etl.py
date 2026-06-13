import pandas as pd
from config import engine
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

csv_file = BASE_DIR / "datasets" / "employee_records.csv"

print("Looking for:", csv_file)

df = pd.read_csv(csv_file)

df.to_sql(
    "active_records",
    engine,
    if_exists="append",
    index=False
)

print("Loaded Successfully")