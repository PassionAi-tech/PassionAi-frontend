import React from "react";
import { PASSIONS, UNIT_STAGES, UNIT_ICONS, UNIT_XP } from "../data/curriculum";
import { C, UNIT_COLORS } from "../styles/theme";
import { TopBar } from ".UI";

export function RoadmapScreen({passion,subject,topic,gameState,completed,onStage,onBack}) {
  const pLabel = PASSIONS.find(p=>p.id===passion)?.label||passion;
  const daily  = completed.length>=3;
  const stageDescs = [
    "Full chapter explained page by page",
    "Deep facts, history & real examples",
    "Test your knowledge — pick difficulty",
    "See how it's used in the real world",
  ];
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column"}}>
      <TopBar pct={(completed.length/UNIT_STAGES.length)*100} xp={gameState.xp} level={gameState.level} streak={gameState.streak} gems={gameState.gems} onBack={onBack}/>
      <div style={{flex:1,padding:"16px 22px 22px",display:"flex",flexDirection:"column",gap:"16px",overflowY:"auto"}}>
        <div>
          <div style={{fontSize:"22px",fontWeight:"900",color:C.text}}>{topic}</div>
          <div style={{fontSize:"13px",color:C.muted,marginTop:"3px"}}>{subject} · via {pLabel} {PASSIONS.find(p=>p.id===passion)?.emoji}</div>
        </div>

        {/* daily quest */}
        <div style={{background:daily?C.greenSoft:C.goldSoft,border:`1.5px solid ${daily?C.green:C.gold}44`,borderRadius:"16px",padding:"12px 16px",display:"flex",alignItems:"center",gap:"12px"}}>
          <span style={{fontSize:"20px"}}>{daily?"🏅":"⭐"}</span>
          <div>
            <div style={{fontSize:"13px",fontWeight:"800",color:daily?C.green:C.gold}}>Daily Quest: Perfectionist</div>
            <div style={{fontSize:"12px",color:C.muted}}>Complete 3 units · {completed.length}/3 {daily?"✅":""}</div>
          </div>
        </div>

        {/* roadmap */}
        <div style={{display:"flex",flexDirection:"column"}}>
          {UNIT_STAGES.map((stage,i)=>{
            const done    = completed.includes(stage);
            const locked  = i>0&&!completed.includes(UNIT_STAGES[i-1]);
            const current = !done&&!locked;
            const col     = UNIT_COLORS[i];
            return (
              <div key={stage} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                {i>0&&<div style={{width:"3px",height:"20px",background:completed.includes(UNIT_STAGES[i-1])?col:C.border,transition:"background .4s"}}/>}
                <button onClick={()=>{ if(!locked) onStage(stage); }} disabled={locked}
                  style={{width:"100%",background:done?`${col}12`:current?`${col}09`:C.surface,border:`2px solid ${done||current?col:C.border}${done||current?"88":"44"}`,borderRadius:"20px",padding:"15px 18px",cursor:locked?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:"14px",transition:"all .2s",opacity:locked?.4:1}}>
                  <div style={{width:"48px",height:"48px",borderRadius:"16px",background:done?col:current?`${col}25`:C.dimmed,border:current?`2px solid ${col}`:done?`2px solid ${col}`:"none",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",flexShrink:0}}>
                    {done?"✅":locked?"🔒":UNIT_ICONS[i]}
                  </div>
                  <div style={{textAlign:"left",flex:1}}>
                    <div style={{fontSize:"15px",fontWeight:"800",color:done?col:current?col:C.muted}}>{stage}</div>
                    <div style={{fontSize:"12px",color:C.muted,marginTop:"2px"}}>{stageDescs[i]}</div>
                    <div style={{fontSize:"11px",fontWeight:"700",marginTop:"3px",color:done?C.green:current?col:C.dimmed}}>
                      {done?"Completed ✓":locked?"Locked 🔒":`+${UNIT_XP[i]} XP · Tap to start`}
                    </div>
                  </div>
                  {current&&<div style={{fontSize:"22px",animation:"shimmer 1.5s ease-in-out infinite"}}>▶</div>}
                </button>
              </div>
            );
          })}
        </div>

        {daily&&(
          <div style={{background:"#38BDF815",border:`1px solid ${C.gem}44`,borderRadius:"14px",padding:"12px 16px",display:"flex",alignItems:"center",gap:"10px"}}>
            <span style={{fontSize:"20px"}}>💎</span>
            <div><div style={{fontSize:"13px",fontWeight:"800",color:C.gem}}>Perfectionist Bonus!</div>
            <div style={{fontSize:"12px",color:C.muted}}>+10 Gems earned today!</div></div>
          </div>
        )}
      </div>
    </div>
  );
}
