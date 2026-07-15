import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("PassionAI crashed:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight:"100vh", background:"#FFFBF0", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"16px", padding:"32px", fontFamily:"'Sora','DM Sans',sans-serif" }}>
          <div style={{ fontSize:"48px" }}>😵</div>
          <div style={{ fontSize:"20px", fontWeight:"900", color:"#1C1208" }}>Something went wrong</div>
          <div style={{ fontSize:"14px", color:"#9A8040", textAlign:"center", lineHeight:"1.6" }}>
            {this.state.error?.message || "An unexpected error occurred"}
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{ background:"linear-gradient(135deg,#D4A017,#FF6B2B)", border:"none", borderRadius:"16px", padding:"14px 28px", cursor:"pointer", fontSize:"15px", fontWeight:"800", color:"#fff" }}>
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
