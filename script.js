// 年
document.getElementById('year').textContent = new Date().getFullYear();

// Clock
function pad(n){return String(n).padStart(2,'0')}
function tick(){
  const d = new Date();
  document.getElementById('clock').textContent =
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
tick(); setInterval(tick,1000);

// Omikuji
const fortunes = ["大吉","中吉","小吉","吉","凶"];
document.getElementById('omikujiBtn').addEventListener('click', ()=>{
  const result = fortunes[Math.floor(Math.random()*fortunes.length)];
  document.getElementById('omikujiResult').textContent = `あなたの運勢は「${result}」です！`;
});

// ToDo
const storeKey = 'portfolio_todos';
const state = JSON.parse(localStorage.getItem(storeKey) || '{"todos":[],"done":[]}');
const $todoInput = document.getElementById('todoInput');
const $addBtn = document.getElementById('addBtn');
const $todoList = document.getElementById('todoList');
const $doneList = document.getElementById('doneList');

function save(){ localStorage.setItem(storeKey, JSON.stringify(state)); }
function render(){
  $todoList.innerHTML = ''; $doneList.innerHTML = '';
  state.todos.forEach((t,i)=>{
    const li=document.createElement('li');
    li.innerHTML=`<span>${t}</span>
      <span><button class="btn" data-done="${i}">完了</button>
             <button class="btn" data-del="${i}">削除</button></span>`;
    $todoList.appendChild(li);
  });
  state.done.forEach((t,i)=>{
    const li=document.createElement('li'); li.classList.add('done');
    li.innerHTML=`<span>${t}</span>
      <span><button class="btn" data-restore="${i}">戻す</button>
             <button class="btn" data-del-done="${i}">削除</button></span>`;
    $doneList.appendChild(li);
  });
}
function addTask(){
  const v=$todoInput.value.trim();
  if(!v) return;
  state.todos.push(v); $todoInput.value='';
  save(); render();
}
$addBtn.addEventListener('click',addTask);
$todoInput.addEventListener('keydown',e=>{if(e.key==='Enter')addTask();});
document.addEventListener('click',e=>{
  const t=e.target;
  if(t.dataset.done!==undefined){state.done.push(state.todos[t.dataset.done]);state.todos.splice(t.dataset.done,1);}
  else if(t.dataset.del!==undefined){state.todos.splice(t.dataset.del,1);}
  else if(t.dataset.restore!==undefined){state.todos.push(state.done[t.dataset.restore]);state.done.splice(t.dataset.restore,1);}
  else if(t.dataset.delDone!==undefined){state.done.splice(t.dataset.delDone,1);}
  save(); render();
});
render();
