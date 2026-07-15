import React from "react";
import { C } from "../styles/theme";

export function BottomNav({activeTab, setActiveTab, setScreen}) {
  const tabs = [
    { id:"home",    icon:"🏠", label:"Home"    },
    { id:"quests",  icon:"⚔️", label:"Quests"  },
    { id:"profile", icon:"👤", label:"Profile" },
  ];
  return (
    <div style={{
      display:"flex", borderTop:`1.5px solid ${C.border}`,
      background:"#FFFFFF", flexShrink:0,
      paddingBottom:"env(safe-area-inset-bottom,0px)",
    }}>
      {tabs.map(t=>{
        const active = activeTab===t.id;
        return (
          <button key={t.id} onClick={()=>{ setActiveTab(t.id); if(t.id==="home") setScreen("roadmap"); }}
            style={{
              flex:1, padding:"12px 0 10px", border:"none", background:"transparent",
              cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:"4px",
              transition:"all .2s",
            }}>
            <span style={{fontSize:"22px", filter: active?"none":"grayscale(1)", opacity:active?1:.5, transition:"all .2s"}}>{t.icon}</span>
            <span style={{fontSize:"10px", fontWeight:"800", color:active?C.accent:C.muted, letterSpacing:".5px", transition:"color .2s"}}>{t.label.toUpperCase()}</span>
            {active&&<div style={{width:"20px",height:"3px",borderRadius:"99px",background:C.accent,marginTop:"1px"}}/>}
          </button>
        );
      })}
    </div>
  );
}
