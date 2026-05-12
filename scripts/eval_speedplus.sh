#!/usr/bin/env bash
set -euo pipefail
# TODO: replace with project-native evaluation entrypoint if different.
python evaluate.py --config configs/convmamspn_speedplus.yaml "$@"
