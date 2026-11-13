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
pre:["اختر الكلمة التي تدل على بناء يُستخدم لعبور النهر.","شغّل المقطع الصوتي ثم اختر نوع المنازل الموصوفة.","استمع للمقطع ثم اختر المكان الذي يصفه المتحدث.","اختر الكلمة التي تحتوي صوتًا مشابهًا للكلمة المذكورة.","أكمل الجملة بفعل الماضي المناسب.","اختر فعل الماضي الصحيح لإكمال الجملة.","اختر العبارة التي يمكن التحقق منها تاريخيًا.","اختر المعلومة الأكثر ارتباطًا بموضوع النقل في البندقية.","اختر مقدمة واضحة للعرض الشفهي.","اختر عبارة تنقل المستمع إلى فكرة جديدة."],
post:["اختر تعريف الكلمة الإنجليزية المذكورة.","استمع للمقطع وحدد مكان عبور المشاة.","استمع للمقطع ثم اختر فكرته العامة.","اختر الكلمة التي تحمل صوت العلة نفسه.","أكمل الجملة بصيغة الماضي الصحيحة.","اختر الكلمة المناسبة لبداية سؤال في الماضي.","اختر جملة تعبّر عن رأي شخصي.","اختر معلومة ترتبط بموضوع تكلفة المعيشة.","اختر عبارة مناسبة لخاتمة العرض.","اختر الرأي السلبي المدعوم بسبب."]
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
const DETAIL_CHECKS={
venice:{q:"Which traditional boat is mentioned?",options:["Gondola","Bus","Bicycle"],a:0,why:"The passage names the gondola as a traditional Venetian boat."},
homes:{q:"Why can people make rooms in the Cappadocia rock?",options:["The rock is soft enough to shape","The rock is made of glass","The homes are floating"],a:0,why:"The speaker explains that the rock is soft enough to shape."},
vancouver:{q:"Which two activities are mentioned in Stanley Park?",options:["Walking and cycling","Skiing and surfing","Flying and driving"],a:0,why:"Paths allow visitors to walk and cycle."},
pronunciation:{q:"Which word has the /ʌ/ vowel sound?",options:["Cup","Cave","Make"],a:0,why:"The word cup contains /ʌ/."},
grammar:{q:"What did the speaker see yesterday?",options:["A gondola","A skyscraper","A cave"],a:0,why:"The speaker says 'I saw a gondola'."},
critical:{q:"Which detail is unrelated to park activities?",options:["The price of a new phone","Walking paths","Cycling"],a:0,why:"Phone prices do not help explain park activities."}
};
let prefs={accent:"en-US",rate:1};
let voiceNote="";
const available=()=>typeof speechSynthesis!=="undefined"?speechSynthesis.getVoices():[];
const voiced=(accent)=>{
 const a=available().filter(v=>v.lang.toLowerCase()===accent.toLowerCase());
 // Voice gender is NOT exposed by the Web Speech API; try commonly feminine-labelled voices when available.
 const names=/female|samantha|victoria|karen|moira|serena|susan|zira|aria|jenny|sonia|emily|ava|allison|kate|salli|amy|joanna|nicole|olivia/i;
 return a.find(v=>names.test(v.name))||a[0]||null;
};
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
 const q=document.createElement("button");q.type="button";q.className="btn secondary";q.textContent="🔊 Listen / استمع للسؤال";q.onclick=()=>say(text,"en-US",contexts().lessonId==="final"?0.69:0.80);
 const opt=document.createElement("button");opt.type="button";opt.className="btn secondary";opt.textContent="🔊 Read options / استمع للخيارات";opt.onclick=()=>{const choices=$all(isExam?"[data-answer]":"[data-option]");const letters=["A","B","C","D","E","F"];say(choices.map((e,i)=>"Option "+letters[i]+". "+e.textContent.trim()+".").join(" ... "),"en-US",contexts().lessonId==="final"?0.68:0.80)};
 const ar=document.createElement("button");ar.type="button";ar.className="btn secondary";ar.textContent="🇸🇦 التعليمات بالعربية";ar.onclick=()=>{const note=$(".places-ar-directions",wrapper.parentElement);if(note)note.hidden=!note.hidden};
 const readAr=document.createElement("button");readAr.type="button";readAr.className="btn secondary";readAr.textContent="🔊 اسمع المطلوب بالعربي";readAr.onclick=()=>{const note=$(".places-ar-directions",wrapper.parentElement);if(note)say(note.textContent,"ar-SA",0.95)};
 wrapper.append(q,opt,ar);if(contexts().lessonId!=="final"||isExam)wrapper.append(readAr);return wrapper;
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
const LISTENING_AR={
 venice:["كيف ينتقل الناس في الممرات المائية في البندقية؟","ما نوع القارب التقليدي الذي ذكره المتحدث؟"],
 homes:["ما المادة التي صُنعت منها بعض منازل كابادوكيا؟","لماذا يستطيع الناس تشكيل غرف داخل تلك الصخور؟"],
 vancouver:["أي جملة تمثل رأيًا شخصيًا لا حقيقة قابلة للتحقق؟","أي نشاطين ذكرهما المتحدث في حديقة ستانلي؟"],
 pronunciation:["أي كلمة تحتوي على نفس صوت العلة في cave؟","أي كلمة يُسمع فيها صوت العلة /ʌ/؟"],
 grammar:["أي فعل في المقطع جاء بصيغة الماضي البسيط؟","ماذا رأى المتحدث أثناء زيارته أمس؟"],
 critical:["أي معلومة ترتبط مباشرة بموضوع الأنشطة في الحديقة؟","أي معلومة لا علاقة لها بأنشطة الحديقة؟"]
};
const LISTENING_REASON_AR={
 venice:"ذكر المقطع أن التنقل في البندقية يتم عبر القنوات باستخدام القوارب.",
 homes:"ذكر المتحدث أن بعض المنازل حُفرت في الصخور اللينة.",
 pronunciation:"كلمتا cave وmake تتشاركان صوت العلة /eɪ/.",
 grammar:"كلمة visited فعل ماضٍ بسيط منتظم؛ أُضيفت -ed إلى visit.",
 vancouver:"العبارة التي تحتوي على best تعبّر عن رأي شخصي وليس حقيقة يمكن إثباتها.",
 critical:"المشي وركوب الدراجة يرتبطان مباشرة بالأنشطة داخل الحديقة."
};
function questionListeningTools(section,id,p){
 const prompts=[{title:p.question,choices:'[data-listen-option]',text:LISTENING_AR[id]?.[0]}];
 for(let j=0;j<prompts.length;j++){
  const item=prompts[j];
  const heading=$all("h3",section).find(x=>x.textContent.trim()===item.title);
  if(!heading)continue;
  const wrap=document.createElement("div");wrap.className="places-listening-instructions";
  const dir=document.createElement("p");dir.dir="rtl";dir.lang="ar";
  dir.textContent=(j===0?"السؤال الأول — استمع إلى المقطع واختر الإجابة التي تعبّر عن الفكرة أو المعلومة المطلوبة. ":"السؤال الثاني — أعد الاستماع وركز على تفصيل محدد. ")+item.text;
  const buttons=document.createElement("div");buttons.className="places-controls";
  const hear=(label,fn)=>{const b=document.createElement("button");b.type="button";b.className="btn secondary";b.textContent=label;b.onclick=fn;buttons.append(b)};
  hear("🔊 Read question / اسمع السؤال",()=>say(item.title,"en-US",.78));
  hear("🔊 Read options / اسمع الاختيارات",()=>{
   const choices=$all(item.choices,section).map((b,i)=>"Option "+String.fromCharCode(65+i)+". "+b.textContent+".");
   say(choices.join(" ... "),"en-US",.76);
  });
  hear("🔊 اسمع المطلوب بالعربي",()=>say(dir.textContent,"ar-SA",.82));
  wrap.append(dir,buttons);heading.insertAdjacentElement("afterend",wrap);
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
 '<p data-answer-note aria-live="polite" class="places-bilingual-feedback"></p><button type="button" data-transcript class="btn secondary">Show transcript after answering / عرض النص بعد الإجابة</button><p class="places-transcript" data-transcript-text hidden>'+esc(p.text)+'</p>'+
 '<p class="places-note">Original practice passage, adapted to Unit 1 themes. Not the publisher’s textbook audio.</p>';
 questionListeningTools(section,id,p);
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
 $all("[data-listen-option]",section).forEach(b=>{b.onclick=()=>{
  answered=true;const chosen=Number(b.dataset.listenOption),correct=chosen===p.correct;
  $all("[data-listen-option]",section).forEach(x=>{x.classList.remove("correct","wrong");if(Number(x.dataset.listenOption)===p.correct)x.classList.add("correct");else if(x===b)x.classList.add("wrong")});
  const fb=$("[data-answer-note]",section);
  fb.innerHTML='<p lang="en" dir="ltr"><strong>'+(correct?'✓ Correct.':'✗ Incorrect.')+'</strong> Answer: '+esc(p.answers[p.correct])+'. '+esc(p.why)+'</p>'+
   '<p lang="ar" dir="rtl"><strong>'+(correct?'✅ إجابتك صحيحة.':'❌ إجابتك غير صحيحة.')+'</strong> الإجابة الصحيحة: '+esc(p.answers[p.correct])+'. '+esc(LISTENING_REASON_AR[id]||"أعد الاستماع وركّز على المعلومة المرتبطة بالسؤال.")+'</p>';
 }});
 $("[data-transcript]",section).onclick=()=>{if(!answered){$("[data-answer-note]",section).textContent="Answer first to reveal the transcript. / أجب عن السؤال أولاً قبل عرض النص.";return}const z=$("[data-transcript-text]",section);z.hidden=!z.hidden};
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
 const sec=document.createElement("section");sec.className="task places-practice-lab places-speaking-builder";
 const parts=[
  {key:"intro",en:"Introduction — name the place and tell us where it is.",ar:"المقدمة — عرّف المكان واذكر موقعه.",placeholder:"Today I will talk about Venice. It is in Italy."},
  {key:"fact",en:"Facts — share checkable information about the place.",ar:"الحقائق — قدّم معلومات يمكن التحقق منها عن المكان.",placeholder:"Venice has many canals and bridges."},
  {key:"opinion",en:"Positive opinion — state something good and explain why.",ar:"الرأي الإيجابي — اذكر ميزة في المكان وعلّل إعجابك بها.",placeholder:"In my opinion, Venice is beautiful because of the canals."},
  {key:"negative",en:"Negative opinion — describe one drawback and why.",ar:"الرأي السلبي — اذكر عيبًا محتملًا مع السبب.",placeholder:"However, Venice can be crowded because many tourists visit."},
  {key:"end",en:"Conclusion — summarize and give a final recommendation.",ar:"الخاتمة — لخّص أفكارك وقدّم توصية أو رسالة أخيرة.",placeholder:"To conclude, I recommend visiting Venice. Thank you for listening."}
 ];
 sec.innerHTML='<h2>🎤 Guided Speaking & Presentation Studio</h2>'+
 '<p lang="en" dir="ltr">Plan five short parts, then listen, practise and record each one. You can also record your complete presentation in the microphone studio.</p>'+
 '<p lang="ar" dir="rtl">خطط لخمسة أجزاء قصيرة ثم استمع إلى كل جزء، وتدرّب عليه، وسجّل صوتك. يمكنك أيضًا تسجيل العرض كاملًا في استوديو الصوت.</p>'+
 '<div class="places-presentation-guide"><h3>Presentation parts / أجزاء العرض</h3>'+
 parts.map((p,i)=>'<div class="places-presentation-part"><strong lang="en" dir="ltr">'+(i+1)+'. '+esc(p.en)+'</strong><p lang="ar" dir="rtl">'+esc(p.ar)+'</p></div>').join("")+'</div>'+
 '<div class="places-speaking-fields">'+parts.map((p,i)=>
  '<div class="places-speaking-part" data-part="'+esc(p.key)+'">'+
  '<label class="places-writing-field" for="sp-'+esc(p.key)+'"><span lang="en" dir="ltr">'+(i+1)+'. '+esc(p.en)+'</span><span lang="ar" dir="rtl">'+esc(p.ar)+'</span></label>'+
  '<textarea id="sp-'+esc(p.key)+'" class="places-speaking-draft" data-stage="'+esc(p.key)+'" rows="2" placeholder="'+esc(p.placeholder)+'">'+esc(saved["final-"+p.key]||"")+'</textarea>'+
  '</div>').join("")+'</div>'+
 '<div class="places-controls"><label class="places-speed-label">Playback speed <select data-presentation-speed><option value=".62">Extra slow 0.62×</option><option value=".72" selected>Slow 0.72×</option><option value=".85">Steady 0.85×</option><option value="1">Normal 1×</option></select></label>'+
 '<button class="btn" type="button" data-builder-listen>🔊 Listen to my script</button>'+
 '<button class="btn secondary" type="button" data-builder-check>✓ Check five parts / فحص الأجزاء</button></div>'+
 '<div class="places-bilingual-feedback" role="status" data-builder-feedback>'+
 '<p lang="en">Use the five parts to organize your spoken presentation.</p><p lang="ar" dir="rtl">اكتب جملة أو جملتين لكل جزء لتنظيم عرضك الشفهي.</p></div>'+
 '<fieldset class="places-rubric"><legend>Self reflection / تقييم ذاتي</legend>'+
 '<label><input type="checkbox"> I introduced the place clearly.</label>'+
 '<label><input type="checkbox"> I gave at least one verifiable fact.</label>'+
 '<label><input type="checkbox"> I explained positive and negative opinions.</label>'+
 '<label><input type="checkbox"> I concluded clearly.</label></fieldset>';
 $all("[data-stage]",sec).forEach(t=>t.oninput=()=>saveDraft("final-"+t.dataset.stage,t.value));
 const getLines=()=>$all("[data-stage]",sec).map(t=>t.value.trim()).filter(Boolean);
 $("[data-builder-listen]",sec).onclick=()=>{
  const lines=getLines();
  if(!lines.length){$("[data-builder-feedback]",sec).textContent="Write a sentence first. / اكتب جملة أولًا.";return}
  say(lines.join(" ... "),"en-US",Number($("[data-presentation-speed]",sec).value));
 };
 $("[data-builder-check]",sec).onclick=()=>{
  const fields=$all("[data-stage]",sec),filled=fields.filter(t=>t.value.trim()).length;
  const msg=$("[data-builder-feedback]",sec);
  msg.innerHTML='<p lang="en" dir="ltr">'+(filled===5?"✓ All five parts have a draft. Now rehearse aloud.":"You filled "+filled+" of 5 parts. Please finish the missing sections.")+'</p>'+
  '<p lang="ar" dir="rtl">'+(filled===5?"✅ كتبت مسودات الأجزاء الخمسة. الآن تدرّب على الإلقاء.":"أكملت "+filled+" من خمسة أجزاء. أكمل الأجزاء الناقصة قبل التسجيل الكامل.")+'</p>';
 };
 return sec;
}
function writingLab(id){
 const sec=document.createElement("section");sec.className="task places-practice-lab";
 const topic=id==="grammar"?"Write two past-simple sentences about a trip.":"Write one verifiable fact and one personal opinion about a place.";
 const example=id==="grammar"?"I visited Venice. I saw a canal.":"Vancouver is in Canada. In my opinion, its parks are beautiful.";
 sec.innerHTML='<h2>✍️ Writing Workshop</h2><p>'+esc(topic)+'</p>'+
 '<p lang="ar" dir="rtl">اكتب جملتين قصيرتين، ثم راجع الترتيب وعلامات الترقيم، وتأكد أن الجملتين مناسبتان للمطلوب. سيظهر لك الشرح بالعربية والإنجليزية.</p>'+
 (id!=="grammar"?'<div class="places-concept-note"><strong>Fact / حقيقة</strong><p>A statement you can verify with evidence. Example: Vancouver is in Canada.</p><p dir="rtl" lang="ar">الحقيقة: معلومة يمكن إثباتها أو التحقق منها باستخدام مصدر موثوق، مثل: فانكوفر مدينة في كندا.</p><strong>Opinion / رأي</strong><p>A personal judgment that others might disagree with. Example: I think Vancouver is beautiful.</p><p dir="rtl" lang="ar">الرأي: حكم أو تفضيل شخصي قد يختلف معه الآخرون، مثل: أعتقد أن فانكوفر جميلة. حتى دون I think قد تظل العبارة رأيًا.</p></div>':'<div class="places-concept-note"><strong>Past simple / الماضي البسيط</strong><p>Use subject + past verb + rest, e.g. I visited Venice. Questions: Did + subject + base verb?</p><p dir="rtl" lang="ar">الجملة في الماضي: فاعل + فعل ماضٍ + بقية الجملة. في السؤال نبدأ بـ Did ثم الفاعل والفعل بصيغته الأصلية.</p></div>')+
 '<button type="button" class="btn secondary" data-example>Show example / مثال</button><p class="places-note" data-example-text hidden>'+esc(example)+'</p>'+
 '<label class="places-writing-field">My writing <textarea data-writing rows="4" placeholder="Write your short answer here...">'+esc(saved["writing-"+id]||"")+'</textarea></label>'+
 '<div class="places-controls"><button type="button" class="btn" data-write-review>✓ Check requirements / تحقق من الشروط</button><button type="button" class="btn secondary" data-read-writing>🔊 Listen to what I wrote</button><button type="button" class="btn secondary" data-ai-feedback>💬 Ask AI for writing feedback</button></div>'+
 '<div role="status" class="places-bilingual-feedback" data-write-feedback></div>'+
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
  const raw=w.value.trim(),sentences=raw.split(/[.!?]+/).map(z=>z.trim()).filter(Boolean),wc=raw.split(/\s+/).filter(Boolean).length;
  const tests=[
   {ok:sentences.length>=2,en:"At least two sentences.",ar:"كتابة جملتين على الأقل."},
   {ok:/^[A-Z]/.test(raw),en:"Start with a capital letter.",ar:"البدء بحرف إنجليزي كبير."},
   {ok:/[.!?]$/.test(raw),en:"Finish with punctuation.",ar:"وضع علامة ترقيم مناسبة في النهاية."}
  ];
  if(id==="grammar"){
   tests.push({ok:/\b(visited|went|saw|walked|lived|travelled|traveled|played|was|were|did|stayed|arrived|took|made|had)\b/i.test(raw),
    en:"A recognisable past-simple verb from the examples.",ar:"وجود فعل ماضٍ واضح من الأمثلة."});
   tests.push({ok:!/\bdid\s+\w+\s+\w+ed\b/i.test(raw),en:"No obvious -ed after Did.",ar:"عدم وضع -ed على الفعل بعد Did."});
  }else{
   tests.push({ok:/\b(i think|in my opinion|personally|i believe|beautiful|best|wonderful|crowded|boring|interesting)\b/i.test(raw),
    en:"A phrase suggesting personal opinion.",ar:"وجود تعبير يدل على رأي شخصي."});
  }
  const passed=tests.filter(x=>x.ok).length,complete=wc>0&&passed===tests.length;
  const english=tests.map(x=>'<p lang="en" dir="ltr">'+(x.ok?'✅ PASS':'❌ CHECK')+' — '+esc(x.en)+'</p>').join("");
  const arabic=tests.map(x=>'<p lang="ar" dir="rtl">'+(x.ok?'✅ متحقق':'❌ يحتاج تعديل')+' — '+esc(x.ar)+'</p>').join("");
  const ex=id==="grammar"?"I visited Venice. I saw a canal.":"Vancouver is in Canada. In my opinion, its parks are beautiful.";
  $("[data-write-feedback]",sec).innerHTML='<h3>'+ (complete?"✅ Requirements met / الشروط الظاهرة متحققة":"⚠️ Revision needed / تحتاج إلى مراجعة") +'</h3>'+
   '<div class="places-feedback-languages"><div>'+english+'</div><div>'+arabic+'</div></div>'+
   '<p lang="en" dir="ltr"><strong>Model answer:</strong> '+esc(ex)+'</p>'+
   '<p lang="ar" dir="rtl"><strong>إجابة نموذجية:</strong> '+esc(id==="grammar"?"زرت البندقية. رأيت قناة مائية.":"فانكوفر تقع في كندا. وفي رأيي حدائقها جميلة.")+'</p>'+
   '<p lang="en" dir="ltr">This checks visible requirements, not whether every sentence is correct. Use AI feedback or a teacher to review meaning and grammar.</p>'+
   '<p lang="ar" dir="rtl">الفحص يحدد الشروط الظاهرة فقط، ولا يضمن أن كل جملة صحيحة نحويًا أو معنويًا. استخدم المساعد أو المعلم لمراجعة الجودة.</p>';
 }
 return sec;
}
function enrichLesson(){
 const c=contexts();if(c.stage!=="lesson")return;
 const panel=$(".shell .panel");if(!panel||$(".places-practice-lab"))return;
 const anchor=$(".right",panel),id=c.lessonId;
 if(!anchor)return;
 const labs=[];
 const listening=listeningLab(id);if(listening)labs.push(listening);
 if(id==="final")labs.push(speakStudio());
 if(["grammar","vancouver","critical"].includes(id))labs.push(writingLab(id));
 labs.forEach(l=>anchor.insertAdjacentElement("beforebegin",l));
}
function run(){
 const c=contexts();
 if(c.stage==="pre"||c.stage==="post"||c.stage==="lesson"){addQuestionAccess();if(c.stage==="lesson")enrichLesson()}
}
window.addEventListener("places:render",()=>{
 const c=contexts();
 if(c.stage!=="lesson"||!["speaking","final"].includes(c.lessonId)){
   if(recorder?.state==="recording"){try{recorder.stop()}catch{}}
   stream?.getTracks().forEach(track=>track.stop());
   stream=null;
 }
});
window.addEventListener("places:render",run);
window.addEventListener("pageshow",run);
run();
window.PLACES_PRACTICE_TOOLS={reset:()=>{saved={};try{localStorage.removeItem(K)}catch{}}};
})();