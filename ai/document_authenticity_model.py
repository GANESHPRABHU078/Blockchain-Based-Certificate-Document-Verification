import argparse
import hashlib
import json
import os


def analyze(file_path: str, expected_hash: str) -> dict:
    with open(file_path, "rb") as handle:
        payload = handle.read()

    observed_hash = hashlib.sha256(payload).hexdigest()
    header = payload[:8]
    score = 0.55
    signals = []

    if payload.startswith(b"%PDF"):
        score += 0.2
        signals.append("Valid PDF header detected.")
    else:
        signals.append("Missing canonical PDF header.")

    if expected_hash and observed_hash.lower() == expected_hash.lower():
        score += 0.2
        signals.append("Uploaded file hash matches blockchain anchor.")
    elif expected_hash:
        score -= 0.25
        signals.append("Uploaded file hash differs from blockchain anchor.")

    if b"/ModDate" in payload and b"/CreationDate" in payload:
        score += 0.05
        signals.append("PDF metadata fields are present.")
    else:
        signals.append("Limited embedded metadata found.")

    if b"%%EOF" in payload[-128:]:
        score += 0.05
        signals.append("EOF marker present near file tail.")
    else:
        score -= 0.05
        signals.append("EOF marker placement is unusual.")

    score = max(0.01, min(0.99, score))

    if score >= 0.85:
        summary = "High confidence that the document is authentic."
    elif score >= 0.65:
        summary = "Document appears consistent, but manual review is still advisable."
    else:
        summary = "Potential tampering indicators detected."

    return {
        "authenticityScore": round(score, 4),
        "summary": summary,
        "signals": signals,
        "observedHash": observed_hash,
        "headerHex": header.hex(),
        "sizeBytes": os.path.getsize(file_path),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--file", required=True)
    parser.add_argument("--expected-hash", default="")
    args = parser.parse_args()
    print(json.dumps(analyze(args.file, args.expected_hash)))


if __name__ == "__main__":
    main()
