import React, { useState, useEffect } from "react";

export function GifCard({ query, color, visible }) {
  const [gifUrl, setGifUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = encodeURIComponent(query);
    const fetchGif = async () => {
      setLoading(true);
      setGifUrl(null);
      try {
        // Try Tenor first
        const tenorRes = await fetch(
          `https://tenor.googleapis.com/v2/search?q=${q}&key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCDA&limit=8&contentfilter=high&media_filter=gif`
        );
        if (tenorRes.ok) {
          const data = await tenorRes.json();
          const results = data?.results || [];
          if (results.length > 0) {
            const pick = results[Math.floor(Math.random() * Math.min(results.length, 5))];
            const url = pick?.media_formats?.gif?.url || pick?.media_formats?.tinygif?.url;
            if (url) { setGifUrl(url); setLoading(false); return; }
          }
        }
        // Fallback to Giphy
        const giphyRes = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${q}&limit=5&rating=g`
        );
        if (giphyRes.ok) {
          const data = await giphyRes.json();
          const gifs = data?.data || [];
          if (gifs.length > 0) setGifUrl(gifs[0]?.images?.fixed_height?.url);
        }
      } catch (err) {
        console.error("GIF fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGif();
  }, [query]);

  return (
    <div style={{
      height:"155px", borderRadius:"20px", overflow:"hidden",
      background:`${color}12`, border:`1.5px solid ${color}33`,
      flexShrink:0, opacity:visible?1:0, transition:"opacity .5s ease",
      display:"flex", alignItems:"center", justifyContent:"center",
      position:"relative",
    }}>
      {loading && (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"8px"}}>
          <div style={{fontSize:"28px",animation:"spin 1s linear infinite"}}>⏳</div>
          <div style={{fontSize:"11px",color:"#999"}}>Loading GIF…</div>
        </div>
      )}
      {gifUrl && (
        <img src={gifUrl} alt={query}
          style={{width:"100%",height:"100%",objectFit:"cover"}}
          onError={()=>setGifUrl(null)}/>
      )}
      {!loading && !gifUrl && (
        <div style={{fontSize:"40px",opacity:.4}}>🎬</div>
      )}
      {/* label */}
      <div style={{position:"absolute",bottom:"6px",right:"8px",background:"rgba(0,0,0,.5)",borderRadius:"6px",padding:"2px 8px",fontSize:"10px",color:"#fff",fontWeight:"700"}}>
        GIF
      </div>
    </div>
  );
}

