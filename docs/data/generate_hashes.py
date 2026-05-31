import hashlib
import json

with open("principles.json", "r") as f:
    data = json.load(f)

for p in data["principles"]:
    if p["hash"] == "PENDING":
        p["hash"] = hashlib.sha256(p["text"].encode("utf-8")).hexdigest()
        print(f"id {p['id']}: {p['text']}")
        print(f"  hash: {p['hash']}\n")

with open("principles.json", "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Done. principles.json updated.")
