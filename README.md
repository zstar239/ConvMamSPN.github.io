# Uncertainty-Guided Geometric Pseudo-label Self-Training for Monocular Non-cooperative Spacecraft Pose Estimation with ConvMamSPN

## Environment Setup

Please set up the environment according to `environment.yml`:

```bash
conda env create -f environment.yml
conda activate mambapose
```

## Training Entry Points (No shell scripts)

This project **does not use** `scripts/train_convmamspn.sh` or `scripts/train_uggp_st.sh`.

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
3. During UGGP, pseudo labels are generated online by the teacher model in real time and used to supervise the student model directly.

> In other words, there is **no separate offline pseudo-label generation stage** in the current training pipeline.

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
