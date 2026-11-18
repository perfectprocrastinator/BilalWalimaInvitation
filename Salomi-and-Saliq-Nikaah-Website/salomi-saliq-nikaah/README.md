# Salomi & Saliq - Nikaah Invitation

Thursday, 17 December 2026. Reception: 7:00 PM TO 10:30 PM (India time).
Moti Mahal / Level -2, Maharaja Banquet, Trivedi Complex, Church Road, Mira Road East.

A pink version of the original animated envelope and architectural invitation template. Hosts, names, groom parent line, date, reception time, venue, family compliments, both phone numbers and the new Google Maps link follow the supplied details.

Open the accompanying `Salomi-and-Saliq-Nikaah.html` directly in a browser. All fonts and visual assets are included, so the invitation works without an internet connection. Map and phone links open the usual apps. The QR opens the exact supplied Google Maps link.

## Editable project

Use Node.js 20.19 or newer:

```
npm ci
npm run dev
```

For production:

```
npm test
npm run build
```

Upload `dist/` to a static web host to share a public link. The invitation has not been published by this project. Edit `src/config/wedding.js` to change the wording or event details. Set `VITE_SITE_URL` to the real public website address before building sharing metadata for a hosted version.

The calendar download covers the supplied reception window, 7:00 PM to 10:30 PM in Asia/Kolkata. No separate Nikah ceremony start time has been invented.

Font licenses are included in `public/licenses/` and `dist/licenses/`.
