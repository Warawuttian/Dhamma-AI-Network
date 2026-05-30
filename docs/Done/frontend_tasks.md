# Frontend Tasks — public/index.html

---
## 1. Layout & Header (`Update publicindex layout.md`)

Use current `index.html` as base. Do not rewrite the whole app. Make header and sidebar global.

Create `data/site_content.json` for editable page content: ideology, project, about us, sidebar labels, header title. Keep layout/CSS/render functions in `index.html`. Do not hardcode long page content in `index.html`.

**Header**
- Fixed top header, same color as Start a dilemma button: `var(--gold)`
- `public/chakra.svg` top-left (center of sidebar), height ~36px
- "Dhamma AI Network" text beside chakra.svg
- Login, EN/TH toggle, Dark/Light toggle at top-right

**Sidebar**
- Left sidebar below header, width 180–220px
- Items: Home, Ideology, Project, Principles, About us
- Bottom-left: Multi Agent System (Coming soon)
- Divider: `border-right: 1px solid rgba(0,0,0,0.1)` / dark: `rgba(255,255,255,0.1)`

**Layout**
- Main content centered in remaining space
- Header height ~48px
- Mobile: sidebar can stack or collapse

**Other**
- Remove Today's Principle section from landing page; stop calling `loadDailyPrinciple()` on init (keep `/random` endpoint)
- Home → landing screen; Multi Agent System → placeholder
- Dark/Light toggle: toggle class on `body`/`html`

Do not break: analyze flow, DEV panel, provider dropdown, language toggle, principles explorer.

---
## 2. CSS Refactor (`Refactor frontend CSS into separate.md`)

Create `public/styles/` and move all CSS out of `index.html` into:

| File | Contents |
|------|----------|
| `variables.css` | CSS variables: `--gold`, `--bg`, `--text`, `--border`, `--card-bg` |
| `base.css` | Reset, typography |
| `layout.css` | Header, sidebar, main content grid |
| `components.css` | Cards, buttons, forms, DEV panel |
| `darkmode.css` | Dark mode overrides |

`index.html` should contain structure only (minimal inline styles if absolutely necessary).

Add comments for sections: Header, Sidebar, Cards, Buttons, DEV panel, Forms, Dark mode.

No frameworks. No Tailwind. No Bootstrap.

**Shared reusable classes** (use across Home, Ideology, Project, Principles, About us, Multi Agent System):

```css
.section-heading { font-weight: 700; font-size: 28px; margin-bottom: 12px; }
.section-body { line-height: 1.8; opacity: 0.92; }
```

Do not create page-specific heading/body styles unless necessary.

---
## 3. Analysis Result UI (`Update analysis result UI.md`)

**Continue Thinking section**
- Remove repeated user input/context summary under Continue Thinking
- Keep only: header, quick chips, follow-up input box, send button
- Remove/hide `fu-context` and `fu-context-tradeoff` from UI

**Contextual principles**
- Show 3 contextual principles in both normal mode and DEV_MODE
- Update selector max contextual principles: normal = 3, dev/deep = 3
- Keep base principles unchanged

**Sub-principles**
- If response contains `sub_principles_mentioned`, show in Principles Used section
- Show in both normal mode and DEV_MODE
- Label: "Sub-principles mentioned"
- Each item shows: `name_en` / `name_th` (if available), `parent_principle_id`, `why_relevant` (if available)
- Do NOT create hashes for sub-principles
- Do NOT treat sub-principles as selected contextual principles
- Hashes only for core principles from `principles.json`
