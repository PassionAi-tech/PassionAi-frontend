import React, { useState, useEffect, useRef } from "react";
import { useTTS } from "../hooks/useTTS";
import { PASSIONS, DIFFICULTIES } from "../data/curriculum";
import { C } from "../styles/theme";
import { QuotaOverlay, TopBar, PBtn, GBtn } from "../UI";
import { CharacterSpeech } from "../CharacterSpeech";
import { callAI, fetchChallenge, FB_CHALLENGE } from "../services/api";

export function ChallengeScreen({passion,subject,topic,cls,difficulty,gameState,onComplete,onBack}) {
  const [questions, setQuestions] = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [quota,     setQuota]     = useState(false);
  const [qIdx,      setQIdx]      = useState(0);
  const [answer,    setAnswer]    = useState("");
  const [hint,      setHint]      = useState(false);
  const [feedback,  setFeedback]  = useState(null);
  const [fbLoading, setFbLoading] = useState(false);
  const [score,     setScore]     = useState(0);
  const {speak,stop,speaking}     = useTTS();
  const pLabel   = PASSIONS.find(p=>p.id===passion)?.label||passion;
  const diffData = DIFFICULTIES.find(d=>d.id===difficulty)||DIFFICULTIES[0];

  useEffect(()=>{
    let cancelled = false;
    const fallbackTimer = setTimeout(() => {
      if (!cancelled) { setQuestions(FB_CHALLENGE(topic).questions||[]); setLoading(false); }
    }, 10000);
    (async()=>{
      let res = await fetchChallenge(passion,subject,topic,cls,difficulty);
      if (cancelled) return;
      clearTimeout(fallbackTimer);
      if (!res||res.quota) { if(res?.quota) setQuota(true); res=FB_CHALLENGE(topic); }
      setQuestions(res.questions||[]);
      setLoading(false);
    })();
    return () => { cancelled = true; clearTimeout(fallbackTimer); };
  },[]);

  const cur    = questions?.[qIdx];
  const totalQ = questions?.length||5;

  // Auto-read question ONCE when it appears
  const spokenQRef = useRef(-1);
  useEffect(()=>{
    if (!cur || loading) return;
    if (spokenQRef.current === qIdx) return;
    spokenQRef.current = qIdx;
    const t = setTimeout(()=>{
      speak(cur.question);
    }, 500);
    return ()=>clearTimeout(t);
  },[qIdx, cur, loading]);

  const submit = async()=>{
    if (!answer.trim()) return;
    setFbLoading(true);
    let fb;
    try {
      const res = await callAI(`You are Champ, a 16-year-old who loves ${pLabel} and is brilliant at ${topic}. The student just answered a ${pLabel}-themed question.
Student answered: "${answer}". Correct answer: "${cur.answer}". Question: "${cur.question}".
THE RULE: Your feedback must use ${pLabel} context. If wrong, use a ${pLabel} analogy to explain the correct method. If correct, celebrate with a ${pLabel} reference.
Return ONLY valid JSON, no markdown:
{"correct":true or false,"energy":"LEGENDARY! 🔥 or Close one! 💪","message":"2 sentences. If correct: hype using ${pLabel}. If wrong: use ${pLabel} scenario to explain the correct method clearly. Casual teen tone. No new questions."}`,200,passion,topic);
      if (!res||res.quota) throw new Error();
      fb = res;
    } catch {
      const ok = cur.answer==="open"||answer.trim().toLowerCase().replace(/\s/g,"").includes(cur.answer.toLowerCase().replace(/[^a-z0-9]/g,""));
      fb={correct:ok,energy:ok?"LEGENDARY! 🔥":"Close! Let's learn! 💪",message:ok?cur.explanation:`The correct answer is: ${cur.answer}. ${cur.explanation}`};
    }
    if (fb.correct) setScore(s=>s+1);
    setFeedback(fb);
    setFbLoading(false);
    setTimeout(()=>speak(`${fb.energy} ${fb.message}`),300);
  };

  const nextQ = ()=>{
    stop();
    const newScore = score+(feedback?.correct?1:0);
    if (qIdx<totalQ-1) { setQIdx(i=>i+1); setAnswer(""); setHint(false); setFeedback(null); }
    else onComplete(newScore, totalQ);
  };

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",position:"relative"}}>
      {quota&&<QuotaOverlay onClose={()=>setQuota(false)}/>}
      <TopBar pct={questions?((qIdx+1)/totalQ)*100:0}
        xp={gameState.xp} level={gameState.level} streak={gameState.streak} gems={gameState.gems}
        label={`⚔️ ${diffData.label} Challenge · Q${qIdx+1} of ${totalQ}`} onBack={()=>{stop();onBack();}}/>

      <div style={{flex:1,padding:"14px 22px 22px",display:"flex",flexDirection:"column",gap:"14px",overflowY:"auto"}}>
        {/* difficulty badge */}
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <div style={{background:`${diffData.color}18`,border:`1px solid ${diffData.color}44`,borderRadius:"10px",padding:"5px 14px",fontSize:"13px",fontWeight:"800",color:diffData.color}}>
            {diffData.emoji} {diffData.label}
          </div>
          <div style={{fontSize:"12px",color:C.muted}}>+{diffData.xp} XP per correct answer</div>
        </div>

        {loading&&(
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"14px"}}>
            <div style={{fontSize:"44px",animation:"spin 1.2s linear infinite"}}>⚙️</div>
            <div style={{fontSize:"14px",color:C.muted,textAlign:"center"}}>Building your {diffData.label} challenge…</div>
          </div>
        )}

        {!loading&&cur&&!feedback&&(
          <>
            {/* Character asks the question */}
            <CharacterSpeech passionId={passion} text={cur.question} speaking={speaking}
              forcepose={["explain","think"][qIdx%2]}
              onSpeak={()=>speaking?stop():speak(cur.question)}/>

            {hint&&(
              <div style={{background:C.goldSoft,border:`1px solid ${C.gold}44`,borderRadius:"14px",padding:"12px 16px",fontSize:"13px",color:C.gold,lineHeight:"1.6"}}>
                💡 {cur.hint}
              </div>
            )}

            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              <label style={{fontSize:"12px",color:C.muted,fontWeight:"700",letterSpacing:"1px"}}>YOUR ANSWER</label>
              <textarea rows={3} value={answer} onChange={e=>setAnswer(e.target.value)}
                style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:"16px",padding:"14px 16px",fontSize:"15px",color:C.text,width:"100%",outline:"none",boxSizing:"border-box",fontFamily:"inherit",resize:"none",lineHeight:"1.6"}}
                placeholder="Type your answer…"/>
            </div>

            <div style={{display:"flex",gap:"10px"}}>
              {!hint&&<GBtn onClick={()=>setHint(true)} style={{flex:1,textAlign:"center"}}>💡 Hint</GBtn>}
              <PBtn onClick={submit} disabled={!answer.trim()||fbLoading} style={{flex:2}}>
                {fbLoading?"Checking… ⚙️":"Submit →"}
              </PBtn>
            </div>
          </>
        )}

        {feedback&&cur&&(
          <div style={{display:"flex",flexDirection:"column",gap:"14px",animation:"fadeUp .4s ease"}}>
            <div style={{textAlign:"center",fontSize:"24px",fontWeight:"900",color:feedback.correct?C.green:C.gold,animation:"pop .4s ease"}}>
              {feedback.energy}
            </div>
            <CharacterSpeech passionId={passion} text={feedback.message} speaking={speaking}
              forcepose={feedback.correct?"cheer":"wrong"}
              onSpeak={()=>speaking?stop():speak(`${feedback.energy} ${feedback.message}`)}/>
            <div style={{background:C.accentSoft,border:`1px solid ${C.accent}44`,borderRadius:"12px",padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:"13px",color:C.muted,fontWeight:"600"}}>Score</span>
              <span style={{fontSize:"16px",fontWeight:"900",color:C.accent}}>{score+(feedback.correct?1:0)} / {qIdx+1}</span>
            </div>
            <PBtn col={diffData.color} onClick={nextQ}>
              {qIdx<totalQ-1?"Next Question →":"See Results 🏁"}
            </PBtn>
          </div>
        )}
      </div>
    </div>
  );
}
