# Personal Portfolio Website

A responsive, single-page personal portfolio built with plain HTML5, CSS3 and Vanilla JavaScript (no frameworks or libraries).

## Features

- **Home** – name, introduction, time-based greeting (Good Morning / Afternoon / Evening), a Welcome button and a call-to-action.
- **About, Skills, Projects** – education, experience, achievements and career objective, six skill cards, three projects (name, description, technologies, GitHub links).
- **Contact form** – Full Name, Email, Message with inline validation (empty, whitespace-only, invalid email) and a success message.
- **Light / dark theme** toggle (remembered in `localStorage`, defaults to the OS preference).
- **Responsive** layout for mobile, tablet and desktop using Grid, Flexbox and media queries; collapsible mobile menu.
- **Accessible**: semantic HTML, skip link, labelled fields, `aria-live` messages, visible focus, errors shown with text + icon (not colour alone).

## Technologies

HTML5, CSS3 (custom properties, Flexbox, Grid, media queries), JavaScript ES6+.

## Run locally

No build step is needed.

1. Clone or download this repository.
2. Open `index.html` in a browser, or serve the folder, e.g. `python -m http.server` and visit `http://localhost:8000`.

## Project structure

```
personal-portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── README.md
└── ai-usage.md
```

## Customising

Add your real GitHub project URLs in the Projects section in `index.html` with your own.

## Screenshots

_Add screenshots of the light/dark themes and mobile view here (e.g. `assets/images/screenshot-desktop.png`)._

## Known limitations

- The contact form has no backend; it only shows a success message.
- Tested automatically in a simulated DOM and should be checked manually in real browsers (see `ai-usage.md`).
