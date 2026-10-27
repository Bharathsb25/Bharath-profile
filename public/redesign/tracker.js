(function(){
var VK='analytics_visitor_id',SK='analytics_session',OPT='analytics_opt_out',URL='/api/analytics/collect',IDLE=18e5;
var q=[],meta,ls,ss,active=0,maxScroll=0,lastIn=Date.now();
try{ls=localStorage}catch(e){}try{ss=sessionStorage}catch(e){}
function uuid(){return crypto.randomUUID?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0;return(c=='x'?r:r&3|8).toString(16)})}
function allowed(){return navigator.doNotTrack!=='1'&&!(ls&&ls.getItem(OPT)==='true')}
function visitor(){if(!ls)return uuid();var v=ls.getItem(VK);if(!v){v=uuid();ls.setItem(VK,v)}return v}
function session(){var now=Date.now(),r=ss&&ss.getItem(SK);if(r){try{var p=JSON.parse(r);if(now-p.lastActivity<IDLE){ss.setItem(SK,JSON.stringify({id:p.id,lastActivity:now}));return{id:p.id,isNew:false}}}catch(e){}}
var id=uuid();if(ss)ss.setItem(SK,JSON.stringify({id:id,lastActivity:now}));return{id:id,isNew:true}}
function sessMeta(){var ua=navigator.userAgent,w=innerWidth,b='Other',o='Other',P=new URLSearchParams(location.search);
if(/Edg\//.test(ua))b='Edge';else if(/OPR\//.test(ua))b='Opera';else if(/Chrome\//.test(ua)&&!/Chromium/.test(ua))b='Chrome';else if(/Firefox\//.test(ua))b='Firefox';else if(/Safari\//.test(ua)&&!/Chrome/.test(ua))b='Safari';
if(/Windows/.test(ua))o='Windows';else if(/Mac OS X/.test(ua)&&!/iPhone|iPad/.test(ua))o='macOS';else if(/Android/.test(ua))o='Android';else if(/iPhone|iPad|iPod/.test(ua))o='iOS';else if(/Linux/.test(ua))o='Linux';
return{referrer:document.referrer,utm_source:P.get('utm_source')||undefined,utm_medium:P.get('utm_medium')||undefined,utm_campaign:P.get('utm_campaign')||undefined,utm_term:P.get('utm_term')||undefined,utm_content:P.get('utm_content')||undefined,browser:b,os:o,device_type:w<640?'mobile':w<1024?'tablet':'desktop',screen_width:screen.width,screen_height:screen.height,language:navigator.language||'unknown',entry_page:location.pathname}}
function track(name,o){try{if(!allowed())return;o=o||{};
if(ss){var r=ss.getItem(SK);if(r){var p=JSON.parse(r);ss.setItem(SK,JSON.stringify({id:p.id,lastActivity:Date.now()}))}}
var e={event_name:name,page:o.page||location.pathname,section:o.section,element_id:o.element_id,label:o.label,destination_url:o.destination_url,metadata:o.metadata,ts:Date.now()};
q.push(e);(window.dataLayer=window.dataLayer||[]).push(Object.assign({event:name,page_path:e.page,section:e.section,element_id:e.element_id,label:e.label,destination_url:e.destination_url},e.metadata));
if(q.length>=20)flush()}catch(x){}}
function flush(beacon){try{if(!allowed()){q=[];return}if(!q.length)return;
var body=JSON.stringify({visitor_id:visitor(),session_id:session().id,session:meta,events:q.slice(0,25)});q=q.slice(25);meta=undefined;
if(beacon&&navigator.sendBeacon){navigator.sendBeacon(URL,new Blob([body],{type:'application/json'}));return}
fetch(URL,{method:'POST',headers:{'Content-Type':'application/json'},body:body,keepalive:true}).catch(function(){})}catch(x){}}
var s=session();if(s.isNew){meta=sessMeta();track('session_start')}
track('page_view');
setInterval(flush,5000);
['mousemove','keydown','touchstart','click'].forEach(function(t){addEventListener(t,function(){lastIn=Date.now()},{passive:true})});
addEventListener('scroll',function(){lastIn=Date.now();var d=document.documentElement,t=d.scrollHeight-d.clientHeight;maxScroll=Math.max(maxScroll,t<=0?100:Math.max(0,Math.min(100,Math.round(scrollY/t*100))))},{passive:true});
setInterval(function(){if(document.visibilityState==='visible'&&Date.now()-lastIn<15e3)active++},1000);
setInterval(function(){track('session_heartbeat',{metadata:{active_seconds:active,scroll_depth:maxScroll}})},2e4);
function end(){track('session_end',{metadata:{active_seconds:active,scroll_depth:maxScroll}});flush(true)}
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')end()});
addEventListener('pagehide',end);
document.addEventListener('click',function(ev){
var t=ev.target&&ev.target.closest&&ev.target.closest('[data-track-event],a[href]');if(!t)return;
var href=t.tagName==='A'?t.href:undefined,ds=t.dataset,name=ds.trackEvent;
if(!name&&href){if(/^mailto:/.test(href))name='copy_email';else if(/\.(pdf|docx?)(\?|$)/i.test(href))name='download';else if(t.host!==location.host)name='external_link_click';else return}
track(name,{section:ds.trackSection,element_id:t.id||ds.trackElement,label:ds.trackLabel||(t.textContent||'').trim().slice(0,80)||undefined,destination_url:ds.trackDestination||href})},true);
})();
