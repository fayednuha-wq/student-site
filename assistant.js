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
let sending=false;
async function answerQuestion(raw){
 const endpoint=aiEndpoint();
 if(!endpoint)return {answer:respond(raw),type:"rules"};
 if(!/^https:\/\//.test(endpoint))throw Error("AI service URL must use HTTPS");
 const c=ctx();
 const response=await fetch(endpoint+"/chat",{
   method:"POST",headers:{"Content-Type":"application/json"},
   body:JSON.stringify({question:raw,language:lang,lessonId:c.lessonId,stage:c.stage,
     preComplete:c.preComplete,practice:c.practice||null,history:conversation.slice(-6)})
 });
 let data;
 try{data=await response.json()}catch{throw Error("AI service returned an invalid response")}
 if(!response.ok||typeof data.answer!=="string"||!data.answer.trim())throw Error(data.error||"AI assistant is temporarily unavailable");
 return {answer:data.answer,type:"ai"};
}
async function sendQuestion(raw){
 if(locked()||sending)return;
 const q=String(raw||"").trim().slice(0,500);if(!q)return;
 sending=true;el("ph-send").disabled=true;el("ph-input").disabled=true;
 post("user",q);
 try{
   const result=await answerQuestion(q);
   if(!locked()){
     post("bot",result.answer);
     conversation.push({role:"user",text:q},{role:"assistant",text:result.answer});
     if(conversation.length>6)conversation=conversation.slice(-6);
   }
 }catch(err){
   if(!locked())post("bot",t("الاتصال بالذكاء الاصطناعي غير متاح الآن. هذا شرح محدود من النسخة المبرمجة:\n","The AI service is currently unavailable. Here is a limited rule-based explanation:\n")+respond(q));
 }finally{
   sending=false;update();
 }
}

const t=(ar,en)=>lang==="ar"?ar:en;
const normalize=s=>s.toLowerCase().normalize("NFKC").replace(/[\u064b-\u065f]/g,"").replace(/[أإآ]/g,"ا").replace(/ى/g,"ي").trim();
const root=document.createElement("div");root.id="places-helper";root.innerHTML='<button type="button" id="ph-open" aria-controls="ph-panel" aria-expanded="false">💬 <span id="ph-open-text"></span></button><section id="ph-panel" hidden aria-label="Unit 1 Places learning support"><header><strong id="ph-heading"></strong><div><button id="ph-lang" type="button" aria-label="Switch language">EN</button><button id="ph-close" type="button" aria-label="Close assistant">✕</button></div></header><small id="ph-disclaimer"></small><div id="ph-messages" role="log" aria-live="polite"></div><div id="ph-shortcuts"></div><form id="ph-form"><input id="ph-input" maxlength="300" aria-label="Question about Places"><button type="submit" id="ph-send">Send</button></form><small id="ph-lock"></small></section>';
document.body.append(root);
const el=id=>document.getElementById(id);
function post(role,value,language=lang){const p=document.createElement("p");p.className="ph-msg "+role;p.dir=language==="ar"?"rtl":"ltr";p.textContent=value;el("ph-messages").append(p);el("ph-messages").scrollTop=el("ph-messages").scrollHeight}
function update(){el("ph-heading").textContent=t("مساعد وحدة Places","Places Learning Helper");el("ph-open-text").textContent=t("مساعد الدرس","Lesson help");el("ph-lang").textContent=t("EN","عربي");el("ph-send").textContent=t("إرسال","Send");el("ph-input").placeholder=t("اكتب سؤالك عن الوحدة...","Ask about the unit...");el("ph-disclaimer").textContent=aiEndpoint()?t("مساعد ذكاء اصطناعي تجريبي مبني على محتوى الوحدة. تُرسل أسئلة الدردشة إلى مزوّد النموذج؛ تجنب مشاركة البيانات الشخصية.","Experimental AI tutor grounded in unit notes. Chat messages are sent to the AI provider; do not share personal information."):t("مساعد مبرمج داخل المنهج، وليس ذكاءً اصطناعيًا توليديًا حتى يتم تفعيل خدمة AI.","Rule-based unit guide, not generative AI until the AI service is enabled.");const isLocked=locked();el("ph-input").disabled=isLocked||sending;el("ph-send").disabled=isLocked||sending;el("ph-lock").textContent=isLocked?t("المساعد مقفل أثناء الاختبارين القبلي والبعدي؛ لحماية صدق القياس.","Help is locked during pre- and post-tests to keep scores valid."):aiEndpoint()?t("قد تخطئ إجابات الذكاء الاصطناعي؛ راجع المحتوى عند الشك.","AI responses may contain errors; check against the lesson."):t("مجاني ولا يرسل رسائلك إلى أي خادم.","Free; messages are not sent to a server.");el("ph-shortcuts").innerHTML=(ctx().practice&&!isLocked?'<button type="button" data-compare="1">'+t("اشرح إجابتي","Explain my answer")+'</button>':"")+unit.slice(0,7).map(x=>'<button type="button" data-topic="'+x.id+'" '+(isLocked?'disabled':'')+'>'+({venice:"Venice",homes:"Homes",pronunciation:"Sounds",grammar:"Past simple",vancouver:"Vancouver",critical:"Critical thinking",speaking:"Speaking"}[x.id])+"</button>").join("")}

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
el("ph-open").onclick=()=>{el("ph-panel").hidden=!el("ph-panel").hidden;el("ph-open").setAttribute("aria-expanded",String(!el("ph-panel").hidden));update()};
el("ph-close").onclick=()=>{el("ph-panel").hidden=true;el("ph-open").setAttribute("aria-expanded","false")};
el("ph-lang").onclick=()=>{lang=lang==="ar"?"en":"ar";update();post("bot",t("تم تغيير اللغة إلى العربية. ما سؤالك؟","Switched to English. What do you want to learn?"))};
el("ph-form").onsubmit=e=>{e.preventDefault();const q=el("ph-input").value.trim();if(!q)return;el("ph-input").value="";sendQuestion(q)};
el("ph-shortcuts").onclick=e=>{if(e.target.closest("[data-compare]")){if(!locked())sendQuestion(t("اشرح الفرق بين إجابتي والإجابة الصحيحة مع السبب","Explain why my answer differs from the correct choice"));return}let id=e.target.closest("[data-topic]")?.dataset.topic;if(!id||locked())return;const x=unit.find(y=>y.id===id);post("user",x.id);post("bot",x[lang])};
window.addEventListener("places:render",update);
window.addEventListener("places:practice-error",e=>{if(locked())return;update();el("ph-open").title=t("تحتاج شرحًا إضافيًا؟ افتح مساعد الدرس.","Need another explanation? Open lesson help.");el("ph-open").classList.add("ph-attention")});
update();post("bot",t("أهلًا! أشرح مفردات وحدة Places ومهارات الاستماع والنطق والقواعد والتفكير الناقد والتحدث. اختَر موضوعًا أو اكتب سؤالك.","Hello! I explain Unit 1 Places vocabulary, listening, pronunciation, grammar, critical thinking and speaking. Choose a topic or type a question."));
})();