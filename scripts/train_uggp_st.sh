#!/usr/bin/env bash
set -euo pipefail
# TODO: replace with project-native entrypoint if different.
python train_uda.py --config configs/uggp_st_lightbox.yaml "$@"
