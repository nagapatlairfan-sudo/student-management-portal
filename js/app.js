/* Shared UI: layout injection, theme, toasts, dropdowns, charts, dashboard. */
const App={
NAV:[["dashboard","Dashboard","fa-gauge"],["attendance","Attendance","fa-user-check"],["academics","Academics","fa-graduation-cap"],["timetable","Timetable","fa-calendar-days"],["assignments","Assignments","fa-book-open"],["examinations","Examinations","fa-file-pen"],["fees","Fees","fa-indian-rupee-sign"],["profile","Profile","fa-user"],["notifications","Notifications","fa-bell"],["settings","Settings","fa-gear"]],
inr:n=>"₹"+Number(n).toLocaleString("en-IN"),
fmtDate:d=>new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}),
pct:s=>Math.round(s.present/s.total*100),
load:(k,f)=>{try{return JSON.parse(localStorage.getItem("sp_"+k))??f}catch{return f}},
save:(k,v)=>localStorage.setItem("sp_"+k,JSON.stringify(v)),
toast(m){const t=document.createElement("div");t.className="toast";t.setAttribute("role","status");t.textContent=m;document.body.append(t);setTimeout(()=>t.remove(),2600)},
greet(){const h=new Date().getHours();return h<12?"Good morning":h<17?"Good afternoon":"Good evening"},
notes(){return App.load("notes",DATA.notifications)},
shell(page){Auth.require();const s=DATA.student,un=App.notes().filter(n=>!n.read).length;
document.documentElement.dataset.theme=App.load("theme","light");document.body.classList.toggle("compact",!!App.load("compact",false));
const cur=App.NAV.find(n=>n[0]===page);
document.body.insertAdjacentHTML("afterbegin",`<aside class="sidebar"><div class="brand"><span class="logo">M</span>${DATA.college.short} Student Portal</div>
${App.NAV.map(n=>`<a href="${n[0]}.html" class="${n[0]===page?"active":""}"${n[0]===page?' aria-current="page"':""}><i class="fa-solid ${n[2]}"></i>${n[1]}</a>`).join("")}
<a href="#" id="lo" style="margin-top:auto"><i class="fa-solid fa-right-from-bracket"></i>Log out</a></aside>
<div class="main"><header class="topbar"><button class="ib" id="mt" aria-label="Toggle sidebar"><i class="fa-solid fa-bars"></i></button>
<strong class="mh">${DATA.college.name}</strong><div class="grow"></div>
<label class="search"><i class="fa-solid fa-magnifying-glass"></i><input id="gs" placeholder="Go to page…" aria-label="Search pages" list="pl"></label><datalist id="pl">${App.NAV.map(n=>`<option value="${n[1]}">`).join("")}</datalist>
<select aria-label="Academic year" class="mh"><option>${s.year}</option><option>2025–2026</option></select>
<div class="dd"><button class="ib" id="nb" aria-label="Notifications"><i class="fa-solid fa-bell"></i>${un?`<span class="dot">${un}</span>`:""}</button>
<div class="menu" id="nm">${App.notes().slice(0,4).map(n=>`<div class="it">${n.text}</div>`).join("")}<a href="notifications.html"><b>View all</b></a></div></div>
<div class="dd"><button class="me" id="pb" aria-label="Profile menu"><span class="av">${s.name[0]}</span><span class="mh">${s.name}</span></button>
<div class="menu" id="pm" style="width:200px"><a href="profile.html">My profile</a><a href="settings.html">Settings</a><a href="#" id="lo2">Log out</a></div></div></header>
<main class="content" id="content"><div class="crumb">Home / ${cur?cur[1]:""}</div></main></div>`);
const tg=(b,m)=>{b.onclick=e=>{e.stopPropagation();document.querySelectorAll(".menu").forEach(x=>x!==m&&x.classList.remove("open"));m.classList.toggle("open")}};
tg(document.getElementById("nb"),document.getElementById("nm"));tg(document.getElementById("pb"),document.getElementById("pm"));
document.addEventListener("click",()=>document.querySelectorAll(".menu").forEach(x=>x.classList.remove("open")));
document.getElementById("mt").onclick=()=>document.body.classList.toggle(innerWidth>860?"collapsed":"open-nav");
["lo","lo2"].forEach(i=>document.getElementById(i).onclick=e=>{e.preventDefault();Auth.logout()});
document.getElementById("gs").onchange=e=>{const m=App.NAV.find(n=>n[1].toLowerCase()===e.target.value.toLowerCase());m?location.href=m[0]+".html":App.toast("No page matches that search.")}},
chart(id,cfg){const c=document.getElementById(id);if(!c)return;if(!window.Chart){c.parentNode.innerHTML='<div class="fallback">Chart unavailable offline.</div>';return}new Chart(c,cfg)},
dashboard(){const D=DATA,s=D.student,subs=D.subjects,tot=subs.reduce((a,x)=>a+x.total,0),pre=subs.reduce((a,x)=>a+x.present,0),ap=Math.round(pre/tot*100);
const due=D.fees.total-D.fees.paid,pend=D.assignments.filter(a=>a.status==="Pending").length,gpa=D.gpaHistory.at(-1).gpa;
const C=document.getElementById("content"),now=new Date(),hm=now.toTimeString().slice(0,5);
const cards=[["Attendance",ap+"%","fa-user-check","#4a4fc4","attendance",ap,"Target 75%"],["Semester GPA",gpa+" / 10","fa-graduation-cap","#16a06b","academics",gpa*10,"+0.1 vs last sem"],["Pending assignments",pend,"fa-book-open","#e89a17","assignments",pend*20,"Next due 24 Oct"],["Outstanding fees",App.inr(due),"fa-indian-rupee-sign","#d9455f","fees",Math.round(D.fees.paid/D.fees.total*100),"85% paid"]];
C.insertAdjacentHTML("beforeend",`<section class="hero"><div><h1>${App.greet()}, ${s.name}!</h1><p>You have ${pend} assignments due soon and ${D.exams.length} exams ahead. Keep it up.</p>
<div class="chips"><span class="chip">${s.dept}</span><span class="chip">Semester ${s.semester} · Section ${s.section}</span><span class="chip">${s.year}</span><span class="chip">${s.id}</span></div></div>
<div><span class="chip">Demo data only</span></div></section>
<div class="grid g4">${cards.map(c=>`<a class="card stat" href="${c[4]}.html"><div class="ic" style="background:${c[3]}"><i class="fa-solid ${c[2]}"></i></div><b>${c[1]}</b><small>${c[0]} · ${c[6]}</small><div class="bar"><i style="width:${Math.min(c[5],100)}%;background:${c[3]}"></i></div></a>`).join("")}</div>
<div class="grid g2" style="margin-top:18px"><div class="card"><h3>Attendance overview<a href="attendance.html" class="badge b-info">Details</a></h3>
<div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap"><div class="chartbox" style="width:180px;height:180px"><canvas id="ad"></canvas></div><div style="flex:1;min-width:220px">
${subs.map(x=>{const p=App.pct(x);return`<div class="row"><span>${x.name}<small>${x.present}/${x.total} classes</small></span><span class="badge ${p<75?"b-bad":p<80?"b-warn":"b-ok"}">${p}%</span></div>`}).join("")}</div></div>
${subs.some(x=>App.pct(x)<75)?'<p class="badge b-bad">Warning: a subject is below 75%.</p>':'<p class="badge b-ok">All subjects are above 75%.</p>'}</div>
<div class="card"><h3>Academic performance</h3><div class="chartbox"><canvas id="mk"></canvas></div></div></div>
<div class="grid g2" style="margin-top:18px"><div class="card"><h3>Today's timetable</h3>${D.timetableToday.map(t=>{const cur=hm>=t.start&&hm<=t.end,up=hm<t.start;return`<div class="row ${cur?"now":""}"><span><b>${t.subject}</b><small>${t.faculty} · ${t.room}</small></span><span style="text-align:right">${t.start}–${t.end}<br><span class="badge ${cur?"b-ok":up?"b-info":"b-warn"}">${cur?"Now":up?"Upcoming":"Done"}</span></span></div>`}).join("")}</div>
<div class="card"><h3>Semester GPA trend</h3><div class="chartbox"><canvas id="gp"></canvas></div></div></div>
<div class="grid g3" style="margin-top:18px"><div class="card"><h3>Upcoming assignments<a href="assignments.html" class="badge b-info">View all</a></h3>${D.assignments.map(a=>`<div class="row"><span><b>${a.title}</b><small>${a.subject} · Due ${App.fmtDate(a.due)}</small></span><span class="badge ${a.priority==="High"?"b-bad":a.priority==="Medium"?"b-warn":"b-info"}">${a.priority}</span></div>`).join("")}</div>
<div class="card"><h3>Upcoming examinations</h3>${D.exams.map(e=>{const d=Math.ceil((new Date(e.date)-now)/864e5);return`<div class="row"><span><b>${e.subject}</b><small>${e.name} · ${App.fmtDate(e.date)}</small></span><span class="badge b-warn">${d} days</span></div>`}).join("")}</div>
<div class="card"><h3>Recent notifications</h3><div id="nl"></div></div></div>
<div class="card" style="margin-top:18px"><h3>Quick actions</h3><div class="qa" style="grid-template-columns:repeat(6,1fr)">${[["attendance","fa-user-check","Attendance"],["timetable","fa-calendar-days","Timetable"],["academics","fa-chart-column","Results"],["assignments","fa-book-open","Assignments"],["fees","fa-indian-rupee-sign","Fees"],["profile","fa-user-pen","Edit profile"]].map(q=>`<a href="${q[0]}.html"><i class="fa-solid ${q[1]}"></i>${q[2]}</a>`).join("")}</div></div>`);
App.renderNotes();
const pal=["#4a4fc4","#16a06b","#e89a17","#d9455f","#8e44ad"];
App.chart("ad",{type:"doughnut",data:{labels:["Present","Absent"],datasets:[{data:[pre,tot-pre],backgroundColor:["#4a4fc4","#e4e8f2"],borderWidth:0}]},options:{maintainAspectRatio:false,cutout:"72%",plugins:{legend:{display:false}}}});
App.chart("mk",{type:"bar",data:{labels:subs.map(x=>x.code),datasets:[{label:"Marks (%)",data:subs.map(x=>x.marks),backgroundColor:pal,borderRadius:8}]},options:{maintainAspectRatio:false,scales:{y:{min:0,max:100}},plugins:{legend:{display:false}}}});
App.chart("gp",{type:"line",data:{labels:D.gpaHistory.map(g=>"Sem "+g.sem),datasets:[{label:"GPA",data:D.gpaHistory.map(g=>g.gpa),borderColor:"#4a4fc4",tension:.35}]},options:{maintainAspectRatio:false,scales:{y:{min:7,max:10}}}})},
renderNotes(){const el=document.getElementById("nl"),n=App.notes();el.innerHTML=n.length?n.slice(0,4).map(x=>`<div class="row ${x.read?"":"unread"}"><span>${x.text}<small>${x.cat} · ${App.fmtDate(x.time)}</small></span>${x.read?"":`<button class="btn ghost" data-r="${x.id}" aria-label="Mark as read">Read</button>`}</div>`).join(""):'<p class="fallback">You\'re all caught up.</p>';
el.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{App.save("notes",App.notes().map(x=>x.id==b.dataset.r?{...x,read:true}:x));App.renderNotes();App.toast("Marked as read")})}};
