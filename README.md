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
2. Upload `index.html`, `styles.css`, `app.js`, `README.md`, and `assets/uj-logo.jpg`.
3. GitHub Settings → Pages → Deploy from a branch → main / root.
4. Wait for the GitHub Pages URL to become available.

Academic student project: Noha Fayed · Prof. Kholoud Al-Sheikh.

## Personal progress dashboard (v1.1)
After the diagnostic assessment, select **My progress dashboard**. The learner can see the initial score, completed modules, total practice attempts, diagnostic performance by skill, and the post-test comparison after completion. These are saved only in that browser using `localStorage` and can be exported as JSON. No account sync, cross-device storage, or teacher access is provided. The one-question-per-module check is practice completion, **not validated mastery**.

## Free deployment
Create a new **public** GitHub repository named `student-site`. Upload `index.html`, `styles.css`, `app.js`, `README.md` and the `assets` folder into the repository root. In Settings → Pages, select **Deploy from a branch**, `main`, `/ (root)`. Public URL will usually be `https://fayednuha-wq.github.io/student-site/` after GitHub Pages activates. Do not upload student records or private API keys to this public repository.