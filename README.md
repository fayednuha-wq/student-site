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


## Book-grounded revision — 14 November 2026

The student app now incorporates teacher feedback from the first user trial:

- **Listening 1 (Module 2):** explicit Part 1 English vocabulary-definition skill and Part 2 main-idea/detail listening skill; the eight central words from the Unit 1 book's key-vocabulary page are defined in learner-friendly English with practice matching definitions. Original text was not reproduced wholesale.
- **Past Simple (Module 4):** clear statement/question/negative/be word-order explanations and interactive tap-to-order sentences.
- **Final Speaking (Module 8):** five book-aligned parts (introduction/general facts, factual details, positive opinion, negative opinion, conclusion), definitions, slower 0.62×–1.0× oral playback selector and guided recording. Speech synthesis prefers likely feminine named voices but **does not guarantee voice gender on every device**.
- **Assessments:** new distinct questions, spoken mini clips for listening items, removal of redundant lower Read Question button, and hidden tutor during pre/post assessments.
- **Usability:** task-only Arabic directions updated; remove Arabic spoken-instructions control in Module 8; remove broken JSON-export buttons while preserving in-page progress.
- **Tutor:** immediate local site-navigation help with a dedicated how-to button so basic site questions do not require Gemini or an uploaded photo; Cloudflare Worker source has more accurate navigation instructions and a no-unnecessary-photo rule.

**Deployment reminder:** all front-end changes flow from this GitHub repository to GitHub Pages. But Cloudflare Worker source is deployed manually. The new worker prompt about how to use the website will apply to live Gemini only after copying the latest `worker/places-ai-worker.js` into the already-created Cloudflare Worker and choosing Deploy. Do not reveal or change `GEMINI_API_KEY`.

**Educational testing caveat:** Listening samples are original supplemental passages read by browser TTS (not the publisher's licensed recordings); separate pre/post tests have distinct items but are not established equivalent/validated standardized forms. The speaking studio provides recording/self-check, not valid automatic speaking proficiency scores.


## Bilingual lesson support and oral rehearsal (2026-11-14, second revision)

- All eight student lesson pages now have an English instructional explanation and an Arabic teaching explanation, with show/hide Arabic and buttons to hear both languages.
- Module 3 has a focused explanation of how phonemic **vowel** symbols between `/ /` represent sounds rather than spellings; listening examples cover book sounds `/eɪ/`, `/ɒ/` (British), `/ɪ/` and `/ʌ/`, with a warning that American accents may pronounce `hot` differently.
- Formative listening labs (including Modules 4 and 5) now display question-specific Arabic directions and buttons to hear the English question, all English options, and Arabic directions. These audio questions are supplementary original practice, not licensed publisher recordings.
- Writing self-check feedback is bilingual and explicitly highlights sentence count, initial capitalization, punctuation, and simple grammar or fact/opinion checks. It cannot validate all grammar or factual truth. Modules 5 and 6 have bilingual fact-vs-opinion definitions.
- All eight original mastery checks provide short Arabic feedback for each selected answer and hints after errors.
- Module 7 no longer has a long writing exercise or a second presentation-writing studio. Instead students must order five example presentation sentences and can practise **listen — pause — repeat** with a student-selected 3-, 5-, or 7-second silent gap between each sentence. This is oral rehearsal, not automatic speaking assessment.
- Module 8 gives both English **and Arabic** descriptions of each of the five presentation parts. The phrase 'بدل المقال الطويل' was removed from student-site code.
- The Module 4 sentence-ordering activity has a direct AI explanation button that includes the tiles and the learner's attempted sequence. Curriculum questions pass to Gemini rather than being misclassified as basic site navigation; if Gemini is unavailable, a limited on-device past-simple explanation is shown instead of misleading 'outside scope'.
- The Gemini Worker source permits broader English-learning questions, giving book-based explanations first and **explicitly identifying additional material outside the book** rather than refusing to teach it.

**Only student GitHub Pages automatically picks up the changed front-end assets. For the Gemini tutor's updated prompt to take effect, the owner must once again copy the latest `worker/places-ai-worker.js` to the existing Cloudflare Worker and press Deploy. Do not change or paste the secret `GEMINI_API_KEY`.** Browsers can differ in voices, speech recognition, recording support and text-to-speech callback timing; the pause/repeat interaction needs an actual device test.


## Latest oral-assessment UX revision — 2026-11-14

- Module 4 grammar explanations and checks now display separate English LTR and Arabic RTL blocks instead of mixing scripts within a line. The word-arrangement check shows both correctness and the model sentence.
- The redundant **Second listen** detail question was removed from **all** supplementary Listening Studios, not only Module 4. The remaining listening question provides correct/incorrect feedback, the correct answer and the reason in English and Arabic after the learner responds.
- Open-ended Writing Workshop **Check requirements** gives explicit PASS/REVISE indicators for checkable surface features, a model answer, and warnings that those checks are NOT proof of grammatical or factual correctness. Gemini's separate writing feedback remains optional.
- English and Arabic introductory explanation cards appear near the beginning of Modules 7 and 8 with the existing Arabic show/hide control; explanations are in separate language blocks.
- New `speaking-recorder.js`: five independently recordable speech parts in Modules 7 and 8, playback/download of individual clips, sequential playback of recorded sections, and a separate **complete presentation** recording. No microphone audio is stored in localStorage or uploaded by default. A fresh-demo reset clears any in-tab recordings.
- Optional **Gemini feedback on real audio** can be requested after recording an uninterrupted presentation and explicitly consenting to send the full clip to Google via Cloudflare. The worker's `POST /speaking-feedback` route checks lesson stage, MIME type and size, then asks Gemini for formative bilingual feedback on observed organization, comprehensibility, pace and language. It does not issue a validated pronunciation score or replace a teacher rubric. Supported browser capture types include WebM and MP4 where MediaRecorder is available.
- **Deployment boundary:** GitHub Pages front-end changes need no Cloudflare steps, but `/speaking-feedback` will not work until the owner opens the existing Cloudflare Worker, replaces its code with the latest `worker/places-ai-worker.js`, and presses Deploy. Do not reveal, replace or check in the existing `GEMINI_API_KEY`.
- Important limitations: recordings are ephemeral to the tab and may disappear on refresh; simultaneous playback of individual files may be blocked on some iOS/Safari versions; permission and browser support are required for microphone use; AI feedback is best-effort and can make mistakes. The code has been syntax-checked, but the live microphone and Google service still require real device and backend verification.
