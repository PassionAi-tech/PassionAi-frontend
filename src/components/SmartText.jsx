import React from "react";

export function SmartText({text, style={}}) {
  if (!text) return null;
  
  // Split into lines and render each with smart formatting
const lines = text
  .replace(/\r/g, "")
  .split(/\n+/)
  .flatMap(line =>
    line.split(/(?<=[.!?])\s+(?=[A-Z])/)
  );
  
  return (
    <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    ...style,
  }}
>
      {lines.map((line,i) => {
        if (!line.trim()) return null;
        
        // Formula line — contains = and math symbols
        const isFormula = /[=÷×√²³π]/.test(line) || /formula|Formula/.test(line) || line.includes("=");
        // Step line — starts with Step or number
        const isStep = /^(Step \d|[1-9]\.|→|•)/.test(line.trim());
        // Warning/mistake line
        const isWarning = /mistake|wrong|error|❌|⚠️|don't|never/i.test(line);
        // Answer line
        const isAnswer = /answer|result|=\s*\d|∴|therefore/i.test(line);

        if (isFormula && line.length < 60) {
          return (
            <div key={i} style={{
              background:"#1A1200",border:"1.5px solid #D4A01766",
              borderRadius:"10px",padding:"8px 14px",
              fontFamily:"monospace",fontSize:"14px",fontWeight:"700",
              color:"#FFD600",textAlign:"center",letterSpacing:"0.5px",
            }}>
              {line.trim()}
            </div>
          );
        }
        if (isStep) {
          return (
            <div key={i} style={{display:"flex",gap:"8px",alignItems:"flex-start"}}>
              <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#FF6B2B",marginTop:"6px",flexShrink:0}}/>
              <span style={{fontSize:"15px",color:"#BCC5E8",lineHeight:"1.7"}}>{line.trim()}</span>
            </div>
          );
        }
        if (isWarning) {
          return (
            <div key={i} style={{
              background:"#EF444412",border:"1px solid #EF444433",
              borderRadius:"8px",padding:"6px 12px",
              fontSize:"13px",color:"#EF4444",fontWeight:"600",lineHeight:"1.6",
            }}>
              {line.trim()}
            </div>
          );
        }
        if (isAnswer) {
          return (
            <div key={i} style={{
              background:"#22C97A18",border:"1.5px solid #22C97A44",
              borderRadius:"8px",padding:"6px 12px",
              fontSize:"14px",color:"#22C97A",fontWeight:"800",
            }}>
              {line.trim()}
            </div>
          );
        }
        return (
          <p key={i} style={{margin:0,fontSize:"13px",color:"#BCC5E8",lineHeight:"1.75"}}>
            {line.trim()}
          </p>
        );
      })}
    </div>
  );
}

