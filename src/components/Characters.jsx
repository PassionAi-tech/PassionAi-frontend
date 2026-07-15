import React from "react";

function CharacterFootball({pose="explain", size=160}) {
  const poses = {
    explain: { armL:"rotate(-30,38,72)", armR:"rotate(40,62,72)", legL:"rotate(5,42,110)", legR:"rotate(-5,58,110)", ball:true, mouth:"M42 58 Q50 64 58 58", eyeL:"●", brow:"normal" },
    think:   { armL:"rotate(-60,38,72)", armR:"rotate(-10,62,72)", legL:"rotate(0,42,110)", legR:"rotate(0,58,110)", ball:false, mouth:"M44 59 Q50 62 56 59", eyeL:"●", brow:"think" },
    cheer:   { armL:"rotate(-80,38,72)", armR:"rotate(-80,62,72)", legL:"rotate(10,42,110)", legR:"rotate(-10,58,110)", ball:true, mouth:"M40 57 Q50 65 60 57", eyeL:"●", brow:"normal" },
    wrong:   { armL:"rotate(20,38,72)", armR:"rotate(-20,62,72)", legL:"rotate(0,42,110)", legR:"rotate(0,58,110)", ball:false, mouth:"M44 60 Q50 57 56 60", eyeL:"●", brow:"sad" },
  };
  const p = poses[pose]||poses.explain;
  return (
    <svg width={size} height={size} viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg">
      {/* shadow */}
      <ellipse cx="50" cy="172" rx="22" ry="5" fill="#00000015"/>
      {/* legs */}
      <g transform={p.legL}><rect x="38" y="108" width="10" height="32" rx="5" fill="#1a1a2e"/><rect x="37" y="136" width="13" height="8" rx="4" fill="#e74c3c"/></g>
      <g transform={p.legR}><rect x="52" y="108" width="10" height="32" rx="5" fill="#1a1a2e"/><rect x="50" y="136" width="13" height="8" rx="4" fill="#e74c3c"/></g>
      {/* body — jersey */}
      <rect x="32" y="68" width="36" height="44" rx="8" fill="#e74c3c"/>
      <rect x="32" y="68" width="36" height="10" rx="4" fill="#c0392b"/>
      <text x="50" y="95" textAnchor="middle" fontSize="10" fontWeight="900" fill="white">10</text>
      {/* arms */}
      <g transform={p.armL}><rect x="20" y="68" width="10" height="28" rx="5" fill="#e74c3c"/><ellipse cx="25" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      <g transform={p.armR}><rect x="70" y="68" width="10" height="28" rx="5" fill="#e74c3c"/><ellipse cx="75" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      {/* neck */}
      <rect x="44" y="58" width="12" height="12" rx="4" fill="#FDBCB4"/>
      {/* head */}
      <ellipse cx="50" cy="44" rx="20" ry="22" fill="#FDBCB4"/>
      {/* hair */}
      <ellipse cx="50" cy="26" rx="20" ry="10" fill="#1a1a1a"/>
      <rect x="30" y="24" width="40" height="10" fill="#1a1a1a"/>
      {/* ears */}
      <ellipse cx="30" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      <ellipse cx="70" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      {/* eyes */}
      <circle cx="42" cy="44" r="4" fill="white"/><circle cx="43" cy="44" r="2.5" fill="#1a1a1a"/><circle cx="43.8" cy="43" r="1" fill="white"/>
      <circle cx="58" cy="44" r="4" fill="white"/><circle cx="59" cy="44" r="2.5" fill="#1a1a1a"/><circle cx="59.8" cy="43" r="1" fill="white"/>
      {/* brows */}
      {p.brow==="think"&&<><path d="M38 38 Q42 36 46 38" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M54 38 Q58 36 62 38" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/></>}
      {p.brow==="sad"&&<><path d="M38 38 Q42 40 46 38" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M54 38 Q58 40 62 38" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/></>}
      {p.brow==="normal"&&<><path d="M38 38 Q42 36 46 38" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M54 38 Q58 36 62 38" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/></>}
      {/* mouth */}
      <path d={p.mouth} stroke="#c0706a" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* cheeks */}
      <ellipse cx="36" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
      <ellipse cx="64" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
      {/* football */}
      {p.ball&&<g transform="translate(60,130)"><circle cx="0" cy="0" r="10" fill="white" stroke="#333" strokeWidth="1.5"/><path d="M0,-10 L3,-4 L-3,-4 Z" fill="#333"/><path d="M9,3 L4,1 L5,-5 Z" fill="#333"/><path d="M-9,3 L-4,1 L-5,-5 Z" fill="#333"/></g>}
      {/* pose bubble */}
      {pose==="think"&&<g><ellipse cx="72" cy="20" rx="12" ry="8" fill="white" stroke="#ddd" strokeWidth="1"/><text x="72" y="23" textAnchor="middle" fontSize="9">🤔</text><circle cx="64" cy="28" r="2" fill="white" stroke="#ddd" strokeWidth="1"/><circle cx="61" cy="32" r="1.5" fill="white" stroke="#ddd" strokeWidth="1"/></g>}
      {pose==="cheer"&&<g><ellipse cx="72" cy="20" rx="12" ry="8" fill="white" stroke="#ddd" strokeWidth="1"/><text x="72" y="23" textAnchor="middle" fontSize="9">🎉</text><circle cx="64" cy="28" r="2" fill="white" stroke="#ddd" strokeWidth="1"/></g>}
    </svg>
  );
}

function CharacterCricket({pose="explain", size=160}) {
  const mouths = { explain:"M42 58 Q50 64 58 58", think:"M44 59 Q50 62 56 59", cheer:"M40 57 Q50 65 60 57", wrong:"M44 60 Q50 57 56 60" };
  const armAngles = { explain:["-20","30"], think:["-50","10"], cheer:["-75","-75"], wrong:["15","-15"] };
  const [aL,aR] = armAngles[pose]||armAngles.explain;
  return (
    <svg width={size} height={size} viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="172" rx="22" ry="5" fill="#00000015"/>
      {/* legs — white cricket trousers */}
      <rect x="38" y="108" width="10" height="34" rx="5" fill="#f0f0f0"/>
      <rect x="52" y="108" width="10" height="34" rx="5" fill="#f0f0f0"/>
      <rect x="37" y="138" width="13" height="7" rx="3" fill="#f0f0f0" stroke="#ddd" strokeWidth="1"/>
      <rect x="50" y="138" width="13" height="7" rx="3" fill="#f0f0f0" stroke="#ddd" strokeWidth="1"/>
      {/* body — white cricket whites with blue trim */}
      <rect x="32" y="68" width="36" height="44" rx="8" fill="#f8f8f8" stroke="#1a6eb5" strokeWidth="2"/>
      <rect x="32" y="68" width="36" height="12" rx="6" fill="#1a6eb5"/>
      {/* arms */}
      <g transform={`rotate(${aL},38,72)`}><rect x="20" y="68" width="10" height="28" rx="5" fill="#f8f8f8" stroke="#1a6eb5" strokeWidth="1.5"/><ellipse cx="25" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      <g transform={`rotate(${aR},62,72)`}><rect x="62" y="68" width="10" height="28" rx="5" fill="#f8f8f8" stroke="#1a6eb5" strokeWidth="1.5"/><ellipse cx="67" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      {/* bat */}
      <g transform="rotate(-20,75,100)"><rect x="72" y="85" width="6" height="40" rx="3" fill="#c8a45a"/><rect x="70" y="115" width="10" height="15" rx="2" fill="#a0843a"/></g>
      {/* neck */}
      <rect x="44" y="58" width="12" height="12" rx="4" fill="#FDBCB4"/>
      {/* helmet */}
      <ellipse cx="50" cy="36" rx="22" ry="14" fill="#1a6eb5"/>
      <rect x="28" y="36" width="44" height="12" fill="#1a6eb5"/>
      <rect x="28" y="44" width="44" height="6" rx="3" fill="#0d4a8a"/>
      {/* face */}
      <ellipse cx="50" cy="50" rx="18" ry="18" fill="#FDBCB4"/>
      <ellipse cx="30" cy="50" rx="3.5" ry="4.5" fill="#FDBCB4"/>
      <ellipse cx="70" cy="50" rx="3.5" ry="4.5" fill="#FDBCB4"/>
      {/* visor */}
      <path d="M30 46 Q50 52 70 46" stroke="#0d4a8a" strokeWidth="4" fill="none"/>
      {/* eyes */}
      <circle cx="42" cy="50" r="3.5" fill="white"/><circle cx="43" cy="50" r="2" fill="#1a1a1a"/><circle cx="43.5" cy="49" r="0.8" fill="white"/>
      <circle cx="58" cy="50" r="3.5" fill="white"/><circle cx="59" cy="50" r="2" fill="#1a1a1a"/><circle cx="59.5" cy="49" r="0.8" fill="white"/>
      <path d={mouths[pose]} stroke="#c0706a" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="36" cy="54" rx="4" ry="2.5" fill="#FFB3A7" opacity="0.5"/>
      <ellipse cx="64" cy="54" rx="4" ry="2.5" fill="#FFB3A7" opacity="0.5"/>
      {pose==="cheer"&&<g><ellipse cx="78" cy="18" rx="13" ry="8" fill="white" stroke="#ddd" strokeWidth="1"/><text x="78" y="22" textAnchor="middle" fontSize="10">🏏</text></g>}
      {pose==="think"&&<g><ellipse cx="78" cy="18" rx="13" ry="8" fill="white" stroke="#ddd" strokeWidth="1"/><text x="78" y="22" textAnchor="middle" fontSize="10">🤔</text></g>}
    </svg>
  );
}

function CharacterMusic({pose="explain", size=160}) {
  const mouths = { explain:"M42 58 Q50 64 58 58", think:"M44 59 Q50 62 56 59", cheer:"M40 57 Q50 65 60 57", wrong:"M44 60 Q50 57 56 60" };
  const armAngles = { explain:["-25","35"], think:["-55","5"], cheer:["-80","-80"], wrong:["20","-20"] };
  const [aL,aR] = armAngles[pose]||armAngles.explain;
  return (
    <svg width={size} height={size} viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="172" rx="22" ry="5" fill="#00000015"/>
      {/* legs — black trousers */}
      <rect x="38" y="108" width="10" height="34" rx="5" fill="#1a1a2e"/>
      <rect x="52" y="108" width="10" height="34" rx="5" fill="#1a1a2e"/>
      <rect x="37" y="138" width="13" height="7" rx="3" fill="#2c2c54"/>
      <rect x="50" y="138" width="13" height="7" rx="3" fill="#2c2c54"/>
      {/* body — purple suit jacket */}
      <rect x="32" y="68" width="36" height="44" rx="8" fill="#6c3483"/>
      <rect x="45" y="68" width="10" height="44" fill="#5b2c6f"/>
      {/* lapels */}
      <path d="M45,68 L38,82 L45,78 Z" fill="#f8f8f8"/>
      <path d="M55,68 L62,82 L55,78 Z" fill="#f8f8f8"/>
      {/* bow tie */}
      <path d="M44,74 L50,78 L56,74 L50,70 Z" fill="#e74c3c"/>
      {/* arms */}
      <g transform={`rotate(${aL},38,72)`}><rect x="20" y="68" width="10" height="28" rx="5" fill="#6c3483"/><ellipse cx="25" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      <g transform={`rotate(${aR},62,72)`}><rect x="62" y="68" width="10" height="28" rx="5" fill="#6c3483"/><ellipse cx="67" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      {/* mic stick */}
      <g transform="rotate(15,70,95)"><rect x="68" y="80" width="4" height="30" rx="2" fill="#888"/><ellipse cx="70" cy="80" rx="6" ry="8" fill="#333"/><ellipse cx="70" cy="80" rx="4" ry="6" fill="#555"/></g>
      {/* neck */}
      <rect x="44" y="58" width="12" height="12" rx="4" fill="#FDBCB4"/>
      {/* head */}
      <ellipse cx="50" cy="44" rx="20" ry="22" fill="#FDBCB4"/>
      {/* fedora hat */}
      <ellipse cx="50" cy="28" rx="24" ry="5" fill="#2c2c54"/>
      <rect x="30" y="16" width="40" height="14" rx="7" fill="#2c2c54"/>
      <rect x="30" y="24" width="40" height="5" fill="#6c3483"/>
      {/* ears */}
      <ellipse cx="30" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      <ellipse cx="70" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      {/* eyes */}
      <circle cx="42" cy="44" r="4" fill="white"/><circle cx="43" cy="44" r="2.5" fill="#1a1a1a"/><circle cx="43.8" cy="43" r="1" fill="white"/>
      <circle cx="58" cy="44" r="4" fill="white"/><circle cx="59" cy="44" r="2.5" fill="#1a1a1a"/><circle cx="59.8" cy="43" r="1" fill="white"/>
      <path d="M38 38 Q42 36 46 38" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M54 38 Q58 36 62 38" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d={mouths[pose]} stroke="#c0706a" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="36" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
      <ellipse cx="64" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
      {pose==="cheer"&&<g><ellipse cx="20" cy="18" rx="13" ry="8" fill="white" stroke="#ddd" strokeWidth="1"/><text x="20" y="22" textAnchor="middle" fontSize="10">🎵</text></g>}
    </svg>
  );
}

function CharacterDance({pose="explain", size=160}) {
  const mouths = { explain:"M42 58 Q50 64 58 58", think:"M44 59 Q50 62 56 59", cheer:"M40 57 Q50 65 60 57", wrong:"M44 60 Q50 57 56 60" };
  const configs = {
    explain: { legL:"rotate(10,42,110)", legR:"rotate(-10,58,110)", armL:"rotate(-40,38,72)", armR:"rotate(50,62,72)" },
    think:   { legL:"rotate(0,42,110)",  legR:"rotate(0,58,110)",   armL:"rotate(-60,38,72)", armR:"rotate(10,62,72)" },
    cheer:   { legL:"rotate(20,42,110)", legR:"rotate(-20,58,110)", armL:"rotate(-85,38,72)", armR:"rotate(-85,62,72)" },
    wrong:   { legL:"rotate(-5,42,110)", legR:"rotate(5,58,110)",   armL:"rotate(10,38,72)",  armR:"rotate(-10,62,72)" },
  };
  const c = configs[pose]||configs.explain;
  return (
    <svg width={size} height={size} viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="172" rx="22" ry="5" fill="#00000015"/>
      {/* legs — dance leggings */}
      <g transform={c.legL}><rect x="38" y="108" width="10" height="32" rx="5" fill="#8e44ad"/><rect x="37" y="136" width="13" height="8" rx="4" fill="#f39c12"/></g>
      <g transform={c.legR}><rect x="52" y="108" width="10" height="32" rx="5" fill="#8e44ad"/><rect x="50" y="136" width="13" height="8" rx="4" fill="#f39c12"/></g>
      {/* body — sparkly dance top */}
      <rect x="32" y="68" width="36" height="44" rx="8" fill="#e91e8c"/>
      <circle cx="42" cy="80" r="2" fill="#FFD700" opacity="0.8"/>
      <circle cx="50" cy="78" r="2" fill="#FFD700" opacity="0.8"/>
      <circle cx="58" cy="80" r="2" fill="#FFD700" opacity="0.8"/>
      <circle cx="46" cy="90" r="2" fill="#FFD700" opacity="0.8"/>
      <circle cx="54" cy="88" r="2" fill="#FFD700" opacity="0.8"/>
      {/* arms */}
      <g transform={c.armL}><rect x="20" y="68" width="10" height="28" rx="5" fill="#e91e8c"/><ellipse cx="25" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      <g transform={c.armR}><rect x="70" y="68" width="10" height="28" rx="5" fill="#e91e8c"/><ellipse cx="75" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      {/* neck */}
      <rect x="44" y="58" width="12" height="12" rx="4" fill="#FDBCB4"/>
      {/* head */}
      <ellipse cx="50" cy="44" rx="20" ry="22" fill="#FDBCB4"/>
      {/* hair — bun */}
      <ellipse cx="50" cy="26" rx="18" ry="10" fill="#1a1a1a"/>
      <rect x="32" y="24" width="36" height="10" fill="#1a1a1a"/>
      <ellipse cx="50" cy="20" rx="8" ry="8" fill="#1a1a1a"/>
      <circle cx="50" cy="18" r="5" fill="#e91e8c"/>
      {/* ears */}
      <ellipse cx="30" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      <ellipse cx="70" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      {/* eyes with lashes */}
      <circle cx="42" cy="44" r="4" fill="white"/><circle cx="43" cy="44" r="2.5" fill="#1a1a1a"/><circle cx="43.8" cy="43" r="1" fill="white"/>
      <circle cx="58" cy="44" r="4" fill="white"/><circle cx="59" cy="44" r="2.5" fill="#1a1a1a"/><circle cx="59.8" cy="43" r="1" fill="white"/>
      <path d="M39 41 Q42 38 45 41" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
      <path d="M55 41 Q58 38 61 41" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
      <path d={mouths[pose]} stroke="#e91e8c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="36" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.6"/>
      <ellipse cx="64" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.6"/>
      {pose==="cheer"&&<g><ellipse cx="78" cy="18" rx="13" ry="8" fill="white" stroke="#ddd" strokeWidth="1"/><text x="78" y="22" textAnchor="middle" fontSize="10">💃</text></g>}
    </svg>
  );
}

function CharacterGaming({pose="explain", size=160}) {
  const mouths = { explain:"M42 58 Q50 64 58 58", think:"M44 59 Q50 62 56 59", cheer:"M40 57 Q50 65 60 57", wrong:"M44 60 Q50 57 56 60" };
  const armAngles = { explain:["-15","25"], think:["-40","5"], cheer:["-70","-70"], wrong:["15","-15"] };
  const [aL,aR] = armAngles[pose]||armAngles.explain;
  return (
    <svg width={size} height={size} viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="172" rx="22" ry="5" fill="#00000015"/>
      {/* legs — dark jeans */}
      <rect x="38" y="108" width="10" height="34" rx="5" fill="#2c3e50"/>
      <rect x="52" y="108" width="10" height="34" rx="5" fill="#2c3e50"/>
      <rect x="37" y="138" width="13" height="7" rx="3" fill="#1a252f"/>
      <rect x="50" y="138" width="13" height="7" rx="3" fill="#1a252f"/>
      {/* body — gaming hoodie */}
      <rect x="32" y="68" width="36" height="44" rx="8" fill="#2d3436"/>
      <ellipse cx="50" cy="82" rx="8" ry="10" fill="#1a1a1a"/>
      <text x="50" y="86" textAnchor="middle" fontSize="7" fill="#00ff88">▶ PLAY</text>
      {/* arms */}
      <g transform={`rotate(${aL},38,72)`}><rect x="20" y="68" width="10" height="28" rx="5" fill="#2d3436"/><ellipse cx="25" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      <g transform={`rotate(${aR},62,72)`}><rect x="62" y="68" width="10" height="28" rx="5" fill="#2d3436"/><ellipse cx="67" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      {/* controller */}
      <g transform="rotate(-10,72,100)">
        <rect x="62" y="92" width="20" height="14" rx="5" fill="#444"/>
        <circle cx="66" cy="97" r="3" fill="#555"/>
        <circle cx="78" cy="96" r="1.5" fill="#e74c3c"/>
        <circle cx="81" cy="99" r="1.5" fill="#3498db"/>
        <circle cx="78" cy="102" r="1.5" fill="#2ecc71"/>
        <circle cx="75" cy="99" r="1.5" fill="#f1c40f"/>
      </g>
      {/* neck */}
      <rect x="44" y="58" width="12" height="12" rx="4" fill="#FDBCB4"/>
      {/* head */}
      <ellipse cx="50" cy="44" rx="20" ry="22" fill="#FDBCB4"/>
      {/* hoodie hood */}
      <path d="M30,32 Q50,12 70,32 Q70,44 50,44 Q30,44 30,32 Z" fill="#2d3436"/>
      <ellipse cx="50" cy="44" rx="18" ry="16" fill="#FDBCB4"/>
      {/* gaming headset */}
      <path d="M30,40 Q30,22 50,22 Q70,22 70,40" stroke="#444" strokeWidth="4" fill="none"/>
      <rect x="24" y="38" width="8" height="12" rx="3" fill="#333"/>
      <rect x="68" y="38" width="8" height="12" rx="3" fill="#333"/>
      <circle cx="24" cy="50" r="3" fill="#00ff88"/>
      {/* ears */}
      <ellipse cx="30" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      <ellipse cx="70" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      {/* eyes */}
      <circle cx="42" cy="44" r="4" fill="white"/><circle cx="43" cy="44" r="2.5" fill="#1a1a1a"/><circle cx="43.8" cy="43" r="1" fill="white"/>
      <circle cx="58" cy="44" r="4" fill="white"/><circle cx="59" cy="44" r="2.5" fill="#1a1a1a"/><circle cx="59.8" cy="43" r="1" fill="white"/>
      <path d="M38 38 Q42 36 46 38" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M54 38 Q58 36 62 38" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d={mouths[pose]} stroke="#c0706a" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="36" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
      <ellipse cx="64" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
    </svg>
  );
}

function CharacterBasketball({pose="explain", size=160}) {
  const mouths = { explain:"M42 58 Q50 64 58 58", think:"M44 59 Q50 62 56 59", cheer:"M40 57 Q50 65 60 57", wrong:"M44 60 Q50 57 56 60" };
  const armAngles = { explain:["-20","35"], think:["-50","10"], cheer:["-80","-80"], wrong:["15","-15"] };
  const [aL,aR] = armAngles[pose]||armAngles.explain;
  return (
    <svg width={size} height={size} viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="172" rx="22" ry="5" fill="#00000015"/>
      <rect x="38" y="108" width="10" height="34" rx="5" fill="#e67e22"/>
      <rect x="52" y="108" width="10" height="34" rx="5" fill="#e67e22"/>
      <rect x="37" y="138" width="13" height="7" rx="3" fill="#1a1a1a"/>
      <rect x="50" y="138" width="13" height="7" rx="3" fill="#1a1a1a"/>
      {/* jersey */}
      <rect x="32" y="68" width="36" height="44" rx="8" fill="#e74c3c"/>
      <rect x="32" y="68" width="36" height="14" rx="7" fill="#c0392b"/>
      <text x="50" y="95" textAnchor="middle" fontSize="11" fontWeight="900" fill="white">23</text>
      <g transform={`rotate(${aL},38,72)`}><rect x="20" y="68" width="10" height="28" rx="5" fill="#e74c3c"/><ellipse cx="25" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      <g transform={`rotate(${aR},62,72)`}><rect x="62" y="68" width="10" height="28" rx="5" fill="#e74c3c"/><ellipse cx="67" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      {/* basketball */}
      <g transform="translate(70,125)"><circle cx="0" cy="0" r="12" fill="#e67e22" stroke="#c0392b" strokeWidth="1"/><path d="M-12,0 Q-6,-8 0,-8 Q6,-8 12,0" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/><path d="M-12,0 Q-6,8 0,8 Q6,8 12,0" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/><line x1="0" y1="-12" x2="0" y2="12" stroke="#1a1a1a" strokeWidth="1.5"/></g>
      <rect x="44" y="58" width="12" height="12" rx="4" fill="#FDBCB4"/>
      <ellipse cx="50" cy="44" rx="20" ry="22" fill="#FDBCB4"/>
      {/* headband */}
      <rect x="30" y="28" width="40" height="8" rx="4" fill="#c0392b"/>
      <ellipse cx="50" cy="26" rx="20" ry="8" fill="#1a1a1a"/>
      <rect x="30" y="24" width="40" height="8" fill="#1a1a1a"/>
      <ellipse cx="30" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      <ellipse cx="70" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      <circle cx="42" cy="44" r="4" fill="white"/><circle cx="43" cy="44" r="2.5" fill="#1a1a1a"/><circle cx="43.8" cy="43" r="1" fill="white"/>
      <circle cx="58" cy="44" r="4" fill="white"/><circle cx="59" cy="44" r="2.5" fill="#1a1a1a"/><circle cx="59.8" cy="43" r="1" fill="white"/>
      <path d="M38 38 Q42 36 46 38" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M54 38 Q58 36 62 38" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d={mouths[pose]} stroke="#c0706a" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="36" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
      <ellipse cx="64" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
      {pose==="cheer"&&<g><ellipse cx="22" cy="18" rx="13" ry="8" fill="white" stroke="#ddd" strokeWidth="1"/><text x="22" y="22" textAnchor="middle" fontSize="10">🏀</text></g>}
    </svg>
  );
}

function CharacterCooking({pose="explain", size=160}) {
  const mouths = { explain:"M42 58 Q50 64 58 58", think:"M44 59 Q50 62 56 59", cheer:"M40 57 Q50 65 60 57", wrong:"M44 60 Q50 57 56 60" };
  const armAngles = { explain:["-20","35"], think:["-50","10"], cheer:["-80","-80"], wrong:["15","-15"] };
  const [aL,aR] = armAngles[pose]||armAngles.explain;
  return (
    <svg width={size} height={size} viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="172" rx="22" ry="5" fill="#00000015"/>
      <rect x="38" y="108" width="10" height="34" rx="5" fill="#2c3e50"/>
      <rect x="52" y="108" width="10" height="34" rx="5" fill="#2c3e50"/>
      <rect x="37" y="138" width="13" height="7" rx="3" fill="#1a252f"/>
      <rect x="50" y="138" width="13" height="7" rx="3" fill="#1a252f"/>
      {/* chef whites */}
      <rect x="32" y="68" width="36" height="44" rx="8" fill="#f8f8f8" stroke="#ddd" strokeWidth="1"/>
      {/* apron */}
      <rect x="36" y="72" width="28" height="40" rx="4" fill="#e8e8e8"/>
      <rect x="42" y="68" width="16" height="8" rx="3" fill="#e8e8e8"/>
      <circle cx="42" cy="80" r="2" fill="#ddd"/>
      <circle cx="58" cy="80" r="2" fill="#ddd"/>
      <g transform={`rotate(${aL},38,72)`}><rect x="20" y="68" width="10" height="28" rx="5" fill="#f8f8f8" stroke="#ddd" strokeWidth="1"/><ellipse cx="25" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      <g transform={`rotate(${aR},62,72)`}><rect x="62" y="68" width="10" height="28" rx="5" fill="#f8f8f8" stroke="#ddd" strokeWidth="1"/><ellipse cx="67" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      {/* spatula */}
      <g transform="rotate(20,72,95)"><rect x="70" y="78" width="4" height="35" rx="2" fill="#c8a45a"/><rect x="67" y="78" width="10" height="14" rx="2" fill="#aaa" opacity="0.9"/></g>
      <rect x="44" y="58" width="12" height="12" rx="4" fill="#FDBCB4"/>
      <ellipse cx="50" cy="44" rx="20" ry="22" fill="#FDBCB4"/>
      {/* chef hat */}
      <rect x="34" y="16" width="32" height="20" rx="10" fill="white" stroke="#ddd" strokeWidth="1"/>
      <ellipse cx="50" cy="36" rx="22" ry="6" fill="white" stroke="#ddd" strokeWidth="1"/>
      <rect x="34" y="32" width="32" height="8" fill="white" stroke="#ddd" strokeWidth="1"/>
      <ellipse cx="30" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      <ellipse cx="70" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      <circle cx="42" cy="44" r="4" fill="white"/><circle cx="43" cy="44" r="2.5" fill="#1a1a1a"/><circle cx="43.8" cy="43" r="1" fill="white"/>
      <circle cx="58" cy="44" r="4" fill="white"/><circle cx="59" cy="44" r="2.5" fill="#1a1a1a"/><circle cx="59.8" cy="43" r="1" fill="white"/>
      <path d="M38 38 Q42 36 46 38" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M54 38 Q58 36 62 38" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d={mouths[pose]} stroke="#c0706a" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="36" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
      <ellipse cx="64" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
      {pose==="cheer"&&<g><ellipse cx="22" cy="18" rx="13" ry="8" fill="white" stroke="#ddd" strokeWidth="1"/><text x="22" y="22" textAnchor="middle" fontSize="10">🍳</text></g>}
    </svg>
  );
}

function CharacterSwimming({pose="explain", size=160}) {
  const mouths = { explain:"M42 58 Q50 64 58 58", think:"M44 59 Q50 62 56 59", cheer:"M40 57 Q50 65 60 57", wrong:"M44 60 Q50 57 56 60" };
  const armAngles = { explain:["-40","50"], think:["-60","5"], cheer:["-90","10"], wrong:["10","-10"] };
  const [aL,aR] = armAngles[pose]||armAngles.explain;
  return (
    <svg width={size} height={size} viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="172" rx="22" ry="5" fill="#00000015"/>
      <rect x="38" y="108" width="10" height="34" rx="5" fill="#1a6eb5"/>
      <rect x="52" y="108" width="10" height="34" rx="5" fill="#1a6eb5"/>
      <rect x="37" y="138" width="13" height="7" rx="3" fill="#0d4a8a"/>
      <rect x="50" y="138" width="13" height="7" rx="3" fill="#0d4a8a"/>
      {/* swimsuit */}
      <rect x="34" y="68" width="32" height="44" rx="8" fill="#1a6eb5"/>
      <path d="M34,68 Q50,58 66,68" fill="#0d4a8a"/>
      <g transform={`rotate(${aL},38,72)`}><rect x="20" y="68" width="10" height="28" rx="5" fill="#FDBCB4"/><ellipse cx="25" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      <g transform={`rotate(${aR},62,72)`}><rect x="62" y="68" width="10" height="28" rx="5" fill="#FDBCB4"/><ellipse cx="67" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      <rect x="44" y="58" width="12" height="12" rx="4" fill="#FDBCB4"/>
      <ellipse cx="50" cy="44" rx="20" ry="22" fill="#FDBCB4"/>
      {/* swim cap */}
      <ellipse cx="50" cy="30" rx="21" ry="16" fill="#1a6eb5"/>
      <rect x="29" y="26" width="42" height="12" fill="#1a6eb5"/>
      {/* goggles */}
      <rect x="30" y="40" width="40" height="10" rx="5" fill="rgba(30,100,200,.3)" stroke="#1a6eb5" strokeWidth="2"/>
      <circle cx="40" cy="45" r="5" fill="rgba(30,100,200,.25)" stroke="#1a6eb5" strokeWidth="1.5"/>
      <circle cx="60" cy="45" r="5" fill="rgba(30,100,200,.25)" stroke="#1a6eb5" strokeWidth="1.5"/>
      <rect x="45" y="43" width="10" height="4" rx="2" fill="#1a6eb5"/>
      <ellipse cx="30" cy="44" rx="3" ry="4" fill="#FDBCB4"/>
      <ellipse cx="70" cy="44" rx="3" ry="4" fill="#FDBCB4"/>
      <circle cx="40" cy="45" r="2" fill="#1a1a1a"/><circle cx="40.5" cy="44" r="0.8" fill="white"/>
      <circle cx="60" cy="45" r="2" fill="#1a1a1a"/><circle cx="60.5" cy="44" r="0.8" fill="white"/>
      <path d={mouths[pose]} stroke="#c0706a" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="35" cy="50" rx="4" ry="2.5" fill="#FFB3A7" opacity="0.5"/>
      <ellipse cx="65" cy="50" rx="4" ry="2.5" fill="#FFB3A7" opacity="0.5"/>
      {/* wave */}
      {pose==="cheer"&&<path d="M5,155 Q15,148 25,155 Q35,162 45,155 Q55,148 65,155 Q75,162 85,155 Q95,148 100,155" stroke="#1a6eb5" strokeWidth="3" fill="none" opacity="0.5"/>}
    </svg>
  );
}

function CharacterChess({pose="explain", size=160}) {
  const mouths = { explain:"M42 58 Q50 64 58 58", think:"M44 59 Q50 62 56 59", cheer:"M40 57 Q50 65 60 57", wrong:"M44 60 Q50 57 56 60" };
  const armAngles = { explain:["-15","25"], think:["-55","15"], cheer:["-75","-75"], wrong:["15","-15"] };
  const [aL,aR] = armAngles[pose]||armAngles.explain;
  return (
    <svg width={size} height={size} viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="172" rx="22" ry="5" fill="#00000015"/>
      <rect x="38" y="108" width="10" height="34" rx="5" fill="#2c3e50"/>
      <rect x="52" y="108" width="10" height="34" rx="5" fill="#2c3e50"/>
      <rect x="37" y="138" width="13" height="7" rx="3" fill="#1a252f"/>
      <rect x="50" y="138" width="13" height="7" rx="3" fill="#1a252f"/>
      {/* blazer */}
      <rect x="32" y="68" width="36" height="44" rx="8" fill="#1a252f"/>
      <path d="M44,68 L38,82 L44,78 Z" fill="#f8f8f8"/>
      <path d="M56,68 L62,82 L56,78 Z" fill="#f8f8f8"/>
      <rect x="44" y="70" width="12" height="3" rx="1" fill="#f39c12"/>
      {/* shirt and tie */}
      <rect x="44" y="70" width="12" height="44" fill="#f8f8f8"/>
      <rect x="47" y="72" width="6" height="30" rx="2" fill="#c0392b"/>
      <g transform={`rotate(${aL},38,72)`}><rect x="20" y="68" width="10" height="28" rx="5" fill="#1a252f"/><ellipse cx="25" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      <g transform={`rotate(${aR},62,72)`}><rect x="62" y="68" width="10" height="28" rx="5" fill="#1a252f"/><ellipse cx="67" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      {/* chess piece */}
      <g transform="translate(70,110)"><rect x="-4" y="8" width="8" height="4" rx="1" fill="#f8f8f8"/><rect x="-3" y="2" width="6" height="8" rx="1" fill="#f8f8f8"/><circle cx="0" cy="0" r="4" fill="#f8f8f8"/></g>
      <rect x="44" y="58" width="12" height="12" rx="4" fill="#FDBCB4"/>
      <ellipse cx="50" cy="44" rx="20" ry="22" fill="#FDBCB4"/>
      {/* smart hair */}
      <ellipse cx="50" cy="27" rx="20" ry="10" fill="#1a1a1a"/>
      <rect x="30" y="25" width="40" height="10" fill="#1a1a1a"/>
      {/* glasses */}
      <rect x="34" y="42" width="12" height="9" rx="4" fill="none" stroke="#333" strokeWidth="1.5"/>
      <rect x="54" y="42" width="12" height="9" rx="4" fill="none" stroke="#333" strokeWidth="1.5"/>
      <line x1="46" y1="46" x2="54" y2="46" stroke="#333" strokeWidth="1.5"/>
      <line x1="30" y1="46" x2="34" y2="46" stroke="#333" strokeWidth="1.5"/>
      <line x1="66" y1="46" x2="70" y2="46" stroke="#333" strokeWidth="1.5"/>
      <ellipse cx="30" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      <ellipse cx="70" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      <circle cx="40" cy="46" r="2.5" fill="#1a1a1a"/><circle cx="60" cy="46" r="2.5" fill="#1a1a1a"/>
      <path d="M38 40 Q42 38 46 40" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M54 40 Q58 38 62 40" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d={mouths[pose]} stroke="#c0706a" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="36" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
      <ellipse cx="64" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
      {pose==="think"&&<g><ellipse cx="78" cy="20" rx="13" ry="8" fill="white" stroke="#ddd" strokeWidth="1"/><text x="78" y="24" textAnchor="middle" fontSize="10">♟️</text></g>}
    </svg>
  );
}

function CharacterBadminton({pose="explain", size=160}) {
  const mouths = { explain:"M42 58 Q50 64 58 58", think:"M44 59 Q50 62 56 59", cheer:"M40 57 Q50 65 60 57", wrong:"M44 60 Q50 57 56 60" };
  const armAngles = { explain:["-20","45"], think:["-50","10"], cheer:["-80","-75"], wrong:["15","-15"] };
  const [aL,aR] = armAngles[pose]||armAngles.explain;
  return (
    <svg width={size} height={size} viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="172" rx="22" ry="5" fill="#00000015"/>
      <rect x="38" y="108" width="10" height="34" rx="5" fill="#27ae60"/>
      <rect x="52" y="108" width="10" height="34" rx="5" fill="#27ae60"/>
      <rect x="37" y="138" width="13" height="7" rx="3" fill="#1a7a42"/>
      <rect x="50" y="138" width="13" height="7" rx="3" fill="#1a7a42"/>
      {/* sports kit */}
      <rect x="32" y="68" width="36" height="44" rx="8" fill="#27ae60"/>
      <rect x="32" y="68" width="36" height="12" rx="6" fill="#1a7a42"/>
      <rect x="32" y="80" width="36" height="4" fill="#f1c40f"/>
      <g transform={`rotate(${aL},38,72)`}><rect x="20" y="68" width="10" height="28" rx="5" fill="#27ae60"/><ellipse cx="25" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      <g transform={`rotate(${aR},62,72)`}><rect x="62" y="68" width="10" height="28" rx="5" fill="#27ae60"/><ellipse cx="67" cy="98" rx="6" ry="6" fill="#FDBCB4"/></g>
      {/* racket */}
      <g transform="rotate(-25,75,95)">
        <ellipse cx="72" cy="82" rx="8" ry="10" fill="none" stroke="#aaa" strokeWidth="2"/>
        <line x1="64" y1="82" x2="80" y2="82" stroke="#ddd" strokeWidth="1"/>
        <line x1="72" y1="72" x2="72" y2="92" stroke="#ddd" strokeWidth="1"/>
        <line x1="66" y1="76" x2="78" y2="76" stroke="#ddd" strokeWidth="0.8"/>
        <line x1="66" y1="88" x2="78" y2="88" stroke="#ddd" strokeWidth="0.8"/>
        <rect x="70" y="92" width="4" height="22" rx="2" fill="#c8a45a"/>
      </g>
      {/* shuttlecock */}
      {pose==="cheer"&&<g transform="translate(20,50)"><circle cx="0" cy="0" r="4" fill="white" stroke="#ddd" strokeWidth="1"/><path d="M-4,-4 L0,-14 L4,-4" stroke="#ddd" strokeWidth="1" fill="none"/><path d="M-4,-4 L-10,-10 L-4,-4" stroke="#ddd" strokeWidth="1" fill="none"/><path d="M4,-4 L10,-10 L4,-4" stroke="#ddd" strokeWidth="1" fill="none"/></g>}
      <rect x="44" y="58" width="12" height="12" rx="4" fill="#FDBCB4"/>
      <ellipse cx="50" cy="44" rx="20" ry="22" fill="#FDBCB4"/>
      {/* sports hair */}
      <ellipse cx="50" cy="27" rx="20" ry="10" fill="#1a1a1a"/>
      <rect x="30" y="25" width="40" height="10" fill="#1a1a1a"/>
      {/* headband */}
      <rect x="30" y="33" width="40" height="6" rx="3" fill="#f1c40f"/>
      <ellipse cx="30" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      <ellipse cx="70" cy="44" rx="4" ry="5" fill="#FDBCB4"/>
      <circle cx="42" cy="44" r="4" fill="white"/><circle cx="43" cy="44" r="2.5" fill="#1a1a1a"/><circle cx="43.8" cy="43" r="1" fill="white"/>
      <circle cx="58" cy="44" r="4" fill="white"/><circle cx="59" cy="44" r="2.5" fill="#1a1a1a"/><circle cx="59.8" cy="43" r="1" fill="white"/>
      <path d="M38 38 Q42 36 46 38" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M54 38 Q58 36 62 38" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d={mouths[pose]} stroke="#c0706a" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="36" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
      <ellipse cx="64" cy="50" rx="5" ry="3" fill="#FFB3A7" opacity="0.5"/>
    </svg>
  );
}

// Master character selector
export function PassionCharacter({passionId, pose="explain", size=160}) {
  const map = {
    football:   CharacterFootball,
    cricket:    CharacterCricket,
    music:      CharacterMusic,
    dance:      CharacterDance,
    gaming:     CharacterGaming,
    basketball: CharacterBasketball,
    cooking:    CharacterCooking,
    swimming:   CharacterSwimming,
    chess:      CharacterChess,
    badminton:  CharacterBadminton,
  };
  const Comp = map[passionId] || CharacterFootball;
  return (
    <div style={{
      display:"flex", flexDirection:"column", alignItems:"center",
      animation: pose==="cheer"
        ? "characterBounce .5s ease-in-out infinite alternate"
        : pose==="think"
          ? "characterSway 2s ease-in-out infinite"
          : "characterFloat 3s ease-in-out infinite",
    }}>
      <Comp pose={pose} size={size}/>
      <style>{`
        @keyframes characterFloat{0%{transform:translateY(0)}50%{transform:translateY(-8px)}100%{transform:translateY(0)}}
        @keyframes characterBounce{from{transform:translateY(0) scale(1)}to{transform:translateY(-12px) scale(1.05)}}
        @keyframes characterSway{0%{transform:rotate(0)}25%{transform:rotate(-3deg)}75%{transform:rotate(3deg)}100%{transform:rotate(0)}}
      `}</style>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
