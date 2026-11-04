/* LEVEL GYM · transiciones, scroll suave, cursor y efectos 3D */
(function(){
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
const root=document.documentElement,ld=document.getElementById('ld'),num=document.getElementById('ldn');
function go(){if(root.classList.contains('ready'))return;root.classList.add('ready');if(ld){ld.classList.add('out');setTimeout(()=>ld.remove(),1300)}
 if(window.gsap&&!reduce)gsap.from('.hero .eyebrow,.hero .xl,.hero h1,.hero .lead,.hero .cta,.today',{y:70,opacity:0,stagger:.09,duration:1.1,ease:'expo.out',delay:.35})}
window.__fx=1;
const hh=document.getElementById('ldh'),tt=document.getElementById('ldt'),fill=document.getElementById('ldf');
if(hh){const H={0:[8,14],6:[7,19]};for(let i=1;i<6;i++)H[i]=[6,22];const d=new Date(),[a,b]=H[d.getDay()],t=d.getHours()+d.getMinutes()/60,p=n=>String(n).padStart(2,'0')+':00';hh.textContent='Hoy '+p(a)+' – '+p(b)+' · '+(t>=a&&t<b?'Abierto ahora':'Cerrado ahora')}
if(!ld||reduce){go()}else{
 /* progreso REAL: cada tarea cargada suma su peso */
 const W={fonts:10,libs:30,imgs:30,scene:20,load:10},done={},names={fonts:'Tipografía',libs:'Motor 3D',imgs:'Imágenes',scene:'Escena 3D',load:'Todo listo'};
 let target=0,shown=0,label='Cargando',fin=false;
 const mark=k=>{if(done[k])return;done[k]=1;target+=W[k];label=names[k]};
 const to=(p,ms)=>Promise.race([p,new Promise(r=>setTimeout(r,ms))]);
 const wait=(f,ms)=>new Promise(res=>{const t0=performance.now(),i=setInterval(()=>{if(f()||performance.now()-t0>ms){clearInterval(i);res()}},40)});
 to(document.fonts?document.fonts.ready:Promise.resolve(),3000).then(()=>mark('fonts'));
 wait(()=>window.THREE&&window.gsap,6000).then(()=>mark('libs'));
 to(Promise.all([...document.querySelectorAll('.bgimg,.hvw .poster')].map(i=>i.decode?i.decode().catch(()=>{}):0)),6000).then(()=>mark('imgs'));
 to(new Promise(r=>{window.__gl?r():document.addEventListener('glready',r,{once:true})}),5000).then(()=>mark('scene'));
 const l0=()=>mark('load');document.readyState==='complete'?l0():addEventListener('load',l0);
 (function tick(){
  if(shown<target)shown=Math.min(target,shown+Math.max((target-shown)*.07,.3));
  const n=Math.min(100,Math.round(shown));num.textContent=n;fill&&(fill.style.clipPath='inset('+(100-shown)+'% 0 0 0)');tt&&(tt.textContent=n>=100?'¡Listo!':label);
  if(n>=100&&!fin){fin=true;setTimeout(go,380)}else requestAnimationFrame(tick)})();
}
setTimeout(go,9000);
if(!window.gsap||!window.ScrollTrigger)return;
gsap.registerPlugin(ScrollTrigger);
let lenis;
if(window.Lenis&&!reduce){lenis=new Lenis({lerp:.085});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t&&a.getAttribute('href').length>1){e.preventDefault();lenis.scrollTo(t,{offset:-60,duration:1.6})}}))}
gsap.to('#pb',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.2}});
if(reduce)return;
gsap.to('.hero .wrap',{yPercent:-18,opacity:0,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
gsap.utils.toArray('.xl:not(.o)').forEach(el=>gsap.fromTo(el,{xPercent:-10},{xPercent:10,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:true}}));
const sk=gsap.quickTo('.strip','skewX',{duration:.4});let w;
ScrollTrigger.create({onUpdate:s=>{sk(gsap.utils.clamp(-10,10,s.getVelocity()/-260));clearTimeout(w);w=setTimeout(()=>sk(0),100)}});
const mm=gsap.matchMedia();
mm.add('(min-width:901px)',()=>{
 const sec=document.querySelector('#instalaciones'),tr=sec.querySelector('.grid4');
 const dist=()=>Math.max(0,tr.scrollWidth+tr.getBoundingClientRect().left+gsap.getProperty(tr,'x')-innerWidth+70);
 gsap.to(tr,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:sec,start:'top top',end:()=>'+='+Math.round(dist()*1.3+200),pin:true,scrub:.6,invalidateOnRefresh:true}});
});
const rec=document.querySelector('#recorrido');
if(rec){gsap.timeline({scrollTrigger:{trigger:rec,start:'top top',end:'+=170%',pin:true,scrub:.7}})
 .fromTo('.rec .hvw',{scale:.5,rotateY:-38,rotateX:12,opacity:.3},{scale:1,rotateY:0,rotateX:0,opacity:1,ease:'none'},0)
 .fromTo('.rw.l',{xPercent:-35},{xPercent:8,ease:'none'},0).fromTo('.rw.r',{xPercent:35},{xPercent:-8,ease:'none'},0)
 .to('.rec-cap',{opacity:1,y:-10},.7);}
if(fine){
 root.classList.add('cc');const cu=document.getElementById('cu'),cr=document.getElementById('cr');
 const qx=gsap.quickTo(cu,'x',{duration:.08}),qy=gsap.quickTo(cu,'y',{duration:.08}),rx=gsap.quickTo(cr,'x',{duration:.35}),ry=gsap.quickTo(cr,'y',{duration:.35});
 addEventListener('pointermove',e=>{qx(e.clientX);qy(e.clientY);rx(e.clientX);ry(e.clientY)},{passive:true});
 document.querySelectorAll('a,button,.vid').forEach(el=>{el.addEventListener('pointerenter',()=>cr.classList.add('h'));el.addEventListener('pointerleave',()=>cr.classList.remove('h'))});
 document.querySelectorAll('.btn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.25,y:(e.clientY-r.top-r.height/2)*.35,duration:.4})});b.addEventListener('pointerleave',()=>gsap.to(b,{x:0,y:0,duration:.7,ease:'elastic.out(1,.4)'}))});
 document.querySelectorAll('.wc,.grid4 .ph,.train .ph,.pc,.col').forEach(el=>{
  el.addEventListener('pointermove',e=>{el.classList.add('tl');const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
   el.style.transform=`perspective(900px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateZ(10px)`;el.style.setProperty('--gx',(x+.5)*100+'%');el.style.setProperty('--gy',(y+.5)*100+'%')});
  el.addEventListener('pointerleave',()=>{el.classList.remove('tl');el.style.transform=''})});
}
addEventListener('load',()=>ScrollTrigger.refresh());
})();
