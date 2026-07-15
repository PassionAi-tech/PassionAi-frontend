import React from "react";
import { SYLLABI, PASSIONS } from "../../data/curriculum";
import { C } from "../../styles/theme";
import { Pali, XPBar } from "../common/UI";

export function ProfileScreen({username,gameState,onChangeSyllabus,onChangeClass,onChangeSubject,syllabus,grade,subject,passion}) {
  const sData  = SYLLABI.find(s=>s.id===syllabus);
  const pData  = PASSIONS.find(p=>p.id===passion);
  const badges = [
    { icon:"🔥", label:"Streak",  value:`${gameState.streak} days`  },
    { icon:"💎", label:"Gems",    value:gameState.gems               },
    { icon:"⚡", label:"XP",      value:gameState.xp                 },
    { icon:"🏆", label:"Level",   value:gameState.level              },
  ];

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}>
      <div style={{padding:"22px 22px 0"}}>
        <div style={{fontSize:"14px",fontWeight:"800",letterSpacing:"1.5px",color:C.accentHover}}>PASSION<span style={{color:C.accent}}>AI</span></div>
      </div>

      <div style={{flex:1,padding:"16px 22px 22px",display:"flex",flexDirection:"column",gap:"14px"}}>
        {/* avatar + name */}
        <div style={{background:"linear-gradient(135deg,#1A1200,#2D1F00)",borderRadius:"24px",padding:"24px",display:"flex",alignItems:"center",gap:"16px"}}>
          <Pali mood="cheer" size={64}/>
          <div>
            <div style={{fontSize:"22px",fontWeight:"900",color:"#FFF8E1"}}>{username||"Student"}</div>
            <div style={{fontSize:"13px",color:"#9A8040",marginTop:"3px"}}>Level {gameState.level} Learner 🎓</div>
            <div style={{marginTop:"8px"}}>
              <XPBar xp={gameState.xp} level={gameState.level}/>
            </div>
          </div>
        </div>

        {/* stats grid */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
          {badges.map(b=>(
            <div key={b.label} style={{background:"#FFFFFF",border:`1.5px solid ${C.border}`,borderRadius:"16px",padding:"16px",display:"flex",flexDirection:"column",gap:"4px",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
              <span style={{fontSize:"22px"}}>{b.icon}</span>
              <span style={{fontSize:"20px",fontWeight:"900",color:C.text}}>{b.value}</span>
              <span style={{fontSize:"11px",fontWeight:"700",color:C.muted,letterSpacing:".5px"}}>{b.label.toUpperCase()}</span>
            </div>
          ))}
        </div>

        {/* current settings */}
        <div style={{fontSize:"13px",fontWeight:"800",color:C.muted,letterSpacing:"1px"}}>CURRENT SETTINGS</div>

        {[
          { label:"Syllabus", value:sData?.label||"—", icon:"🎓", action:onChangeSyllabus },
          { label:"Class",    value:grade?`Class ${grade}`:"—", icon:"📚", action:onChangeClass },
          { label:"Subject",  value:subject||"—", icon:"📖", action:onChangeSubject },
          { label:"Passion",  value:pData?`${pData.emoji} ${pData.label}`:"—", icon:"❤️", action:null },
        ].map(s=>(
          <div key={s.label} style={{background:"#FFFFFF",border:`1.5px solid ${C.border}`,borderRadius:"16px",padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
            <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
              <span style={{fontSize:"20px"}}>{s.icon}</span>
              <div>
                <div style={{fontSize:"11px",fontWeight:"700",color:C.muted,letterSpacing:".5px"}}>{s.label.toUpperCase()}</div>
                <div style={{fontSize:"14px",fontWeight:"800",color:C.text,marginTop:"2px"}}>{s.value}</div>
              </div>
            </div>
            {s.action&&(
              <button onClick={s.action} style={{background:`${C.accent}12`,border:`1px solid ${C.accent}44`,borderRadius:"10px",padding:"6px 14px",cursor:"pointer",fontSize:"12px",fontWeight:"800",color:C.accent}}>
                Change
              </button>
            )}
          </div>
        ))}

        <div style={{textAlign:"center",fontSize:"11px",color:C.dimmed,fontWeight:"600",marginTop:"4px"}}>
          Made with ❤️ by PassionAI
        </div>
      </div>
    </div>
  );
}
