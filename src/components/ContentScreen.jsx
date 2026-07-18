import React, { useState, useEffect } from "react";
import { useTTS } from "../hooks/useTTS";
import { PASSIONS, UNIT_STAGES, UNIT_ICONS } from "../data/curriculum";
import { C, UNIT_COLORS, cardAccents } from "../styles/theme";
import { QuotaOverlay, TopBar, PBtn, GBtn, Pali } from "./UI";
import { SmartText } from "./SmartText";

export function ContentScreen({passion,subject,topic,cls,stage,fetchFn,fallbackFn,onComplete,onBack,gameState,completedStages,passionId}) {
  const [pages,   setPages]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [quota,   setQuota]   = useState(false);
  const [idx,     setIdx]     = useState(0);
  const [visible, setVisible] = useState(false);
  const {speak,stop,speaking} = useTTS();
  const pLabel  = PASSIONS.find(p=>p.id===passion)?.label||passion;
  const stageIdx= UNIT_STAGES.indexOf(stage);
  const col     = UNIT_COLORS[stageIdx]||C.accent;

  useEffect(()=>{
    let cancelled = false;
    setLoading(true);
    console.log(`%c[ContentScreen] Starting fetch for stage="${stage}" topic="${topic}" passion="${passion}"`, "color:#FF6B2B;font-weight:bold");

    // Always fall back after 10 seconds so loading never hangs
    const fallbackTimer = setTimeout(() => {
      if (!cancelled) {
        console.error("%c[ContentScreen] 10s TIMEOUT — AI call never resolved in time, using generic fallback content", "color:#EF4444;font-weight:bold;font-size:13px");
        const fb = fallbackFn(topic, pLabel);
        setPages(fb.pages||[]);
        setIdx(0); setLoading(false);
        setTimeout(()=>setVisible(true),120);
      }
    }, 60000);
    (async()=>{
      let res = await fetchFn(passion,subject,topic,cls);
      if (cancelled) return;
      clearTimeout(fallbackTimer);
      if (!res || res.error) {
        console.error(
          "%c[ContentScreen] AI GENERATION FAILED — falling back to generic hardcoded content. This is why the lesson looks unpersonalized.",
          "color:#EF4444;font-weight:bold;font-size:13px",
          { reason: res?.quota ? "quota/rate-limit" : res?.status ? `HTTP ${res.status}` : res===null ? "fetch threw / network or auth failure" : "unknown", details: res }
        );
        if (res?.quota) setQuota(true);
        res = fallbackFn(topic, pLabel);
      } else {
        console.log("%c[ContentScreen] AI generation SUCCEEDED — using real personalized content", "color:#22C97A;font-weight:bold");
      }
      setPages(res.pages||[]);
      setIdx(0); setLoading(false);
      setTimeout(()=>setVisible(true),120);
    })();
    return () => { cancelled = true; clearTimeout(fallbackTimer); };
  },[]);

  const cur    = pages?.[idx];
  const cardCol= cardAccents[idx%cardAccents.length];
  const isLast = pages&&idx===pages.length-1;
  // Auto-read card body only ONCE when card changes — not Champ dialogue
  const spokenRef = useRef(-1);
  useEffect(()=>{
    if (!pages || !pages[idx] || loading) return;
    if (spokenRef.current === idx) return; // don't repeat same card
    spokenRef.current = idx;
    const t = setTimeout(()=>{
    }, 700);
    return ()=>clearTimeout(t);
  },[idx, pages, loading]);

  const goNext = ()=>{ stop(); setVisible(false); setTimeout(()=>{ setIdx(i=>i+1); setVisible(true); },220); };
  const goPrev = ()=>{ stop(); setVisible(false); setTimeout(()=>{ setIdx(i=>i-1); setVisible(true); },220); };

  const nextLabel = {
    Introduction:"Go to Deep Dive 🔍",
    "Deep Dive":"Go to Challenge ⚔️",
    Mastery:"Complete! 🏆",
  }[stage]||"Next →";

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",position:"relative"}}>
      {quota&&<QuotaOverlay onClose={()=>setQuota(false)}/>}
      <TopBar pct={pages?((idx+1)/pages.length)*100:0} xp={gameState.xp} level={gameState.level} streak={gameState.streak} gems={gameState.gems}
        label={`${UNIT_ICONS[stageIdx]} ${stage} · Page ${idx+1}${pages?` of ${pages.length}`:""}`} onBack={()=>{stop();onBack();}}/>

      <div style={{flex:1,padding:"14px 22px 22px",display:"flex",flexDirection:"column",gap:"14px",overflowY:"auto"}}>
        {/* dot progress */}
        {pages&&pages.length>0&&(
          <div style={{display:"flex",gap:"5px"}}>
            {pages.map((_,i)=>(
              <div key={i} style={{height:"5px",flex:1,borderRadius:"99px",background:i<=idx?col:C.border,transition:"background .4s"}}/>
            ))}
          </div>
        )}

        {loading&&(
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"16px"}}>
            <div style={{fontSize:"44px",animation:"spin 1.2s linear infinite"}}>⚙️</div>
            <div style={{fontSize:"14px",color:C.muted,textAlign:"center",lineHeight:"1.7"}}>
              Champ is preparing your {stage} lesson<br/>using your love of {pLabel}…
            </div>
            <div style={{fontSize:"12px",color:C.dimmed}}>Longer lessons may take a moment</div>
          </div>
        )}

        {!loading&&cur&&(
          <>


            {/* card */}
            <div style={{background:`${cardCol}0D`,border:`2px solid ${cardCol}44`,borderRadius:"22px",padding:"18px",display:"flex",flexDirection:"column",gap:"10px",
              opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(16px)",transition:"opacity .4s ease,transform .4s ease"}}>
              <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                <span style={{fontSize:"28px"}}>{cur.emoji}</span>
                <span style={{fontSize:"17px",fontWeight:"800",color:C.text,lineHeight:1.3}}>{cur.title}</span>
              </div>
              <SmartText text={cur.body}/>
            </div>

            <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#2D2D2D",
    border: "1px solid #444",
    borderRadius: "16px",
    padding: "12px 16px",
  }}
>
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <Pali speaking={speaking} size={42} />

    <div>
      <div
        style={{
          fontWeight: 800,
          color: "#FFD600",
          fontSize: "13px",
        }}
      >
        CHAMP
      </div>

      <div
        style={{
          fontSize: "13px",
          color: "#BCC5E8",
        }}
      >
        Tap below to listen to this lesson.
      </div>
    </div>
  </div>

  <button
    onClick={() =>
      speaking
        ? stop()
        : speak(`${cur.title}. ${cur.body}`)
    }
    style={{
      background: speaking ? "#22C97A" : "#FF6B2B",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      padding: "10px 16px",
      cursor: "pointer",
      fontWeight: "700",
      transition: "0.2s",
    }}
  >
    {speaking ? "🔊 Playing..." : "▶ Listen"}
  </button>
</div>

            <div style={{display:"flex",gap:"10px"}}>
              {idx>0&&<GBtn onClick={goPrev} style={{flex:1,textAlign:"center"}}>← Prev</GBtn>}
              {isLast
                ? <PBtn col={col} style={{flex:2}} onClick={()=>{stop();onComplete();}}>{nextLabel}</PBtn>
                : <PBtn style={{flex:2}} onClick={goNext}>Next →</PBtn>
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
}
