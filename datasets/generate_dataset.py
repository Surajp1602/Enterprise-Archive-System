from faker import Faker
import pandas as pd
import random

fake = Faker()

data = []

departments = [
    "IT",
    "HR",
    "Finance",
    "Sales",
    "Marketing",
    "Operations"
]

document_types = [
    "Invoice",
    "Contract",
    "Payslip",
    "Employee Record",
    "NDA"
]

for i in range(2500):

    data.append({
        "employee_name": fake.name(),
        "department": random.choice(departments),
        "joining_date": fake.date_between(
            start_date="-10y",
            end_date="today"
        ),
        "status": random.choice(
            ["Active", "Inactive"]
        ),
        "document_type": random.choice(
            document_types
        )
    })

df = pd.DataFrame(data)

df.to_csv(
    "employee_records.csv",
    index=False
)

print("Dataset Created")