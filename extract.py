import pdfplumber
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

HEADER = "Course Name"

colleges = []

current_college = None
reading = False
branch_lines = []

with pdfplumber.open(PDF) as pdf:

    for page in pdf.pages:

        text = page.extract_words()

        if not text:
            continue

        lines = text.split("\n")

        i = 0

        while i < len(lines):

            line = lines[i].strip()

            # ---------- New College ----------
            if line.startswith("College: E"):

                if current_college is not None:
                    colleges.append(current_college)

                current_college = {
                    "college": line.replace("College:", "").strip(),
                    "branches": []
                }

                branch_lines = []
                reading = False
                i += 1
                continue

            # ---------- Table Starts ----------
            if HEADER in line:
                reading = True
                branch_lines = []
                i += 1
                continue

            if not reading:
                i += 1
                continue

            # ---------- Table Ends ----------
            if line.startswith("Generated on"):
                reading = False
                branch_lines = []
                i += 1
                continue

            if line.startswith("College:"):
                i += 1
                continue

            nums = re.findall(r'--|\d+\.\d+|\d+', line)

            # Cutoff row
            if len(nums) >= 10:

                branch = " ".join(branch_lines).replace("  ", " ").strip()

                while len(nums) < len(CATEGORIES):
                    nums.append("--")

                obj = {"branch": branch}

                for c, v in zip(CATEGORIES, nums):
                    if v == "--":
                        obj[c] = None
                    else:
                        obj[c] = int(float(v))

                if current_college is not None:
                    current_college["branches"].append(obj)

                branch_lines = []

            else:

                if (
                    line != ""
                    and line != "Course Name"
                    and not line.startswith("Generated on")
                ):
                    branch_lines.append(line)

            i += 1

if current_college is not None:
    colleges.append(current_college)

with open("public/data/colleges.json","w",encoding="utf-8") as f:
    json.dump(colleges,f,indent=2,ensure_ascii=False)

print("Total Colleges:",len(colleges))
print("Done")