import json

# Load extracted data
with open("colleges.json", "r", encoding="utf-8") as f:
    data = json.load(f)

clean = []
seen = set()

for item in data:

    college = item["college"].strip()

    course = item["course"].strip()

    # Remove duplicate spaces
    college = " ".join(college.split())
    course = " ".join(course.split())

    # Ignore empty rows
    if not college or not course:
        continue

    key = (college, course)

    if key in seen:
        continue

    seen.add(key)

    clean.append({
        "college": college,
        "course": course,
        "cutoffs": item["cutoffs"]
    })

# Save cleaned file
with open("clean_colleges.json", "w", encoding="utf-8") as f:
    json.dump(clean, f, indent=2, ensure_ascii=False)

print("Original records :", len(data))
print("Clean records    :", len(clean))
print("Done!")