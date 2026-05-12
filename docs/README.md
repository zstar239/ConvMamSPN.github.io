# Project Page (`docs/`)

This folder is designed for GitHub Pages.

## Local Preview

```bash
python -m http.server 8000 --directory docs
```

Then open `http://127.0.0.1:8000`.

## Deploy to GitHub Pages

1. Push repository to GitHub.
2. Open **Settings** → **Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Select branch `main`.
5. Select folder `/docs`.
6. Save and wait for deployment.
7. URL format: `https://<username>.github.io/<repository-name>/`.

## TODO before camera-ready release

- Replace placeholder figures in `docs/assets/`.
- Add final paper/code/model links.
- Update BibTeX with published metadata.
