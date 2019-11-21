# A GitHub Action for Generating HTML Docs

A building block for your workflows. Recommended used with [nix-emacs-ci](https://github.com/purcell/nix-emacs-ci)

Inspired by [Consistent Technical Documents Using Emacs and Org Mode](https://www.youtube.com/watch?v=0g9BcZvQbXU&feature=emb_title)

For use with [org-html-themes](https://github.com/fniessen/org-html-themes)

## Inputs:

### `docs-dir`

**Required** The directory where the org files are. Default `"docs"`.

## Outputs:

### `output-dir`

**Required** The directory where the org files are. Default `"public"`.

### `output-type` WIP

The type of files to output. Default `"html"`

## Usage:

If you choose to manange your own installed Emacs on the path of your action:

```yaml
uses: emiller88/org-html-action@master
with:
  doc-dir: docs
  output-dir: public
  output-type: html
```

Use with:

- [nix-emacs-ci](https://github.com/purcell/nix-emacs-ci)
- [github-pages-action](https://github.com/marketplace/actions/github-pages-action)

add this to the top of all of your org files

```org
#+SETUPFILE: https://fniessen.github.io/org-html-themes/setup/THEME-NAME.setup
```

```yaml
name: github pages

on:
  push:
    branches:
      - master

jobs:
  build-deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@master
        # with:
        #   submodules: true
      - name: Setup Emacs
        uses: purcell/setup-emacs@master
        with:
          version: 26.3

      - name: Build
        uses: emiller88/org-html-action@master
        with:
          doc-dir: docs
          output-dir: public
          output-type: html

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v2.5.0
        env:
          ACTIONS_DEPLOY_KEY: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          PUBLISH_BRANCH: gh-pages
          PUBLISH_DIR: ./public
```
