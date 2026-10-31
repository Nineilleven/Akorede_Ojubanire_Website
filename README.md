# Akorede Ojubanire portfolio (static copy)

A plain HTML, CSS and JavaScript copy of the Webflow site at ojubanire-akorede.webflow.io. It needs no build step and no dependencies. Webflow stays the main site; this copy is for hosting elsewhere.

## Files

- `index.html`: Home, with the project index, the project panel, the About panel and the Gallery panel
- `selected-works.html`: the Works page with all six case studies (MyGadgetPadi, Afriskaut, SooLovely Honey, Acrux Sirius, Realms Safety, Bund)
- `css/styles.css`: every style from the Webflow project, with its tablet and phone breakpoints
- `css/overrides.css`: the rules that were added through code embeds in Webflow (project panel, back and next buttons, Gallery layout, scroll reveal)
- `js/main.js`: the panel behaviour (open a project, About or Gallery, back and next, Escape to close) and the image reveal on scroll
- `scripts/assets-manifest.json` and `scripts/download-assets.mjs`: the list of every image and video, and a script that downloads them
- `vercel.json`: makes `/selected-works` work without `.html` on Vercel
- `.nojekyll`: lets GitHub Pages serve the folders as they are

## First-time setup

1. Download the images and videos (they are not in this zip). From the project folder, run:

   `node scripts/download-assets.mjs`

   It needs Node 18 or newer and about 20 MB of space. It skips files that are already there, so it is safe to run again.
2. Preview it locally. In VS Code, install the Live Server extension and choose "Go Live" on `index.html`. Or run `python3 -m http.server 8000` in the folder and open http://localhost:8000.

## Putting it online

**Vercel:** push the folder to GitHub, then in Vercel choose Add New, Project, import the repository, and leave every setting at its default (no framework, no build command). Add a custom domain later under Settings, then Domains.

**GitHub Pages:** push the folder to GitHub, then in the repository open Settings, Pages, and choose the `main` branch and the `/ (root)` folder. The address will be `https://<username>.github.io/<repository>/`. All links in the site are relative, so the subfolder is not a problem.

Commit the downloaded `assets` folder with everything else.

## Things to know

- **Fonts:** the site uses Sora from Google Fonts, linked in each page's `<head>`. If you want the font hosted with the site, download Sora from Google Fonts and add an `@font-face` rule to `css/styles.css`.
- **Videos:** Webflow does not expose which video file sits in which slot, so they are assigned by file name and need a check when you preview. MyGadgetPadi uses `MGP.mp4`, SooLovely Honey uses `Soolovely-Logo-MGFX.mp4`, Realms uses `REAMLS-MOTION.mp4` and `gemini_generated_video_73cc704f.mp4`, Bund uses `bund-logo-animation.mp4` and `bund-headline.mp4`, and the Gallery uses `FIFA-BULGE.mp4`, `Composition-1.mp4`, `Jazzed.mp4` and `Untitled.mp4`. To swap one, change the `src` of that `<video>` in the HTML. `Socials.mp4` is uploaded in Webflow but not placed on any page.
- **Gallery:** each piece is a `<figure class="gl-item">` in the `<section class="gl" id="gallery">` block of `index.html`. The scattered layout repeats every six pieces in `css/overrides.css`, so adding a piece needs no layout work. Videos take their own proportions once they load, and wide pieces get a wider slot (`js/main.js`, function `fit`).
- **Staying in sync with Webflow:** this is a copy. Changes made in the Webflow Designer do not appear here until the matching change is made in the code.
- **Adding a project:** copy one `<section class="cs" id="...">` block in `index.html` and `selected-works.html`, add a matching `.hx-item` card and `.hx-row` entry on Home, and put the new images in `assets/`.
- **Page titles and descriptions** are copied from the Webflow page settings.
