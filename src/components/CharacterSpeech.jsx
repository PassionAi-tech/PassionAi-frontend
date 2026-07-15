import React, { useState, useEffect } from "react";
import { PassionCharacter } from "./Characters";
import { SmartText } from "./SmartText";

const POSES = ["explain","think","cheer","wrong"];
let poseCounter = 0;

function getNextPose() {
  const pose = POSES[poseCounter % POSES.length];
  poseCounter++;
  return pose;
}

export function CharacterSpeech({passionId, text, speaking, onSpeak, forcepose}) {
  const [pose, setPose] = useState(forcepose||"explain");

  useEffect(()=>{
    if (forcepose) { setPose(forcepose); return; }
    // rotate pose every render
    const poses = ["explain","think","cheer","explain"];
    setPose(poses[Math.floor(Math.random()*poses.length)]);
  },[text]);

  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:"0",width:"100%",marginBottom:"4px"}}>
      {/* character on left */}
      <div style={{flexShrink:0,marginBottom:"-4px"}}>
        <PassionCharacter passionId={passionId} pose={pose} size={120}/>
      </div>

      {/* speech bubble pointing left toward character */}
      <div style={{flex:1,position:"relative",marginLeft:"-8px",marginBottom:"20px"}}>
        {/* bubble tail */}
        <div style={{
          position:"absolute",left:"-10px",bottom:"18px",
          width:0,height:0,
          borderTop:"8px solid transparent",
          borderBottom:"8px solid transparent",
          borderRight:`10px solid #2D2D2D`,
        }}/>
        <div style={{
          background:"#2D2D2D",borderRadius:"0 18px 18px 18px",
          padding:"12px 14px",display:"flex",flexDirection:"column",gap:"8px",
          boxShadow:"0 4px 16px rgba(0,0,0,.15)",
        }}>
          <div style={{fontSize:"10px",fontWeight:"800",color:"#FFD600",letterSpacing:"1px"}}>CHAMP</div>
          <SmartText text={text}/>
          {onSpeak&&(
            <button onClick={onSpeak} style={{
              alignSelf:"flex-start",
              background:speaking?"#22C97A22":"#FF6B2B22",
              border:`1px solid ${speaking?"#22C97A44":"#FF6B2B44"}`,
              borderRadius:"8px",padding:"5px 11px",cursor:"pointer",
              fontSize:"11px",fontWeight:"700",
              color:speaking?"#22C97A":"#FF6B2B",
              display:"flex",alignItems:"center",gap:"5px",
            }}>
              <span>{speaking?"🔊":"▶"}</span>
              <span>{speaking?"Playing…":"Replay"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

