import { useState, useCallback, useRef } from "react";

export function useTTS() {
  const [speaking, setSpeaking] = useState(false);
  const resumeRef = useRef(null);
  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    clearInterval(resumeRef.current);
    const go = () => {
      const utt  = new SpeechSynthesisUtterance(text);
      utt.rate   = 1.08; utt.pitch = 1.3; utt.volume = 1;
      const vs   = window.speechSynthesis.getVoices();
      // log available voices so user can see what's available
      console.log("Available voices:", vs.map(v=>v.name).join(", "));
      // try to find the most natural young-sounding voice
      const pick = vs.find(v=>/Aaron|Eddy|Reed|Rocko|Shelley|Grandpa|Junior|Superstar/i.test(v.name))
                || vs.find(v=>/Google UK English Male|Daniel/i.test(v.name))
                || vs.find(v=>/Google US English/i.test(v.name)&&!v.name.toLowerCase().includes("female"))
                || vs.find(v=>v.lang.startsWith("en-US")&&!v.name.toLowerCase().includes("female"))
                || vs.find(v=>v.lang.startsWith("en")) || vs[0];
      if (pick) utt.voice = pick;
      utt.onstart = () => { setSpeaking(true); resumeRef.current = setInterval(()=>{ if(window.speechSynthesis.paused) window.speechSynthesis.resume(); },5000); };
      utt.onend   = () => { setSpeaking(false); clearInterval(resumeRef.current); };
      utt.onerror = () => { setSpeaking(false); clearInterval(resumeRef.current); };
      window.speechSynthesis.speak(utt);
    };
    if (window.speechSynthesis.getVoices().length > 0) setTimeout(go, 200);
    else { window.speechSynthesis.onvoiceschanged = () => { setTimeout(go,200); window.speechSynthesis.onvoiceschanged=null; }; setTimeout(go,700); }
  },[]);
  const stop = useCallback(() => { window.speechSynthesis?.cancel(); setSpeaking(false); clearInterval(resumeRef.current); },[]);
  return { speak, stop, speaking };
}
