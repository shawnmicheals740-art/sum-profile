function get_portfolio_signal_aspect(section){
 const map={
  'Station Master / Welcome':['green','yellow','red'],
  'The Train Schedule':['red','green','yellow'],
  'The Engine Room':['yellow','yellow','green'],
  'The Freight Car':['green','green','green'],
  'The Journey Log':['yellow','red','yellow'],
  'Ticket Counter':['red','red','red']
 };
 const dots=map[section]||['gray','gray','gray'];
 return{dots};
}

const tabs=[...document.querySelectorAll('.tab')];
const stations=[...document.querySelectorAll('.station')];
const badge=document.getElementById('panelBadge');
const title=document.getElementById('panelTitle');
const pinned=document.getElementById('pinnedLabel');

function openStation(section){
 tabs.forEach(t=>t.classList.remove('is-active'));
 const tab=tabs.find(t=>t.dataset.section===section);
 if(tab)tab.classList.add('is-active');

 stations.forEach(s=>s.classList.toggle('is-open',s.dataset.station===section));
 title.textContent=section;
 pinned.textContent=section;

 const aspect=get_portfolio_signal_aspect(section);
 badge.className='badge';
 if(aspect.dots[0]==='green')badge.classList.add('glow-green');
 if(aspect.dots[0]==='yellow')badge.classList.add('glow-yellow');
 if(aspect.dots[0]==='red')badge.classList.add('glow-red');
}

function applySignals(){
 tabs.forEach(tab=>{
  const aspect=get_portfolio_signal_aspect(tab.dataset.section);
  tab.querySelectorAll('.dot').forEach((d,i)=>{
    d.style.background=aspect.dots[i];
  });
 });
}

applySignals();
openStation('Station Master / Welcome');

tabs.forEach(tab=>tab.onclick=()=>openStation(tab.dataset.section));
