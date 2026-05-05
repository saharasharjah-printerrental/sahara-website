import os
import re

replacements = [
    ("PrintIconer", "Printer"),
    ("PrintIcon", "Print"),
    ("StarIconting", "Starting"),
    ("StarIcontsWith", "startsWith"),
    ("UpgradeIcon", "Upgrade"),
    ("EmergencyIcon", "Emergency"),
    ("CancelIcon", "Cancel"),
    ("EastIcon coast", "East coast"),
    ("EastIcon", "East"),
    ("InventoryIcon", "Inventory"),
    ("PersonIcon", "Person"),
    ("Flexible", "Flexible"),
    ("items-StarIcont", "items-start"),
    ("ScheduleIcond", "Scheduled"),
    ("SecurityIcon", "Security"),
    ("RouterIcon", "Router"),
    ("opcity", "opacity"),
    ("aSyncIcon", "async"),
    ("DeleteIcon", "Delete"),
    ("handleDeleteIcon", "handleDelete"),
    ("handleFileUploadIcon", "handleFileUpload"),
    ("handleSaveIcon", "handleSave"),
    ("handleEditIcon", "handleEdit"),
]

src_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src")

fixed_files = []
error_files = []

for root, dirs, files in os.walk(src_path):
    for file in files:
        if file.endswith((".tsx", ".ts", ".jsx", ".js")):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                original = content
                for old, new in replacements:
                    content = content.replace(old, new)
                if content != original:
                    with open(filepath, "w", encoding="utf-8") as f:
                        f.write(content)
                    fixed_files.append(filepath)
                    print(f"Fixed: {filepath}")
            except Exception as e:
                error_files.append((filepath, str(e)))
                print(f"Error {filepath}: {e}")

print(f"\nTotal files fixed: {len(fixed_files)}")
if error_files:
    print(f"Errors: {len(error_files)}")
    for fp, err in error_files[:5]:
        print(f"  {fp}: {err}")
