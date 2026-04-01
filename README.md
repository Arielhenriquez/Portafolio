# Waldis Henriquez — Portfolio

Personal portfolio site built with vanilla HTML, CSS, and JavaScript. Deployed via Firebase Hosting and Vercel.

## Live Site

https://portafolio-waldis-henriq-e228f.web.app

## Stack

- Vanilla HTML / CSS / JS — no frameworks, no build tools
- Firebase Hosting (auto-deploy via GitHub Actions on push to `main`)
- Vercel (auto-deploy on push to `main`)

## Project Structure

```
public/
  index.html   # Main page
  style.css    # All styles
  script.js    # Animations, nav, contact form
.github/
  workflows/
    deploy.yml # Firebase deploy workflow
```

## Deploy

Pushes to `main` trigger automatic deploys on both Firebase and Vercel.

For Firebase to work, the repo needs a `FIREBASE_SERVICE_ACCOUNT` secret set in:
**Settings → Secrets and variables → Actions**
