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
  console.log("Speaking...");
  console.log("Voices:", window.speechSynthesis.getVoices());

  const utt = new SpeechSynthesisUtterance(text);

  utt.rate = 1;
  utt.pitch = 1;
  utt.volume = 1;

  utt.onstart = () => {
    console.log("Speech started");
    setSpeaking(true);
  };

  utt.onend = () => {
    console.log("Speech ended");
    setSpeaking(false);
  };

  utt.onerror = (e) => {
    console.error("Speech error:", e);
    setSpeaking(false);
  };

  window.speechSynthesis.speak(utt);
};
    if (window.speechSynthesis.getVoices().length > 0) setTimeout(go, 200);
    else { window.speechSynthesis.onvoiceschanged = () => { setTimeout(go,200); window.speechSynthesis.onvoiceschanged=null; }; setTimeout(go,700); }
  },[]);
  const stop = useCallback(() => { window.speechSynthesis?.cancel(); setSpeaking(false); clearInterval(resumeRef.current); },[]);
  return { speak, stop, speaking };
}
