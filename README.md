# Uncertainty-Guided Geometric Pseudo-label Self-Training for Monocular Non-cooperative Spacecraft Pose Estimation with ConvMamSPN

## Environment Setup

Please set up the environment according to `environment.yml`:

```bash
conda env create -f environment.yml
conda activate mambapose
```

## Dataset Preparation (SPEED / SPEED+)

SPEED and SPEED+ are publicly available from Stanford/SLAB resources.

- Stanford SLAB project page (SPEED / SPEED+ overview):  
  https://slab.stanford.edu/projects/speed
- SPEED+ Stanford Digital Repository entry:  
  https://purl.stanford.edu/wv398fc4383

Notes:
- This repository does not redistribute dataset files.
- Please download from official sources and organize locally before training.

## Training Entry Points (No shell scripts)

This project **does not use** `bash scripts/train_convmamspn.sh` or `bash scripts/test_convmamspn.sh`.

- Source-domain training entry: `main_single_stage.py`
- Target-domain UGGP training entry: `train_uggp.py`

Example commands:

```bash
# Step 1: source-domain training
python main_single_stage.py

# Step 2: UGGP target-domain training (teacher-student)
python train_uggp.py
```

## Actual UGGP Workflow (teacher-student online pseudo labels)

The current implementation is:

1. Train source-domain model with `main_single_stage.py`.
2. Run UGGP training with `train_uggp.py`.
3. During UGGP training, pseudo labels are generated online by the teacher model in real time and used to supervise the student model directly.

> There is **no separate offline pseudo-label generation script stage** in the current pipeline.

## Current directory structure

```text
ConvMamSPN_UDA/
├─ AM.yaml
├─ EffcientMethod/
├─ loaders/
├─ log/
├─ losses/
├─ main_single_stage.py
├─ main_single_stage_swisscube.py
├─ models/
├─ results/
├─ src/
├─ test_single_stage.py
├─ test_swisscube_adi.py
├─ train.json
├─ train_uggp.py
├─ txt2csv.py
├─ utils/
├─ visual/
├─ 主干消融.log
├─ 主干消融_CLEAN.csv
├─ 主干消融_CLEAN.txt
├─ 批量测试.py
├─ 批量运行.py
└─ 批量运行stu.py
```

> The repository layout is synchronized to your requested project structure.
