# 🦾 Copilot Instructions for Contribution Graph Realignment Tool

## Project Overview
This is a browser extension (manifest v3) that realigns GitHub's contribution graph so the week starts on Monday, not Sunday. The extension operates automatically on GitHub profile pages, moving the Sunday row to the bottom of the graph for improved chronological accuracy.
**New:** Users can now enable or disable the realignment feature via an options page.

## Architecture & Key Files
- `extension/manifest.json`: Declares the extension, content script, icon, permissions, and options page.
- `extension/content.js`: Main logic. Uses DOM manipulation and a MutationObserver to reorder the contribution graph table. Checks user setting before applying changes.
- `extension/options/options.html` & `options.js`: Implements the options page UI and logic for enabling/disabling realignment.
- `README.md`: Explains the mission and principles. The project is intentionally minimal and focused.

## Critical Patterns & Conventions
- **Silent Correction:** All changes are automatic unless disabled by the user.
- **User Configurability:** Users can toggle the realignment feature in the options page.
- **DOM Manipulation:** The script targets `.ContributionCalendar-grid` tables, moving the first row (Sunday) to the end, and fixes label visibility. The logic now includes a guard rail: it checks if the top row is labeled "Sun" (Sunday) before making any changes, ensuring the correction only runs when needed.
- **MutationObserver:** Ensures the correction persists through page navigation and dynamic updates.
- **Idempotency:** The script marks tables with `dataset.weekMondayCorrected` to avoid repeated changes.
- **URL Change Handling:** Uses both `popstate` and polling to detect navigation and reapply corrections.
- **No External Dependencies:** Pure JavaScript, no frameworks or libraries.

## Developer Workflows
- **Build/Test:** No build step; edit files directly. Test by loading the unpacked extension in Chrome/Edge and visiting GitHub profiles.
- **Debugging:** Use browser DevTools to inspect the DOM and verify table manipulation. Reload the extension after changes.
- **Release:** Update `manifest.json` version, zip the `extension/` folder, and upload to the browser extension store.

## Integration Points
- **GitHub Profile Pages:** Only runs on URLs matching `https://github.com/*`.
- **Contribution Graph Table:** Script expects a 7-row table structure. If GitHub changes their DOM, update selectors and logic accordingly.

## Examples
- To add new correction logic, extend `startWeekOnMonday(table)` in `content.js`.
- To support other sites, add URL patterns in `manifest.json`.

## Key Directories
- `extension/`: All source code and assets.

---
For questions or improvements, see the mission statement in `README.md`. This project values minimalism, clarity, and silent correctness.
