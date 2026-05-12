#!/usr/bin/env python3
"""Generate docs/assets/visual/manifest.json for the GitHub Pages carousel.

Run from the repository root:
    python docs/tools/generate_visual_manifest.py

The script groups images by the prefix before `_best_`, for example:
    speed_best_img000192.jpg.png      -> speed
    lightbox_best_img000848.jpg.png   -> lightbox
    sunlamp_best_img000342.jpg.png    -> sunlamp
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VISUAL_DIR = ROOT / "assets" / "visual"
OUT_FILE = VISUAL_DIR / "manifest.json"
IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}

TITLE_MAP = {
    "speed": ("SPEED", "Synthetic source-domain results"),
    "speedplus": ("SPEED+ Synthetic", "Synthetic training-domain visualization"),
    "synthetic": ("SPEED+ Synthetic", "Synthetic training-domain visualization"),
    "lightbox": ("SPEED+ Lightbox", "Real target-domain results"),
    "sunlamp": ("SPEED+ Sunlamp", "Real target-domain results"),
}

DESCRIPTION_MAP = {
    "speed": "Predictions on synthetic spacecraft images with precise pose annotations.",
    "speedplus": "Predictions on SPEED+ synthetic images.",
    "synthetic": "Predictions on synthetic spacecraft images.",
    "lightbox": "Qualitative results under the Lightbox domain with background and illumination shift.",
    "sunlamp": "Qualitative results under strong illumination and severe appearance shift.",
}


def is_image(path: Path) -> bool:
    name = path.name.lower()
    # handle names such as .jpg.png naturally because Path.suffix is .png
    return path.is_file() and path.suffix.lower() in IMAGE_EXTS and not name.startswith(".")


def domain_id(filename: str) -> str:
    match = re.match(r"(.+?)_best_", filename)
    if match:
        return match.group(1).lower()
    return filename.split("_")[0].lower()


def main() -> None:
    VISUAL_DIR.mkdir(parents=True, exist_ok=True)
    groups: dict[str, list[str]] = {}
    for path in sorted(VISUAL_DIR.iterdir()):
        if path.name == "manifest.json" or not is_image(path):
            continue
        did = domain_id(path.name)
        groups.setdefault(did, []).append(path.name)

    preferred = ["speed", "speedplus", "synthetic", "lightbox", "sunlamp"]
    ordered_ids = []
    for did in preferred:
        if did in groups and did not in ordered_ids:
            ordered_ids.append(did)
    ordered_ids.extend([did for did in sorted(groups) if did not in ordered_ids])

    domains = []
    for did in ordered_ids[:4]:
        title, subtitle = TITLE_MAP.get(did, (did.upper(), "Domain visualization"))
        domains.append({
            "id": did,
            "title": title,
            "subtitle": subtitle,
            "description": DESCRIPTION_MAP.get(did, "Qualitative visualization results."),
            "images": groups[did],
        })

    # Keep four cards even if only three domains are present.
    while len(domains) < 4:
        idx = len(domains) + 1
        domains.append({
            "id": f"domain{idx}",
            "title": f"Domain {idx}",
            "subtitle": "Update manifest.json",
            "description": "Add images to docs/assets/visual/ and regenerate the manifest.",
            "images": [],
        })

    OUT_FILE.write_text(json.dumps({"domains": domains}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {OUT_FILE} with {sum(len(d['images']) for d in domains)} images across {len(domains)} carousel cards.")


if __name__ == "__main__":
    main()
