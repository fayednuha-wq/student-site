/* PLACES book-aligned deeper learning activities.
 * Module 2: Listening 1 key vocabulary + listening; Module 4: past-simple sentence building.
 * Original exercise wording is not reproduced wholesale.
 */
(()=>{"use strict";
const $=(q,r=document)=>r.querySelector(q);
const $all=(q,r=document)=>Array.from(r.querySelectorAll(q));
const e=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const words=[
 {w:"ancient",d:"very old; belonging to a distant time",s:"adjective"},
 {w:"apartment",d:"a set of rooms to live in, inside a larger building",s:"noun"},
 {w:"bridge",d:"a structure that people or vehicles use to cross water or a road",s:"noun"},
 {w:"capital",d:"the city where a country or state's government is based",s:"noun"},
 {w:"cave",d:"a naturally formed hole in a mountain or under the ground",s:"noun"},
 {w:"recognize",d:"to know something because you have seen or met it before",s:"verb"},
 {w:"rock",d:"hard natural material found in the ground",s:"noun"},
 {w:"strange",d:"different from what is normal or expected",s:"adjective"}
];
function addModule2(){
 const panel=$(".shell .panel");if(!panel||$(".places-module2-wrap",panel))return;
 const tasks=$all(":scope > .task",panel).filter(x=>!x.classList.contains("places-practice-lab"));
 if(tasks.length<3)return;
 const [learn,vocab,practice]=tasks,listen=$(".places-practice-lab",panel);
 const marker=document.createElement("div");marker.className="places-module2-wrap";marker.hidden=true;panel.append(marker);
 const one=document.createElement("div");one.className="places-skill-section";
 one.innerHTML='<h2>Part 1 · Key Vocabulary / المفردات الأساسية</h2><p><strong>Skill measured:</strong> Understanding and matching new English words with their definitions in English.</p><p dir="rtl" lang="ar">المهارة: يتعرف الطالب على الكلمات الجديدة ويطابق كل كلمة بتعريفها الإنجليزي، كما يتطلب الكتاب.</p>';
 const two=document.createElement("div");two.className="places-skill-section";
 two.innerHTML='<h2>Part 2 · Listening 1 / مهارة الاستماع</h2><p><strong>Skills measured:</strong> Listening for the main idea, then locating and checking specific supporting details through repeated listening.</p><p dir="rtl" lang="ar">المهارات: تحديد الفكرة العامة بعد الاستماع، ثم الانتباه إلى التفاصيل الداعمة والتحقق منها بعد إعادة المقطع.</p>';
 vocab.innerHTML='<span class="tag">English definition practice · Unit 1, Listening 1</span>'+
 '<h3>Learn the word AND its English definition</h3>'+
 '<div class="places-definitions">'+words.map(x=>'<article class="places-definition"><strong>'+e(x.w)+'</strong> <small>'+e(x.s)+'</small><p>'+e(x.d)+'</p><button type="button" data-pronounce="'+e(x.w)+'">🔊 Hear word</button></article>').join("")+'</div>'+
 '<div class="places-vocab-check"><h3>Practice: Match the English definition</h3><p data-meaning-question></p><div data-meaning-options class="choices"></div><p data-meaning-feedback role="status"></p><button type="button" data-next-vocab class="btn secondary">Another definition →</button></div>';
 panel.insertBefore(vocab,learn);panel.insertBefore(one,vocab);panel.insertBefore(two,learn);
 if(listen)panel.insertBefore(listen,practice);
 $all("[data-pronounce]",vocab).forEach(b=>b.onclick=()=>read(b.dataset.pronounce,.78));
 let pos=0;const order=[5,2,0,7,4,1,6,3];
 function show(){
  const correct=words[order[pos%order.length]];
  const offsets=[0,1,3,5].map(v=>words[(order[pos%order.length]+v)%words.length]);
  const alternatives=offsets.some(x=>x.w===correct.w)?offsets:[correct,...offsets.slice(0,3)];
  const items=alternatives.slice().sort((x,y)=>x.w.localeCompare(y.w));
  $("[data-meaning-question]",vocab).textContent='Which word means: "'+correct.d+'"?';
  $("[data-meaning-options]",vocab).innerHTML=items.map(x=>'<button class="choice" type="button" data-def="'+e(x.w)+'">'+e(x.w)+'</button>').join("");
  $("[data-meaning-feedback]",vocab).textContent="";
  $all("[data-def]",vocab).forEach(b=>b.onclick=()=>{$("[data-meaning-feedback]",vocab).textContent=b.dataset.def===correct.w?"✓ Correct: "+correct.w+".":"Try again. Read the English definition for '"+correct.w+"' above.";});
 }
 $("[data-next-vocab]",vocab).onclick=()=>{pos++;show()};show();
}
function read(t,rate=.78){
 if(!("speechSynthesis" in window))return;
 speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang="en-US";u.rate=rate;
 const v=speechSynthesis.getVoices().find(x=>x.lang==="en-US"&&/Samantha|Ava|Jenny|Aria|female|Victoria|Karen/i.test(x.name));
 if(v)u.voice=v;speechSynthesis.speak(u);
}
const rules=[
 ["Past-simple statement","Subject + past verb + object / place + time","I visited an old city last summer.","For regular verbs, add -ed when appropriate. Some verbs are irregular (go → went, see → saw)."],
 ["Past-simple question","Did + subject + base verb + object / place + time?","Did you visit the old city last summer?","After Did, the main verb is in its base form: visit, NOT visited."],
 ["Past-simple negative","Subject + did not + base verb + object / place","We did not visit the city.","Do not put -ed on the main verb after didn't."],
 ["Be in the past","Subject + was/were + description","The house was ancient.","For past be, use was/were without did."]
];
const drills=[
 {title:"Arrange a statement",tokens:["yesterday","the museum","visited","We"],answer:["We","visited","the museum","yesterday"],hint:"Begin with the subject, then past-tense verb, place/object, and time."},
 {title:"Arrange a past question",tokens:["the bridge","last week?","Did","you","visit"],answer:["Did","you","visit","the bridge","last week?"],hint:"Start with Did + subject + base verb, then the rest."},
 {title:"Arrange a negative sentence",tokens:["Venice.","did not","They","visit"],answer:["They","did not","visit","Venice."],hint:"Use subject + did not + base verb + place."}
];
function addGrammar(){
 const panel=$(".shell .panel");if(!panel||$(".places-grammar-lab",panel))return;
 const original=$all(":scope > .task",panel).filter(x=>!x.classList.contains("places-practice-lab"));
 if(original.length<3)return;
 const sec=document.createElement("section");sec.className="task places-grammar-lab";
 sec.innerHTML='<h2>Past simple: build a sentence step by step</h2><p dir="rtl" lang="ar">رتّب عناصر الجملة: الفاعل أولاً، ثم الفعل المناسب، وبعده بقية الجملة. في سؤال الماضي نبدأ بـ Did ثم الفاعل والفعل بصيغته الأساسية.</p>'+
 '<div class="places-rulegrid">'+rules.map(x=>'<article class="places-rule"><h3>'+e(x[0])+'</h3><p><strong>Order:</strong> '+e(x[1])+'</p><p class="places-example">'+e(x[2])+'</p><small>'+e(x[3])+'</small></article>').join("")+'</div>'+
 '<h3>Sentence-order challenge</h3><p>Select the words in the correct order. Tap a selected word to undo it.</p>'+
 '<p data-grammar-task></p><div class="places-token-options" data-grammar-words></div>'+
 '<div class="places-arranged" aria-live="polite" data-grammar-arranged></div>'+
 '<div class="places-controls"><button type="button" class="btn" data-grammar-check>Check my order</button><button type="button" class="btn secondary" data-grammar-undo>Undo</button><button type="button" class="btn secondary" data-grammar-next>Next sentence</button><button type="button" class="btn secondary" data-grammar-ask>💬 Explain with AI / اشرح لي الترتيب</button></div>'+
 '<p data-grammar-feedback role="status"></p>';
 panel.insertBefore(sec,original[2]);
 let level=0,selected=[];
 function paint(){
   const item=drills[level],used=new Set(selected);
   $("[data-grammar-task]",sec).textContent=item.title;
   $("[data-grammar-words]",sec).innerHTML=item.tokens.map((word,i)=>'<button type="button" class="places-token" data-wordid="'+i+'" '+(used.has(i)?"disabled":"")+'>'+e(word)+'</button>').join("");
   $("[data-grammar-arranged]",sec).innerHTML=selected.map((id,j)=>'<button type="button" class="places-token selected" data-remove="'+j+'">'+e(item.tokens[id])+'</button>').join("")||'<span class="muted">Build your sentence here / رتب الجملة هنا</span>';
   $all("[data-wordid]",sec).forEach(b=>b.onclick=()=>{selected.push(Number(b.dataset.wordid));paint()});
   $all("[data-remove]",sec).forEach(b=>b.onclick=()=>{selected.splice(Number(b.dataset.remove),1);paint()});
 }
 function clear(){selected=[];$("[data-grammar-feedback]",sec).textContent="";paint()}
 $("[data-grammar-undo]",sec).onclick=()=>{selected.pop();paint()};
 $("[data-grammar-next]",sec).onclick=()=>{level=(level+1)%drills.length;clear()};
 $("[data-grammar-check]",sec).onclick=()=>{
  const x=drills[level],answer=selected.map(i=>x.tokens[i]);
  $("[data-grammar-feedback]",sec).textContent=answer.join(" ")===x.answer.join(" ")?"✓ Excellent! The order is correct. / ممتاز! ترتيبك صحيح: الفاعل والفعل وبقية الجملة في مواضعها المناسبة.":x.hint+" Try a different order. / حاول مرة أخرى. إذا كانت جملة خبرية ابدأ بالفاعل ثم فعل الماضي، وإذا كان سؤالًا ابدأ بـ Did ثم الفاعل والفعل الأساسي، وإذا كان نفيًا استخدم did not ثم الفعل الأساسي.";
 };
 $("[data-grammar-ask]",sec).onclick=()=>{
  const item=drills[level],attempt=selected.map(i=>item.tokens[i]).join(" ");
  const question="Help me understand the past-simple word-order exercise in Module 4. Task: "+item.title+". Word tiles: "+item.tokens.join(" | ")+". My current order: "+(attempt||"I have not arranged them yet")+". Explain in simple Arabic and English how to decide word order and why, with a brief hint and example. This is lesson practice, not the diagnostic or post-test.";
  if(window.PLACES_ASK_TUTOR)window.PLACES_ASK_TUTOR(question);
  else $( "[data-grammar-feedback]",sec).textContent="اسأل المساعد بعد انتهاء التشخيص، وابدأ بالفاعل في الجملة أو Did في السؤال.";
 };
 clear();
}
function apply(){
 const c=window.PLACES_CONTEXT?.();if(!c||c.stage!=="lesson")return;
 if(c.lessonId==="homes")addModule2();
 if(c.lessonId==="grammar")addGrammar();
}
window.addEventListener("places:render",apply);apply();
})();