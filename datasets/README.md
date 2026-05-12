# Datasets

This repository does not redistribute SPEED or SPEED+ data. Please request/download them from the official channels.

Recommended structure:

```text
datasets/
├── SPEED/
│   ├── images/
│   ├── train.json
│   └── val.json
└── SPEED+/
    ├── synthetic/
    ├── lightbox/
    └── sunlamp/
```

## Notes

- Update dataset roots in config files under `configs/`.
- Keep large dataset files outside git tracking.
- Validate image/annotation paths before training.
