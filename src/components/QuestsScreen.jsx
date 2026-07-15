import React, { useState } from "react";
import { C } from "../../styles/theme";
import { StatsRow } from "../common/UI";

const QUEST_POOL = [
  { id:"q1",  title:"First Lesson",       desc:"Complete the Introduction of any topic",  xp:60,  gems:5,  icon:"📖" },
  { id:"q2",  title:"Deep Diver",         desc:"Finish a Deep Dive session",              xp:80,  gems:8,  icon:"🔍" },
  { id:"q3",  title:"Challenge Accepted", desc:"Complete any Challenge",                  xp:100, gems:10, icon:"⚔️" },
  { id:"q4",  title:"Mastermind",         desc:"Reach Mastery on any topic",              xp:120, gems:12, icon:"🌍" },
  { id:"q5",  title:"Perfect Score",      desc:"Score 5/5 in a Challenge",                xp:150, gems:15, icon:"💯" },
  { id:"q6",  title:"Streak Keeper",      desc:"Maintain your daily streak",              xp:50,  gems:5,  icon:"🔥" },
  { id:"q7",  title:"Speed Learner",      desc:"Complete 2 lessons in one session",       xp:90,  gems:9,  icon:"⚡" },
  { id:"q8",  title:"Knowledge Seeker",   desc:"Explore 2 different subjects",            xp:70,  gems:7,  icon:"🧠" },
  { id:"q9",  title:"Gem Collector",      desc:"Earn gems by completing any stage",       xp:40,  gems:10, icon:"💎" },
  { id:"q10", title:"Voice Listener",     desc:"Play Champ's voice on 3 lesson cards",   xp:30,  gems:3,  icon:"🔊" },
  { id:"q11", title:"Passion Learner",    desc:"Complete a lesson using your passion",    xp:75,  gems:7,  icon:"❤️" },
  { id:"q12", title:"Daily Grinder",      desc:"Open the app and complete any stage",     xp:50,  gems:5,  icon:"📅" },
];

function getDailyQuests() {
  const today = new Date().toDateString();
  try {
    const saved = JSON.parse(localStorage.getItem("passionai_quests")||"{}");
    if (saved.date===today && saved.quests) return saved.quests;
    // pick 3 random quests for today
    const shuffled = [...QUEST_POOL].sort(()=>Math.random()-.5).slice(0,3).map(q=>({...q,done:false}));
    localStorage.setItem("passionai_quests", JSON.stringify({date:today,quests:shuffled}));
    return shuffled;
  } catch { return QUEST_POOL.slice(0,3).map(q=>({...q,done:false})); }
}

function saveQuests(quests) {
  const today = new Date().toDateString();
  try { localStorage.setItem("passionai_quests", JSON.stringify({date:today,quests})); } catch {}
}

export function QuestsScreen({gameState, setGameState, username}) {
  const [quests, setQuests] = useState(()=>getDailyQuests());
  const completed = quests.filter(q=>q.done).length;
  const allDone   = completed===quests.length;

  const completeQuest = (idx) => {
    const updated = quests.map((q,i)=>i===idx?{...q,done:true}:q);
    setQuests(updated);
    saveQuests(updated);
    const q = quests[idx];
    setGameState(g=>{
      const nx=g.xp+q.xp, th=g.level*300;
      return nx>=th
        ? {...g,xp:nx-th,level:g.level+1,gems:g.gems+q.gems+5}
        : {...g,xp:nx,gems:g.gems+q.gems};
    });
  };

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}>
      <div style={{padding:"22px 22px 0"}}>
        <div style={{fontSize:"14px",fontWeight:"800",letterSpacing:"1.5px",color:C.accentHover}}>PASSION<span style={{color:C.accent}}>AI</span></div>
        <div style={{marginTop:"14px",fontSize:"22px",fontWeight:"900",color:C.text}}>Daily Quests ⚔️</div>
        <div style={{fontSize:"13px",color:C.muted,marginTop:"3px"}}>Resets every midnight · {completed}/{quests.length} done</div>
      </div>

      <div style={{flex:1,padding:"16px 22px 22px",display:"flex",flexDirection:"column",gap:"14px"}}>
        {/* progress */}
        <div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:"18px",padding:"16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
            <span style={{fontSize:"13px",fontWeight:"700",color:C.muted}}>Today's Progress</span>
            <span style={{fontSize:"13px",fontWeight:"800",color:C.accent}}>{completed}/{quests.length}</span>
          </div>
          <div style={{height:"8px",background:C.border,borderRadius:"99px",overflow:"hidden"}}>
            <div style={{height:"100%",width:`${(completed/quests.length)*100}%`,background:`linear-gradient(90deg,${C.accent},#D4A017)`,borderRadius:"99px",transition:"width .5s ease"}}/>
          </div>
          {allDone&&(
            <div style={{marginTop:"10px",textAlign:"center",fontSize:"13px",fontWeight:"800",color:C.gold}}>
              🏆 All quests done! Come back tomorrow for more!
            </div>
          )}
        </div>

        {/* stats */}
        <StatsRow xp={gameState.xp} level={gameState.level} streak={gameState.streak} gems={gameState.gems}/>

        {/* quest cards */}
        {quests.map((q,i)=>(
          <div key={q.id} style={{
            background:q.done?"#16A34A08":"#FFFFFF",
            border:`2px solid ${q.done?"#16A34A44":C.border}`,
            borderRadius:"20px",padding:"18px",
            display:"flex",alignItems:"center",gap:"14px",
            opacity:q.done?.7:1,transition:"all .3s",
          }}>
            <div style={{width:"52px",height:"52px",borderRadius:"16px",
              background:q.done?"#16A34A18":`${C.accent}12`,
              border:`2px solid ${q.done?"#16A34A44":C.accent+"44"}`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px",flexShrink:0}}>
              {q.done?"✅":q.icon}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:"15px",fontWeight:"800",color:q.done?"#16A34A":C.text}}>{q.title}</div>
              <div style={{fontSize:"12px",color:C.muted,marginTop:"3px",lineHeight:1.4}}>{q.desc}</div>
              <div style={{display:"flex",gap:"8px",marginTop:"6px"}}>
                <span style={{fontSize:"11px",fontWeight:"800",color:C.accent}}>+{q.xp} XP</span>
                <span style={{fontSize:"11px",fontWeight:"800",color:"#0891B2"}}>+{q.gems} 💎</span>
              </div>
            </div>
            {!q.done&&(
              <button onClick={()=>completeQuest(i)} style={{
                background:`linear-gradient(135deg,${C.accent},#D4A017)`,
                border:"none",borderRadius:"12px",padding:"8px 14px",
                cursor:"pointer",fontSize:"12px",fontWeight:"800",color:"#fff",
                boxShadow:`0 4px 14px ${C.accent}33`,flexShrink:0,
              }}>
                Claim
              </button>
            )}
          </div>
        ))}

        <div style={{textAlign:"center",fontSize:"12px",color:C.dimmed,fontWeight:"600",marginTop:"4px"}}>
          New quests unlock at midnight 🌙
        </div>
      </div>
    </div>
  );
}

