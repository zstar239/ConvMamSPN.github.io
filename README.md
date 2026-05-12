# Uncertainty-Guided Geometric Pseudo-label Self-Training for Monocular Non-cooperative Spacecraft Pose Estimation with ConvMamSPN

## Environment Setup / 环境配置

Please set up the environment according to `environment.yml`:

```bash
conda env create -f environment.yml
conda activate mambapose
```

---

## Dataset Preparation / 数据集准备

SPEED and SPEED+ are publicly available from official Stanford/SLAB pages.
SPEED 和 SPEED+ 数据集可从官方 Stanford/SLAB 页面获取。

- Stanford SLAB project page (SPEED / SPEED+):  
  https://slab.stanford.edu/projects/speed
- SPEED+ Stanford Digital Repository:  
  https://purl.stanford.edu/wv398fc4383

Notes / 说明：
- This repository does not redistribute dataset files.  
  本仓库不重新分发数据集文件。
- Please download from official sources and organize locally.  
  请从官方地址下载并在本地组织数据。

---

## Training ConvMamSPN / 训练 ConvMamSPN

**No shell scripts are used in this project.**  
**本项目不使用任何 `sh` 脚本进行训练。**

Use Python entry files directly:

```bash
# source-domain training / 源域训练
python main_single_stage.py

# UGGP target-domain training / UGGP目标域训练
python train_uggp.py
```

---

## UGGP Workflow (Actual) / UGGP真实流程

Current implementation / 当前实现：

1. Train source-domain model with `main_single_stage.py`.  
   先使用 `main_single_stage.py` 训练源域模型。
2. Run UGGP training with `train_uggp.py`.  
   再使用 `train_uggp.py` 进行 UGGP 训练。
3. Teacher model generates pseudo labels online in real time to supervise the student model.  
   训练过程中由教师模型**实时在线生成伪标签**监督学生模型。

> There is **no separate offline pseudo-label generation stage**.
> 当前流程**没有离线伪标签预生成步骤**。

---

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
