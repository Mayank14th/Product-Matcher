Lightweight web app to find visually similar products by image. Frontend-first React app that computes perceptual hashes to match images.


## Features
- Upload image file or paste image URL
- View uploaded image and ranked similar products
- Filter by similarity score and category
- 50-product JSON dataset (public image URLs)
- Loading states and basic error handling


## Quick start (frontend only)
1. `git clone <repo>`
2. `cd visual-product-matcher`
3. `npm install`
4. `npm run start`


Open http://localhost:3000


## Optional: Precompute product pHashes (recommended)
This will download product images and compute a consistent pHash server-side.


1. `node --version` >= 16
2. `cd scripts`
3. `npm install image-hash sharp node-fetch@2 jimp` (or run `npm install` from root if script uses root `package.json`)
4. `node precompute_hashes.js ../src/data/products.json ../src/data/products_with_hashes.json`


The script will output `products_with_hashes.json` which the frontend can consume.


## Deployment
- For frontend-only: push to GitHub and deploy on Vercel or Netlify (automatic from repo).
- For server-side precompute: you can run script during CI (GitHub Actions) and commit `products_with_hashes.json` or host a tiny Node API on Render/Heroku.


## Notes
- This is intentionally simple and privacy-friendly. If you need higher accuracy, integrate an embedding model (CLIP) and a vector DB (Milvus, Pinecone, or Weaviate).# Product-Matcher
