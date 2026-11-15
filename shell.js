document.documentElement.dataset.theme=localStorage.getItem('theme')||'light';
addEventListener('DOMContentLoaded',()=>{
const n=document.getElementById('nav');
if(n){const p=location.pathname.includes('builder')?'b':'h';
n.outerHTML=`<header class=top><div class=wrap><a class=logo href=index.html><span class=lg><img class=l1 src=assets/logo-light.png alt=""><img class=l2 src=assets/logo-dark.png alt=""></span>Bharat's Content Studio</a><nav><a class=hm href=index.html#features>Features</a><a class=hm href=index.html#cinema>Cinema</a><a class=hm href=index.html#agents>Agents</a><a class="${p=='b'?'on':''}" href=builder.html>Builder</a><button class=tg data-tg aria-label="Toggle theme"></button><a class=btn href=studio.html>Dashboard</a></nav></div></header>`}
const f=document.getElementById('foot');
if(f)f.outerHTML=`<footer><div class=wrap><span>Open source · MIT · no accounts, no subscriptions</span><span><a href=builder.html>Builder</a> · <a href="https://github.com/Bharat2456">GitHub</a></span></div></footer>`;
const set=()=>document.querySelectorAll('[data-tg]').forEach(b=>b.textContent=document.documentElement.dataset.theme=='dark'?'☀':'☾');
document.querySelectorAll('[data-tg]').forEach(b=>b.onclick=()=>{const t=document.documentElement.dataset.theme=='dark'?'light':'dark';document.documentElement.dataset.theme=t;localStorage.setItem('theme',t);set()});
set()});
