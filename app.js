(function(){
  var b=document.querySelector('.burger'),p=document.getElementById('panel');
  if(b&&p){
    b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!o));p.classList.toggle('otw',!o);});
    p.addEventListener('click',function(e){if(e.target.closest('a')){b.setAttribute('aria-expanded','false');p.classList.remove('otw');}});
  }
  /* aktywna zakladka menu wg sekcji */
  var linki=[].slice.call(document.querySelectorAll('.nav a'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){var id='#'+e.target.id;var hit=false;linki.forEach(function(a){var on=!hit&&a.getAttribute('href')===id;if(on)hit=true;if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});}});},{rootMargin:'-45% 0px -50% 0px'});
    ['kierunki','katalogi','produkcja','firma','uzytkownicy','kontakt','start'].forEach(function(id){var s=document.getElementById(id);if(s)io.observe(s);});
    /* pasek mobilny po minieciu pierwszego ekranu */
    var mob=document.querySelector('.mob'),hero=document.querySelector('.hero');
    if(mob&&hero){new IntersectionObserver(function(en){mob.classList.toggle('widac',!en[0].isIntersecting);},{threshold:0}).observe(hero);}
    /* mapa ladowana przy przewinieciu */
    var m=document.querySelector('.mapa');
    if(m){var mo=new IntersectionObserver(function(en){if(en[0].isIntersecting){var f=document.createElement('iframe');f.src=m.getAttribute('data-src');f.title='Mapa dojazdu do BHH Mikromed';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';m.appendChild(f);mo.disconnect();}},{rootMargin:'300px'});mo.observe(m);}
  }
  /* karuzela katalogow: przeciaganie myszą + strzalki */
  var t=document.querySelector('.tor');
  if(t){
    var prev=document.querySelector('.strz .prev'),next=document.querySelector('.strz .next');
    function krok(){var c=t.querySelector('.kc');return c?c.getBoundingClientRect().width+20:300;}
    function stan(){if(!prev)return;prev.disabled=t.scrollLeft<4;next.disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-4;}
    if(prev){prev.addEventListener('click',function(){t.scrollBy({left:-krok(),behavior:'smooth'});});next.addEventListener('click',function(){t.scrollBy({left:krok(),behavior:'smooth'});});}
    t.addEventListener('scroll',stan,{passive:true});stan();
    var x0=0,s0=0,ciag=false,ruch=0;
    t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;ciag=true;ruch=0;x0=e.clientX;s0=t.scrollLeft;});
    window.addEventListener('pointermove',function(e){if(!ciag)return;var dx=e.clientX-x0;ruch=Math.max(ruch,Math.abs(dx));if(ruch>4){t.classList.add('ciag');t.scrollLeft=s0-dx;}});
    window.addEventListener('pointerup',function(){if(!ciag)return;ciag=false;if(t.classList.contains('ciag')){t.classList.remove('ciag');var k=krok();t.scrollTo({left:Math.round(t.scrollLeft/k)*k,behavior:'smooth'});}});
    t.addEventListener('dragstart',function(e){e.preventDefault();});
  }
  /* formularz pokazowy */
  var f=document.querySelector('.form');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();var ok=f.querySelector('.ok');if(ok)ok.style.display='block';});}
})();
