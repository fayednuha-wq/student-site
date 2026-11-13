/* PLACES bilingual curriculum help — free, offline, rule-based prototype; not generative AI. */
(()=>{"use strict";
const unit=[
{id:"venice",terms:"venice canal gondola palace البندقية قناة قنوات جندول قصر",en:"Venice: Canals are waterways, and gondolas are traditional boats. Before watching, use pictures to predict the topic. Listen first for the main idea, then for details.",ar:"البندقية: القنوات المائية ممرات تسير فيها القوارب، والجندول قارب تقليدي. قبل المشاهدة توقّع الموضوع من الصور، ثم استمع للفكرة العامة وبعدها التفاصيل."},
{id:"homes",terms:"unusual homes house cappadocia cave rock bridge stilts turkey منازل مساكن بيوت كهف صخر كابادوكيا دعامات",en:"Unusual homes: Compare cave homes in Cappadocia, Turkey, and other distinctive homes. A main idea covers the whole listening; details describe specific locations, materials or benefits.",ar:"المنازل غير المعتادة: قارن مساكن الكهوف في كابادوكيا بغيرها من البيوت المختلفة. الفكرة العامة تلخص المسموع كله، أما التفاصيل فتصف المكان والمواد والمميزات."},
{id:"pronunciation",terms:"pronunciation vowel sound cave make cat cup النطق صوت اصوات حرف نطق",en:"Pronunciation: 'cave' and 'make' share /eɪ/. 'Cat' has /æ/; 'cup' has /ʌ/. Focus on the sound, not just the spelling, and repeat aloud.",ar:"النطق: كلمتا cave وmake تشتركان في الصوت /eɪ/، بينما cat فيها /æ/ وcup فيها /ʌ/. ركّز على الصوت لا على شكل الحروف وكرر بصوت واضح."},
{id:"grammar",terms:"grammar past simple did verb visited went saw past tense قواعد ماضي الماضي البسيط فعل فعل ماضي",en:"Past simple: Use it for completed actions: 'I visited Venice.' For questions use Did + subject + BASE verb: 'Did you visit Venice?' NOT 'Did you visited'. Irregular forms: go → went, see → saw.",ar:"الماضي البسيط: استخدمه لحدث انتهى: I visited Venice. وللسؤال: Did + الفاعل + الفعل الأساسي، مثل Did you visit Venice? وليس Did you visited. ومن الأفعال الشاذة: go → went وsee → saw."},
{id:"vancouver",terms:"vancouver stanley park fact opinion رأي حقيقة فانكوفر ستانلي رأي حقيقة",en:"Vancouver and Stanley Park: Facts can be verified, such as 'Vancouver is in Canada.' Opinions are personal judgments: 'Stanley Park is the most beautiful park.' An opinion may appear without 'I think'.",ar:"فانكوفر وحديقة ستانلي: الحقيقة يمكن التحقق منها مثل «فانكوفر في كندا». أما الرأي فحكم شخصي مثل «ستانلي أجمل حديقة»، وقد يأتي الرأي دون عبارة I think."},
{id:"critical",terms:"critical relevant relevance important information evaluate تفكير ناقد صلة مرتبط ملائم مناسب معلومات",en:"Critical thinking: Select information relevant to your presentation goal. If discussing activities in Stanley Park, include paths, activities and visitor experiences; exclude unrelated anecdotes.",ar:"التفكير الناقد: اختر معلومات تخدم موضوع العرض. إذا تحدثت عن أنشطة ستانلي بارك فاذكر الممرات والأنشطة وتجارب الزوار، واستبعد التفاصيل غير المرتبطة."},
{id:"speaking",terms:"speaking presentation introduction conclusion opinion signposting talk تحدث التحدث عرض مقدمة خاتمة تنظيم",en:"Speaking: Organize a presentation into introduction → relevant facts → opinions → conclusion. Signal your opinion with 'In my opinion' or 'I personally think'. Practise orally.",ar:"التحدث: نظّم عرضك إلى مقدمة ← حقائق مرتبطة بالموضوع ← آراء ← خاتمة. قدّم رأيك بعبارات مثل In my opinion أو I personally think وتدرّب على الإلقاء."},
{id:"final",terms:"record rubric final speech presentation تسجيل معيار أداء المهمة النهائية",en:"Final performance: Give a 60–90-second talk about a place, with an introduction, two facts, an opinion and a conclusion. A teacher rubric is needed to assess speaking performance; this demo does not automatically assess pronunciation.",ar:"مهمة الأداء: قدّم حديثًا من ٦٠ إلى ٩٠ ثانية عن مكان، يتضمن مقدمة وحقيقتين ورأيًا وخاتمة. تقييم التحدث يحتاج أداة تقدير من المعلم؛ هذا النموذج لا يقيم النطق آليًا."}
];
let lang="ar";
const ctx=()=>window.PLACES_CONTEXT?.()||{stage:"welcome",preComplete:false,lessonId:"venice"};
const locked=()=>!ctx().preComplete||ctx().stage==="pre"||ctx().stage==="post";
const aiEndpoint=()=>typeof window.PLACES_AI_ENDPOINT==="string"?window.PLACES_AI_ENDPOINT.trim().replace(/\/+$/,""):"";
let conversation=[];
let pendingPhoto=null;
let sending=false;
async function prepPhoto(file){
 if(!file)return;
 if(!file.type.startsWith("image/")){post("bot","Please choose a photo of the textbook exercise.");return}
 if(file.size>9000000){post("bot","Choose a photo under 9 MB.");return}
 if(!window.PLACES_AI_ENDPOINT){post("bot","Image support requires an active Gemini connection.");return}
 if(!confirm("This photo will be sent to Google Gemini through Cloudflare for educational explanation. Avoid faces, names, grades, or private information. Continue?"))return;
 try{
   let img,release=()=>{};
   if(typeof createImageBitmap==="function"){img=await createImageBitmap(file);release=()=>img.close?.()}
   else{
     const localURL=URL.createObjectURL(file);
     img=await new Promise((resolve,reject)=>{const picture=new Image();picture.onload=()=>resolve(picture);picture.onerror=()=>reject(new Error("Invalid photo"));picture.src=localURL});
     release=()=>URL.revokeObjectURL(localURL);
   }
   const max=1150,scale=Math.min(1,max/Math.max(img.width,img.height));
   const canvas=document.createElement("canvas");canvas.width=Math.max(1,Math.round(img.width*scale));canvas.height=Math.max(1,Math.round(img.height*scale));
   canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);
   release();
   const dataURL=canvas.toDataURL("image/jpeg",0.72);
   pendingPhoto={mimeType:"image/jpeg",data:dataURL.split(",")[1]};
   el("ph-image-label").textContent="📷 "+file.name.slice(0,45)+" · "+Math.round(dataURL.length/1024)+" KB";
   el("ph-image-label").hidden=false;
   el("ph-remove-image").hidden=false;
 }catch(e){post("bot","Could not open the image. Use JPG or PNG and try again.")}
}

let aiVerified=false,aiError="";
async function testAIConnection(){
 if(locked()){post("bot",t("اختبار الاتصال يتاح بعد إكمال التشخيص القبلي حتى لا نعرض مساعدًا تعليميًا قبل القياس.","Connection test is available after the diagnostic assessment."));return}
 if(!aiEndpoint()){post("bot",t("لم يصل رابط خدمة AI إلى المتصفح. تحققي من تحديث الصفحة وملف ai-config.js.","AI service URL is missing in the browser. Refresh and check ai-config.js."));return}
 post("bot",t("أفحص الآن الاتصال بالنموذج باستخدام سؤال تجريبي، دون إرسال اسمك أو نتائجك...","Testing the model with a sample question, without your name or grades..."));
 try{
   const out=await answerQuestion("Briefly explain why 'Did you visited Venice?' is incorrect.");
   if(out.type!=="ai")throw Error("The cloud AI URL is missing; only local rules are enabled.");
   aiVerified=true;aiError="";update();
   post("bot",t("✅ وصل رد حقيقي من Gemini عبر Cloudflare:\n","✅ Real Gemini reply received via Cloudflare:\n")+out.answer);
 }catch(err){
   aiVerified=false;aiError=String(err?.message||err).slice(0,200);update();
   post("bot",t("❌ فشل الاتصال الفعلي. السبب: ","❌ Live AI connection failed. Reason: ")+aiError+"\n"+t("إذا ظهر Failed to fetch فتحققي من إعدادات Worker وCORS. إذا ظهر 429 فقد تكون الحصة المجانية انتهت، و502 يعني أن خدمة النموذج لم تستجب.","Failed to fetch may indicate a network/CORS issue; 429 means quota/rate limiting, 502 means an upstream model issue."));
 }
}
async function answerQuestion(raw){
 const endpoint=aiEndpoint();
 if(!endpoint)return {answer:respond(raw),type:"rules"};
 if(!/^https:\/\//.test(endpoint))throw Error("AI service URL must use HTTPS");
 const c=ctx();
 const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),23000);
 let response;
 try{response=await fetch(endpoint+"/chat",{
   method:"POST",headers:{"Content-Type":"application/json"},signal:ctrl.signal,
   body:JSON.stringify({question:raw,language:lang,lessonId:c.lessonId,stage:c.stage,
     preComplete:c.preComplete,practice:c.practice||null,history:conversation.slice(-4),image:pendingPhoto})
 });}catch(e){throw new Error(e.name==="AbortError"?"AI response took too long (23 s). Try a shorter question or retry.":"Network/CORS error reaching Cloudflare Worker.")}
 finally{clearTimeout(timer)}
 let data;
 try{data=await response.json()}catch{throw Error("AI service returned an invalid response")}
 if(!response.ok||typeof data.answer!=="string"||!data.answer.trim())throw Error(data.error||"AI assistant is temporarily unavailable");
 return {answer:data.answer,type:"ai"};
}
function platformHelp(raw){
 const q=normalize(raw);
 const asks=/(كيف|طريقه|طريقة|اشرح|شرح|خطوات|وين|فين|استعمل|استخدم|اتعامل|تعامل|تنقل|ابدا|ابدأ|مطلوب|help|how|where|use|navigate|platform|website|site)/i.test(q);
 const topic=/(موقع|منصه|منصة|درس|دروس|موديول|وحده|وحدة|اختبار|مساعد|عرض|تسجيل|سرعه|سرعة|استماع|محادثه|محادثة|كتابه|كتابة|سؤال|خيار|خيارات|مايك|ميكروفون|website|site|platform|test|lesson|module|record|speech|writing|listen|question)/i.test(q);
 if(!asks||!topic)return null;
 const kind=/(تحدث|عرض|برزنتيشن|presentation|speaking|record|تسجيل|ميكروفون|microphone)/i.test(q)?"speaking":/(استماع|قراءة|سرعة|accent|اسمع|listening|audio)/i.test(q)?"listening":/(قواعد|قرامر|grammar|ماضي|past|ترتيب)/i.test(q)?"grammar":/(كلمات|مفردات|تعريف|vocab|meaning)/i.test(q)?"words":/(كتابة|writing|write)/i.test(q)?"writing":"general";
 const ar={
 general:"استخدام PLACES:\n١. اكتبي اسمك وأكملي الاختبار التشخيصي دون مساعدة.\n٢. افتحي أي درس من صفحة الرحلة التي تحتوي على ٨ موديولات.\n٣. اقرئي الشرح واستخدمي 🔊 لسماع السؤال والخيارات والتوضيح العربي للمطلوب.\n٤. تدرّبي على الاستماع والتحدث والكتابة وأجيبي عن التدريبات.\n٥. تابعي التقدم من My progress أثناء التعلم.\n٦. بعد إنهاء الدروس الثمانية يُفتح الاختبار البعدي وتظهر نتيجة المقارنة.\n٧. المساعد للشرح بعد التشخيص، وتقدرين تسألينه كتابة أو صوتًا أو بصورة عند الحاجة. لا يلزم إرسال صورة لتعرفي طريقة استخدام الموقع.",
 speaking:"للعرض افتحي موديول ٨، وتعرّفي على الأجزاء الخمسة: Introduction, Facts, Positive opinion, Negative opinion, Conclusion. اكتبي جملة أو جملتين لكل جزء، واختاري القراءة البطيئة، واضغطي Start recording ثم Stop، ثم استمعي لتسجيلك وراجعي التقييم الذاتي.",
 listening:"افتحي Listening Studio في الدرس. اختاري US أو UK إذا كان الصوت متاحًا في الجهاز، واختاري سرعة 0.75 أو 1 أو 1.25، ثم Play listening. أجيبي عن الفكرة العامة والتفصيل، وبعدها افتحي النص. الأزرار 🔊 فوق السؤال تقرأ السؤال والخيارات.",
 grammar:"افتحي موديول Past Simple. الجملة: الفاعل + فعل الماضي + البقية. السؤال: Did + الفاعل + الفعل الأساسي + البقية؟ وفي Sentence-order challenge اضغطي كلمات الجملة بالترتيب ثم Check my order.",
 words:"في موديول ٢، الجزء الأول Key Vocabulary يعرّف كلمات الوحدة بالإنجليزية وفيه تمرين مطابقة التعريف والكلمة. الجزء الثاني Listening 1 فيه تدريب الفكرة العامة والتفاصيل.",
 writing:"في Writing Workshop اكتبي جملتين أو ثلاثًا، واستخدمي Self-check أو Ask AI for writing feedback إذا كان Gemini متصلًا."
 };
 const en={
 general:"To use PLACES: 1. Enter your name and complete the diagnostic without help. 2. Open any of the eight modules. 3. Read explanations and use the speaker buttons for questions and options. 4. Practise listening, speaking and writing. 5. Use My progress. 6. Complete all eight modules to unlock the post-assessment. No photo is needed to ask how to use this website.",
 speaking:"Open Module 8 and learn Introduction, Facts, Positive opinion, Negative opinion and Conclusion. Draft one sentence for each, select slow playback, record yourself, replay the audio, and self-check.",
 listening:"Open Listening Studio, select US or UK if available, set speed 0.75, 1 or 1.25, listen, and answer the main-idea and detail questions before viewing the transcript.",
 grammar:"Open the Past Simple module. Statements use subject + past verb. Questions use Did + subject + base verb. In Sentence-order challenge, tap words in order and press Check my order.",
 words:"Module 2: Part 1 teaches vocabulary with English definitions. Part 2 covers listening for main idea and details.",
 writing:"In Writing Workshop write two or three sentences, use Self-check, and ask AI for writing feedback when Gemini is connected."
 };
 return lang==="ar"?ar[kind]:en[kind];
}
async function sendQuestion(raw){
 if(locked()||sending)return;
 const q=String(raw||"").trim().slice(0,650);if(!q&&!pendingPhoto)return;
 const help=!pendingPhoto?platformHelp(q):null;
 if(help){post("user",q);post("bot",help);conversation.push({role:"user",text:q},{role:"assistant",text:help.slice(0,600)});if(conversation.length>6)conversation=conversation.slice(-6);return}

 sending=true;el("ph-send").disabled=true;el("ph-input").disabled=true;
 post("user",(q||"اشرح لي هذا التمرين من الصورة")+(pendingPhoto?" 📷 [photo]":""));
 const wait=document.createElement("p");wait.className="ph-msg bot";wait.textContent=t("يفكّر المساعد…","Thinking…");wait.setAttribute("aria-live","polite");el("ph-messages").append(wait);el("ph-messages").scrollTop=el("ph-messages").scrollHeight;
 try{
   const result=await answerQuestion(q);
   if(!locked()){
     if(result.type==="ai"){aiVerified=true;aiError=""}
     pendingPhoto=null;el("ph-image-label").hidden=true;el("ph-remove-image").hidden=true;el("ph-photo").value="";
     post("bot",result.answer);
     conversation.push({role:"user",text:q},{role:"assistant",text:result.answer});
     if(conversation.length>6)conversation=conversation.slice(-6);
   }
 }catch(err){
   if(!locked()){aiVerified=false;aiError=String(err?.message||err).slice(0,200);post("bot",t("تعذر الاتصال بـ Gemini: ","Gemini connection failed: ")+aiError+"\n"+t("هذه إجابة محدودة من المساعد المبرمج:\n","Limited rule-based fallback:\n")+respond(q))}
 }finally{
   wait.remove();sending=false;update();
 }
}

const t=(ar,en)=>lang==="ar"?ar:en;
const normalize=s=>s.toLowerCase().normalize("NFKC").replace(/[\u064b-\u065f]/g,"").replace(/[أإآ]/g,"ا").replace(/ى/g,"ي").trim();
const root=document.createElement("div");root.id="places-helper";root.innerHTML='<button type="button" id="ph-open" aria-controls="ph-panel" aria-expanded="false">💬 <span id="ph-open-text"></span></button><section id="ph-panel" hidden aria-label="Unit 1 Places learning support"><header><strong id="ph-heading"></strong><div><button id="ph-test" type="button" title="Test live AI connection">Test AI</button><button id="ph-lang" type="button" aria-label="Switch language">EN</button><button id="ph-close" type="button" aria-label="Close assistant">✕</button></div></header><small id="ph-disclaimer"></small><small id="ph-ai-status" role="status"></small><div id="ph-messages" role="log" aria-live="polite"></div><div id="ph-shortcuts"></div><div class="ph-attach"><button type="button" id="ph-mic">🎙️ Speak / تحدث</button><label for="ph-photo">📷 Add textbook photo / صوّر السؤال</label><input id="ph-photo" type="file" accept="image/*"><button type="button" id="ph-remove-image" hidden>✕ Remove</button><small id="ph-image-label" hidden></small></div><form id="ph-form"><input id="ph-input" maxlength="650" aria-label="Question about Places"><button type="submit" id="ph-send">Send</button></form><small id="ph-lock"></small></section>';
document.body.append(root);
const el=id=>document.getElementById(id);
function post(role,value,language=lang){
 const p=document.createElement("p");p.className="ph-msg "+role;p.dir=language==="ar"?"rtl":"ltr";
 const span=document.createElement("span");span.textContent=value;p.append(span);
 if(role==="bot"){
  const read=document.createElement("button");read.type="button";read.className="ph-say";read.textContent=" 🔊";
  read.setAttribute("aria-label","Read explanation aloud");
  read.onclick=()=>{if(!("speechSynthesis" in window)){alert("Speech not supported");return}speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(value);u.lang=language==="ar"?"ar-SA":"en-US";u.rate=.9;speechSynthesis.speak(u)};
  p.append(read)
 }
 el("ph-messages").append(p);el("ph-messages").scrollTop=el("ph-messages").scrollHeight;
}
function update(){const isExam=ctx().stage==="pre"||ctx().stage==="post";root.hidden=isExam;if(isExam){el("ph-panel").hidden=true;el("ph-open").setAttribute("aria-expanded","false")}el("ph-heading").textContent=t("مساعد وحدة Places","Places Learning Helper");el("ph-open-text").textContent=t("مساعد الدرس","Lesson help");el("ph-lang").textContent=t("EN","عربي");el("ph-send").textContent=t("إرسال","Send");el("ph-input").placeholder=t("اكتب سؤالك عن الوحدة...","Ask about the unit...");el("ph-ai-status").textContent=!aiEndpoint()?t("الحالة: وضع الشرح المبرمج فقط","Status: rule-based mode only"):aiVerified?t("الحالة: Gemini متصل ✅","Status: Gemini responded ✅"):aiError?t("الحالة: تعذر اتصال Gemini — استخدمي فحص الاتصال","Status: Gemini connection failed — run connection test"):t("الحالة: عنوان Gemini محفوظ — الاتصال لم يُتحقق منه بعد","Status: AI address configured — not yet verified");el("ph-test").textContent=t("فحص AI","Test AI");el("ph-test").disabled=locked()||sending;el("ph-disclaimer").textContent=aiEndpoint()?t("مساعد Gemini مرن لشرح مهارات الإنجليزية وأسئلة الكتاب المصوّرة؛ تُرسل الأسئلة والصور إلى Google. تجنّب البيانات الشخصية.","Flexible Gemini tutor for English skills and textbook photos; questions and photos are sent to Google. Avoid private information."):t("مساعد مبرمج داخل المنهج، وليس ذكاءً اصطناعيًا توليديًا حتى يتم تفعيل خدمة AI.","Rule-based unit guide, not generative AI until the AI service is enabled.");const isLocked=locked();el("ph-input").disabled=isLocked||sending;el("ph-send").disabled=isLocked||sending;el("ph-photo").disabled=isLocked||sending;el("ph-lock").textContent=isLocked?t("المساعد مقفل أثناء الاختبارين القبلي والبعدي؛ لحماية صدق القياس.","Help is locked during pre- and post-tests to keep scores valid."):aiEndpoint()?t("قد تخطئ إجابات الذكاء الاصطناعي؛ راجع المحتوى عند الشك.","AI responses may contain errors; check against the lesson."):t("مجاني ولا يرسل رسائلك إلى أي خادم.","Free; messages are not sent to a server.");el("ph-shortcuts").innerHTML=(!isLocked?'<button type="button" data-sitehelp="1">'+t("كيف أستخدم المنصة؟","How to use PLACES?")+'</button>':"")+(!isLocked?'<button type="button" data-roleplay="1">'+t("محادثة عن الأماكن","Places role-play")+'</button>':"")+(ctx().practice&&!isLocked?'<button type="button" data-compare="1">'+t("اشرح إجابتي","Explain my answer")+'</button>':"")+unit.slice(0,7).map(x=>'<button type="button" data-topic="'+x.id+'" '+(isLocked?'disabled':'')+'>'+({venice:"Venice",homes:"Homes",pronunciation:"Sounds",grammar:"Past simple",vancouver:"Vancouver",critical:"Critical thinking",speaking:"Speaking"}[x.id])+"</button>").join("")}

function comparisonExplanation(){
 const p=ctx().practice;
 if(!p)return t("عشان أشرح الفرق بدقة، حاولي اختيار إجابة في النشاط أولًا، وبعدها اسأليني عن الفرق بين إجابتك والصحيحة.","Choose an answer in the practice activity first, then ask me to compare your answer with the correct one.");
 if(p.isCorrect)return t("إجابتك صحيحة ✅\nالسؤال: "+p.question+"\nالإجابة: "+p.chosen+"\nالسبب: "+p.correctWhy,"Your answer is correct ✅\nQuestion: "+p.question+"\nAnswer: "+p.chosen+"\nWhy: "+p.correctWhy);
 return t("السؤال: "+p.question+"\n❌ اختيارك: "+p.chosen+"\nلماذا هذا الاختيار غير صحيح؟ "+p.chosenWhy+"\n✅ الاختيار الصحيح: "+p.correct+"\nلماذا هو صحيح؟ "+p.correctWhy+"\n💡 قاعدة تساعدك: "+p.hint,
 "Question: "+p.question+"\n❌ Your choice: "+p.chosen+"\nWhy it is wrong: "+p.chosenWhy+"\n✅ Correct choice: "+p.correct+"\nWhy it is right: "+p.correctWhy+"\n💡 Helpful rule: "+p.hint);
}
function wantsComparison(q){
 return /(فرق|الفرق|ليش|ليه|لماذا|سبب|غلط|خطا|صح|صحيح|اجابتي|جوابي|الاختيار|الحل)/.test(q)&&/(فرق|غلط|خطا|صح|صحيح|اجاب|اختيار|الحل|ليش|ليه|لماذا|سبب)/.test(q)||/(why.*wrong|why.*right|correct.*wrong|difference.*answer|explain.*answer|my.*answer)/i.test(q);
}
function respond(raw){if(locked())return t("بعد الاختبار أقدر أشرح كل مهارات الوحدة، لكن ما أعطي تلميحات أثناء التقييم.","I can explain the unit after your test, but I cannot give assessment hints.");
 const q=normalize(raw);if(wantsComparison(q))return comparisonExplanation();let best=null,top=0;
 for(const item of unit){let count=item.terms.split(" ").reduce((n,word)=>n+(word.length>2&&q.includes(normalize(word))?1:0),0);if(count>top){top=count;best=item}}
 if(best)return best[lang];
 if(/مساعدة|ساعد|اشرح|help|explain|understand|مافهم/.test(q)){let current=unit.find(x=>x.id===ctx().lessonId)||unit[0];return current[lang]}
 return t("هذا السؤال خارج الشروحات الموثوقة المتاحة حاليًا. اسألني عن البندقية أو المنازل غير المعتادة أو النطق أو الماضي البسيط أو فانكوفر أو التحدث.","I do not have a verified answer for that question. Try Venice, unusual homes, pronunciation, past simple, Vancouver, or speaking.");
}
window.PLACES_ASK_TUTOR=(question)=>{
 if(locked())return false;
 el("ph-panel").hidden=false;el("ph-open").setAttribute("aria-expanded","true");update();
 sendQuestion(question);
 return true;
};
el("ph-open").onclick=()=>{el("ph-panel").hidden=!el("ph-panel").hidden;el("ph-open").setAttribute("aria-expanded",String(!el("ph-panel").hidden));update()};
el("ph-close").onclick=()=>{el("ph-panel").hidden=true;el("ph-open").setAttribute("aria-expanded","false")};
el("ph-test").onclick=testAIConnection;
el("ph-lang").onclick=()=>{lang=lang==="ar"?"en":"ar";update();post("bot",t("تم تغيير اللغة إلى العربية. ما سؤالك؟","Switched to English. What do you want to learn?"))};
el("ph-mic").onclick=()=>{
 if(locked())return;
 const Recognizer=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!Recognizer){post("bot",t("التعرف على الكلام غير مدعوم هنا، يمكنك الكتابة بدلاً منه.","Speech recognition is unavailable here; please type instead."));return}
 try{
  let rec=new Recognizer();rec.lang=lang==="ar"?"ar-SA":"en-US";rec.interimResults=false;rec.maxAlternatives=1;
  el("ph-mic").textContent="🔴 Listening…";
  rec.onresult=e=>{el("ph-input").value=e.results[0][0].transcript;el("ph-input").focus()};
  rec.onerror=e=>{post("bot",t("مشكلة في استخدام الميكروفون: ","Microphone error: ")+e.error)};
  rec.onend=()=>{el("ph-mic").textContent="🎙️ Speak / تحدث"};
  rec.start();
 }catch{post("bot",t("لم يتمكن المتصفح من تشغيل التسجيل الصوتي.","Could not start speech recognition."))}
};
el("ph-photo").onchange=e=>{if(!locked())prepPhoto(e.target.files?.[0])};
el("ph-remove-image").onclick=()=>{pendingPhoto=null;el("ph-photo").value="";el("ph-image-label").hidden=true;el("ph-remove-image").hidden=true};
el("ph-form").onsubmit=e=>{e.preventDefault();const q=el("ph-input").value.trim();if(!q)return;el("ph-input").value="";sendQuestion(q)};
el("ph-shortcuts").onclick=e=>{if(e.target.closest("[data-sitehelp]")){if(!locked())sendQuestion(t("كيف أستخدم المنصة والدروس؟","How do I use PLACES?"));return}if(e.target.closest("[data-roleplay]")){if(!locked())sendQuestion(t("اسألني سؤالاً واحداً بسيطاً بالإنجليزية عن مكان زرته، وانتظر إجابتي ثم قدم تصحيحًا لطيفًا وواصل الحوار سؤالاً بعد سؤال.","Practice a short English conversation about places. Ask me one easy question at a time, wait for my answer, and gently correct my English."));return}if(e.target.closest("[data-compare]")){if(!locked())sendQuestion(t("اشرح الفرق بين إجابتي والإجابة الصحيحة مع السبب","Explain why my answer differs from the correct choice"));return}let id=e.target.closest("[data-topic]")?.dataset.topic;if(!id||locked())return;const x=unit.find(y=>y.id===id);post("user",x.id);post("bot",x[lang])};
window.addEventListener("places:render",update);
window.addEventListener("places:practice-error",e=>{if(locked())return;update();el("ph-open").title=t("تحتاج شرحًا إضافيًا؟ افتح مساعد الدرس.","Need another explanation? Open lesson help.");el("ph-open").classList.add("ph-attention")});
update();post("bot",t("أهلًا! أشرح مفردات وحدة Places ومهارات الاستماع والنطق والقواعد والتفكير الناقد والتحدث. اختَر موضوعًا أو اكتب سؤالك.","Hello! I explain Unit 1 Places vocabulary, listening, pronunciation, grammar, critical thinking and speaking. Choose a topic or type a question."));
})();