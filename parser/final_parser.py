import camelot
import pdfplumber
import pandas as pd
import json
import re

PDF = "parser/rparsermock2026.pdf"

CATEGORIES = [
    "1G","1K","1R","2AG","2AK","2AR","2BG","2BK","2BR",
    "3AG","3AK","3AR","3BG","3BK","3BR",
    "GM","GMK","GMP","GMR",
    "NRI","OPN","OTH",
    "S1G","S1K","S1R",
    "S2G","S2K","S2R",
    "S3G","S3K","S3R",
    "S4G","S4K","S4R",
    "STG","STK","STR"
]

# -----------------------
# Read College Headers
# -----------------------

headers = []

with pdfplumber.open(PDF) as pdf:
    for page in pdf.pages:
        text = page.extract_text()

        if not text:
            continue

        for line in text.split("\n"):
            if line.startswith("College:"):
                headers.append(
                    line.replace("College:", "").strip()
                )

print("Headers =", len(headers))

# -----------------------
# Read Tables
# -----------------------

tables = camelot.read_pdf(
    PDF,
    pages="all",
    flavor="lattice"
)

print("Tables =", len(tables))

if len(headers) != len(tables):
    raise Exception("Headers and Tables count do not match!")

colleges = []

# -----------------------
# Convert
# -----------------------

for college_name, table in zip(headers, tables):

    df = table.df

    # Remove completely empty rows
    df = df.replace("", pd.NA)
    df = df.dropna(how="all")
    df = df.reset_index(drop=True)

    # First row is header
    df.columns = df.iloc[0]
    df = df.iloc[1:].reset_index(drop=True)

    branches = []

    for _, row in df.iterrows():

        branch = str(row["Course Name"]).replace("\n"," ").strip()

        if branch == "" or branch.lower() == "course name":
            continue

        item = {
            "branch": re.sub(r"\s+"," ",branch)
        }

        for cat in CATEGORIES:

            if cat not in df.columns:
                item[cat] = None
                continue

            value = str(row[cat]).strip()

            if value in ["","--","nan"]:
                item[cat] = None
            else:
                try:
                    item[cat] = int(float(value))
                except:
                    item[cat] = None

        branches.append(item)

    colleges.append({
        "college": college_name,
        "branches": branches
    })

# -----------------------
# Save
# -----------------------

with open(
    "public/data/colleges.json",
    "w",
    encoding="utf8"
) as f:
    json.dump(colleges, f, indent=2, ensure_ascii=False)

print()
print("SUCCESS")
print("Colleges =", len(colleges))
print("Saved to public/data/colleges.json")