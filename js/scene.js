/* LEVEL GYM · escena 3D: tres barras ascendentes (niveles) que reaccionan al ratón y al scroll */
(function(){
const rdy=()=>{window.__gl=1;document.dispatchEvent(new Event('glready'))};
if(!window.THREE){rdy();return}
const T=THREE,cv=document.getElementById('gl');if(!cv){rdy();return}
let R;try{R=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true,powerPreference:'high-performance'})}catch(e){rdy();return}
R.setPixelRatio(Math.min(devicePixelRatio||1,1.6));
const sc=new T.Scene(),cam=new T.PerspectiveCamera(32,1,.1,100);cam.position.set(0,0,15);
const grp=new T.Group();sc.add(grp);
const mat=new T.MeshStandardMaterial({color:0xee6c0c,metalness:.4,roughness:.32,emissive:0xee4a00,emissiveIntensity:.22});
const edge=new T.LineBasicMaterial({color:0xffb066,transparent:true,opacity:.22});
const pm=new T.PMREMGenerator(R),es=new T.Scene();
es.add(new T.Mesh(new T.BoxGeometry(30,30,30),new T.MeshBasicMaterial({color:0x0c0c0e,side:T.BackSide})));
[[0,10,2,16,2,0xffffff,4],[-11,0,3,2,14,0xff7a1a,5],[11,1,2,2,12,0xffffff,3],[0,-10,0,14,2,0xff9a4a,2]].forEach(([x,y,z,w,h,c,i])=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({side:T.DoubleSide}));m.material.color.set(c).multiplyScalar(i);m.position.set(x,y,z);m.lookAt(0,0,0);es.add(m)});
mat.envMap=pm.fromScene(es,.03).texture;mat.envMapIntensity=1.15;mat.metalness=.6;mat.roughness=.26;mat.emissiveIntensity=.1;
const bars=[];
/* Logotipo LEVEL GYM: 4 piezas trazadas sobre el original (px de 1080x1080) */
const raw=[[[446,288],[627,288],[431,378]],[[431,378],[531,378],[452,792],[335,844]],[[627,288],[745,236],[670,608],[556,658]],[[452,792],[651,702],[636,792]]];
const K=5.2/608,dirs=[[-7,6,-5],[-8,-4,4],[7,5,3],[5,-7,-6]],zo=[.9,0,.55,-.7];
raw.forEach((pts,i)=>{
 const sh=new T.Shape();pts.forEach(([x,y],j)=>{const X=(x-540)*K,Y=-(y-540)*K;j?sh.lineTo(X,Y):sh.moveTo(X,Y)});sh.closePath();
 const g=new T.ExtrudeGeometry(sh,{depth:.7,bevelEnabled:true,bevelSize:.05,bevelThickness:.09,bevelSegments:4,curveSegments:1});g.translate(0,0,-.35);
 const m=new T.Mesh(g,mat);m.add(new T.LineSegments(new T.EdgesGeometry(g,35),edge));
 const pv=new T.Group();pv.add(m);pv.userData={d:dirs[i],z:zo[i]};pv.scale.setScalar(.001);grp.add(pv);bars.push(pv);
});
sc.add(new T.HemisphereLight(0xffd2a8,0x0b0b0c,.7));
const key=new T.DirectionalLight(0xffffff,2.4);key.position.set(4,6,9);sc.add(key);
const rim=new T.DirectionalLight(0xee6c0c,3.2);rim.position.set(-7,2,-5);sc.add(rim);
const pl=new T.PointLight(0xff8a2b,60,22);pl.position.set(0,0,6);sc.add(pl);
const N=420,pos=new Float32Array(N*3);
for(let i=0;i<N;i++){pos[i*3]=(Math.random()-.5)*26;pos[i*3+1]=(Math.random()-.5)*18;pos[i*3+2]=(Math.random()-.5)*14}
const pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(pos,3));
const pts=new T.Points(pg,new T.PointsMaterial({color:0xff8a2b,size:.045,transparent:true,opacity:.7,blending:T.AdditiveBlending,depthWrite:false}));sc.add(pts);
let last=0,W=1,H=1,asp=1,mx=0,my=0,tx=0,ty=0,intro=0,ry=0,P=0;
function size(){W=innerWidth;H=innerHeight;asp=W/H;R.setSize(W,H,false);cam.aspect=asp;cam.updateProjectionMatrix()}
size();addEventListener('resize',size);
addEventListener('pointermove',e=>{tx=e.clientX/W*2-1;ty=e.clientY/H*2-1},{passive:true});
const ease=x=>1-Math.pow(1-x,4),clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
function loop(t){requestAnimationFrame(loop);const dt=Math.min(.1,(t-last)/1000||0);last=t;
 P=scrollY/H;const o=clamp(1-P*1.5,.07,1);cv.style.opacity=o;
 if(document.hidden||P>3.2)return;
 const s=t/1000;mx+=(tx-mx)*.06;my+=(ty-my)*.06;
 if(document.documentElement.classList.contains('ready'))intro=Math.min(1,intro+(still?1:dt/1.8));
 const E=clamp(P,0,1.4);
 bars.forEach((b,i)=>{const k=ease(clamp(intro*1.6-i*.25,0,1)),u=1-k,d=b.userData.d;
  b.scale.setScalar(Math.max(k,.001));b.position.set(d[0]*u+d[0]*.1*E,d[1]*u+d[1]*.1*E,d[2]*u+b.userData.z*E);
  b.rotation.set(u*d[1]*.12,u*d[0]*.1,u*.9)});
 const mob=asp<1,base=mob?.5:.95,pp=Math.min(P,1.2);
 grp.position.x=(mob?0:3.0)*(1-pp*.7);grp.position.y=(mob?2.6:.2)+Math.sin(s*.9)*.12+P*1.6;
 grp.scale.setScalar(base*(1-pp*.22));
 ry+=((mx*.3-.14+P*1.1)-ry)*.06;grp.rotation.y=ry+Math.sin(s*.5)*.16;grp.rotation.x=my*.1;
 pl.position.set(mx*8,-my*5,5);pts.rotation.y=s*.02;pts.position.y=P*2.2;
 R.render(sc,cam);if(!window.__gl)rdy()}
requestAnimationFrame(loop);
})();
