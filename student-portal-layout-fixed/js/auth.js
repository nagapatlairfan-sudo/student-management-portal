/* DEMO authentication only — not secure. Credentials are visible in source. */
const Auth={user:"STU2026001",pass:"student123",
login(id,pw,remember){if(id.trim().toUpperCase()===this.user&&pw===this.pass){(remember?localStorage:sessionStorage).setItem("sp_session",id.trim().toUpperCase());return true}return false},
check(){return !!(sessionStorage.getItem("sp_session")||localStorage.getItem("sp_session"))},
require(){if(!this.check())location.replace("index.html")},
logout(){sessionStorage.removeItem("sp_session");localStorage.removeItem("sp_session");location.href="index.html"}};
const loginForm=document.getElementById("loginForm");
if(loginForm){if(Auth.check())location.replace("dashboard.html");
const $=id=>document.getElementById(id);
$("tg").onclick=()=>{const p=$("pw");p.type=p.type==="password"?"text":"password"};
loginForm.onsubmit=e=>{e.preventDefault();$("err").textContent="";
const id=$("sid").value,pw=$("pw").value;
if(!id.trim()||!pw){$("err").textContent="Enter both your Student ID and password.";return}
loginForm.classList.add("loading");
setTimeout(()=>{if(Auth.login(id,pw,$("rem").checked))location.href="dashboard.html";
else{loginForm.classList.remove("loading");$("err").textContent="Those details don't match. Try the demo credentials below."}},700)}}
