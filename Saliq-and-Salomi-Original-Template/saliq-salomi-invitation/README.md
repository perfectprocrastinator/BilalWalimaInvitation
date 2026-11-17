# Saliq & Salomi - Walima Invitation

This version uses the original invitation template, opening envelope, animations, arch, ornaments, fonts, colours, section order and layout. Only event wording and details have been replaced. The supplied location QR has been added within the original venue section. The closing section contains the blessing, invitation message, couple names and date.

Open the accompanying `Saliq-and-Salomi-Original-Template.html` directly in a browser. It contains all fonts and assets and works without installation. Direction and phone links use your usual apps.

## Editable website

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

Upload the contents of `dist/` to any static web host to share a website link. No backend or API keys are needed. Set `VITE_SITE_URL` to the actual hosted address before building for production sharing previews.

Event details are in `src/config/wedding.js`. The calendar uses Tuesday, 22 December 2026 from 7 PM to 11 PM India time. The supplied QR is in `src/assets/venue-qr.jpg` and its exact destination is used for directions.

Bundled font licenses are included in `public/licenses/` and `dist/licenses/`.
