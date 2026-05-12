# ConvMamSPN + UGGP-ST: Mamba-based Spacecraft 6D Pose Estimation with Geometric Pseudo-label Self-Training

This repository provides the official implementation of **ConvMamSPN** and **UGGP-ST** for spacecraft 6D pose estimation. ConvMamSPN is a lightweight keypoint-based pose estimation network with a ConvNeXt backbone and a Mamba-based hierarchical decoder. UGGP-ST is an uncertainty-guided geometric pseudo-label self-training framework for unsupervised domain adaptation from synthetic to real spacecraft images.

> Status: repository is being cleaned for public release. Core algorithm logic should remain unchanged; placeholders and TODO items are kept where assets or metadata are not yet publicly available.

## Highlights

- Keypoint heatmap based spacecraft 6D pose estimation
- ConvNeXt backbone with Mamba-based hierarchical decoder
- CrossScanMamba for directional long-range context modeling
- MambaResBlock for efficient global-local feature refinement
- PnP-based geometric pose recovery (e.g., EPnP / RANSAC PnP)
- Uncertainty-guided pseudo-label filtering
- Geometric consistency based pseudo-label validation
- Teacher-student self-training for synthetic-to-real domain adaptation
- Evaluation on SPEED / SPEED+ Lightbox and Sunlamp domains

## Repository Structure

```text
ConvMamSPN-UGGP-ST/
├── README.md
├── LICENSE
├── requirements.txt
├── environment.yml
├── .gitignore
├── configs/
│   ├── convmamspn_speed.yaml
│   ├── convmamspn_speedplus.yaml
│   ├── uggp_st_lightbox.yaml
│   └── uggp_st_sunlamp.yaml
├── datasets/
│   └── README.md
├── docs/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── README.md
│   └── assets/
├── scripts/
│   ├── train_convmamspn.sh
│   ├── test_convmamspn.sh
│   ├── train_uggp_st.sh
│   └── eval_speedplus.sh
├── src/
│   ├── models/
│   ├── datasets/
│   ├── losses/
│   ├── engine/
│   ├── utils/
│   └── pnp/
├── tools/
│   ├── visualize_keypoints.py
│   ├── visualize_pose.py
│   ├── generate_pseudo_labels.py
│   └── evaluate_results.py
├── checkpoints/
│   └── README.md
├── results/
│   └── README.md
└── citation.bib
```

## Environment Setup

```bash
conda create -n convmamspn python=3.8
conda activate convmamspn
pip install -r requirements.txt
```

### Notes for `mamba-ssm`

`mamba-ssm` and `causal-conv1d` may require CUDA/PyTorch version alignment. Please install versions compatible with your local environment, then verify with:

```bash
python -c "import torch, mamba_ssm; print(torch.__version__)"
```

## Dataset Preparation

Please follow `datasets/README.md`.

- SPEED / SPEED+ datasets must be requested/downloaded by users.
- This repository does **not** redistribute dataset files.

## Training ConvMamSPN

```bash
bash scripts/train_convmamspn.sh
```

Equivalent direct command:

```bash
python train.py --config configs/convmamspn_speed.yaml
```

## Testing ConvMamSPN

```bash
bash scripts/test_convmamspn.sh
```

Equivalent direct command:

```bash
python test.py --config configs/convmamspn_speedplus.yaml --checkpoint checkpoints/convmamspn.pth
```

## UGGP-ST Workflow

```text
Step 1: Train source-only model
Step 2: Generate pseudo labels on target domain
Step 3: Filter pseudo labels with uncertainty + geometric consistency
Step 4: Self-train student model
Step 5: Evaluate on Lightbox / Sunlamp
```

Reference script:

```bash
bash scripts/train_uggp_st.sh
```

## Model Weights

Pre-trained weights will be released at: **TODO** (Google Drive / Baidu Netdisk / Hugging Face / GitHub Release).

## Experimental Results (Placeholder)

| Method | Domain | SPEED_t | SPEED_r | SPEED |
|--------|--------|---------|---------|-------|
| Source-only | Lightbox | TODO | TODO | TODO |
| ConvMamSPN + UGGP-ST | Lightbox | TODO | TODO | TODO |
| Source-only | Sunlamp | TODO | TODO | TODO |
| ConvMamSPN + UGGP-ST | Sunlamp | TODO | TODO | TODO |

## Visualizations

Expected figure paths:

- `docs/assets/architecture.png`
- `docs/assets/uggp_st_pipeline.png`
- `docs/assets/keypoint_visualization.png`
- `docs/assets/pose_visualization.png`
- `docs/assets/domain_adaptation_result.png`

If missing, placeholder SVG assets are currently provided in `docs/assets/` and should be replaced before release.

## Citation

See `citation.bib`.

```bibtex
@article{convmamspn_uggpst_2026,
  title   = {TODO: ConvMamSPN + UGGP-ST},
  author  = {TODO},
  journal = {TODO},
  year    = {2026}
}
```

## License

The license will be updated before the official release.

## GitHub Pages Deployment

Detailed instructions are in `docs/README.md`. Quick steps:

1. Push this repository to GitHub.
2. Go to **Settings** → **Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Set **Branch** to `main` and folder to `/docs`.
5. Save and wait for deployment.
6. Site URL is typically `https://<username>.github.io/<repository-name>/`.
