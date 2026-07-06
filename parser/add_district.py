import json

# Load existing JSON
with open("public/data/colleges.json", "r", encoding="utf-8") as f:
    colleges = json.load(f)

for college in colleges:

    text = college["college"]

    # Split by comma
    parts = [p.strip() for p in text.split(",")]

    district = "Unknown"

    if len(parts) >= 2:
        district = parts[-1]

    district = (
        district.replace("BANGALORE", "Bengaluru Urban")
                .replace("Bangalore", "Bengaluru Urban")
                .replace("MYSORE", "Mysuru")
                .replace("Mysore", "Mysuru")
                .replace("BELGAUM", "Belagavi")
                .replace("GULBARGA", "Kalaburagi")
                .replace("BIJAPUR", "Vijayapura")
                .replace("BELLARY", "Ballari")
    )

    college["district"] = district

# Save JSON
with open("public/data/colleges.json", "w", encoding="utf-8") as f:
    json.dump(colleges, f, indent=2, ensure_ascii=False)

print("✅ Districts Added Successfully")