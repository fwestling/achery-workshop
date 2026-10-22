# workshop.achery.dev — deployment

One target: the **home server**, via Docker and Watchtower, like the product sites and achery.dev.
CI is in `.github/workflows/`.

## What CI does

| Workflow | Trigger | Action |
|---|---|---|
| `checks.yml` | PRs, branch pushes; called by site-deploy | library typecheck, site typecheck and tests |
| `site-deploy.yml` | push to `main` touching `site/`, `src/`, `COMPONENTS.md` or the lockfile | checks → build and push `achery-workshop-site` to ghcr.io → Watchtower pulls it |
| `release.yml` | a pushed `v*` tag | publishes the **library** to npm. Unrelated to the site; the site workflow never publishes |

The site renders the library from `src/`, so it shows what's on `main`, which can be ahead of the latest
npm release between a merge and its tag.

## 1. GitHub

- **Settings → Actions → General → Workflow permissions → Read and write** (to push to ghcr.io).
- No secrets: the site has no sign-in, analytics or API.

## 2. Server compose

Paste `site/deploy/compose-block.yml` into `/home/fredw/server/docker-compose.yml`. Check port **7230** is
free there first. It was chosen from the repos' compose blocks, not the server file.

## 3. Tunnel route

| Public hostname | → Service |
|---|---|
| `workshop.achery.dev` | `http://localhost:7230` |

One level under `achery.dev`, so Cloudflare's free `*.achery.dev` certificate covers it.

## 4. First deploy — in this order

1. GitHub permissions (§1).
2. Compose block (§2).
3. Push to `main` → `site-deploy.yml` builds and pushes the image.
4. On the server: `docker compose up -d achery-workshop-site` (first time only; Watchtower pulls updates after that).
5. Tunnel route (§3).
6. Check: `https://workshop.achery.dev` loads, and an unknown path such as `/nope` shows the 404 page.

## Building locally

```sh
pnpm --filter achery-workshop-site build        # → site/dist
docker build -f site/Dockerfile -t achery-workshop-site .   # context is the repo root
docker run --rm -p 7230:80 achery-workshop-site
```
