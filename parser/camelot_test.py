import camelot

tables = camelot.read_pdf(
    "parser/rparsermock2026.pdf",
    pages="all",
    flavor="lattice"
)

print("Total tables:", len(tables))

for i in range(5):
    print("\n========== TABLE", i + 1, "==========")
    print(tables[i].df.iloc[0:3, 0:5])