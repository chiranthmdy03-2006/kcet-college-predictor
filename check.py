import json

with open("public/data/colleges.json", encoding="utf-8") as f:
    colleges = json.load(f)

print("Total colleges:", len(colleges))

print("\nFirst 10 college codes:")
for c in colleges[:10]:
    print(c["college"].split()[0])