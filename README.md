# ConvMamSPN + UGGP-ST: Mamba-based Spacecraft 6D Pose Estimation with Geometric Pseudo-label Self-Training

This repository provides the official implementation of **ConvMamSPN** and **UGGP-ST** for spacecraft 6D pose estimation.

## Environment Setup

Use your uploaded environment file:

```bash
conda env create -f environment.yml
conda activate mambapose
```

If dependency resolution fails, install core packages manually:

```bash
pip install torch torchvision numpy scipy pyyaml tqdm opencv-python timm mamba-ssm causal-conv1d
```

## Real Project Codebase Layout (from your current research workspace)

```text
ConvMamSPN_UDA
├─ AM.yaml
├─ EffcientMethod/
├─ loaders/
├─ losses/
├─ main_single_stage.py
├─ main_single_stage_swisscube.py
├─ models/
├─ src/
├─ test_single_stage.py
├─ test_swisscube_adi.py
├─ train_uggp.py
├─ utils/
├─ visual/
└─ ...
```

> Note: This repository currently focuses on open-source packaging/docs/pages scaffolding. Keep your core training/testing files unchanged when migrating into this public structure.

## Open-source Structure (recommended target)

```text
ConvMamSPN-UGGP-ST/
├── README.md
├── LICENSE
├── requirements.txt
├── environment.yml
├── .gitignore
├── configs/
├── datasets/
├── docs/
├── scripts/
├── src/
├── tools/
├── checkpoints/
├── results/
└── citation.bib
```

## Dataset Preparation

See `datasets/README.md`.

- SPEED / SPEED+ must be downloaded by users.
- This repository does not include datasets.

## Training / Testing (Example Commands)

```bash
bash scripts/train_convmamspn.sh
bash scripts/test_convmamspn.sh
bash scripts/train_uggp_st.sh
bash scripts/eval_speedplus.sh
```

## UGGP-ST Pipeline

1. Train source-only ConvMamSPN model.
2. Generate target-domain pseudo labels.
3. Filter pseudo labels via uncertainty + geometric consistency.
4. Self-train student model.
5. Evaluate on SPEED+ Lightbox/Sunlamp.

## Weights / Results / Citation

- Pretrained weights link: **TODO**
- Final benchmark table: **TODO**
- Citation metadata in `citation.bib`: **TODO**

## GitHub Pages

Project page source is under `docs/`.

Deploy steps:
1. Push to GitHub.
2. Settings → Pages.
3. Source: Deploy from a branch.
4. Branch: `main`, Folder: `/docs`.
5. Save and wait for deployment.

Expected URL:
`https://zstar239.github.io/ConvMamSPN.github.io/`
