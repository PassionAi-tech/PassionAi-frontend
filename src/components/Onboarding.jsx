import React, { useState } from "react";
import { PASSIONS, SYLLABI, SSC_STATES, SSC_CURRICULUM, GRADES, CURRICULUM } from "../../data/curriculum";
import { C } from "../../styles/theme";
import { Pali, PaliBubble, PBtn, GBtn } from "../common/UI";

export function HeroHeader() {
  return (
    <div style={{
      background:"linear-gradient(160deg,#1A1200 0%,#2D1F00 40%,#1A1200 100%)",
      padding:"32px 24px 24px",position:"relative",overflow:"hidden",flexShrink:0,
    }}>
      <div style={{position:"absolute",top:"-40px",right:"-30px",width:"180px",height:"180px",background:"radial-gradient(circle,#D4A01740 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-20px",left:"-20px",width:"120px",height:"120px",background:"radial-gradient(circle,#FF6B2B30 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px",position:"relative"}}>
        <div style={{width:"46px",height:"46px",borderRadius:"14px",background:"linear-gradient(135deg,#D4A017,#FF6B2B)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px #D4A01760"}}>
          <span style={{fontSize:"22px"}}>🎓</span>
        </div>
        <div>
          <div style={{fontSize:"21px",fontWeight:"900",color:"#FFF8E1",letterSpacing:"-0.5px"}}>Passion<span style={{color:"#D4A017"}}>AI</span></div>
          <div style={{fontSize:"10px",color:"#9A8040",fontWeight:"700",letterSpacing:"1.2px"}}>LEARN THROUGH WHAT YOU LOVE</div>
        </div>
      </div>
      <div style={{display:"flex",gap:"14px",alignItems:"flex-start",position:"relative"}}>
        <Pali mood="cheer" size={58}/>
        <div style={{flex:1}}>
          <div style={{fontSize:"24px",fontWeight:"900",color:"#FFF8E1",lineHeight:1.2,letterSpacing:"-0.5px"}}>
            Learn smarter,<br/><span style={{color:"#D4A017"}}>not harder.</span> 🔥
          </div>
          <div style={{fontSize:"12px",color:"#9A8040",marginTop:"7px",lineHeight:1.6}}>
            AI lessons through your passion — football, music, gaming and more.
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:"7px",marginTop:"16px",flexWrap:"wrap",position:"relative"}}>
        {["🎯 Personalised","🔊 Voice","⚔️ Challenges","🏆 XP"].map(f=>(
          <div key={f} style={{background:"#D4A01718",border:"1px solid #D4A01740",borderRadius:"99px",padding:"4px 10px",fontSize:"10px",fontWeight:"700",color:"#D4A017"}}>{f}</div>
        ))}
      </div>
    </div>
  );
}

// ── shared field component ──
export function AuthField({icon,label,value,onChange,type="text",placeholder,onKeyDown,focused,onFocus,onBlur,valid,rightEl}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
      <label style={{fontSize:"11px",fontWeight:"800",color:C.muted,letterSpacing:"1px"}}>{label}</label>
      <div style={{
        display:"flex",alignItems:"center",gap:"10px",background:"#FFFFFF",
        border:`2px solid ${focused?C.accent:valid?C.accent+"66":C.border}`,
        borderRadius:"16px",padding:"13px 15px",transition:"all .2s",
        boxShadow:focused?`0 0 0 4px ${C.accent}12`:"none",
      }}>
        <span style={{fontSize:"17px"}}>{icon}</span>
        <input value={value} onChange={onChange} type={type} placeholder={placeholder}
          onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown}
          style={{flex:1,border:"none",outline:"none",fontSize:"14px",fontWeight:"600",color:C.text,background:"transparent",fontFamily:"inherit"}}/>
        {rightEl||null}
        {valid&&!rightEl&&<span style={{fontSize:"15px",color:C.green}}>✓</span>}
      </div>
    </div>
  );
}

// ── shared auth button ──
export function AuthBtn({canSubmit,onClick,activeLabel,inactiveLabel}) {
  return (
    <button onClick={()=>{ if(canSubmit) onClick(); }}
      style={{
        width:"100%",padding:"17px",borderRadius:"18px",border:"none",
        cursor:canSubmit?"pointer":"not-allowed",fontFamily:"inherit",
        fontSize:"15px",fontWeight:"800",letterSpacing:".3px",transition:"all .3s ease",
        background:canSubmit?"linear-gradient(135deg,#D4A017,#FF6B2B)":"linear-gradient(135deg,#5C3D00,#4A2D00)",
        color:canSubmit?"#fff":"#8B6914",
        boxShadow:canSubmit?"0 8px 32px #D4A01750":"none",
      }}>
      {canSubmit?activeLabel:inactiveLabel}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════
// REGISTER SCREEN (default first screen)
// ═══════════════════════════════════════════════════════════════════
export function RegisterScreen({username,setUsername,password,setPassword,confirm,setConfirm,onNext,onLogin}) {
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused,     setFocused]     = useState(null);
  const [error,       setError]       = useState("");

  const uValid  = username.trim().length>=3;
  const pValid  = password.length>=4;
  const cValid  = confirm===password&&confirm.length>=4;
  const canNext = uValid&&pValid&&cValid;

  const handleNext = () => {
    if (!uValid) { setError("Username must be at least 3 characters."); return; }
    if (!pValid) { setError("Password must be at least 4 characters."); return; }
    if (password!==confirm) { setError("Passwords don't match. Check again."); return; }
    // check if username already taken
    try {
      const existing = JSON.parse(localStorage.getItem("passionai_users")||"{}");
      if (existing[username.trim().toLowerCase()]) {
        setError("Username already taken. Pick a different one.");
        return;
      }
      // save new user
      existing[username.trim().toLowerCase()] = { username:username.trim(), password };
      localStorage.setItem("passionai_users", JSON.stringify(existing));
    } catch(e) {}
    setError("");
    onNext();
  };

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}>
      <HeroHeader/>
      <div style={{flex:1,padding:"22px 22px 28px",display:"flex",flexDirection:"column",gap:"14px",background:"#FFFBF0"}}>
        <div>
          <div style={{fontSize:"20px",fontWeight:"900",color:C.text}}>Create your account 🚀</div>
          <div style={{fontSize:"12px",color:C.muted,marginTop:"3px"}}>Set up your username and password to get started</div>
        </div>

        <AuthField icon="👤" label="USERNAME" value={username} onChange={e=>{setUsername(e.target.value);setError("");}}
          placeholder="Choose a username" valid={uValid}
          focused={focused==="u"} onFocus={()=>setFocused("u")} onBlur={()=>setFocused(null)}/>

        <AuthField icon="🔒" label="PASSWORD" value={password} onChange={e=>{setPassword(e.target.value);setError("");}}
          type={showPass?"text":"password"} placeholder="Choose a password" valid={pValid}
          focused={focused==="p"} onFocus={()=>setFocused("p")} onBlur={()=>setFocused(null)}
          rightEl={<button onClick={()=>setShowPass(s=>!s)} style={{background:"none",border:"none",cursor:"pointer",fontSize:"15px",padding:0}}>{showPass?"🙈":"👁️"}</button>}/>

        <AuthField icon="🔐" label="CONFIRM PASSWORD" value={confirm} onChange={e=>{setConfirm(e.target.value);setError("");}}
          type={showConfirm?"text":"password"} placeholder="Re-enter your password" valid={cValid}
          focused={focused==="c"} onFocus={()=>setFocused("c")} onBlur={()=>setFocused(null)}
          onKeyDown={e=>e.key==="Enter"&&handleNext()}
          rightEl={<button onClick={()=>setShowConfirm(s=>!s)} style={{background:"none",border:"none",cursor:"pointer",fontSize:"15px",padding:0}}>{showConfirm?"🙈":"👁️"}</button>}/>

        {error&&(
          <div style={{background:C.redSoft,border:`1px solid ${C.red}44`,borderRadius:"12px",padding:"10px 14px",fontSize:"13px",fontWeight:"700",color:C.red}}>
            {error}
          </div>
        )}

        {confirm&&password&&confirm!==password&&!error&&(
          <div style={{background:C.redSoft,border:`1px solid ${C.red}44`,borderRadius:"12px",padding:"10px 14px",fontSize:"13px",fontWeight:"700",color:C.red}}>
            ⚠️ Passwords don't match!
          </div>
        )}

        <AuthBtn canSubmit={canNext} onClick={handleNext} activeLabel="Create Account 🎉" inactiveLabel="Let's Go!"/>

        {/* divider */}
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <div style={{flex:1,height:"1px",background:C.border}}/>
          <div style={{fontSize:"12px",color:C.muted,fontWeight:"600"}}>or</div>
          <div style={{flex:1,height:"1px",background:C.border}}/>
        </div>

        {/* already have account */}
        <button onClick={onLogin} style={{
          width:"100%",padding:"15px",borderRadius:"16px",
          border:`2px solid ${C.border}`,background:"#FFFFFF",
          cursor:"pointer",fontFamily:"inherit",fontSize:"14px",fontWeight:"800",color:C.text,
          transition:"all .2s",
        }}>
          Login ➜
        </button>

        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"11px",color:C.dimmed,fontWeight:"600"}}>Made with ❤️ by PassionAI</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LOGIN SCREEN
// ═══════════════════════════════════════════════════════════════════
export function LoginScreen({username,setUsername,password,setPassword,onNext,onRegister}) {
  const [showPass, setShowPass] = useState(false);
  const [focused,  setFocused]  = useState(null);
  const [loginError, setLoginError] = useState("");
  const canEnter = username.trim().length>=3 && password.length>=4;

  const handleLogin = () => {
    setLoginError("");
    try {
      const existing = JSON.parse(localStorage.getItem("passionai_users")||"{}");
      const key = username.trim().toLowerCase();
      if (!existing[key]) {
        setLoginError("No user found with that username. New here? Sign up first.");
        return;
      }
      if (existing[key].password !== password) {
        setLoginError("Incorrect password. Try again.");
        return;
      }
    } catch(e) {}
    onNext();
  };

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}>
      <HeroHeader/>
      <div style={{flex:1,padding:"22px 22px 28px",display:"flex",flexDirection:"column",gap:"14px",background:"#FFFBF0"}}>
        <div>
          <div style={{fontSize:"20px",fontWeight:"900",color:C.text}}>Welcome back! 👋</div>
          <div style={{fontSize:"12px",color:C.muted,marginTop:"3px"}}>Sign in to continue your journey</div>
        </div>

        <AuthField icon="👤" label="USERNAME" value={username} onChange={e=>{setUsername(e.target.value);setLoginError("");}}
          placeholder="Enter your username" valid={username.length>=3}
          focused={focused==="u"} onFocus={()=>setFocused("u")} onBlur={()=>setFocused(null)}/>

        <AuthField icon="🔒" label="PASSWORD" value={password} onChange={e=>{setPassword(e.target.value);setLoginError("");}}
          type={showPass?"text":"password"} placeholder="Enter your password" valid={password.length>=4}
          focused={focused==="p"} onFocus={()=>setFocused("p")} onBlur={()=>setFocused(null)}
          onKeyDown={e=>e.key==="Enter"&&canEnter&&handleLogin()}
          rightEl={<button onClick={()=>setShowPass(s=>!s)} style={{background:"none",border:"none",cursor:"pointer",fontSize:"15px",padding:0}}>{showPass?"🙈":"👁️"}</button>}/>

        {loginError&&(
          <div style={{background:C.redSoft,border:`1px solid ${C.red}44`,borderRadius:"12px",padding:"10px 14px",fontSize:"13px",fontWeight:"700",color:C.red}}>
            {loginError}
          </div>
        )}

        <AuthBtn canSubmit={canEnter} onClick={handleLogin} activeLabel="Sign In 🚀" inactiveLabel="Let's Go!"/>

        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <div style={{flex:1,height:"1px",background:C.border}}/>
          <div style={{fontSize:"12px",color:C.muted,fontWeight:"600"}}>or</div>
          <div style={{flex:1,height:"1px",background:C.border}}/>
        </div>

        <button onClick={onRegister} style={{
          width:"100%",padding:"15px",borderRadius:"16px",
          border:`2px solid ${C.border}`,background:"#FFFFFF",
          cursor:"pointer",fontFamily:"inherit",fontSize:"14px",fontWeight:"800",color:C.text,
          transition:"all .2s",
        }}>
          New here? Create an account →
        </button>

        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"11px",color:C.dimmed,fontWeight:"600"}}>Made with ❤️ by PassionAI</div>
        </div>
      </div>
    </div>
  );
}

export function OnboardState({onNext,onBack}) {
  const [sel,setSel]=useState(null);
  const selected=SSC_STATES.find(s=>s.id===sel);
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}>
      <div style={{padding:"20px 22px 14px",background:`linear-gradient(180deg,#F0FFF4 0%,rgba(240,255,244,0) 100%)`}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
          <Pali mood="cheer" size={38}/>
          <div style={{fontSize:"13px",fontWeight:"700",color:"#16A34A"}}>SSC Board Selected 🎓</div>
        </div>
        <div style={{fontSize:"24px",fontWeight:"900",color:C.text,lineHeight:1.2}}>Pick your State 🇮🇳</div>
        <div style={{fontSize:"13px",color:C.muted,marginTop:"5px"}}>I'll load your exact state syllabus</div>
      </div>
      <div style={{flex:1,padding:"8px 16px 8px",overflowY:"auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
          {SSC_STATES.map(s=>{
            const isSel=sel===s.id;
            return (
              <button key={s.id} onClick={()=>setSel(s.id)} style={{
                background:isSel?"#16A34A18":"#FFFFFF",
                border:`2px solid ${isSel?"#16A34A":C.border}`,
                borderRadius:"18px",padding:"16px 10px",cursor:"pointer",
                display:"flex",flexDirection:"column",alignItems:"center",gap:"7px",
                transition:"all .2s",transform:isSel?"scale(1.04)":"scale(1)",
                boxShadow:isSel?"0 6px 20px #16A34A22":"0 2px 8px rgba(0,0,0,.04)",
              }}>
                <span style={{fontSize:"26px"}}>{s.emoji}</span>
                <span style={{fontSize:"11px",fontWeight:"800",color:isSel?"#16A34A":C.muted,textAlign:"center",letterSpacing:".2px"}}>{s.label}</span>
                {isSel&&<div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#16A34A",boxShadow:"0 0 6px #16A34A"}}/>}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{padding:"12px 22px 24px",display:"flex",flexDirection:"column",gap:"10px"}}>
        {selected&&(
          <div style={{background:"#16A34A12",border:"1px solid #16A34A33",borderRadius:"12px",padding:"10px 14px",display:"flex",alignItems:"center",gap:"10px"}}>
            <span style={{fontSize:"18px"}}>{selected.emoji}</span>
            <div style={{fontSize:"12px",fontWeight:"800",color:"#16A34A"}}>{selected.label} SSC Syllabus loaded!</div>
          </div>
        )}
        <PBtn disabled={!sel} col="#16A34A" onClick={()=>onNext(sel)}>
          {sel?`Continue with ${selected?.label} →`:"Pick your state first"}
        </PBtn>
        <GBtn onClick={onBack}>← Back</GBtn>
      </div>
    </div>
  );
}

export function OnboardSyllabus({onNext}) {
  const [sel,setSel]=useState(null);
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}>
      <div style={{padding:"24px 22px 18px",background:`linear-gradient(180deg,#FEF3E8 0%,rgba(253,248,243,0) 100%)`}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
          <Pali mood="cheer" size={42}/>
          <div>
            <div style={{fontSize:"13px",fontWeight:"700",color:C.accentHover}}>Hey! I'm Champ 👋</div>
            <div style={{fontSize:"11px",color:C.muted}}>Your AI study buddy</div>
          </div>
        </div>
        <div style={{fontSize:"26px",fontWeight:"900",color:C.text,lineHeight:1.2,letterSpacing:"-.5px"}}>Pick your Syllabus 📚</div>
        <div style={{fontSize:"13px",color:C.muted,marginTop:"6px"}}>I'll load the exact topics from your board</div>
      </div>
      <div style={{flex:1,padding:"16px 22px 0",display:"flex",flexDirection:"column",gap:"14px"}}>
        {SYLLABI.map(s=>{
          const isSel=sel===s.id;
          return (
            <button key={s.id} onClick={()=>setSel(s.id)} style={{
              background:isSel?`${s.color}12`:"#FFFFFF",
              border:`2px solid ${isSel?s.color:C.border}`,
              borderRadius:"22px",padding:"22px 20px",cursor:"pointer",
              display:"flex",alignItems:"center",gap:"16px",
              transition:"all .2s",boxShadow:isSel?`0 6px 24px ${s.color}22`:"0 2px 8px rgba(0,0,0,.06)",
              transform:isSel?"scale(1.02)":"scale(1)",
            }}>
              <div style={{width:"56px",height:"56px",borderRadius:"16px",background:isSel?`${s.color}18`:"#F5F5F5",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px",fontWeight:"900",
                color:isSel?s.color:C.muted,border:`2px solid ${isSel?s.color+"44":C.border}`,flexShrink:0}}>
                {s.id==="cbse"?"🎓":"🏫"}
              </div>
              <div style={{textAlign:"left",flex:1}}>
                <div style={{fontSize:"20px",fontWeight:"900",color:isSel?s.color:C.text}}>{s.label}</div>
                <div style={{fontSize:"12px",color:C.muted,marginTop:"3px",lineHeight:"1.4"}}>{s.desc}</div>
                <div style={{fontSize:"11px",fontWeight:"700",color:isSel?s.color:C.dimmed,marginTop:"4px"}}>
                  {s.id==="cbse"?"Maths · Science · English · Social Science":"Maths · Physics · Chemistry · Biology · more"}
                </div>
              </div>
              {isSel&&<div style={{fontSize:"22px"}}>✓</div>}
            </button>
          );
        })}
      </div>
      <div style={{padding:"20px 22px 28px"}}>
        <PBtn disabled={!sel} col={sel?SYLLABI.find(s=>s.id===sel)?.color:null} onClick={()=>onNext(sel)}>
          {sel?`Continue with ${sel.toUpperCase()} →`:"Select your syllabus first"}
        </PBtn>
      </div>
    </div>
  );
}

export function OnboardGrade({syllabus,onNext,onBack}) {
  const [sel,setSel]=useState(null);
  const sData=SYLLABI.find(s=>s.id===syllabus);
  return (
    <div style={{flex:1,padding:"22px 22px 28px",display:"flex",flexDirection:"column",gap:"18px",overflowY:"auto"}}>
      <div style={{background:`${sData?.color}12`,border:`1px solid ${sData?.color}33`,borderRadius:"14px",padding:"10px 16px",display:"flex",alignItems:"center",gap:"10px"}}>
        <span style={{fontSize:"20px"}}>{syllabus==="cbse"?"🎓":"🏫"}</span>
        <div style={{fontSize:"13px",fontWeight:"800",color:sData?.color}}>{sData?.label} selected ✓</div>
      </div>
      <PaliBubble text={syllabus==="ssc" ? `${sData?.label} - solid state pick bro! Now which class are you in? 🎒` : `${sData?.label} bro! Solid choice no cap. Now which class are you in?`} mood="fire"/>
      <div style={{fontSize:"22px",fontWeight:"900",color:C.text}}>Your Class 🎒</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
        {GRADES.map(g=>{
          const isSel=sel===g.id;
          return (
            <button key={g.id} onClick={()=>setSel(g.id)} style={{
              background:isSel?`${sData?.color}15`:"#FFFFFF",
              border:`2px solid ${isSel?sData?.color:C.border}`,
              borderRadius:"18px",padding:"20px 16px",cursor:"pointer",
              display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",
              transition:"all .2s",transform:isSel?"scale(1.04)":"scale(1)",
              boxShadow:isSel?`0 6px 20px ${sData?.color}22`:"0 2px 8px rgba(0,0,0,.05)",
            }}>
              <span style={{fontSize:"28px",fontWeight:"900",color:isSel?sData?.color:C.text}}>{g.id}</span>
              <span style={{fontSize:"12px",fontWeight:"700",color:isSel?sData?.color:C.muted,letterSpacing:".5px"}}>CLASS</span>
            </button>
          );
        })}
      </div>
      <PBtn disabled={!sel} col={sData?.color} onClick={()=>onNext(sel)}>Continue →</PBtn>
      <GBtn onClick={onBack}>← Back</GBtn>
    </div>
  );
}

export function OnboardSubject({syllabus,state,grade,onNext,onBack}) {
  const [sel,setSel]=useState(null);
  const sData   = SYLLABI.find(s=>s.id===syllabus);
  const subjects = syllabus==="ssc"
    ? (SSC_CURRICULUM[state]?.subjects||[])
    : (CURRICULUM[syllabus]?.subjects||[]);
  return (
    <div style={{flex:1,padding:"22px 22px 28px",display:"flex",flexDirection:"column",gap:"18px",overflowY:"auto"}}>
      <div style={{display:"flex",gap:"8px"}}>
        <div style={{background:`${sData?.color}12`,border:`1px solid ${sData?.color}33`,borderRadius:"10px",padding:"5px 12px",fontSize:"12px",fontWeight:"800",color:sData?.color}}>{sData?.label}</div>
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"5px 12px",fontSize:"12px",fontWeight:"800",color:C.muted}}>Class {grade}</div>
      </div>
      <PaliBubble text={`Aight Class ${grade} ${sData?.label} student! Which subject are we going hard on today? 💪`} mood="fire"/>
      <div style={{fontSize:"22px",fontWeight:"900",color:C.text}}>Choose Subject 📖</div>
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        {subjects.map(s=>{
          const isSel=sel===s.id;
          return (
            <button key={s.id} onClick={()=>setSel(s.id)} style={{
              background:isSel?`${sData?.color}12`:"#FFFFFF",
              border:`2px solid ${isSel?sData?.color:C.border}`,
              borderRadius:"16px",padding:"16px 20px",cursor:"pointer",
              display:"flex",alignItems:"center",gap:"14px",
              transition:"all .2s",boxShadow:isSel?`0 4px 16px ${sData?.color}22`:"0 2px 8px rgba(0,0,0,.04)",
            }}>
              <span style={{fontSize:"24px"}}>{s.emoji}</span>
              <span style={{fontSize:"15px",fontWeight:"700",color:isSel?sData?.color:C.text,flex:1,textAlign:"left"}}>{s.label}</span>
              {isSel&&<span style={{color:sData?.color,fontWeight:"800",fontSize:"18px"}}>✓</span>}
            </button>
          );
        })}
      </div>
      <PBtn disabled={!sel} col={sData?.color} onClick={()=>onNext(sel)}>Continue →</PBtn>
      <GBtn onClick={onBack}>← Back</GBtn>
    </div>
  );
}

export function OnboardTopic({syllabus,state,grade,subject,onNext,onBack}) {
  const [sel,setSel]=useState(null);
  const sData  = SYLLABI.find(s=>s.id===syllabus);
  const allSubjects = syllabus==="ssc"
    ? (SSC_CURRICULUM[state]?.subjects||[])
    : (CURRICULUM[syllabus]?.subjects||[]);
  const subData= allSubjects.find(s=>s.id===subject);
  const topics = syllabus==="ssc"
    ? (SSC_CURRICULUM[state]?.topics?.[subject]?.[parseInt(grade)]||[])
    : (CURRICULUM[syllabus]?.topics?.[subject]?.[parseInt(grade)]||[]);
  return (
    <div style={{flex:1,padding:"22px 22px 28px",display:"flex",flexDirection:"column",gap:"18px",overflowY:"auto"}}>
      <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
        <div style={{background:`${sData?.color}12`,border:`1px solid ${sData?.color}33`,borderRadius:"10px",padding:"5px 12px",fontSize:"12px",fontWeight:"800",color:sData?.color}}>{sData?.label}</div>
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"5px 12px",fontSize:"12px",fontWeight:"800",color:C.muted}}>Class {grade}</div>
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"5px 12px",fontSize:"12px",fontWeight:"800",color:C.muted}}>{subData?.emoji} {subData?.label}</div>
      </div>
      <PaliBubble text={`Lowkey ${subData?.label} is so interesting bro — pick a topic and let's get into it! 🔥`} mood="cheer"/>
      <div style={{fontSize:"22px",fontWeight:"900",color:C.text}}>Pick a Topic 🎯</div>
      <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
        {topics.map((t,i)=>{
          const isSel=sel===t;
          return (
            <button key={i} onClick={()=>setSel(t)} style={{
              background:isSel?`${sData?.color}12`:"#FFFFFF",
              border:`1.5px solid ${isSel?sData?.color:C.border}`,
              borderRadius:"14px",padding:"14px 18px",cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"space-between",
              transition:"all .18s",boxShadow:isSel?`0 4px 14px ${sData?.color}18`:"0 1px 4px rgba(0,0,0,.04)",
            }}>
              <span style={{fontSize:"14px",fontWeight:"600",color:isSel?sData?.color:C.text,textAlign:"left"}}>{t}</span>
              {isSel&&<span style={{color:sData?.color,fontWeight:"800"}}>✓</span>}
            </button>
          );
        })}
      </div>
      <PBtn disabled={!sel} col={sData?.color} onClick={()=>onNext(sel)}>Start Learning →</PBtn>
      <GBtn onClick={onBack}>← Back</GBtn>
    </div>
  );
}

export function OnboardPassion({syllabus,onNext,onBack}) {
  const [sel,setSel]=useState(null);
  const sData   = SYLLABI.find(s=>s.id===syllabus);
  const selected = PASSIONS.find(p=>p.id===sel);
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}>
      <div style={{padding:"20px 22px 14px",background:`linear-gradient(180deg,#FEF3E8 0%,rgba(253,248,243,0) 100%)`}}>
        <div style={{fontSize:"22px",fontWeight:"900",color:C.text,lineHeight:1.2}}>What fires you up? 🔥</div>
        <div style={{fontSize:"13px",color:C.muted,marginTop:"4px"}}>Champ will teach through your passion — no cap!</div>
      </div>
      <div style={{flex:1,padding:"8px 16px 8px",overflowY:"auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
          {PASSIONS.map(p=>{
            const isSel=sel===p.id;
            return (
              <button key={p.id} onClick={()=>setSel(p.id)} style={{
                background:isSel?`linear-gradient(135deg,${p.color}22,${p.color}10)`:"#FFFFFF",
                border:`2px solid ${isSel?p.color:C.border}`,
                borderRadius:"18px",padding:"18px 10px 14px",cursor:"pointer",
                display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",
                transition:"all .2s cubic-bezier(.34,1.56,.64,1)",
                transform:isSel?"scale(1.05)":"scale(1)",
                boxShadow:isSel?`0 8px 24px ${p.color}28`:"0 2px 8px rgba(0,0,0,.05)",
                position:"relative",overflow:"hidden",
              }}>
                <span style={{fontSize:"30px",lineHeight:1}}>{p.emoji}</span>
                <span style={{fontSize:"12px",fontWeight:"800",color:isSel?p.color:C.muted,letterSpacing:".3px",textTransform:"uppercase"}}>{p.label}</span>
                {isSel&&<div style={{width:"6px",height:"6px",borderRadius:"50%",background:p.color,boxShadow:`0 0 8px ${p.color}`}}/>}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{padding:"12px 22px 28px",display:"flex",flexDirection:"column",gap:"10px"}}>
        {selected&&(
          <div style={{background:`${selected.color}12`,border:`1px solid ${selected.color}33`,borderRadius:"12px",padding:"10px 14px",display:"flex",alignItems:"center",gap:"10px"}}>
            <span style={{fontSize:"18px"}}>{selected.emoji}</span>
            <div style={{fontSize:"12px",fontWeight:"800",color:selected.color}}>{selected.label} — every lesson will use this!</div>
          </div>
        )}
        <PBtn disabled={!sel} col={selected?.color} onClick={()=>onNext(sel)}>
          {sel?`Let's go with ${selected?.label}! ${selected?.emoji}`:"Pick your passion first"}
        </PBtn>
        <GBtn onClick={onBack}>← Back</GBtn>
      </div>
    </div>
  );
}


