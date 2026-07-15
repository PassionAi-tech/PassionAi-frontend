import React from "react";
import { DIFFICULTIES } from "../data/curriculum";
import { C } from "../styles/theme";
import { StatsRow, PaliBubble, PBtn } from "./UI";

export function ResultsScreen({score,total,difficulty,topic,onContinue,gameState}) {
  const diffData = DIFFICULTIES.find(d=>d.id===difficulty)||DIFFICULTIES[0];
  const pct      = Math.round((score/total)*100);
  const xpEarned = score * diffData.xp;
  const grade    = pct>=80?"🏆 Outstanding!":pct>=60?"⭐ Good job!":pct>=40?"💪 Keep going!":"📖 Review & retry!";
  return (
    <div style={{flex:1,padding:"22px 22px 28px",display:"flex",flexDirection:"column",gap:"18px",overflowY:"auto"}}>
      <StatsRow xp={gameState.xp} level={gameState.level} streak={gameState.streak} gems={gameState.gems}/>
      <div style={{textAlign:"center",display:"flex",flexDirection:"column",gap:"10px",animation:"fadeUp .5s ease"}}>
        <div style={{fontSize:"56px"}}>{pct>=80?"🎉":pct>=60?"⭐":"💪"}</div>
        <div style={{fontSize:"24px",fontWeight:"900",color:C.text}}>{grade}</div>
        <div style={{fontSize:"14px",color:C.muted}}>{diffData.emoji} {diffData.label} · {score} of {total} correct</div>
      </div>

      <div style={{background:C.surface,border:`2px solid ${diffData.color}44`,borderRadius:"22px",padding:"20px",display:"flex",flexDirection:"column",gap:"14px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:"14px",color:C.muted,fontWeight:"600"}}>Accuracy</span>
          <span style={{fontSize:"22px",fontWeight:"900",color:pct>=80?C.green:pct>=60?C.gold:C.red}}>{pct}%</span>
        </div>
        <div style={{height:"10px",background:C.border,borderRadius:"99px",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:pct>=80?`linear-gradient(90deg,${C.green},#34D399)`:pct>=60?`linear-gradient(90deg,${C.gold},#FCD34D)`:`linear-gradient(90deg,${C.red},#F87171)`,borderRadius:"99px",transition:"width .8s ease"}}/>
        </div>
        <div style={{background:C.accentSoft,border:`1px solid ${C.accent}44`,borderRadius:"12px",padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:"14px",color:C.accentHover,fontWeight:"700"}}>XP Earned</span>
          <span style={{fontSize:"20px",fontWeight:"900",color:C.accent}}>+{xpEarned} ⚡</span>
        </div>
      </div>

      <PaliBubble text={pct>=80?`LEGENDARY on ${topic}! Now let's see how this applies in real life — Mastery awaits! 🌍`:`Great effort! Every attempt makes you stronger. Mastery is next — let's see ${topic} in the real world! 💪`} mood={pct>=80?"cheer":"fire"}/>

      <PBtn col={C.green} onClick={()=>onContinue(xpEarned)}>Go to Mastery 🌍</PBtn>
    </div>
  );
}

