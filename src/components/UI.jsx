import React from "react";
import { C } from "../../styles/theme";

export function XPBar({xp,level}) {
  const next=level*300, pct=Math.min((xp/next)*100,100);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"3px"}}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <span style={{fontSize:"11px",fontWeight:"700",color:C.muted,letterSpacing:"1px"}}>LVL {level}</span>
        <span style={{fontSize:"11px",fontWeight:"700",color:C.accent}}>{xp}/{next} XP</span>
      </div>
      <div style={{height:"7px",background:C.surface,borderRadius:"99px",overflow:"hidden",border:`1px solid ${C.border}`}}>
        <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${C.accent},#818CF8)`,borderRadius:"99px",transition:"width .6s ease"}}/>
      </div>
    </div>
  );
}
export function StatsRow({xp,level,streak,gems}) {
  return (
    <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
      <div style={{display:"flex",alignItems:"center",gap:"4px",background:C.goldSoft,border:`1px solid ${C.gold}33`,borderRadius:"10px",padding:"5px 10px"}}>
        <span style={{fontSize:"13px"}}>🔥</span><span style={{fontSize:"13px",fontWeight:"800",color:C.gold}}>{streak}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:"4px",background:"#38BDF818",border:`1px solid #38BDF833`,borderRadius:"10px",padding:"5px 10px"}}>
        <span style={{fontSize:"13px"}}>💎</span><span style={{fontSize:"13px",fontWeight:"800",color:C.gem}}>{gems}</span>
      </div>
      <div style={{flex:1}}><XPBar xp={xp} level={level}/></div>
    </div>
  );
}
export function Pali({mood="idle",speaking=false,size=44}) {
  const moodOverlay = {idle:"",talk:"🗣",cheer:"🎉",think:"🤔",fire:"🔥",star:"⭐"}[mood]||"";
  const s = size;
  // inline SVG cartoon boy — yellow polo, black hair, warm skin
  const avatar = (
    <svg width={s} height={s} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* background circle */}
      <circle cx="50" cy="50" r="50" fill="#FFF8E1"/>
      {/* yellow polo shirt / body */}
      <ellipse cx="50" cy="88" rx="30" ry="18" fill="#FFD600"/>
      {/* collar */}
      <path d="M42 74 Q50 80 58 74 L58 82 Q50 88 42 82 Z" fill="#F5C200"/>
      {/* neck */}
      <rect x="44" y="64" width="12" height="12" rx="4" fill="#FDBCB4"/>
      {/* head */}
      <ellipse cx="50" cy="52" rx="22" ry="24" fill="#FDBCB4"/>
      {/* ears */}
      <ellipse cx="28" cy="52" rx="4" ry="5" fill="#FDBCB4"/>
      <ellipse cx="72" cy="52" rx="4" ry="5" fill="#FDBCB4"/>
      {/* hair — short black */}
      <ellipse cx="50" cy="34" rx="22" ry="12" fill="#1A1A1A"/>
      <rect x="28" y="32" width="44" height="10" fill="#1A1A1A"/>
      <ellipse cx="50" cy="30" rx="18" ry="10" fill="#1A1A1A"/>
      {/* hair side */}
      <ellipse cx="29" cy="42" rx="4" ry="8" fill="#1A1A1A"/>
      <ellipse cx="71" cy="42" rx="4" ry="8" fill="#1A1A1A"/>
      {/* eyes */}
      <ellipse cx="41" cy="52" rx="4" ry="4.5" fill="white"/>
      <ellipse cx="59" cy="52" rx="4" ry="4.5" fill="white"/>
      <circle cx="42" cy="53" r="2.5" fill="#1A1A1A"/>
      <circle cx="60" cy="53" r="2.5" fill="#1A1A1A"/>
      <circle cx="43" cy="52" r="1" fill="white"/>
      <circle cx="61" cy="52" r="1" fill="white"/>
      {/* eyebrows */}
      <path d="M37 47 Q41 45 45 47" stroke="#1A1A1A" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M55 47 Q59 45 63 47" stroke="#1A1A1A" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* nose */}
      <ellipse cx="50" cy="58" rx="2" ry="1.5" fill="#E8A090"/>
      {/* smile */}
      <path d="M43 63 Q50 69 57 63" stroke="#C0706A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* cheeks */}
      <ellipse cx="36" cy="60" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
      <ellipse cx="64" cy="60" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
    </svg>
  );
  return (
    <div style={{position:"relative",width:`${s}px`,height:`${s}px`,flexShrink:0,
      animation:speaking?"paliBob .5s ease-in-out infinite alternate":"none",
      filter:speaking?`drop-shadow(0 0 ${s/4}px #FFD60088)`:"none",
      transition:"filter .3s",
    }}>
      {avatar}
      {moodOverlay&&(
        <div style={{position:"absolute",bottom:"-2px",right:"-2px",
          width:`${s*.36}px`,height:`${s*.36}px`,borderRadius:"50%",
          background:"#fff",border:`1.5px solid ${C.border}`,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:`${s*.19}px`,boxShadow:"0 2px 6px rgba(0,0,0,.15)"}}>
          {moodOverlay}
        </div>
      )}
      <style>{`@keyframes paliBob{from{transform:scale(1)}to{transform:scale(1.08)}}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes pop{from{transform:scale(.7);opacity:0}to{transform:scale(1);opacity:1}}@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes shimmer{0%{opacity:.4}50%{opacity:1}100%{opacity:.4}}`}</style>
    </div>
  );
}
export function PaliBubble({text,mood="idle",speaking,onSpeak}) {
  return (
    <div style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
      <Pali mood={mood} speaking={speaking} size={42}/>
      <div style={{flex:1,background:"#2D2D2D",border:`1.5px solid #444`,borderRadius:"0 18px 18px 18px",padding:"12px 14px",display:"flex",flexDirection:"column",gap:"8px"}}>
        <div style={{fontSize:"11px",fontWeight:"800",color:"#FFD600",letterSpacing:"1px"}}>CHAMP</div>
        <div style={{fontSize:"14px",color:"#F0F0F0",lineHeight:"1.75"}}>{text}</div>
        {onSpeak&&(
          <button onClick={onSpeak} style={{alignSelf:"flex-start",background:speaking?C.greenSoft:C.accentSoft,border:`1px solid ${speaking?C.green+"44":C.accent+"44"}`,borderRadius:"10px",padding:"6px 13px",cursor:"pointer",fontSize:"13px",fontWeight:"700",color:speaking?C.green:C.accentHover,display:"flex",alignItems:"center",gap:"6px"}}>
            <span>{speaking?"🔊":"▶"}</span><span>{speaking?"Playing…":"🔁 Replay"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
export function PBtn({children,onClick,disabled,col,style={}}) {
  const bg = disabled
    ? `linear-gradient(135deg,${C.dimmed},${C.dimmed})`
    : col
      ? `linear-gradient(135deg,${col},${col}CC)`
      : `linear-gradient(135deg,${C.accent},#FF8C54)`;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background:bg, border:"none", borderRadius:"18px", padding:"17px",
      cursor:disabled?"not-allowed":"pointer", fontSize:"15px", fontWeight:"800",
      color:disabled?C.muted:"#fff", width:"100%", transition:"all .25s ease",
      boxShadow:disabled?"none":`0 6px 28px ${col||C.accent}44`,
      letterSpacing:".3px",
      ...style
    }}>{children}</button>
  );
}
export function GBtn({children,onClick,style={}}) {
  return <button onClick={onClick} style={{background:"transparent",border:`1.5px solid ${C.border}`,borderRadius:"14px",padding:"12px 18px",cursor:"pointer",fontSize:"14px",fontWeight:"600",color:C.muted,alignSelf:"flex-start",...style}}>{children}</button>;
}
export function QuotaOverlay({onClose}) {
  return (
    <div style={{position:"absolute",inset:0,background:"#000D",zIndex:99,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"18px",padding:"32px",borderRadius:"44px"}}>
      <div style={{fontSize:"48px"}}>⏳</div>
      <div style={{fontSize:"20px",fontWeight:"800",color:C.text,textAlign:"center"}}>Pali needs a breather!</div>
      <div style={{fontSize:"14px",color:C.muted,textAlign:"center",lineHeight:"1.7"}}>AI rate limit hit. Wait a minute and try again.</div>
      <PBtn onClick={onClose}>Got it!</PBtn>
    </div>
  );
}
export function TopBar({pct,xp,level,streak,gems,onBack,label}) {
  return (
    <div style={{padding:"20px 22px 0",display:"flex",flexDirection:"column",gap:"10px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{fontSize:"14px",fontWeight:"800",letterSpacing:"1.5px",color:C.accentHover}}>PASSION<span style={{color:C.accent}}>AI</span></div>
        {onBack&&<button onClick={onBack} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:"20px",color:C.muted,padding:"4px 8px"}}>←</button>}
      </div>
      <div style={{height:"4px",background:C.surface,borderRadius:"99px",overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct||0}%`,background:`linear-gradient(90deg,${C.accent},#818CF8)`,borderRadius:"99px",transition:"width .5s ease"}}/>
      </div>
      {xp!==undefined&&<StatsRow xp={xp} level={level} streak={streak} gems={gems}/>}
      {label&&<div style={{fontSize:"12px",color:C.muted,fontWeight:"600",letterSpacing:".3px"}}>{label}</div>}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
