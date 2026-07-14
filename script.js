const projects=[['AI辅助提效 · 2026','美容、酒店预约小程序 - 海外项目'],['移动端APP · 2024','智慧园区APP'],['触控终端界面设计 · 2024','Eastsoft平板网关'],['可视化大屏 · 2025','智慧园区管理平台'],['AIGC · 2024','平面海报 - AI辅助'],['品牌IP · 2024','IP方案'],['电商设计 · 2023','红酒品牌店铺装修'],['PPT设计 · 2023','传媒企业PPT设计']];
const detailPages=['beauty.html','park-app.html','tablet-gateway.html','park-platform.html','poster-design.html','ip-design.html'];
function card(item,i,extra=false){const content=`<article class="card" tabindex="0"><img src="assets/project-${i+1}.png?v=cover-3" alt="${item[1]}"><div class="card-body"><small>${item[0]}</small><h3>${item[1]}　↗</h3></div></article>`;const className=`card-link${extra?' extra-project':''}`;return detailPages[i]?`<a class="${className}" href="${detailPages[i]}" aria-label="查看${item[1]}详情">${content}</a>`:`<div class="${extra?'extra-project':''}">${content}</div>`}
const projectGrid=document.querySelector('#ui-grid');
projectGrid.innerHTML=projects.slice(0,6).map((item,i)=>card(item,i,i>=4)).join('');
const projectToggle=document.querySelector('#toggle-projects');
projectToggle.addEventListener('click',()=>{
  const expanded=projectGrid.classList.toggle('show-all');
  projectToggle.setAttribute('aria-expanded',String(expanded));
  projectToggle.textContent=expanded?'收起作品 ↑':'所有作品 →';
  if(expanded)document.querySelectorAll('.extra-project').forEach(item=>item.classList.add('is-visible'));
});
const skillData=[['用户界面设计',96],['用户体验研究',88],['原型制作',93],['设计系统',88],['标准组件库制作',92],['插画',70]];document.querySelector('#skills').innerHTML=skillData.map(x=>`<div class="skill">${x[0]}<span>${x[1]}%</span><div class="bar"><i style="width:${x[1]}%"></i></div></div>`).join('');
document.querySelector('.menu').onclick=()=>document.querySelector('nav').classList.toggle('open');document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>document.querySelector('nav').classList.remove('open'));document.querySelectorAll('[data-demo]').forEach(b=>b.onclick=()=>{let a=b.closest('article');a.animate([{transform:'scale(.98)'},{transform:'translateY(-12px) rotate(.5deg)'},{transform:'none'}],{duration:650,easing:'cubic-bezier(.2,.8,.2,1)'})});

const hero=document.querySelector('.hero');
requestAnimationFrame(()=>hero.classList.add('motion-ready'));
if(matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){
  hero.addEventListener('pointermove',event=>{
    const rect=hero.getBoundingClientRect();
    hero.style.setProperty('--mx',`${((event.clientX-rect.left)/rect.width-.5)*24}px`);
    hero.style.setProperty('--my',`${((event.clientY-rect.top)/rect.height-.5)*18}px`);
  });
  hero.addEventListener('pointerleave',()=>{
    hero.style.setProperty('--mx','0px');
    hero.style.setProperty('--my','0px');
  });
}

// Site-wide scroll reveals, navigation state and subtle pointer lighting.
const reduceMotion=matchMedia('(prefers-reduced-motion:reduce)').matches;
const progress=document.createElement('div');
progress.className='page-progress';
progress.setAttribute('aria-hidden','true');
document.body.prepend(progress);

const revealItems=[
  ...document.querySelectorAll('.section-head'),
  ...document.querySelectorAll('.grid .card-link, .grid > .card'),
  ...document.querySelectorAll('.about > small, .about > h2, .about > p, .about .skill'),
  ...document.querySelectorAll('.contact > small, .contact > h2, .contact > p, .wechat-card, .contact footer')
];
revealItems.forEach((item,index)=>{
  item.classList.add('reveal-item');
  item.style.setProperty('--delay',`${(index%4)*70}ms`);
});

if(reduceMotion){
  revealItems.forEach(item=>item.classList.add('is-visible'));
}else{
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -7%'});
  revealItems.forEach(item=>revealObserver.observe(item));
}

const pageSections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('nav a[href^="#"]')];
let scrollTick=false;
function updateScrollUI(){
  const maxScroll=document.documentElement.scrollHeight-innerHeight;
  const ratio=maxScroll>0?scrollY/maxScroll:0;
  progress.style.transform=`scaleX(${Math.min(1,Math.max(0,ratio))})`;
  document.querySelector('header').classList.toggle('scrolled',scrollY>24);
  const current=pageSections.reduce((active,section)=>scrollY+innerHeight*.34>=section.offsetTop?section:active,pageSections[0]);
  navLinks.forEach(link=>link.classList.toggle('active',current&&link.getAttribute('href')===`#${current.id}`));
  scrollTick=false;
}
addEventListener('scroll',()=>{
  if(!scrollTick){scrollTick=true;requestAnimationFrame(updateScrollUI)}
},{passive:true});
updateScrollUI();

if(matchMedia('(pointer:fine)').matches){
  addEventListener('pointermove',event=>{
    document.body.style.setProperty('--cursor-x',`${event.clientX}px`);
    document.body.style.setProperty('--cursor-y',`${event.clientY}px`);
  },{passive:true});
  document.querySelectorAll('.card').forEach(card=>card.addEventListener('pointermove',event=>{
    const rect=card.getBoundingClientRect();
    card.style.setProperty('--spot-x',`${event.clientX-rect.left}px`);
    card.style.setProperty('--spot-y',`${event.clientY-rect.top}px`);
  },{passive:true}));
}
