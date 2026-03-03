# Travana Tacos website

Static website (Cloudflare Pages friendly): plain HTML + CSS + a tiny bit of vanilla JS.

## Quick edits done

- **Site-wide content**: `site-config.js` (brand name, banner, first event, menu text, contact links, hero images)
- **Look & feel**: `styles.css`
- **Behavior / animations**: `app.js` (nav toggle, scroll reveal, map embed, mailto form)

## Going live

When you’re actively serving:

1. Open `site-config.js`
2. Set:

```js
operations: { inOperation: true }
```

3. Update:

```js
today: {
  status: "…",
  hours: "…",
  maps: "https://www.google.com/maps/search/?api=1&query=…"
}
```

That will automatically update the Home + Find Us pages.
