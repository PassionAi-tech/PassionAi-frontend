import React, { useState, useEffect, useCallback } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { RegisterScreen, LoginScreen, OnboardSyllabus, OnboardState, OnboardGrade, OnboardSubject, OnboardTopic, OnboardPassion } from "./components/Onboarding";
import { RoadmapScreen } from "./components/RoadmapScreen";
import { ContentScreen } from "./components/ContentScreen";
import { DifficultyPicker } from "./components/DifficultyPicker";
import { ChallengeScreen } from "./components/ChallengeScreen";
import { ResultsScreen } from "./components/ResultsScreen";
import { QuestsScreen } from "./components/QuestsScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { BottomNav } from "./components/BottomNav";
import { UNIT_STAGES, UNIT_XP } from "./data/curriculum";
import { fetchIntro, fetchDeepDive, fetchMastery, FB_INTRO, FB_DEEPDIVE, FB_MASTERY } from "./services/api";
import { C } from "./styles/theme";

export default function PassionAI() {
  const [screen,     setScreen]     = useState("register");
  const [username,   setUsername]   = useState("");
  const [password,   setPassword]   = useState("");
  const [confirm,    setConfirm]    = useState("");
  const [activeTab,  setActiveTab]  = useState("home");
  const [isLoading,  setIsLoading]  = useState(false);
  const [error,      setError]      = useState(null);
  const [syllabus,   setSyllabus]   = useState(null);
  const [state,      setState]      = useState(null);
  const [grade,      setGrade]      = useState(null);
  const [subject,    setSubject]    = useState(null);
  const [topic,      setTopic]      = useState(null);
  const [passion,    setPassion]    = useState(null);
  const [stage,      setStage]      = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [score,      setScore]      = useState(0);
  const [totalQ,     setTotalQ]     = useState(5);
  const [gameState,  setGameState]  = useState({xp:0,level:1,streak:1,gems:5});
  const [completed,  setCompleted]  = useState([]);

  /** Save game state to localStorage */
  const saveGameState = useCallback((state) => {
    try {
      localStorage.setItem("passionAI_gameState", JSON.stringify(state));
    } catch (err) {
      console.error("Save to localStorage failed:", err);
    }
  }, []);

  /** Load game state from localStorage */
  const loadGameState = useCallback(() => {
    try {
      const saved = localStorage.getItem("passionAI_gameState");
      return saved ? JSON.parse(saved) : null;
    } catch (err) {
      console.error("Load from localStorage failed:", err);
      return null;
    }
  }, []);

  // Load saved game state on app start
  useEffect(() => {
    const saved = loadGameState();
    if (saved) setGameState(saved);
  }, []);

  // Persist game state whenever it changes
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState, saveGameState]);

  /** Add XP and handle level ups */
  const addXP = amt => setGameState(g => {
    const nx=g.xp+amt, th=g.level*300;
    return nx>=th ? {...g,xp:nx-th,level:g.level+1,gems:g.gems+5} : {...g,xp:nx};
  });
  const markDone = (s, extraFn) => setCompleted(c => {
    const nc = c.includes(s)?c:[...c,s];
    if (nc.length>=3) setGameState(g=>({...g,gems:g.gems+10,streak:g.streak+1}));
    if (extraFn) extraFn(nc);
    return nc;
  });

  const onboardScreens = syllabus==="ssc"
    ? ["syllabus","state","grade","subject","topic","passion"]
    : ["syllabus","grade","subject","topic","passion"];
  const isOnboard      = onboardScreens.includes(screen);
  const onboardPct     = ((onboardScreens.indexOf(screen)+1)/onboardScreens.length)*100;

  return (
    <ErrorBoundary>
    <div style={{minHeight:"100vh",background:"#FDF8F3",display:"flex",justifyContent:"center",alignItems:"center",fontFamily:"'Sora','DM Sans','Segoe UI',sans-serif",padding:"20px"}}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
      <div style={{width:"100%",maxWidth:"390px",minHeight:"820px",background:"#FFFFFF",borderRadius:"44px",border:`1.5px solid ${C.border}`,boxShadow:"0 2px 0 1.5px #F0D060,0 20px 60px rgba(0,0,0,.10),0 8px 32px rgba(212,160,23,.18)",overflow:"hidden",display:"flex",flexDirection:"column",position:"relative"}}>

        {isOnboard&&screen!=="login"&&(
          <div style={{padding:"20px 22px 0",display:"flex",flexDirection:"column",gap:"8px"}}>
            <div style={{fontSize:"14px",fontWeight:"800",letterSpacing:"1.5px",color:C.accentHover}}>PASSION<span style={{color:C.accent}}>AI</span></div>
            <div style={{height:"4px",background:C.surface,borderRadius:"99px",overflow:"hidden"}}>
              <div style={{height:"100%",width:`${onboardPct}%`,background:`linear-gradient(90deg,${C.accent},#D4A017)`,borderRadius:"99px",transition:"width .5s ease"}}/>
            </div>
            <div style={{fontSize:"11px",color:C.muted,fontWeight:"600"}}>Step {onboardScreens.indexOf(screen)+1} of {onboardScreens.length}</div>
          </div>
        )}

        {screen==="register" && <RegisterScreen username={username} setUsername={setUsername} password={password} setPassword={setPassword} confirm={confirm} setConfirm={setConfirm} onNext={()=>setScreen("syllabus")} onLogin={()=>setScreen("login")}/>}
        {screen==="login"    && <LoginScreen username={username} setUsername={setUsername} password={password} setPassword={setPassword} onNext={()=>setScreen("syllabus")} onRegister={()=>setScreen("register")}/>}
        {screen==="syllabus" && <OnboardSyllabus onNext={s=>{setSyllabus(s); if(s==="ssc") setScreen("state"); else setScreen("grade");}}/>}
        {screen==="state"    && <OnboardState onNext={st=>{setState(st);setScreen("grade");}} onBack={()=>setScreen("syllabus")}/>}
        {screen==="grade"    && <OnboardGrade syllabus={syllabus} onNext={g=>{setGrade(g);setScreen("subject");}} onBack={()=>{ if(syllabus==="ssc") setScreen("state"); else setScreen("syllabus"); }}/>}
        {screen==="subject"  && <OnboardSubject syllabus={syllabus} state={state} grade={grade} onNext={s=>{setSubject(s);setScreen("topic");}} onBack={()=>setScreen("grade")}/>}
        {screen==="topic"    && <OnboardTopic syllabus={syllabus} state={state} grade={grade} subject={subject} onNext={t=>{setTopic(t);setCompleted([]);setScreen("passion");}} onBack={()=>setScreen("subject")}/>}
        {screen==="passion"  && <OnboardPassion syllabus={syllabus} onNext={p=>{setPassion(p);setScreen("roadmap");}} onBack={()=>setScreen("topic")}/>}

        {activeTab==="home" && screen==="roadmap"  && (
          <RoadmapScreen passion={passion} subject={subject} topic={topic} gameState={gameState} completed={completed}
            onStage={s=>{
              setStage(s);
              if (s==="Challenge") setScreen("difficulty");
              else { setScreen("content"); }
            }}
            onBack={()=>setScreen("passion")}/>
        )}

        {/* Introduction & Deep Dive */}
        {activeTab==="home" && screen==="content" && (stage==="Introduction"||stage==="Deep Dive") && (
          <ContentScreen passion={passion} subject={subject} topic={topic} cls={grade} stage={stage} passionId={passion}
            fetchFn={stage==="Introduction"?fetchIntro:fetchDeepDive}
            fallbackFn={stage==="Introduction"?FB_INTRO:FB_DEEPDIVE}
            gameState={gameState} completedStages={completed}
            onComplete={()=>{
              addXP(UNIT_XP[UNIT_STAGES.indexOf(stage)]);
              markDone(stage);
              setScreen("roadmap");
            }}
            onBack={()=>setScreen("roadmap")}/>
        )}

        {/* Mastery */}
        {activeTab==="home" && screen==="content" && stage==="Mastery" && (
          <ContentScreen passion={passion} subject={subject} topic={topic} cls={grade} stage="Mastery" passionId={passion}
            fetchFn={fetchMastery} fallbackFn={FB_MASTERY}
            gameState={gameState} completedStages={completed}
            onComplete={()=>{
              addXP(UNIT_XP[3]);
              markDone("Mastery");
              setScreen("roadmap");
            }}
            onBack={()=>setScreen("roadmap")}/>
        )}

        {/* Challenge: difficulty picker */}
        {activeTab==="home" && screen==="difficulty" && (
          <DifficultyPicker passion={passion} topic={topic} gameState={gameState}
            onSelect={d=>{setDifficulty(d);setScreen("challenge");}}
            onBack={()=>setScreen("roadmap")}/>
        )}

        {/* Challenge: questions */}
        {activeTab==="home" && screen==="challenge" && (
          <ChallengeScreen passion={passion} subject={subject} topic={topic} cls={grade}
            difficulty={difficulty} gameState={gameState}
            onComplete={(s,t)=>{setScore(s);setTotalQ(t);setScreen("results");}}
            onBack={()=>setScreen("difficulty")}/>
        )}

        {/* Results */}
        {screen==="results" && (
          <ResultsScreen score={score} total={totalQ} difficulty={difficulty} topic={topic}
            gameState={gameState}
            onContinue={xp=>{
              addXP(xp);
              markDone("Challenge");
              setStage("Mastery");
              setScreen("content");
            }}/>
        )}

        {/* Tab screens */}
        {activeTab==="quests" && !isOnboard && !["login","register"].includes(screen) && (
          <QuestsScreen gameState={gameState} setGameState={setGameState} username={username}/>
        )}
        {activeTab==="profile" && !isOnboard && !["login","register"].includes(screen) && (
          <ProfileScreen
            username={username} gameState={gameState}
            syllabus={syllabus} grade={grade} subject={subject} passion={passion}
            onChangeSyllabus={()=>{ setActiveTab("home"); setScreen("syllabus"); }}
            onChangeClass={()=>{ setActiveTab("home"); setScreen("grade"); }}
            onChangeSubject={()=>{ setActiveTab("home"); setScreen("subject"); }}
          />
        )}

        {/* Bottom nav — only show after login */}
        {!isOnboard && !["login","register"].includes(screen) && (
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} setScreen={setScreen}/>
        )}
      </div>
    </div>
  </ErrorBoundary>
  );
}
