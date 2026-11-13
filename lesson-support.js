/* PLACES bilingual pedagogy, phonemic symbols, and oral presentation sequencing.
   Supplementary original examples based on the Unit 1 learning objectives.
   Speech synthesis availability/voice varies by browser; no automatic pronunciation scoring.
*/
(()=>{
"use strict";
const $=(q,r=document)=>r.querySelector(q);
const $$=(q,r=document)=>Array.from(r.querySelectorAll(q));
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const guide={
 venice:{
  title:"Watching & listening / المشاهدة والاستماع",
  en:"Before listening, look at the pictures and predict what the speaker will discuss. The main idea is the overall message; supporting details explain it. In Venice, waterways and boats are evidence of how important canals are.",
  ar:"قبل الاستماع انظر إلى الصور وتوقّع موضوع المقطع. الفكرة العامة هي المعنى الأساسي الذي يربط الحديث كله، أما التفاصيل فهي معلومات محددة تدعمها. في البندقية توضح القنوات والقوارب أهمية التنقل عبر الماء.",
  example:"Main idea: Life in Venice involves waterways. Detail: People use boats on canals."
 },
 homes:{
  title:"Listening 1 / الاستماع الأول",
  en:"Part 1 teaches English word meanings. Part 2 trains you to identify the main idea and supporting details. Listen once for the topic and again for exact information.",
  ar:"في الجزء الأول تتعلم معاني الكلمات بتعريفات إنجليزية. وفي الجزء الثاني تستمع لتعرف الفكرة العامة أولًا، ثم تعيد المقطع للبحث عن تفاصيل محددة. لا تجعل تفصيلًا صغيرًا يبدو وكأنه الموضوع كله.",
  example:"Main idea: Homes have different designs. Detail: Some homes are carved into rock."
 },
 pronunciation:{
  title:"Vowels & IPA symbols / أصوات العلة والرموز الصوتية",
  en:"A vowel is a speech sound made with an open vocal tract (for example the main sound in place or up). A phonemic symbol between slashes, such as /eɪ/, represents SOUND, not spelling. Different written letters can have the same sound. The book introduces /eɪ/, /ɒ/, /ɪ/ and /ʌ/.",
  ar:"الـ Vowel هو صوت العِلّة الذي ننطقه دون إغلاق كامل لمجرى الهواء، وليس بالضرورة حرفًا واحدًا كما كُتب. الرمز بين شرطتين مائلتين / / يوضح الصوت الذي تسمعه، وليس طريقة كتابة الكلمة. مثال: كلمتا place وcave تشتركان في /eɪ/ رغم اختلاف الحروف. ويقدّم الكتاب الأصوات /eɪ/ و/ɒ/ و/ɪ/ و/ʌ/.",
  example:"/eɪ/ as in place; /ɒ/ in British hot; /ɪ/ as in quick; /ʌ/ as in up."
 },
 grammar:{
  title:"Past simple / الماضي البسيط",
  en:"Use the past simple for completed past actions. Statement: subject + past verb + rest (We visited the bridge). Question: Did + subject + base verb + rest? (Did we visit the bridge?). Negative: subject + didn't + base verb (We didn't visit it). After DID, do not add -ed.",
  ar:"نستخدم الماضي البسيط لحدث انتهى. الجملة الخبرية: الفاعل + فعل الماضي + بقية الجملة. السؤال: Did + الفاعل + الفعل في صورته الأساسية + بقية السؤال؟ النفي: الفاعل + didn't + الفعل الأساسي. انتبه: بعد Did وdidn't نستخدم visit وليس visited. بعض الأفعال شاذة مثل go → went وsee → saw.",
  example:"We visited the bridge. / Did we visit the bridge? / We didn't visit it."
 },
 vancouver:{
  title:"Facts vs opinions / الحقيقة والرأي",
  en:"A fact can be checked with reliable evidence. An opinion is a personal judgment or preference. An opinion does not always start with 'I think': words such as best or beautiful may signal judgment. Listening 2 asks you to distinguish both types.",
  ar:"الحقيقة (Fact) معلومة يمكن التأكد من صحتها باستخدام دليل أو مصدر موثوق، مثل: Vancouver is in Canada. أمّا الرأي (Opinion) فهو حكم أو تفضيل شخصي قد يختلف فيه الناس، مثل: Vancouver is the most beautiful city. وأحيانًا يكون الكلام رأيًا حتى لو لم يتضمن I think.",
  example:"Fact: Stanley Park is in Vancouver. Opinion: Stanley Park is the best place to relax."
 },
 critical:{
  title:"Relevant ideas / الأفكار ذات الصلة",
  en:"Relevant information helps your audience understand your chosen presentation topic. Irrelevant details distract. Before selecting any fact or opinion, ask: Does this help explain the place or the aspect I am discussing?",
  ar:"المعلومة ذات الصلة (Relevant) هي المعلومة التي تخدم موضوع العرض وتساعد المستمع على فهمه. أما المعلومة غير المرتبطة (Irrelevant) فتشتت الانتباه. إذا كان العرض عن أنشطة الحديقة، فالمشي وركوب الدراجة مناسبان، أما سعر الهاتف فلا يرتبط بالموضوع. وقد تكون المعلومة صحيحة لكنها غير مناسبة للعرض.",
  example:"Topic: Activities in Stanley Park. Relevant: walking paths. Irrelevant: a phone advertisement."
 },
 speaking:{
  title:"Organizing a presentation / تنظيم العرض الشفهي",
  en:"A well-structured presentation has an introduction, useful facts, supported positive and negative opinions, and a conclusion. Transitional phrases such as First, Next, However and Finally help listeners follow the order. Practise arranging the sentences, listening to each line, then repeating after a pause.",
  ar:"العرض الجيد يتدرج من المقدمة إلى الحقائق، ثم الرأي الإيجابي والسلبي، وينتهي بالخاتمة. تربط العبارات First وNext وHowever وFinally أجزاء العرض ليسهل على المستمع متابعته. في التدريب أدناه رتّب الجمل أولًا، ثم اسمع كل جملة وانتظر فترة الصمت لترددها بصوتك.",
  example:"First, I will introduce Venice. / Next, here is a fact. / However, it can be crowded. / Finally, thank you."
 },
 final:{
  title:"Final speaking task / مهمة العرض النهائية",
  en:"Prepare five clear parts: introduction, facts, positive opinion, negative opinion and conclusion. The introduction names the place, facts are verifiable, opinions give judgments with reasons, and the conclusion wraps up. Use short sentences, listen at a slow speed and record yourself to practise.",
  ar:"حضّر عرضك في خمسة أجزاء: ١- المقدمة: تعريف المكان وموقعه. ٢- الحقائق: معلومات يمكن التحقق منها. ٣- الرأي الإيجابي: ميزة تعجبك مع سبب. ٤- الرأي السلبي: عيب محتمل مع سبب. ٥- الخاتمة: تلخيص وتوصية أو رسالة أخيرة. اكتب جملًا قصيرة، واستمع إليها ببطء، ثم سجّل صوتك لتراجع أداءك.",
  example:"Introduction → Facts → Positive opinion → Negative opinion → Conclusion."
 }
};
let oralStop=()=>{};
function say(text,rate=.74,lang="en-US",onend){
 if(!("speechSynthesis" in window))return false;
 speechSynthesis.cancel();
 const utter=new SpeechSynthesisUtterance(text);utter.lang=lang;utter.rate=rate;
 const voices=speechSynthesis.getVoices();
 const list=voices.filter(v=>v.lang.toLowerCase()===lang.toLowerCase());
 const preferred=list.find(v=>/samantha|victoria|karen|serena|jenny|aria|ava|allison|female/i.test(v.name))||list[0];
 if(preferred)utter.voice=preferred;
 if(onend)utter.onend=onend;
 speechSynthesis.speak(utter);return true;
}
function addGuide(id){
 const panel=$(".shell .panel");if(!panel||$(".places-bilingual-guide",panel))return;
 const learn=$$(".task",panel).find(x=>x.textContent.includes("Learn")&&x.querySelector("#speakLesson"));
 if(!learn||!guide[id])return;
 const g=guide[id],section=document.createElement("section");section.className="places-bilingual-guide task";
 section.innerHTML='<div class="places-controls"><h2>'+esc(g.title)+'</h2><button type="button" class="btn secondary" data-toggle-ar aria-expanded="true">إخفاء الشرح بالعربية / Hide Arabic</button></div>'+
 '<div class="places-concept-note"><p lang="en">'+esc(g.en)+'</p><p dir="rtl" lang="ar" class="places-ar-guide">'+esc(g.ar)+'</p><p><strong>Example:</strong> '+esc(g.example)+'</p></div>'+
 '<div class="places-controls"><button type="button" class="btn secondary" data-read-en>🔊 Listen to English explanation</button><button type="button" class="btn secondary" data-read-ar>🔊 اسمع الشرح بالعربية</button></div>';
 learn.insertAdjacentElement("afterend",section);
 const ar=$(".places-ar-guide",section);
 const toggle=$("[data-toggle-ar]",section);
 toggle.onclick=()=>{ar.hidden=!ar.hidden;toggle.setAttribute("aria-expanded",String(!ar.hidden));toggle.textContent=ar.hidden?"عرض الشرح بالعربية / Show Arabic":"إخفاء الشرح بالعربية / Hide Arabic"};
 $("[data-read-en]",section).onclick=()=>say(g.en,.77);
 $("[data-read-ar]",section).onclick=()=>say(g.ar,.87,"ar-SA");
 if(id==="pronunciation")addIPA(section);
}
function addIPA(parent){
 const sec=document.createElement("div");sec.className="places-ipa";
 const data=[
  ["/eɪ/","place · cave · make","صوت مزدوج يتحرك من بداية إلى نهاية، مثل صوت حرف العلة في place."],
  ["/ɒ/","hot · not (British)","صوت علة قصير كما ينطق في البريطانية؛ قد يختلف في الأمريكية إلى /ɑ/."],
  ["/ɪ/","quick · sit","صوت قصير مختلف عن الصوت الطويل /iː/ في see."],
  ["/ʌ/","up · cup","صوت قصير يُسمع في up وcup، وليس صوت /eɪ/."],
 ];
 sec.innerHTML='<h3>Read the phonemic symbols / اقرأ الرموز الصوتية</h3>'+
 '<p dir="rtl" lang="ar">الشرطتان / / تعنيان أننا نتحدث عن <strong>الصوت المنطوق</strong>. استمع إلى الأمثلة وركّز على صوت العلة داخل الكلمة، لا على كتابة الحروف.</p>'+
 '<div class="places-ipa-grid">'+data.map((x,i)=>'<div class="places-ipa-card"><strong>'+esc(x[0])+'</strong><p>'+esc(x[1])+'</p><p dir="rtl" lang="ar">'+esc(x[2])+'</p><button type="button" data-ipa="'+i+'">🔊 Listen and compare</button></div>').join("")+'</div>'+
 '<p class="places-note">The textbook’s British /ɒ/ in hot may sound different in an American voice. / يختلف صوت بعض الكلمات باختلاف اللهجة.</p>';
 parent.append(sec);
 $$("[data-ipa]",sec).forEach(b=>b.onclick=()=>{
 const words=[["place","cave","make"],["hot","not"],["quick","sit"],["up","cup"]][Number(b.dataset.ipa)];
 say(words.join(". ... "),.69,Number(b.dataset.ipa)===1?"en-GB":"en-US");
 });
}
const lines=[
 {part:"Introduction / المقدمة",en:"Today I will introduce Venice, a city in Italy.",ar:"ابدأ بتعريف المكان وموقعه."},
 {part:"Facts / الحقائق",en:"Venice has many canals, and people travel by boat.",ar:"أضف معلومة قابلة للتحقق عن المكان."},
 {part:"Positive opinion / الرأي الإيجابي",en:"In my opinion, Venice is beautiful because of the waterways.",ar:"اذكر ميزة تعجبك مع سبب."},
 {part:"Negative opinion / الرأي السلبي",en:"However, it can be crowded during the busy season.",ar:"اذكر جانبًا سلبيًا مع تفسيره."},
 {part:"Conclusion / الخاتمة",en:"Finally, I recommend visiting Venice. Thank you for listening.",ar:"اختم بتلخيص رأيك أو التوصية بالمكان."}
];
function presentationOrdering(){
 const panel=$(".shell .panel");if(!panel||$(".places-oral-sequencing",panel))return;
 const original=$$(".task",panel).find(x=>x.querySelector("#practice"));
 if(!original)return;
 const sec=document.createElement("section");sec.className="task places-oral-sequencing";
 sec.innerHTML='<h2>🎙️ Order, Listen & Repeat / رتّب واستمع وردّد</h2>'+
 '<p dir="rtl" lang="ar">١. اختر الجمل بالترتيب المنطقي للعرض. ٢. اضغط «تحقق من الترتيب». ٣. عندما ينجح ترتيبك، اضغط «استمع وردّد»: سيسمعك الموقع جملة واحدة، ثم يسكت مدة تختارها لترددها بصوتك، ثم ينتقل للجملة التالية. لا يتم تسجيل صوتك أو تقييم نطقك هنا.</p>'+
 '<p>Choose the five lines in presentation order. Then play one sentence at a time and repeat it during each silent gap.</p>'+
 '<div class="places-controls"><label>Pause to repeat <select data-oral-pause><option value="3000">3 seconds</option><option value="5000" selected>5 seconds</option><option value="7000">7 seconds</option></select></label></div>'+
 '<h3>Sentence cards / جمل العرض</h3><div class="places-token-options" data-oral-cards></div>'+
 '<h3>Your presentation order / ترتيبك</h3><div class="places-arranged" data-oral-ordered></div>'+
 '<div class="places-controls"><button type="button" class="btn" data-oral-check>✓ Check order / تحقق</button>'+
 '<button type="button" class="btn secondary" data-oral-undo>↶ Undo / تراجع</button>'+
 '<button type="button" class="btn secondary" data-oral-play disabled>▶ Listen & repeat / استمع وردّد</button>'+
 '<button type="button" class="btn secondary" data-oral-stop>■ Stop / إيقاف</button></div>'+
 '<p role="status" data-oral-status class="places-note">Start with the introduction / ابدأ بالمقدمة.</p>';
 original.insertAdjacentElement("beforebegin",sec);
 const shuffle=[2,4,1,0,3];let selected=[],valid=false,token=0,timer=null;
 const status=$("[data-oral-status]",sec),play=$("[data-oral-play]",sec);
 const stop=()=>{
   token++;if(timer!==null)clearTimeout(timer);timer=null;
   if("speechSynthesis" in window)speechSynthesis.cancel();
 };
 oralStop=stop;
 function paint(){
  const used=new Set(selected);
  $("[data-oral-cards]",sec).innerHTML=shuffle.map(i=>'<button type="button" class="places-token" data-card="'+i+'" '+(used.has(i)?"disabled":"")+'>'+esc(lines[i].en)+'</button>').join("");
  $("[data-oral-ordered]",sec).innerHTML=selected.map((i,j)=>'<button type="button" class="places-token selected" data-remove-oral="'+j+'"><small>'+esc(lines[i].part)+'</small> '+esc(lines[i].en)+'</button>').join("")||'<span class="muted">Tap a card to add it / اختر جملة</span>';
  $$("[data-card]",sec).forEach(b=>b.onclick=()=>{selected.push(Number(b.dataset.card));valid=false;play.disabled=true;paint()});
  $$("[data-remove-oral]",sec).forEach(b=>b.onclick=()=>{selected.splice(Number(b.dataset.removeOral),1);valid=false;play.disabled=true;paint()});
 }
 $("[data-oral-check]",sec).onclick=()=>{
   valid=selected.length===5&&selected.every((v,i)=>v===i);
   play.disabled=!valid;
   status.textContent=valid?"✓ Correct! Introduction → Facts → Positive opinion → Negative opinion → Conclusion. / ممتاز! أصبح ترتيب الجمل صحيحًا؛ اضغط استمع وردّد.":"The presentation should move from the introduction to facts, positive opinion, negative opinion, then conclusion. / راجع ترتيب الأجزاء الخمسة. ابدأ بالمقدمة ثم الحقائق ثم الرأي الإيجابي والسلبي وأخيرًا الخاتمة.";
 };
 $("[data-oral-undo]",sec).onclick=()=>{stop();selected.pop();valid=false;play.disabled=true;paint()};
 $("[data-oral-stop]",sec).onclick=()=>{stop();status.textContent="Stopped / تم الإيقاف."};
 $("[data-oral-play]",sec).onclick=()=>{
   if(!valid)return;stop();const run=token;let index=0;
   const next=()=>{
    if(run!==token)return;
    if(index>=lines.length){status.textContent="✓ Finished. Practise again if you like. / انتهى الترديد ويمكنك الإعادة.";return}
    const current=lines[index++];
    status.textContent="🔊 Listen now / استمع الآن: "+current.part;
    if(!("speechSynthesis" in window)){status.textContent="Speech synthesis is not supported by this browser. / الصوت غير متاح على هذا المتصفح.";return}
    say(current.en,.73,"en-US",()=>{
     if(run!==token)return;
     const seconds=Number($("[data-oral-pause]",sec).value)/1000;
     status.textContent="🎤 Repeat aloud / ردّد الجملة بصوتك الآن. Pause: "+seconds+" seconds.";
     timer=setTimeout(()=>{timer=null;next()},seconds*1000);
    });
   };
   next();
 };
 paint();
}
window.addEventListener("places:render",()=>{
 oralStop();
 const c=window.PLACES_CONTEXT?.();if(!c||c.stage!=="lesson")return;
 addGuide(c.lessonId);
 if(c.lessonId==="speaking")presentationOrdering();
});
})();
