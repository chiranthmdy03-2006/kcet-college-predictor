import json

# Read cleaned data
with open("clean_colleges.json", "r", encoding="utf-8") as f:
    data = json.load(f)

new_data = []

for item in data:

    cutoffs = item.get("cutoffs", {})

    # GM cutoff
    gm = cutoffs.get("GM", "--")

    if gm == "--" or gm == "":
        cutoff = 999999
    else:
        try:
            cutoff = int(float(gm))
        except:
            cutoff = 999999

    record = {
        "college": item.get("college", ""),
        "branch": item.get("course", ""),
        "cutoff": cutoff,
        "district": "",
        "type": "Engineering",
        "naac": "",
        "highestPackage": "",
        "averagePackage": "",
        "website": "",
        "categories": {}
    }

    # Convert every category
    for category, rank in cutoffs.items():

        if rank == "--" or rank == "":
            record["categories"][category] = None
        else:
            try:
                record["categories"][category] = int(float(rank))
            except:
                record["categories"][category] = None

    new_data.append(record)

# Save to website folder
with open("public/data/colleges.json", "w", encoding="utf-8") as f:
    json.dump(new_data, f, indent=2, ensure_ascii=False)

print("================================")
print("Conversion Complete!")
print("Total Records:", len(new_data))
print("Saved to: public/data/colleges.json")
print("================================")