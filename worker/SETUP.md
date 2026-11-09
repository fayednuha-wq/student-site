# Activate a real bilingual AI tutor — PLACES

The website continues to work with the free rule-based helper until you activate the optional model endpoint. This project does **not** require a paid hosting subscription, but free API usage has rate limits.

## 1. Create a Gemini API key (free-tier eligible account)

1. Visit https://aistudio.google.com/apikey and create your own API key.
2. Check your active free-tier model availability and limits. The Worker currently uses `gemini-2.5-flash-lite`.
3. **Never paste the API key in GitHub, the browser, the student webpage or a chat conversation.**

Google says some free-tier requests and responses may be used to improve its products. Do not send real student names, private grades, credentials, or confidential textbook files.

## 2. Deploy a Cloudflare Worker on the free plan

1. Sign in at https://dash.cloudflare.com/ using a free account.
2. Open Workers & Pages, create a new Worker, and open its code editor.
3. Replace the starter code with the complete source from `worker/places-ai-worker.js`, then deploy.
4. In the Worker's Settings > Variables and Secrets, add a **Secret** (not a plaintext variable) named `GEMINI_API_KEY` containing your key, then deploy changes.
5. Copy your public Worker URL, similar to `https://places-ai.YOUR-ACCOUNT.workers.dev`.

The Worker permits the student website origin `https://fayednuha-wq.github.io`. It only responds to `POST /chat`; visiting its main URL in a browser is not a chat test.

## 3. Connect GitHub Pages

Open `ai-config.js` in the `student-site` repository, choose Edit, and change **only** the endpoint URL:

```js
window.PLACES_AI_ENDPOINT = "https://places-ai.YOUR-ACCOUNT.workers.dev";
```

Commit the file and reload the student website using Ctrl + Shift + R. Do not add `/chat` to the URL; the web application does that automatically.

## 4. Confirm it behaves as a tutor

- Complete the **pre-assessment first**. The assistant must be locked throughout the diagnostic quiz.
- Open the past-simple lesson, intentionally choose `Did you visited Venice?`, then ask the assistant in Arabic: `ليش جوابي غلط؟`
- Ask the same question in another form: `ما الفرق بين اختياري والإجابة الصحيحة؟` or `Why doesn't did take visited?`
- Change language and ask a follow-up question. The AI should explain the rule in fresh wording.
- During the **post-assessment**, ensure the assistant is locked again.

## Restrictions and safeguards

- Gemini API free tier has limited quotas and may change. We do **not** activate billing or promise unlimited service.
- Cloudflare Workers Free also has platform request/CPU limits.
- Backend keys live as Cloudflare secrets; never in public frontend code.
- Browser-origin checks are helpful but **not authentication or robust rate limiting**. Do not use this as an unrestricted public service without appropriate abuse protections.
- The model receives a question, language, vetted unit summary, and the current practice context only. The frontend intentionally does not send a student's registered name, entire scores, or test answers.
- A model can still make errors; teacher feedback and validated assessments remain authoritative.
- The official textbook's full PDFs/audio are NOT uploaded or copied into the backend. Curriculum grounding currently uses limited original adapted notes; expand only with permitted content.
- The existing no-cost rule-based helper is automatically used until you set the Worker endpoint.

References:
- https://ai.google.dev/gemini-api/docs/pricing
- https://ai.google.dev/gemini-api/docs/rate-limits
- https://ai.google.dev/gemini-api/terms
- https://developers.cloudflare.com/workers/platform/limits/
- https://developers.cloudflare.com/workers/configuration/secrets/
