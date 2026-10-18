# Moonlit Courtyard of Lucknow

A complete React invitation for the Walima of **Bilal Ahmad & Imama ALI**, on **27 December 2026 at 7:00 PM IST**, at **Kalyan Mandap, Vikas Nagar, Lucknow**.

Built with React, Vite, Tailwind CSS, and Framer Motion. The design uses an animated ivory envelope, a Mughal arch, original SVG jasmine and embroidery ornaments, and a deep emerald celebration section. It needs no backend or API keys.

## Install and run

Use **Node.js 20.19 or newer** and npm. Open a terminal in this project folder, then run:

```sh
npm ci
npm run dev
```

`npm install` is also supported; `npm ci` installs the exact versions in the included lockfile.

Open [http://localhost:5173](http://localhost:5173). Keep the terminal running; press Ctrl+C to stop. The development server uses port 5173 and reports an error if that port is already occupied.

## Build, preview, and test

```sh
npm test
npm run build
npm run preview
```

The production files are written to `dist/`. Preview them at [http://localhost:4173](http://localhost:4173). **Both local addresses work only on this computer; a local production preview is not a public website.** Use the server commands rather than opening `index.html` directly from the file system.

The eight automated tests cover the event instant, calendar timezone and escaping, omission of an end time, the supplied venue link and search fallback, countdown values, and the transition after the event starts.

## Edit the invitation

The single `wedding` object in `src/config/wedding.js` contains the names, monogram, occasion, venue, displayed date and time, event instant, invitation wording, title, and sharing description.

- Keep `dateISO`, `dateLabel`, `timeLabel`, and timezone fields consistent when changing the event time.
- Update both the separate venue fields and `venue.fullAddress` when changing the location.
- Update the title and description fields when changing names or event details.
- Keep `calendarUid` stable when updating this same event; use a new value for a different event.

The sharing image and favicon are regenerated from this configuration automatically before `npm run dev` and `npm run build`. To regenerate them independently, run:

```sh
npm run generate:sharing
```

If you edit the configuration while the development server is running, restart it to refresh generated sharing assets and page metadata. Typography, spacing, colors, and responsive rules are in `src/styles.css`; the reusable ornaments are in `src/components/Ornaments.jsx`.

## Calendar and directions

**Get Directions** opens the exact [Google Maps venue link supplied by the couple](https://maps.app.goo.gl/RUKYfvfYy68rrPFH7). The same link is included in the calendar invitation. Edit `venue.mapsUrl` in the configuration to change it. If that field is empty, directions falls back to a Google Maps search for `venue.fullAddress`; no coordinates are invented.

**Save the Date** downloads `Bilal-and-Imama-Walima.ics`. Open the downloaded file in a calendar application to add it. The event begins at `2026-12-27T19:00:00+05:30`, equivalent to `2026-12-27T13:30:00Z`. The calendar file uses `DTSTART;TZID=Asia/Kolkata:20261227T190000` and includes the IST timezone definition. It intentionally contains **no `DTEND` or `DURATION`**, because no end time was provided. Calendar applications may choose their own display duration when importing an event without an end time.

The countdown uses the same absolute event instant regardless of the guest's timezone. Once the event begins, a warm celebration message replaces the timer.

## Publish and share on WhatsApp

1. Create a static website on your preferred hosting service and obtain its actual public HTTPS address. This project is configured to be served at the root of a domain or hosting subdomain.
2. Copy `.env.example` to `.env.local`. On Windows PowerShell, use `Copy-Item .env.example .env.local`.
3. Set `VITE_SITE_URL` in `.env.local` to that **actual public HTTPS address**. Do not use a localhost address or leave the example domain in place. For a hosted build, set the same variable in your host's build environment instead.
4. Run `npm run build` after setting the address. For hosting services that build from source, use `npm ci` as the install command, `npm run build` as the build command, and `dist` as the publish/output directory. For manual deployment, upload the contents of `dist/`.
5. Open the deployed site on a phone and check the invitation, directions, and calendar download. Verify that the deployed `social-preview.png` loads publicly.
6. Share the **final hosted HTTPS link** in WhatsApp only after deployment is complete. The generated page includes a title, description, Open Graph and Twitter metadata, a 1200 × 630 sharing image, and a canonical URL when `VITE_SITE_URL` is set.

Rebuild and redeploy after changing the invitation or the public URL. WhatsApp may cache an earlier preview; the live invitation still reflects the deployed files.

The root URL opens the envelope each time the page loads. The hash links `#invitation`, `#our-invitation`, `#celebration`, and `#blessings` bypass the envelope and open the corresponding section. These are anchors within one page, so they do not require server-side route rewrites.

## Accessibility and motion

The envelope has keyboard-operable Open and Skip controls. Focus moves to the invitation heading after opening; visible focus styles, semantic landmarks, named navigation, and a skip link support keyboard navigation. Decorative SVGs are hidden from assistive technology. The countdown does not announce every second; download feedback is announced politely and clears automatically.

The Arabic opening uses an Amiri font, `lang="ar"`, and right-to-left direction. It stays outside animated wrappers. Reduced-motion preferences bypass the envelope sequence, remove movement from section reveals and hover effects, and disable CSS animation and smooth scrolling. There is no autoplay audio or scroll hijacking. The mobile action bar reserves page space and respects the device's bottom safe area.

The header now uses a custom Mughal crest and stays accessible as you scroll. Native smooth anchor navigation, an animated active-section underline, a fine reading-progress line, staggered section reveals, and a drawing reveal for the courtyard illustration add gentle motion. Touch, wheel, and keyboard scrolling remain native. The header and mobile action bar are measured so anchors, page padding, and download messages adapt to screen size and enlarged text. Compact layouts support narrow phones, landscape, and text enlargement; the countdown can reflow into two rows.

Cormorant Garamond, Manrope, and Amiri are bundled through Fontsource and served with the website; guests do not need a Google Fonts connection. Ornamentation is lightweight SVG, and the paper texture is embedded in CSS.

## Project structure

```text
src/
  App.jsx                       Page sections and opening state
  main.jsx                      React entry point and bundled fonts
  styles.css                    Theme, layout, responsive and motion rules
  config/wedding.js             Editable invitation configuration
  components/
    InvitationOpening.jsx       Animated envelope and skip control
    AtelierLogo.jsx             Custom architectural crest and wordmark
    Header.jsx                  Sticky navigation and reading progress
    ScrollReveal.jsx            Reusable staggered reveals and gold dividers
    Countdown.jsx               Live countdown and celebration state
    EventActions.jsx            Directions and calendar controls
    Ornaments.jsx               Decorative SVG artwork
    Icons.jsx                   Small action icons
  lib/event.js                  Calendar, Maps URL, and countdown helpers
scripts/generate-sharing.mjs    Sharing image and favicon generation
public/                        Generated sharing image and favicon
tests/event.test.js             Event and calendar tests
index.html                     Page and sharing metadata template
vite.config.js                 Build configuration and metadata injection
.env.example                   Public URL configuration template
```

The invitation contains no RSVP form, contact information, invented family details, or additional ceremonies.
