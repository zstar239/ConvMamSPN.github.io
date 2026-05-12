# ConvMamSPN + UGGP-ST: Mamba-based Spacecraft 6D Pose Estimation with Geometric Pseudo-label Self-Training

This repository provides the official implementation scaffold and project page for **ConvMamSPN** and **UGGP-ST** for spacecraft 6D pose estimation.

## Environment Setup (Synced to your real setup)

```bash
conda env create -f environment.yml
conda activate mambapose
```

If dependency resolution fails, install core packages manually:

```bash
pip install torch torchvision numpy scipy pyyaml tqdm opencv-python timm mamba-ssm causal-conv1d
```

## Real Project Codebase Layout (your current workspace)

```text
ConvMamSPN_UDA
├─ AM.yaml
├─ EffcientMethod
│  ├─ build_lmdb.py
│  ├─ fft_dataset.py
│  ├─ speed_lmdb_dataset.py
│  ├─ test_speed_lmdb_loader.py
│  └─ verification.py
├─ loaders
│  ├─ aug.py
│  ├─ speedplus_segmentation_precomputed.py
│  ├─ speedplus_segmentation_precomputed_image.py
│  └─ swisscube_dataset.py
├─ log
├─ losses
│  ├─ consistency.py
│  └─ consistency_annotated.py
├─ main_single_stage.py
├─ main_single_stage_swisscube.py
├─ models
│  ├─ AWloss.py
│  ├─ mambaConvNeXt_noFFT.py
│  ├─ speed.py
│  ├─ uncertainty.py
│  └─ uncertainty_annotated.py
├─ results
├─ src
│  ├─ __init__.py
│  ├─ speedscore.py
│  └─ utils.py
├─ test_single_stage.py
├─ test_swisscube_adi.py
├─ train.json
├─ train_uggp.py
├─ txt2csv.py
├─ utils
│  ├─ geometry_pnp.py
│  └─ geometry_pnp_annotated.py
├─ visual
│  ├─ 可视化前10后10.py
│  ├─ 域适应变化曲线2.py
│  ├─ 域适应对比传统.py
│  ├─ 域适应消融曲线.py
│  └─ 结果误差分布可视化.py
├─ 主干消融.log
├─ 主干消融_CLEAN.csv
├─ 主干消融_CLEAN.txt
├─ 批量测试.py
├─ 批量运行.py
└─ 批量运行stu.py
```

> This README keeps your real workspace structure visible while maintaining a clean open-source repository layout for public release.

## Open-source Structure (public repository)

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

Project page source is under `docs/` and already deployed.

Deployed URL:
`https://zstar239.github.io/ConvMamSPN.github.io/`
