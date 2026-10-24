# Udara & Shainy — Wedding Invitation

## Personalized guest links

Same site for everyone. Only the guest name in the URL changes:

```
https://udara75.github.io/wedding/?guest=udara-kavinda
https://udara75.github.io/wedding/?guest=shainy-tharushika
```

Add guests in `guests.js`, then send each person their link.

Test files:
- `guests-test.txt` — sample names
- `invite-links-test.txt` — sample links to send

## Upload to GitHub Pages

Upload: `index.html`, `styles.css`, `main.js`, `guests.js`, `cover.png`

## GitHub 400 error

If the browser shows “400 Bad Request”:
1. Open `https://udara75.github.io/wedding/` (not `github.com/...`)
2. Check **Settings → Pages** is set to branch `main`
3. Wait 1–2 minutes after uploading
4. Try a Private/Incognito tab
