const relatedWorks=[
  {page:'beauty.html',title:'美容、酒店预约小程序',meta:'UI DESIGN · 2026',cover:'assets/project-1.png'},
  {page:'park-app.html',title:'智慧园区 APP',meta:'UI DESIGN · 2024',cover:'assets/project-2.png'},
  {page:'tablet-gateway.html',title:'Eastsoft 平板网关',meta:'UI DESIGN · 2024',cover:'assets/project-3.png'},
  {page:'park-platform.html',title:'智慧园区管理平台',meta:'UI DESIGN · 2025',cover:'assets/project-4.png'},
  {page:'poster-design.html',title:'平面海报',meta:'VISUAL DESIGN · 2024',cover:'assets/project-5.png'},
  {page:'ip-design.html',title:'IP 方案',meta:'VISUAL DESIGN · 2024',cover:'assets/project-6.png'}
];
const detailBrand=document.querySelector('.detail-brand span');
if(detailBrand)detailBrand.textContent='BoBub';
document.title=document.title.replace('BeBub','BoBub');
const currentPage=location.pathname.split('/').pop()||'index.html';
const relatedSection=document.createElement('section');
relatedSection.id='related';
relatedSection.className='related';
relatedSection.innerHTML=`<div class="related-inner"><div class="related-head"><div><small>EXPLORE MORE</small><h2>其他作品</h2></div><a href="index.html#projects">查看全部作品 →</a></div><div class="related-grid">${relatedWorks.filter(work=>work.page!==currentPage).map(work=>`<a class="related-card" href="${work.page}"><img src="${work.cover}" alt="${work.title}"><div><span>${work.meta}</span><strong>${work.title}　↗</strong></div></a>`).join('')}</div></div>`;
const footer=document.createElement('footer');
footer.className='detail-footer';
footer.innerHTML='<div class="detail-footer-inner"><span>© 2024–2026 Zhengbo. All rights reserved.</span><a href="index.html#home">BoBub Portfolio · 返回首页 ↑</a><span>Designed & built with passion ✦</span></div>';
const anchor=document.querySelector('#related-anchor');
anchor.replaceWith(relatedSection,footer);

const revealItems=[...document.querySelectorAll('.project-hero > *, .project-sidebar, .related-head, .related-card')];
revealItems.forEach((item,index)=>{item.classList.add('detail-reveal');item.style.setProperty('--delay',`${(index%5)*55}ms`)});
if(matchMedia('(prefers-reduced-motion:reduce)').matches){
  revealItems.forEach(item=>item.classList.add('visible'));
}else{
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -5%'});
  revealItems.forEach(item=>observer.observe(item));
}
