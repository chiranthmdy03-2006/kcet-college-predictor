import json

# Load data
with open("public/data/colleges.json", "r", encoding="utf-8") as f:
    colleges = json.load(f)

# Branches that are actually suffixes
suffixes = (
    "ENGINEERING",
    "ENGG",
    "TECHNOLOGY",
    "SCIENCE",
    "COMPUTING",
    "DESIGN",
    "MANAGEMENT",
)

for college in colleges:
    fixed = []
    i = 0

    while i < len(college["branches"]):

        current = college["branches"][i]

        if i + 1 < len(college["branches"]):

            nxt = college["branches"][i + 1]

            b1 = current["branch"].strip()
            b2 = nxt["branch"].strip()

            # Join wrapped names
            if (
                b2.startswith("AND ")
                or b2.startswith("& ")
                or b2 in suffixes
            ):
                current["branch"] = b1 + " " + b2
                fixed.append(current)
                i += 2
                continue

        fixed.append(current)
        i += 1

    college["branches"] = fixed

with open("public/data/colleges_fixed.json", "w", encoding="utf-8") as f:
    json.dump(colleges, f, indent=2, ensure_ascii=False)

print("DONE")