#!/usr/bin/env bash
set -euo pipefail
python test.py --config configs/convmamspn_speedplus.yaml --checkpoint checkpoints/convmamspn.pth "$@"
