import React, { useState } from "react";
import { DIFFICULTIES } from "../../data/curriculum";
import { C } from "../../styles/theme";
import { TopBar, PBtn } from "../common/UI";
import { CharacterSpeech } from "../CharacterSpeech";

export function DifficultyPicker({passion,topic,gameState,onSelect,onBack}) {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column"}}>
      <TopBar pct={60} xp={gameState.xp} level={gameState.level} streak={gameState.streak} gems={gameState.gems} onBack={onBack}/>
      <div style={{flex:1,padding:"16px 22px 28px",display:"flex",flexDirection:"column",gap:"18px",overflowY:"auto"}}>
        <CharacterSpeech passionId={passion} text={`Aight bro, challenge time on ${topic}! Pick your difficulty — no cap, go as hard as you can!`}/>

        <div style={{display:"flex",flexDirection:"column",gap:"2px"}}>
          <div style={{fontSize:"22px",fontWeight:"900",color:C.text}}>Choose Difficulty</div>
          <div style={{fontSize:"13px",color:C.muted}}>Higher = more XP earned</div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          {DIFFICULTIES.map(d=>(
            <button key={d.id} onClick={()=>setSelected(d.id)}
              style={{background:selected===d.id?`${d.color}18`:C.surface,border:`2px solid ${selected===d.id?d.color:C.border}`,borderRadius:"20px",padding:"18px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:"16px",transition:"all .2s",transform:selected===d.id?"scale(1.02)":"scale(1)"}}>
              <div style={{width:"52px",height:"52px",borderRadius:"16px",background:`${d.color}22`,border:`2px solid ${d.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px",flexShrink:0}}>
                {d.emoji}
              </div>
              <div style={{flex:1,textAlign:"left"}}>
                <div style={{fontSize:"17px",fontWeight:"800",color:selected===d.id?d.color:C.text}}>{d.label}</div>
                <div style={{fontSize:"12px",color:C.muted,marginTop:"3px",lineHeight:"1.4"}}>{d.desc}</div>
              </div>
              <div style={{background:`${d.color}22`,border:`1px solid ${d.color}44`,borderRadius:"10px",padding:"4px 10px",fontSize:"12px",fontWeight:"800",color:d.color,flexShrink:0}}>
                +{d.xp} XP
              </div>
            </button>
          ))}
        </div>

        <PBtn disabled={!selected} col={selected?DIFFICULTIES.find(d=>d.id===selected)?.color:null}
          onClick={()=>onSelect(selected)}>
          Start {selected?DIFFICULTIES.find(d=>d.id===selected)?.label:""} Challenge →
        </PBtn>
      </div>
    </div>
  );
}
