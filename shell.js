document.documentElement.dataset.theme=localStorage.getItem('theme')||'light';
addEventListener('DOMContentLoaded',()=>{
const n=document.getElementById('nav');
if(n){const p=location.pathname.includes('builder')?'b':'h';
n.outerHTML=`<header class=top><div class=wrap><a class=logo href=index.html><span class=lg><img class=l1 src=assets/logo-light.png alt=""><img class=l2 src=assets/logo-dark.png alt=""></span><b class=nm>Bharat's Content Studio</b></a><nav><div class=lk><a href=index.html#features>Features</a><a href=index.html#cinema>Cinema</a><a href=index.html#agents>Agents</a><a class="${p=='b'?'on':''}" href=builder.html>Builder</a></div><button class=tg data-tg aria-label="Toggle theme"></button><a class=btn href=studio.html>Dashboard</a><button class="tg mb" aria-label="Menu" aria-expanded=false>☰</button></nav></div></header>`;
const h=document.querySelector('header.top'),m=h.querySelector('.mb');
m.onclick=()=>{const o=h.classList.toggle('open');m.setAttribute('aria-expanded',o);m.textContent=o?'✕':'☰'};
h.querySelectorAll('.lk a').forEach(a=>a.onclick=()=>h.classList.remove('open'))}
const f=document.getElementById('foot');
if(f)f.outerHTML=`<footer><div class=wrap><span>Open source · MIT · no accounts, no subscriptions</span><span><a href=builder.html>Builder</a> · <a href="https://github.com/Bharat2456">GitHub</a></span></div></footer>`;
const set=()=>document.querySelectorAll('[data-tg]').forEach(b=>b.textContent=document.documentElement.dataset.theme=='dark'?'☀':'☾');
document.querySelectorAll('[data-tg]').forEach(b=>b.onclick=()=>{const t=document.documentElement.dataset.theme=='dark'?'light':'dark';document.documentElement.dataset.theme=t;localStorage.setItem('theme',t);set()});
set()});
