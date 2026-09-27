const KEY="kxn_kusun_gaming_v1";

const defaultData={
  members:[
    {id:1,name:"KXN KUSUN",uid:"123456789",role:"Leader",team:"KXN Alpha",status:"Active",avatar:""},
    {id:2,name:"KXN RUSH",uid:"987654321",role:"Rusher",team:"KXN Alpha",status:"Active",avatar:""},
    {id:3,name:"KXN SCOPE",uid:"456789123",role:"Sniper",team:"KXN Bravo",status:"Active",avatar:""}
  ],
  teams:[
    {id:1,name:"KXN Alpha",captain:"KXN KUSUN",players:4,logo:""},
    {id:2,name:"KXN Bravo",captain:"KXN SCOPE",players:4,logo:""}
  ],
  matches:[
    {id:1,title:"KXN Squad Battle",date:"2026-10-03",time:"20:00",opponent:"Team Phoenix",mode:"Squad"},
    {id:2,title:"Clash Squad Night",date:"2026-10-05",time:"21:00",opponent:"Night Hunters",mode:"Clash Squad"}
  ],
  videos:[
    {id:1,title:"KXN KUSUN Gaming Highlights",url:"https://www.youtube.com/",thumb:""},
    {id:2,title:"Free Fire Squad Gameplay",url:"https://www.youtube.com/",thumb:""}
  ],
  youtube:"https://www.youtube.com/"
};

let data=load();
function load(){try{return JSON.parse(localStorage.getItem(KEY))||structuredClone(defaultData)}catch(e){return structuredClone(defaultData)}}
function save(){localStorage.setItem(KEY,JSON.stringify(data));renderAll()}
function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function initials(name){return esc(name.split(/\s+/).map(x=>x[0]).slice(0,2).join("").toUpperCase())}
function avatarHTML(m){return m.avatar?`<img class="avatar" src="${esc(m.avatar)}" alt="${esc(m.name)}">`:`<div class="avatar">${initials(m.name)}</div>`}

function renderMembers(filter=""){
  const q=filter.toLowerCase();
  const list=data.members.filter(m=>(m.name+" "+m.uid+" "+m.role+" "+m.team).toLowerCase().includes(q));
  document.getElementById("memberGrid").innerHTML=list.length?list.map(m=>`
    <article class="card">
      <div class="member-top">${avatarHTML(m)}<div><div class="member-name">${esc(m.name)}</div><div class="muted">UID: ${esc(m.uid)}</div></div></div>
      <span class="badge">${esc(m.role)}</span><span class="badge">${esc(m.team)}</span>
      <div class="muted" style="margin-top:8px">Status: ${esc(m.status||"Active")}</div>
      <div class="card-actions"><button class="btn mini" onclick="showProfile(${m.id})">View Profile</button><button class="btn mini danger" onclick="deleteItem('members',${m.id})">Delete</button></div>
    </article>`).join(""):`<div class="card"><p class="muted">No members found.</p></div>`;
}
function renderTeams(){
  document.getElementById("teamGrid").innerHTML=data.teams.map(t=>`
    <article class="card team-card"><div class="team-icon">⚡</div><h3>${esc(t.name)}</h3>
    <p class="captain">Captain: ${esc(t.captain)}</p><p class="muted">Players: ${esc(t.players)}</p>
    <div class="card-actions"><button class="btn mini danger" onclick="deleteItem('teams',${t.id})">Delete</button></div></article>`).join("")||`<div class="card"><p class="muted">No teams added.</p></div>`;
}
function renderMatches(){
  document.getElementById("matchGrid").innerHTML=data.matches.map(m=>`
    <article class="match"><div><strong>${esc(m.title)}</strong><div class="match-date">${esc(m.date)} • ${esc(m.time)} • ${esc(m.mode||"Match")}</div></div>
    <div class="vs">VS</div><div class="opponent">${esc(m.opponent)}<div class="card-actions" style="justify-content:flex-end"><button class="btn mini danger" onclick="deleteItem('matches',${m.id})">Delete</button></div></div></article>`).join("")||`<div class="card"><p class="muted">No matches added.</p></div>`;
}
function renderVideos(){
  document.getElementById("videoGrid").innerHTML=data.videos.map(v=>`
    <article class="card video-card"><div class="thumb">${v.thumb?`<img src="${esc(v.thumb)}" style="width:100%;height:100%;object-fit:cover">`:"▶"}</div>
    <div class="video-body"><h3>${esc(v.title)}</h3><a href="${esc(v.url)}" target="_blank" rel="noopener">Watch on YouTube →</a>
    <div class="card-actions"><button class="btn mini danger" onclick="deleteItem('videos',${v.id})">Delete</button></div></div></article>`).join("")||`<div class="card"><p class="muted">No videos added.</p></div>`;
}
function renderAll(){
  renderMembers(document.getElementById("searchInput")?.value||"");renderTeams();renderMatches();renderVideos();
  document.getElementById("memberCount").textContent=data.members.length;
  document.getElementById("teamCount").textContent=data.teams.length;
  document.getElementById("matchCount").textContent=data.matches.length;
  document.getElementById("videoCount").textContent=data.videos.length;
  document.getElementById("youtubeBtn").href=data.youtube||"https://www.youtube.com/";
}
function deleteItem(type,id){if(confirm("Delete this item?")){data[type]=data[type].filter(x=>x.id!==id);save()}}
function showProfile(id){
  const m=data.members.find(x=>x.id===id); if(!m)return;
  document.getElementById("profileContent").innerHTML=`<div class="profile-large">${avatarHTML(m)}<h2>${esc(m.name)}</h2><p class="muted">${esc(m.role)}</p></div>
  <div class="profile-info"><div class="info-row"><span>Free Fire UID</span><b>${esc(m.uid)}</b></div><div class="info-row"><span>Team</span><b>${esc(m.team)}</b></div><div class="info-row"><span>Status</span><b>${esc(m.status||"Active")}</b></div></div>`;
  document.getElementById("profileModal").classList.add("show");
}

document.getElementById("searchInput").addEventListener("input",e=>renderMembers(e.target.value));
document.getElementById("year").textContent=new Date().getFullYear();

document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));

const adminModal=document.getElementById("adminModal");
document.getElementById("adminBtn").onclick=()=>adminModal.classList.add("show");
document.getElementById("closeAdmin").onclick=()=>adminModal.classList.remove("show");
document.getElementById("closeProfile").onclick=()=>document.getElementById("profileModal").classList.remove("show");
window.addEventListener("click",e=>{if(e.target===adminModal)adminModal.classList.remove("show");if(e.target===document.getElementById("profileModal"))document.getElementById("profileModal").classList.remove("show")});

document.querySelectorAll(".tab").forEach(tab=>tab.addEventListener("click",()=>{
  document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".tab-content").forEach(x=>x.classList.remove("active"));
  tab.classList.add("active");document.getElementById(tab.dataset.tab).classList.add("active");
}));

document.getElementById("memberForm").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);data.members.push({id:Date.now(),name:f.get("name"),uid:f.get("uid"),role:f.get("role"),team:f.get("team"),status:f.get("status")||"Active",avatar:f.get("avatar")||""});save();e.target.reset();alert("Member added!")};
document.getElementById("teamForm").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);data.teams.push({id:Date.now(),name:f.get("name"),captain:f.get("captain"),players:f.get("players"),logo:f.get("logo")||""});save();e.target.reset();alert("Team added!")};
document.getElementById("matchForm").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);data.matches.push({id:Date.now(),title:f.get("title"),date:f.get("date"),time:f.get("time"),opponent:f.get("opponent"),mode:f.get("mode")||"Match"});save();e.target.reset();alert("Match added!")};
document.getElementById("videoForm").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);data.videos.push({id:Date.now(),title:f.get("title"),url:f.get("url"),thumb:f.get("thumb")||""});save();e.target.reset();alert("Video added!")};
document.getElementById("resetBtn").onclick=()=>{if(confirm("Reset all demo data?")){data=structuredClone(defaultData);save();alert("Demo data reset.")}};

renderAll();
