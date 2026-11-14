# AI Usage Report

## AI tools used
Claude Code (Anthropic, model Claude Sonnet 5.5) inside VS Code.

## Tasks where AI helped
AI generated the first version of the whole project: HTML structure, CSS (theme variables, responsive layout), JavaScript (theme toggle, greeting, welcome message, mobile menu, form validation), the placeholder avatar SVG, this report and the README. It also initialised Git and made the commits.

## Representative prompt
> "In the week-1 folder I want you to do this assignment" followed by the full Personal Portfolio assignment text.

## Code accepted, modified or rejected
- **Accepted as generated:** all files in their current form. I have not yet hand-edited the code.
- **Resume content:** in a follow-up prompt I supplied my resume (PDF) and the AI inserted my name, education, experience, achievements, skills and three projects into the page. Phone and email were deliberately left off the public page. The avatar is a placeholder.
- **Rejected:** none so far.

## Bugs or incorrect suggestions from AI
- No functional bugs were found in testing.
- The theme toggle, form validation and submission code ended up in one commit titled "feat: implement theme toggle, greeting, welcome message and navigation", so the commit history does not match the example granularity exactly.
- Project links were placeholders until I supplied the GitHub URLs; Pong Game was later replaced with Paramanu.

## How it was tested
- `node --check` for JavaScript syntax.
- A scripted jsdom run verified: greeting text, theme toggling both ways, welcome message, all three empty-field errors, whitespace-only input, invalid email, success message on valid input, and the Submit button being disabled right after success.
- **Not yet done:** manual testing in a real browser, visual checks at mobile/tablet/desktop widths, keyboard navigation and contrast checks. These should be done by me before submission, and screenshots added to the README.
