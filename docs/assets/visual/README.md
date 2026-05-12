# Visual Assets

Put qualitative result images in this folder:

```text
docs/assets/visual/
├── speed_best_img000192.jpg.png
├── lightbox_best_img000848.jpg.png
├── sunlamp_best_img000342.jpg.png
└── ...
```

The page reads `manifest.json` to build the four carousel cards. If you add, remove, or rename images, update `manifest.json` manually or run:

```bash
python docs/tools/generate_visual_manifest.py
```

The generator groups files by the prefix before `_best_`, such as `speed`, `lightbox`, and `sunlamp`.
