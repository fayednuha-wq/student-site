/* PLACES speaking recorder: per-part practice, sequential replay, complete take, optional AI critique.
Audio stays in this browser tab unless learner approves a full-recording upload. */
(()=>{"use strict";
const $=(q,r=document)=>r.querySelector(q),$$=(q,r=document)=>Array.from(r.querySelectorAll(q));
const P=[
 ["intro","Introduction","المقدمة","Today I will introduce Venice, a city in Italy."],
 ["fact","Facts","الحقائق","Venice has many canals, and people travel by boat."],
 ["opinion","Positive opinion","الرأي الإيجابي","In my opinion, Venice is beautiful because of the waterways."],
 ["negative","Negative opinion","الرأي السلبي","However, it can be crowded during the busy season."],
 ["end","Conclusion","الخاتمة","Finally, I recommend visiting Venice. Thank you for listening."]
];
const labs={speaking:{parts:{},full:null},final:{parts:{},full:null}};
let active=null,playing=null,resetGeneration=0;
function message(node,en,ar){
 if(!node)return;
 node.innerHTML="";
 const x=document.createElement("p");x.lang="en";x.dir="ltr";x.textContent=en;
 const y=document.createElement("p");y.lang="ar";y.dir="rtl";y.textContent=ar;
 node.append(x,y);
}
function drop(item){if(item?.url)URL.revokeObjectURL(item.url)}
function stopPlayback(){if(playing){playing.pause();playing.removeAttribute("src");playing.load();playing=null}}
function stopRecording(){
 if(!active)return;const a=active;
 if(a.timer)clearTimeout(a.timer);
 if(a.rec.state==="recording"){try{a.rec.stop()}catch{}}
 a.stream.getTracks().forEach(t=>t.stop());
}
function mimeChoice(){
 const types=["audio/webm;codecs=opus","audio/mp4","audio/webm","audio/ogg;codecs=opus"];
 return types.find(t=>MediaRecorder.isTypeSupported(t))||null;
}
function setupRecorder(host,lesson,key){
 const box=document.createElement("div");box.className="places-take-controls";
 box.innerHTML='<div class="places-controls"><button class="btn secondary" type="button" data-rec-start>● Record / سجّل</button>'+
 '<button class="btn secondary" type="button" data-rec-stop disabled>■ Stop / إيقاف</button></div>'+
 '<div class="places-bilingual-feedback" data-rec-status role="status"></div>'+
 '<audio controls data-rec-audio hidden></audio><a data-rec-download hidden>Download / تنزيل</a>';
 host.append(box);
 const store=labs[lesson],start=$("[data-rec-start]",box),stop=$("[data-rec-stop]",box),note=$("[data-rec-status]",box),
 audio=$("[data-rec-audio]",box),download=$("[data-rec-download]",box);
 const saved=()=>key==="full"?store.full:store.parts[key];
 function refresh(){
  const v=saved();if(!v)return;
  audio.src=v.url;audio.hidden=false;download.hidden=false;download.href=v.url;
  download.download="places-"+lesson+"-"+key+"."+(v.blob.type.includes("mp4")?"m4a":"webm");
 }
 refresh();
 message(note,saved()?"Recording ready.":"Record, then play back.",saved()?"التسجيل السابق جاهز.":"سجّل صوتك ثم استمع إليه.");
 start.onclick=async()=>{
  if(active){message(note,"Stop the other recording first.","أوقف التسجيل الجاري أولًا.");return}
  if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder==="undefined"){message(note,"Microphone recording isn't supported.","المتصفح لا يدعم تسجيل الميكروفون.");return}
  let stream;
  try{stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}})}
  catch{message(note,"Microphone permission denied or unavailable.","تعذر الوصول للميكروفون؛ تحقق من الإذن.");return}
  if(active||!box.isConnected){stream.getTracks().forEach(t=>t.stop());return}
  try{
   let rec;const mt=mimeChoice();try{rec=new MediaRecorder(stream,mt?{mimeType:mt,audioBitsPerSecond:32000}:{audioBitsPerSecond:32000})}catch{rec=new MediaRecorder(stream)}
   const chunks=[],time=Date.now(),generation=resetGeneration;
   rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
   active={rec,stream,key,lesson,timer:null};const thisRec=active;
   thisRec.timer=setTimeout(()=>{if(active===thisRec&&rec.state==="recording")rec.stop()},180000);
   rec.onstop=()=>{
    if(thisRec.timer)clearTimeout(thisRec.timer);
    stream.getTracks().forEach(t=>t.stop());
    const blob=new Blob(chunks,{type:rec.mimeType||"audio/webm"});
    if(generation!==resetGeneration){if(active===thisRec)active=null;return}
    if(blob.size){
     const old=saved();drop(old);
     const value={blob,url:URL.createObjectURL(blob),duration:Math.round((Date.now()-time)/1000)};
     if(key==="full")store.full=value;else store.parts[key]=value;
     if(box.isConnected){
      refresh();message(note,"Recorded "+value.duration+" seconds. Replay or try again.","تم التسجيل لمدة "+value.duration+" ثانية. اسمعه أو أعد المحاولة.");
      updateAssessButton(box.closest(".places-voice-studio"),lesson);
     }
    }
    if(active===thisRec)active=null;
    if(box.isConnected){start.disabled=false;stop.disabled=true}
   };
   rec.start();start.disabled=true;stop.disabled=false;
   message(note,"Recording… press Stop when finished.","يتم التسجيل… اضغط إيقاف عند الانتهاء.");
  }catch{
   stream.getTracks().forEach(t=>t.stop());message(note,"Recording failed in this browser.","تعذر التسجيل في المتصفح.");
  }
 };
 stop.onclick=()=>{if(active?.lesson===lesson&&active?.key===key&&active.rec.state==="recording")active.rec.stop()};
}
function playParts(lesson,note){
 stopPlayback();
 const clips=P.map(x=>labs[lesson].parts[x[0]]).filter(Boolean);
 if(!clips.length){message(note,"Record a part first.","سجّل جزءًا أولًا.");return}
 const audio=new Audio();playing=audio;let i=0;
 const next=()=>{
  if(playing!==audio)return;
  if(i>=clips.length){playing=null;message(note,"All clips played in order.","انتهى تشغيل الأجزاء بالترتيب.");return}
  audio.src=clips[i++].url;audio.onended=next;
  message(note,"Playing part "+i+" of "+clips.length+".","تشغيل الجزء "+i+" من "+clips.length+".");
  audio.play().catch(()=>{
   playing=null;
   message(note,"Autoplay between clips was blocked. Play the clips individually.","منع المتصفح التشغيل المتتابع؛ استمع إلى كل تسجيل من مشغله.");
  });
 };
 next();
}
function updateAssessButton(studio,lesson){
 if(!studio)return;
 const button=$("[data-assess-audio]",studio),note=$("[data-assess-availability]",studio);
 const n=P.filter(p=>!!labs[lesson].parts[p[0]]).length;
 const full=!!labs[lesson].full;
 if(button){
  button.disabled=!full&&n<5;
  button.textContent=full?"✨ Evaluate complete recording / قيّم التسجيل الكامل":
                     n===5?"✨ Evaluate my five recordings / قيّم تسجيلاتي الخمسة":
                     "✨ AI speaking feedback / تقييم العرض صوتيًا";
 }
 if(note){
  message(note,full?"Your full presentation is ready for AI feedback.":
                  n===5?"All five segments are ready for AI feedback. This assesses separate parts, not continuous fluency.":
                  "Record all five parts ("+n+"/5 done) OR one continuous full take to unlock AI feedback.",
               full?"تسجيل العرض الكامل جاهز للتقييم.":
                  n===5?"اكتملت التسجيلات الخمسة ويمكن تقييمها. هذا تقييم لأجزاء منفصلة وليس للطلاقة المتصلة.":
                  "لتفعيل التقييم: سجّل الأجزاء الخمسة (أنجزت "+n+"/5)، أو سجّل عرضًا كاملًا متصلًا.");
 }
}
function base64(blob){return new Promise((resolve,reject)=>{
 const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(",")[1]);
 reader.onerror=()=>reject(new Error("Audio could not be read"));reader.readAsDataURL(blob);
})}
async function feedback(lesson,studio){
 const output=$("[data-voice-feedback]",studio),button=$("[data-assess-audio]",studio);
 const full=labs[lesson].full?.blob;
 const parts=P.map(p=>labs[lesson].parts[p[0]]?.blob);
 const hasParts=parts.every(Boolean);
 if(!full&&!hasParts){
  updateAssessButton(studio,lesson);
  message(output,"You need all five parts or one full recording first.","يجب تسجيل الأجزاء الخمسة كلها أو عرض كامل واحد قبل طلب التقييم.");return;
 }
 const segmented=!full;
 const clips=segmented?parts:[full];
 const bytes=clips.reduce((n,b)=>n+b.size,0);
 const endpoint=window.PLACES_AI_ENDPOINT,c=window.PLACES_CONTEXT?.();
 if(typeof endpoint!=="string"||!endpoint.startsWith("https://")||c?.stage!=="lesson"||!c.preComplete){
  message(output,"Gemini voice analysis is not configured or the lesson is locked.","خدمة تحليل الصوت غير مهيأة أو أن الدرس مقفل.");return;
 }
 if(bytes>2500000){
  message(output,"Audio is too large. Shorten each segment or the full take (maximum 2.5 MB total).","حجم التسجيلات أكبر من 2.5 ميجابايت. اختصرها وحاول من جديد.");return;
 }
 const label=segmented?"the five individually recorded speaking parts":"your one continuous full presentation";
 if(!confirm("You are about to send "+label+" through Cloudflare to Google Gemini for optional formative feedback. Avoid names or private information. This is NOT a validated pronunciation score. Continue?"))return;
 button.disabled=true;
 message(output,"Gemini is examining the actual recorded audio…","يقوم Gemini بتحليل تسجيلك الصوتي الحقيقي…");
 try{
  const encoded=await Promise.all(clips.map(base64));
  const reference=lesson==="final"?$$("[data-stage]",studio.closest(".shell .panel")||document).map(e=>e.value.trim()).filter(Boolean).join(" "):P.map(x=>x[3]).join(" ");
  const input={stage:c.stage,preComplete:c.preComplete,lessonId:lesson,referenceScript:reference.slice(0,1200)};
  const entry=(blob,i)=>({mimeType:(blob.type||"audio/webm").split(";")[0],data:encoded[i]});
  if(segmented)input.audioParts=P.map((part,i)=>({part:part[0],audio:entry(clips[i],i)}));
  else input.audio=entry(full,0);
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),50000);
  let response;
  try{
   response=await fetch(endpoint.replace(/\/+$/,"")+"/speaking-feedback",{
    method:"POST",headers:{"Content-Type":"application/json"},signal:controller.signal,body:JSON.stringify(input)
   })
  }finally{clearTimeout(timer)}
  let data;try{data=await response.json()}catch{throw new Error("AI server returned invalid data")}
  if(!response.ok||typeof data.feedback!=="string")throw new Error(data.error||"Gemini could not analyze the recordings");
  output.innerHTML="";
  const mode=document.createElement("p");mode.lang="ar";mode.dir="rtl";
  mode.textContent=segmented?"تحليل مبني على خمسة مقاطع مستقلة؛ لا يمثل حكمًا على سلاسة عرض متصل.":"تحليل مبني على التسجيل الكامل المتصل.";
  output.append(mode);
  const ans=document.createElement("p");ans.dir="auto";ans.className="places-audio-review";ans.textContent=data.feedback;output.append(ans);
  const note=document.createElement("p");note.lang="ar";note.dir="rtl";
  note.textContent="التقييم تكويني وليس درجة رسمية أو قياسًا معتمدًا للنطق، وقد يخطئ النموذج.";
  output.append(note);
 }catch(err){
  const reason=err?.name==="AbortError"?"Timed out / انتهت مهلة التحليل":String(err?.message||err);
  message(output,"AI audio feedback failed: "+reason,"تعذر تقييم التسجيل: "+reason);
 }finally{updateAssessButton(studio,lesson)}
}

function mount(lesson){
 const panel=$(".shell .panel");if(!panel||$(".places-voice-studio",panel))return;
 const anchor=lesson==="speaking"?$(".places-oral-sequencing",panel):$(".places-speaking-builder",panel);
 if(!anchor)return;
 const root=document.createElement("section");root.className="task places-voice-studio";
 root.innerHTML='<h2>🎙️ Speaking recordings / تسجيلات العرض</h2>'+
 '<p lang="en" dir="ltr">Record each part, replay it, then listen to the five parts in order. AI feedback unlocks after all five parts OR one uninterrupted full presentation recording.</p>'+
 '<p lang="ar" dir="rtl">سجّل أجزاء العرض منفصلة واستمع لها بالتتابع. يتفعّل تقييم Gemini بعد تسجيل الأجزاء الخمسة كلها، أو بعد تسجيل عرض كامل متصل. ويعطي التسجيل الكامل معلومات أفضل عن سلاسة الانتقال بين الأجزاء.</p>'+
 '<div data-part-recorders></div>'+
 '<div class="places-controls"><button class="btn" type="button" data-play-parts>▶ Play all recorded parts / استمع لجميع الأجزاء</button>'+
 '<button class="btn secondary" type="button" data-stop-play>■ Stop / إيقاف</button></div>'+
 '<div class="places-bilingual-feedback" data-play-status role="status"></div>'+
 '<div class="places-full-take"><h3>Complete presentation / العرض الكامل</h3>'+
 '<p lang="en" dir="ltr">Record one complete take from introduction through conclusion (recommended: 60–90 seconds).</p>'+
 '<p lang="ar" dir="rtl">سجّل عرضًا واحدًا متكاملًا من المقدمة إلى الخاتمة (المدة المقترحة: 60–90 ثانية).</p>'+
 '<div data-full-recorder></div></div>'+
 '<div class="places-ai-audio"><button class="btn" type="button" data-assess-audio disabled>✨ AI feedback on my recorded speaking / تقييم العرض صوتيًا</button><div class="places-bilingual-feedback" data-assess-availability></div>'+
 '<div role="status" class="places-bilingual-feedback" data-voice-feedback></div>'+
 '<p lang="en" dir="ltr">Voice upload happens only with permission. AI commentary is not a teacher grade.</p>'+
 '<p lang="ar" dir="rtl">لا يُرسل التسجيل للذكاء الاصطناعي إلا بموافقتك. الملاحظات تدريبية ولا تمثل تقييم المعلم.</p></div>';
 anchor.insertAdjacentElement("afterend",root);
 const list=$("[data-part-recorders]",root);
 for(let i=0;i<P.length;i++){
  const item=P[i],box=document.createElement("section");box.className="places-record-part";
  const en=document.createElement("h3");en.lang="en";en.dir="ltr";en.textContent=(i+1)+". "+item[1];
  const ar=document.createElement("p");ar.lang="ar";ar.dir="rtl";ar.textContent=item[2];
  const txt=document.createElement("p");txt.lang="en";txt.dir="ltr";txt.className="places-sample-speech";
  txt.textContent=lesson==="final"?($('[data-stage="'+item[0]+'"]',panel)?.value.trim()||item[3]):item[3];
  box.append(en,ar,txt);list.append(box);setupRecorder(box,lesson,item[0]);
 }
 setupRecorder($("[data-full-recorder]",root),lesson,"full");
 updateAssessButton(root,lesson);
 $("[data-play-parts]",root).onclick=()=>playParts(lesson,$("[data-play-status]",root));
 $("[data-stop-play]",root).onclick=()=>{stopPlayback();message($("[data-play-status]",root),"Playback stopped.","تم إيقاف التشغيل.");};
 $("[data-assess-audio]",root).onclick=()=>feedback(lesson,root);
}
function onLessonRender(){
 if(active)stopRecording();stopPlayback();
 const c=window.PLACES_CONTEXT?.();
 if(c?.stage==="lesson"&&["speaking","final"].includes(c.lessonId))mount(c.lessonId);
}
window.addEventListener("places:render",onLessonRender);
onLessonRender();
function clearAudio(){
 resetGeneration++;
 stopRecording();stopPlayback();
 for(const x of Object.values(labs)){
  Object.values(x.parts).forEach(drop);drop(x.full);x.parts={};x.full=null;
 }
}
window.PLACES_AUDIO_RESET=clearAudio;
window.addEventListener("beforeunload",clearAudio);
})();
