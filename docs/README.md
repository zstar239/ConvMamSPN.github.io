# ConvMamSPN + UGGP-ST GitHub Pages Site

This folder is a ready-to-deploy static project page for `main/docs`.

## Files

```text
docs/
├── index.html
├── style.css
├── script.js
├── README.md
├── .nojekyll
├── assets/
│   ├── method_overview.png
│   ├── convmamspn_architecture.png
│   ├── uggp_st_pipeline.png
│   ├── placeholders/
│   └── visual/
│       ├── manifest.json
│       └── README.md
└── tools/
    └── generate_visual_manifest.py
```

## How to use

1. Copy this `docs/` folder to the root of your GitHub repository.
2. Put your 40 qualitative result images into:

```text
docs/assets/visual/
```

3. If your image names follow `domain_best_*.png` or `domain_best_*.jpg.png`, generate the carousel manifest:

```bash
python docs/tools/generate_visual_manifest.py
```

4. Preview locally:

```bash
cd docs
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploy on GitHub Pages

1. Push the repository to GitHub.
2. Go to repository `Settings`.
3. Open `Pages`.
4. Select `Deploy from a branch`.
5. Select branch `main`.
6. Select folder `/docs`.
7. Save and wait for deployment.

The URL is usually:

```text
https://<username>.github.io/<repository-name>/
```

## Manual TODO before final release

- Replace `Paper`, `Code`, `Model`, and `Dataset` links in `index.html`.
- Replace author and affiliation information.
- Fill the results table with verified final numbers.
- Replace the BibTeX placeholder after the paper is finalized.
- Check the generated architecture figures and replace them with final vector figures if needed.
