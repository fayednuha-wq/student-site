/* PLACES learning accessibility and practice labs — original supplementary content.
   Runs fully inside the browser; not a certified speech assessment.
   Never exposes lessons or hints before the diagnostic test. */
(function(){
"use strict";
const contexts=()=>window.PLACES_CONTEXT?.()||{};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const $=(s,r=document)=>r.querySelector(s);
const $all=(s,r=document)=>Array.from(r.querySelectorAll(s));
const K="places_student_practice_labs_v1";
let saved={};try{saved=JSON.parse(localStorage.getItem(K))||{}}catch{}
const persist=()=>{try{localStorage.setItem(K,JSON.stringify(saved))}catch{}};
const Q_AR={
pre:["اختر المعنى الصحيح لكلمة ancient.","استمع إلى جملة السؤال ثم اختر فكرتها الرئيسية.","اقرأ الوصف ثم اختر نوع المنزل الصحيح.","اختر الكلمة التي تشبه make في الصوت.","اختر الجملة الصحيحة في الماضي.","اختر صيغة السؤال الصحيحة.","اختر العبارة التي يمكن التحقق من صحتها.","اختر التفاصيل المناسبة للحديث عن زيارة الحديقة.","اختر العبارة التي تعبّر عن رأي.","اختر الترتيب الصحيح لأجزاء العرض."],
post:["اختر الكلمة التي تعني قديم جدًا.","استمع إلى الوصف ثم اختر الفكرة الرئيسية.","اختر نوع المنزل الموصوف.","اختر الكلمة التي تشترك مع cave في صوت حرف العلة.","اختر الجملة الصحيحة في الماضي البسيط.","اختر صيغة السؤال الصحيحة.","اختر العبارة التي تعبّر عن رأي.","اختر التفصيل الأكثر صلة بموضوع العرض.","اختر العبارة التي تقدم حكمًا شخصيًا.","اختر ترتيبًا منطقيًا للعرض الشفهي."]
};
const AR_LESSON={venice:"اختر التفصيل الذي يدل على أن الماء أساسي في حياة البندقية.",homes:"اختر الفكرة العامة التي تشمل جميع أمثلة المنازل المختلفة.",pronunciation:"استمع للكلمات واختر الكلمة المطابقة لصوت حرف العلة في cave.",grammar:"اختر سؤال الماضي البسيط الصحيح.",vancouver:"اختر الجملة التي تعبّر عن رأي وليس حقيقة.",critical:"اختر المعلومة الأكثر ارتباطًا بأنشطة ستانلي بارك.",speaking:"اختر عبارة تُظهر رأيًا شخصيًا.",final:"اختر المخطط الذي يساعدك على تنظيم عرض شفهي واضح."};
const PASSAGES={
venice:{label:"Venice · Life on the Grand Canal",ar:"البندقية: الحياة على القناة الكبرى",text:"Venice is a city in Italy with many canals. People use boats to travel on the water. A gondola is a traditional Venetian boat. Visitors can see beautiful buildings beside the Grand Canal.",question:"How do people travel on Venice's waterways?",answers:["By gondola and other boats","Only by train","By airplane"],correct:0,why:"The passage says people use boats, and a gondola is a traditional boat."},
homes:{label:"Cappadocia · Unusual Homes",ar:"كابادوكيا: مساكن غير معتادة",text:"In Cappadocia, Turkey, some homes are carved into rock. The rock is soft enough to shape into rooms. People have lived in unusual kinds of homes for a very long time.",question:"What material are some Cappadocia homes made from?",answers:["Soft rock","Glass","Metal"],correct:0,why:"The passage says some homes are carved into rock."},
vancouver:{label:"Vancouver · Stanley Park",ar:"فانكوفر: ستانلي بارك",text:"Vancouver is a city in Canada. Stanley Park has paths where people can walk and cycle. Some visitors think it is the best place to relax, but that is their opinion.",question:"Which part of the listening is an opinion?",answers:["The park is the best place to relax","Vancouver is in Canada","People can walk on paths"],correct:0,why:"The word 'best' indicates a personal judgment."},
pronunciation:{label:"Sounds · Cave and Make",ar:"النطق: استمع لصوت الكلمات",text:"Cave. Make. Cat. Cup. Cave and make share the same vowel sound. Listen carefully to the vowel.",question:"Which word shares the main vowel sound in cave?",answers:["Make","Cup","Cat"],correct:0,why:"Cave and make use /eɪ/."},
grammar:{label:"Past Simple · A Visit",ar:"الماضي البسيط: زيارة",text:"Yesterday, I visited Venice. I saw a gondola and walked beside the Grand Canal. Did I visit Venice yesterday? Yes, I did.",question:"Which verb is past simple in the passage?",answers:["Visited","Visit","Visiting"],correct:0,why:"Visited is the regular past-simple form of visit."},
critical:{label:"Critical Thinking · Relevant Details",ar:"التفكير الناقد: المعلومات المرتبطة",text:"I want to talk about activities in Stanley Park. You can walk and cycle there. These activities are relevant to my topic. The price of a new phone is not relevant.",question:"What is relevant to a talk about activities in the park?",answers:["Walking and cycling","Phone prices","A cooking recipe"],correct:0,why:"Walking and cycling are activities that visitors can do in the park."}
};
let prefs={accent:"en-US",rate:1};
let voiceNote="";
const available=()=>typeof speechSynthesis!=="undefined"?speechSynthesis.getVoices():[];
const voiced=(accent)=>available().find(v=>v.lang.toLowerCase()===accent.toLowerCase())||null;
function say(text,accent=prefs.accent,rate=prefs.rate){
 if(!("speechSynthesis" in window)){alert("Speech playback is unavailable in this browser.");return false}
 speechSynthesis.cancel();
 const utter=new SpeechSynthesisUtterance(text);
 const voice=voiced(accent);
 if(voice)utter.voice=voice;
 utter.lang=voice?.lang||accent;
 utter.rate=Number(rate)||1;
 speechSynthesis.speak(utter);
 return !!voice;
}
function speechToolbar(text,isExam=false){
 const wrapper=document.createElement("div");
 wrapper.className="places-access-tools";
 const q=document.createElement("button");q.type="button";q.className="btn secondary";q.textContent="🔊 Listen / استمع للسؤال";q.onclick=()=>say(text,"en-US",0.92);
 const opt=document.createElement("button");opt.type="button";opt.className="btn secondary";opt.textContent="🔊 Read options / استمع للخيارات";opt.onclick=()=>{const opts=$all(isExam?"[data-answer]":"[data-option]");say(opts.map((e,i)=>(i+1)+". "+e.textContent.trim()).join(". "),"en-US",0.88)};
 const ar=document.createElement("button");ar.type="button";ar.className="btn secondary";ar.textContent="🇸🇦 التعليمات بالعربية";ar.onclick=()=>{const note=$(".places-ar-directions",wrapper.parentElement);if(note)note.hidden=!note.hidden};
 wrapper.append(q,opt,ar);return wrapper;
}
function addQuestionAccess(){
 const c=contexts();if(c.stage!=="pre"&&c.stage!=="post"&&c.stage!=="lesson")return;
 const exam=c.stage==="pre"||c.stage==="post";
 const question=$(".question");if(!question||$(".places-access-tools"))return;
 const i=exam?Math.max(0,parseInt($(".sectionhead strong")?.textContent||"1",10)-1):0;
 const note=document.createElement("p");note.className="places-ar-directions";note.dir="rtl";note.lang="ar";note.hidden=true;
 note.textContent=exam?(Q_AR[c.stage]?.[i]||"اختر الإجابة الصحيحة."):AR_LESSON[c.lessonId]||"اختر الإجابة المناسبة.";
 question.insertAdjacentElement("afterend",note);
 question.insertAdjacentElement("afterend",speechToolbar(question.textContent,exam));
 if(exam){
  const note2=document.createElement("small");note2.textContent="التوضيح العربي للتعليمات فقط، وليس ترجمة للإجابات. قراءة سؤال الاستماع لا تعوّض الاستماع لمقطع صوتي مستقل.";note2.dir="rtl";note2.className="places-note";note.insertAdjacentElement("afterend",note2);
 }
}
function listeningLab(id){
 const p=PASSAGES[id];if(!p)return null;
 const section=document.createElement("section");section.className="task places-practice-lab";
 section.innerHTML='<h2>🎧 Listening Studio</h2><p class="muted" lang="ar" dir="rtl">استمع للمقطع أولًا، ثم اختر الإجابة. غيّر السرعة أو اللهجة إن كانت متاحة على جهازك.</p>'+
 '<p><strong>'+esc(p.label)+'</strong></p>'+
 '<div class="places-controls"><label>Accent <select data-accent><option value="en-US">American (US)</option><option value="en-GB">British (UK)</option></select></label>'+
 '<label>Speed <select data-rate><option value=".75">Slow · 0.75×</option><option selected value="1">Normal · 1×</option><option value="1.25">Fast · 1.25×</option></select></label></div>'+
 '<div class="places-controls"><button type="button" data-play class="btn">▶ Play listening</button><button type="button" data-stop class="btn secondary">■ Stop</button></div>'+
 '<p class="places-note" data-voice-note>Browser speech synthesis: accent quality depends on installed voices.</p>'+
 '<h3>'+esc(p.question)+'</h3><div class="places-choice-group">'+p.answers.map((a,i)=>'<button type="button" class="choice" data-listen-option="'+i+'">'+esc(a)+'</button>').join("")+'</div>'+
 '<p data-answer-note aria-live="polite"></p><button type="button" data-transcript class="btn secondary">Show transcript after answering / عرض النص</button><p class="places-transcript" data-transcript-text hidden>'+esc(p.text)+'</p>'+
 '<p class="places-note">Original practice passage, adapted to Unit 1 themes. Not the publisher’s textbook audio.</p>';
 const voiceStatus=$("[data-voice-note]",section);
 const acc=$("[data-accent]",section),speed=$("[data-rate]",section);
 const play=()=>{
  prefs.accent=acc.value;prefs.rate=parseFloat(speed.value);
  const ok=say(p.text,prefs.accent,prefs.rate);
  voiceStatus.textContent=ok?"Selected "+prefs.accent+" voice is available on this device.":"No matching "+prefs.accent+" voice found. Your browser may use a fallback accent; this is not a verified native recording.";
 };
 $("[data-play]",section).onclick=play;
 $("[data-stop]",section).onclick=()=>window.speechSynthesis?.cancel();
 let answered=false;
 $all("[data-listen-option]",section).forEach(b=>{b.onclick=()=>{answered=true;const chosen=Number(b.dataset.listenOption);$("[data-answer-note]",section).textContent=(chosen===p.correct?"✓ Correct! ":"Try again. ")+(chosen===p.correct?p.why:"Listen once more and focus on the main idea.");}});
 $("[data-transcript]",section).onclick=()=>{if(!answered){$("[data-answer-note]",section).textContent="Please answer the listening question before viewing the transcript.";return}const z=$("[data-transcript-text]",section);z.hidden=!z.hidden};
 return section;
}
const starters={
intro:["I'd like to talk about","Today I will introduce"],
fact:["It is located in","One interesting fact is that"],
opinion:["In my opinion,","I personally think"],
end:["To conclude,","Thank you for listening."]
};
let recorder=null,stream=null,chunks=[],blobURL=null,startStamp=0,stopClock=null;
const saveDraft=(id,txt)=>{saved[id]=txt;persist()};
function speakStudio(){
 const sec=document.createElement("section");sec.className="task places-practice-lab";
 const field=(name,label,placeholder)=>
 '<label class="places-writing-field"><span>'+esc(label)+'</span><textarea data-stage="'+name+'" rows="2" placeholder="'+esc(placeholder)+'">'+esc(saved["final-"+name]||"")+'</textarea></label>';
 sec.innerHTML='<h2>🎤 Guided Speaking & Presentation Studio</h2>'+
 '<p lang="ar" dir="rtl">بدل المقال الطويل: كوّن عرضًا قصيرًا بأربع خطوات، ثم استمع للنموذج وسجّل صوتك وراجعه.</p>'+
 '<p class="muted">Choose any interesting place (Venice, Cappadocia, or Vancouver). Each box needs just one short sentence.</p>'+
 field("intro","1 · Introduce the place","Today I will talk about Venice.")+
 field("fact","2 · Add a verifiable fact","Venice has many canals.")+
 field("opinion","3 · Share your opinion","In my opinion, Venice is interesting.")+
 field("end","4 · Conclude","Thank you for listening.")+
 '<div class="places-controls"><button class="btn" type="button" data-builder-listen>🔊 Listen to my presentation</button>'+
 '<button class="btn secondary" type="button" data-builder-check>✓ Check structure</button></div>'+
 '<p class="places-note" data-builder-feedback role="status">Write one short sentence in each box; perfect grammar is not required in the first draft.</p>'+
 '<div class="places-controls"><button type="button" class="btn" data-record>● Start recording</button>'+
 '<button type="button" class="btn secondary" data-stop-record disabled>■ Stop</button>'+
 '<span data-record-status>Microphone not started</span></div>'+
 '<audio controls data-playback hidden></audio><a data-download-audio hidden download="places-speaking-practice.webm">Download my recording</a>'+
 '<p class="places-note">Microphone permission is required. Recordings are played back on your device and are not uploaded or automatically graded. Use the speaking rubric with a teacher.</p>'+
 '<fieldset class="places-rubric"><legend>Self-check / التقييم الذاتي</legend>'+
 '<label><input type="checkbox"> I introduced the place clearly</label>'+
 '<label><input type="checkbox"> I gave at least one verifiable fact</label>'+
 '<label><input type="checkbox"> I shared an opinion using a signpost</label>'+
 '<label><input type="checkbox"> I concluded and spoke clearly</label></fieldset>';
 $all("[data-stage]",sec).forEach(t=>t.oninput=()=>saveDraft("final-"+t.dataset.stage,t.value));
 const getLines=()=>$all("[data-stage]",sec).map(t=>t.value.trim()).filter(Boolean);
 $("[data-builder-listen]",sec).onclick=()=>{const txt=getLines().join(" ");if(!txt){$("[data-builder-feedback]",sec).textContent="Write at least one sentence first.";return}say(txt,"en-US",.88)};
 $("[data-builder-check]",sec).onclick=()=>{
 const fields=$all("[data-stage]",sec),filled=fields.filter(t=>t.value.trim()).length;
 const missing=fields.filter(t=>!t.value.trim()).map(t=>t.dataset.stage);
 $("[data-builder-feedback]",sec).textContent=filled===4?"✓ Your 4-part structure is ready. Rehearse aloud and record your presentation.":"You completed "+filled+"/4 steps. Add: "+missing.join(", ")+".";
 };
 const recBtn=$("[data-record]",sec),stopBtn=$("[data-stop-record]",sec),status=$("[data-record-status]",sec);
 recBtn.onclick=async()=>{
  if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder==="undefined"){status.textContent="This browser does not support microphone recording.";return}
  try{
   stream=await navigator.mediaDevices.getUserMedia({audio:true});
   const formats=["audio/webm;codecs=opus","audio/mp4","audio/webm"];const mime=formats.find(t=>MediaRecorder.isTypeSupported(t));
   recorder=new MediaRecorder(stream,mime?{mimeType:mime}:undefined);chunks=[];startStamp=Date.now();
   recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
   recorder.onstop=()=>{
    stream?.getTracks().forEach(t=>t.stop());stream=null;
    const blob=new Blob(chunks,{type:recorder.mimeType||"audio/webm"});
    if(blobURL)URL.revokeObjectURL(blobURL);blobURL=URL.createObjectURL(blob);
    const audio=$("[data-playback]",sec),link=$("[data-download-audio]",sec);
    audio.src=blobURL;audio.hidden=false;link.href=blobURL;link.hidden=false;
    link.download="places-speaking-practice."+(blob.type.includes("mp4")?"m4a":"webm");
    status.textContent="Recorded "+Math.round((Date.now()-startStamp)/1000)+" seconds. Listen and self-assess.";
   };
   recorder.start();recBtn.disabled=true;stopBtn.disabled=false;status.textContent="Recording..."; 
  }catch{status.textContent="Microphone access denied or unavailable. Check Safari/site permissions."}
 };
 stopBtn.onclick=()=>{
  if(recorder?.state==="recording")recorder.stop();
  recBtn.disabled=false;stopBtn.disabled=true;
 };
 return sec;
}
function writingLab(id){
 const sec=document.createElement("section");sec.className="task places-practice-lab";
 const topic=id==="speaking"?"Write a 3-sentence description of a place.":id==="grammar"?"Write 2 past-simple sentences about a trip.":"Write a short fact and an opinion about an interesting place.";
 const example=id==="grammar"?"I visited Venice. I saw a canal.":id==="speaking"?"Venice is in Italy. It has canals. I think it is beautiful.":"Vancouver is in Canada. I think its parks are beautiful.";
 sec.innerHTML='<h2>✍️ Writing Workshop</h2><p>'+esc(topic)+'</p>'+
 '<p lang="ar" dir="rtl">ابدأ بجملتين أو ثلاث، ثم راجع وضوح الفكرة واستخدام المفردات. ليست كتابة مقال طويل.</p>'+
 '<button type="button" class="btn secondary" data-example>Show example / مثال</button><p class="places-note" data-example-text hidden>'+esc(example)+'</p>'+
 '<label class="places-writing-field">My writing <textarea data-writing rows="4" placeholder="Write your short answer here...">'+esc(saved["writing-"+id]||"")+'</textarea></label>'+
 '<div class="places-controls"><button type="button" class="btn" data-write-review>✓ Self-check</button><button type="button" class="btn secondary" data-read-writing>🔊 Listen to what I wrote</button><button type="button" class="btn secondary" data-ai-feedback>💬 Ask AI for writing feedback</button></div>'+
 '<p role="status" class="places-note" data-write-feedback></p>'+
 '<p class="places-note">This is formative practice with a self-check, not automatic scoring of writing quality.</p>';
 const w=$("[data-writing]",sec);w.oninput=()=>saveDraft("writing-"+id,w.value);
 $("[data-example]",sec).onclick=()=>{$("[data-example-text]",sec).hidden=!$("[data-example-text]",sec).hidden};
 $("[data-read-writing]",sec).onclick=()=>{if(w.value.trim())say(w.value)};
 $("[data-ai-feedback]",sec).onclick=()=>{
  const draft=w.value.trim();if(draft.length<15){$("[data-write-feedback]",sec).textContent="Write at least two short sentences before requesting detailed feedback.";return}
  if(!window.PLACES_ASK_TUTOR){$("[data-write-feedback]",sec).textContent="The AI helper is not available. Use the self-check instead.";return}
  window.PLACES_ASK_TUTOR("Please review my short English writing about a place. Show 2 things I did well, up to 2 corrected sentences, and one tip to improve. Explain in simple Arabic and English. Here is my draft:\n"+draft.slice(0,450));
 };
 $("[data-write-review]",sec).onclick=()=>{
  const sentences=w.value.trim().split(/[.!?]+/).map(x=>x.trim()).filter(Boolean);
  const count=w.value.trim().split(/\s+/).filter(Boolean).length;
  $("[data-write-feedback]",sec).textContent=!count?"Write at least one sentence first.":sentences.length<2?"Start with two short complete sentences. Check capital letters and punctuation.":"You wrote "+sentences.length+" sentence(s). Review capital letters, punctuation, and whether every sentence is about the place. Ask the AI tutor for more detailed feedback.";
 };
 return sec;
}
function enrichLesson(){
 const c=contexts();if(c.stage!=="lesson")return;
 const panel=$(".shell .panel");if(!panel||$(".places-practice-lab"))return;
 const anchor=$(".right",panel),id=c.lessonId;
 if(!anchor)return;
 const labs=[];
 const listening=listeningLab(id);if(listening)labs.push(listening);
 if(id==="speaking"||id==="final")labs.push(speakStudio());
 if(["grammar","speaking","vancouver","critical"].includes(id))labs.push(writingLab(id));
 labs.forEach(l=>anchor.insertAdjacentElement("beforebegin",l));
}
function run(){
 const c=contexts();
 if(c.stage==="pre"||c.stage==="post"||c.stage==="lesson"){addQuestionAccess();if(c.stage==="lesson")enrichLesson()}
}
window.addEventListener("places:render",run);
window.addEventListener("pageshow",run);
run();
window.PLACES_PRACTICE_TOOLS={reset:()=>{saved={};try{localStorage.removeItem(K)}catch{}}};
})();