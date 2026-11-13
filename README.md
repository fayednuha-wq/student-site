# PLACES — Student Learning Journey (prototype v1)

An independent student-facing static site, inspired by Unit 1 *Places* from Unlock Listening & Speaking. Original paraphrased educational content; no textbook scans or copyrighted audio embedded.

## Open locally
Open `index.html` in Chrome or Edge. Or publish the folder contents at a GitHub Pages repository root.

## Included
- University of Jeddah visual identity cues and logo provided by the student (academic student project; not an official university service)
- Student name entry and a 10-item diagnostic test before lesson access
- Eight curriculum-aligned learning modules with instructional explanations, English TTS, Arabic vocabulary glosses, mastery checks, error-specific feedback and scaffolding
- Clickable Venice image hotspots (1, 2, 3)
- Post-test locked until all eight module mastery checks pass
- Pre/post score comparison and JSON export
- Mobile responsive design and light/dark theme

## Important limitations
- All progress is stored in localStorage on this browser only. There is NO secure student identity, teacher dashboard integration, central database, or cross-device sync.
- No AI chatbot, validated adaptive engine, authentic textbook audio/video, automatic speech scoring, or genuine recording yet.
- The browser's text-to-speech is synthetic pronunciation, not authentic listening passages. Do not claim this is a validated listening assessment.
- Quiz questions are original demonstrations. Before research use, have subject experts review content validity and scoring.
- Images are externally hosted Unsplash URLs; they require Internet access, may fail, and may not depict the named destination. Replace with correctly licensed, verified local photos before final submission.
- Logo is user-supplied; do not claim university endorsement.
- For real teacher analytics, use an authenticated backend with row-level permissions; never expose API secrets in frontend.

## Deployment
1. Create a **new repository** for the student site, separate from the teacher site.
2. Upload `index.html`, `styles.css`, `app.js`, `README.md`, and `assets/uj-logo.png`.
3. GitHub Settings → Pages → Deploy from a branch → main / root.
4. Wait for the GitHub Pages URL to become available.

Academic student project: Noha Fayed · Prof. Kholoud Al-Sheikh.

## Personal progress dashboard (v1.1)
After the diagnostic assessment, select **My progress dashboard**. The learner can see the initial score, completed modules, total practice attempts, diagnostic performance by skill, and the post-test comparison after completion. These are saved only in that browser using `localStorage` and can be exported as JSON. No account sync, cross-device storage, or teacher access is provided. The one-question-per-module check is practice completion, **not validated mastery**.

## Free deployment
Create a new **public** GitHub repository named `student-site`. Upload `index.html`, `styles.css`, `app.js`, `README.md` and the `assets` folder into the repository root. In Settings → Pages, select **Deploy from a branch**, `main`, `/ (root)`. Public URL will usually be `https://fayednuha-wq.github.io/student-site/` after GitHub Pages activates. Do not upload student records or private API keys to this public repository.

## Bilingual Unit 1 study helper (added 2026-11-09)

- Floating in-page help panel with Arabic and English explanations grounded in the project's original curriculum notes for the eight Places modules.
- Free and browser-only; uses keyword/topic matching rather than a cloud language model. **This is not generative AI and cannot accurately answer arbitrary questions.**
- Locked until the diagnostic test is finished, and locked again during the post-test to avoid influencing measurement.
- Links practice mistakes to the option to request additional explanation.
- No API keys or paid subscriptions. No messages are transmitted to an AI provider.

To publish: open repository Settings > Pages, select Deploy from a branch > main > /(root) and save. A repository that contains files is not necessarily already deployed as a Pages website.


## Real generative AI tutor (optional)
The student site now supports an **actual bilingual generative AI tutor** when you deploy the secure backend. The public repository intentionally contains **no API secrets**.

- `worker/places-ai-worker.js`: Cloudflare Worker proxy for Gemini Flash-Lite, with unit-scoped educational instructions and no personally identifying student data from the UI.
- `ai-config.js`: blank public configuration until the Worker URL is set.
- `worker/SETUP.md`: complete free-tier deployment steps.
- `assistant.js`: uses the AI only if the URL is configured, otherwise continues to use the limited bilingual rule-based helper. Pre/post assessment help stays locked.
- **Current repo status:** AI endpoint is **not configured**, so deployment of code alone does not turn on real AI.

Do not enable billing, share your Gemini API key or submit real student records. The API provider's free tier may use supplied chat content for service improvement.


## Revision: accessibility and productive skills (2026-11-13)

These improvements are now committed to the **student** repository:

- Removed faculty member name from the visible website footer.
- Added English reading aloud for each question and **all answer options**, both in the diagnostic and formative/post assessment.
- Added Arabic translations of **task instructions only**, including optional Arabic spoken directions. Answers and tested English knowledge are not automatically translated during assessment.
- Original mini listening passages tied to Venice, Cappadocia, and Vancouver, with TTS controls for US/UK voice **if installed on the device**, speed 0.75/1/1.25 and replay. **These are not the Cambridge publisher's copyrighted recordings or verified human accents.**
- Guided individual presentation task in 4 manageable sentence prompts, record / stop / replay / download through the microphone with student self-assessment checklist. No automatic pronunciation grading is claimed.
- Optional short writing workshops and an AI-feedback button where an AI backend is successfully configured; local storage keeps draft text on this device.
- Bilingual photo question upload to Gemini using a locally resized JPEG (with explicit confirmation before upload); never submit names, grades or identifying photos.
- Faster image sizes, shorter AI output, reduced conversation context and a visible "Thinking…" message. Model/network time still varies.
- The **GitHub Worker source** now supports text + photo tutoring and allows flexible language-learning questions. **The live Cloudflare Worker does NOT update automatically** when GitHub changes; the owner must paste the latest `worker/places-ai-worker.js` into Cloudflare's code editor, then click Deploy. The secret `GEMINI_API_KEY` remains in Cloudflare Settings (never paste it in code).

The student website is a prototype, not a fully validated adaptive learning system. The diagnostic currently measures short item-level performance, the listening recordings are generated by browser speech synthesis, and the oral self-assessment is not equivalent to teacher rubric scoring. Learning analytics for a separate teacher site remain planned.
