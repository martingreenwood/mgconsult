# Forge cache headers

The production sites currently return a four-hour browser cache lifetime for
static files. These snippets raise cacheable resources to Lighthouse's
recommended minimum without caching the SPA HTML or Statamic API responses.

## Install

Add each snippet to the matching site's Nginx `server` block in Laravel Forge:

- `martingreenwood.com-cache.conf` for `martingreenwood.com`
- `api.martingreenwood.com-cache.conf` for `api.martingreenwood.com`

Validate and reload Nginx:

```sh
sudo nginx -t
sudo service nginx reload
```

Purge the two hostnames from Cloudflare after reloading so responses carrying
the previous four-hour header are replaced immediately.

If Cloudflare still returns `max-age=14400`, set the zone's Browser Cache TTL
to **Respect Existing Headers**. The expected values are:

- `/assets/*` and `/fonts/*` on the SPA: `max-age=31536000`
- `/assets/*` on the Statamic API: `max-age=2592000`
- HTML and API JSON: unchanged

Cookiebot controls its own cache headers and will remain in the third-party
section of the audit.
