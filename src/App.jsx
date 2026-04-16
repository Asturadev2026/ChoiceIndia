import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const C = {
  pri: "#0052CC", priL: "#E8F1FF", priD: "#003A8C", priM: "#2B7FFF",
  acc: "#00B341", accL: "#E6F9EE", accD: "#008A30",
  bg: "#F5F7FA", wh: "#FFFFFF", tx: "#14243D", txL: "#6B7D99", txXL: "#94A3BB",
  brd: "#E4EAF1", danger: "#EF4444", dangerL: "#FEE2E2",
  warn: "#F59E0B", warnL: "#FEF3C7", success: "#10B981", successL: "#D1FAE5",
  purple: "#7C3AED", purpleL: "#EDE9FE", teal: "#0D9488", tealL: "#CCFBF1",
  pink: "#EC4899", pinkL: "#FCE7F3", orange: "#F97316", orangeL: "#FFF7ED",
};

// ===================== ICONS =====================
const Ic = ({ n, s = 16, c = "currentColor", f }) => {
  const d = {
    dash: "M4 6h16M4 12h8M4 18h16", chat: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
    ticket: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm8 10v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    chart: "M18 20V10M12 20V4M6 20v-6", bot: "M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7v3a7 7 0 01-7 7H9a7 7 0 01-7-7v-3a7 7 0 017-7h1V5.73A2 2 0 0112 2z",
    escalation: "M13 17l5-5-5-5M6 17l5-5-5-5", bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
    send: "M22 2L11 13M22 2l-7 20-4-9-9-4z", search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    x: "M18 6L6 18M6 6l12 12", check: "M20 6L9 17l-5-5", plus: "M12 5v14M5 12h14",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z",
    clock: "M12 6v6l4 2M22 12A10 10 0 112 12a10 10 0 0120 0z", filter: "M22 3H2l8 9.46V19l4 2v-8.54z",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z",
    eyeOff: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22",
    zap: "M13 2L3 14h9l-1 8 10-12h-9z", target: "M22 12A10 10 0 112 12a10 10 0 0120 0zM22 12A6 6 0 116 12a6 6 0 0116 0zM22 12A2 2 0 1110 12a2 2 0 014 0z",
    route: "M3 12h4l3-9 4 18 3-9h4", phone: "M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013 5.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z",
    mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm16 2l-8 5-8-5",
    brain: "M12 2a8 8 0 018 8c0 3.5-2 6-4 7.5V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1.5C6 16 4 13.5 4 10a8 8 0 018-8z",
    queue: "M3 6h18M3 12h18M3 18h18", tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01",
    kb: "M4 7v10c0 1.1.9 2 2 2h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2zM8 10h.01M12 10h.01M16 10h.01M8 14h8",
    whisper: "M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z",
    workflow: "M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1011 16H22M2 12h20",
    survey: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8",
    megaphone: "M3 11l18-5v12L3 13v-2z", globe: "M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
    layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    award: "M12 15a7 7 0 100-14 7 7 0 000 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
    refresh: "M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 005.64 5.64L1 10m22 4a9 9 0 01-14.85 4.36L23 14",
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
    lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4",
    key: "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4",
    mobile: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    arrowR: "M5 12h14M12 5l7 7-7 7",
    logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill={f||"none"} stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d[n]||d.dash}/></svg>;
};

// ===================== LOGIN PAGE =====================
const LoginPage = ({ onLogin }) => {
  const [tab, setTab] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [keep, setKeep] = useState(false);

  const features = [
    { icon: "chat", text: "Omnichannel conversations" },
    { icon: "shield", text: "AI-powered escalation matrix" },
    { icon: "chart", text: "Real-time analytics & NPS" },
    { icon: "bot", text: "Smart chatbot & whisper mode" },
  ];

  const handleSignIn = () => {
    setError("");
    if (otpMode) { onLogin(); return; }
    if (tab === "email") {
      if (!email || !password) { setError("Please enter your email and password."); return; }
      if (!email.includes("@")) { setError("Please enter a valid email address."); return; }
    } else {
      if (!mobile || mobile.length < 10) { setError("Please enter a valid 10-digit mobile number."); return; }
      if (!otp || otp.length < 4) { setError("Please enter the OTP."); return; }
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };

  const sendOtp = () => {
    if (tab === "email" && !email) { setError("Enter email to receive OTP."); return; }
    if (tab === "mobile" && mobile.length < 10) { setError("Enter valid mobile number."); return; }
    setError(""); setOtpMode(true); setOtpSent(true);
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Outfit','DM Sans',system-ui,sans-serif", overflow: "hidden" }}>
      {/* Left Panel */}
      <div style={{ width: "50%", background: "linear-gradient(160deg, #0a2a6e 0%, #0052CC 55%, #1a6fd4 100%)", display: "flex", flexDirection: "column", padding: "40px 48px", position: "relative", overflow: "hidden" }}>
        {/* BG circles */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 260, height: 260, borderRadius: "50%", background: "rgba(0,179,65,0.08)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", top: "40%", left: "60%", width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }}/>

        {/* Logo */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ background: C.wh, borderRadius: 10, padding: "8px 14px", display: "inline-flex", flexDirection: "column", lineHeight: 1.15, boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
            <span style={{ fontWeight: 900, fontSize: 20, color: "#1a1a1a", fontFamily: "Georgia,serif", letterSpacing: -0.5 }}>Choice</span>
            <span style={{ fontSize: 10, color: "#1479C8", fontWeight: 600, letterSpacing: 0.3 }}>The Joy of Earning</span>
          </div>
        </div>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 99, padding: "5px 14px", width: "fit-content", marginBottom: 28 }}>
          <div style={{ width: 6, height: 6, borderRadius: 99, background: C.acc }}/>
          <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontWeight: 600, letterSpacing: 1.5 }}>CX PLATFORM · V3.0</span>
        </div>

        {/* Headline */}
        <div style={{ color: C.wh, fontSize: 42, fontWeight: 800, lineHeight: 1.15, marginBottom: 12, letterSpacing: -1 }}>
          Investment Mein<br/>
          <span style={{ color: "#7EC8FF", fontStyle: "italic" }}>#NoConfusion</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.7, maxWidth: 380, marginBottom: 40 }}>
          Sign in to the Choice CX workspace to manage client portfolios, track service tickets, and deliver the Choice FinX experience across stocks, F&O, mutual funds, and more.
        </p>

        {/* Features */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Ic n={f.icon} s={15} c="rgba(255,255,255,0.85)"/>
              </div>
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Bottom footer */}
        <div style={{ marginTop: "auto", color: "rgba(255,255,255,0.3)", fontSize: 11 }}>© 2026 Choice International Ltd. All rights reserved.</div>
      </div>

      {/* Right Panel */}
      <div style={{ width: "50%", background: "#F7F9FC", display: "flex", alignItems: "center", justifyContent: "center", padding: 48 }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: C.tx, marginBottom: 8, letterSpacing: -0.5 }}>Welcome back.</h2>
            <p style={{ color: C.txL, fontSize: 14, lineHeight: 1.6 }}>Sign in to your CX Platform account to continue where you left off.</p>
          </div>

          {/* Tab toggle */}
          <div style={{ display: "flex", background: C.wh, border: `1px solid ${C.brd}`, borderRadius: 10, padding: 4, marginBottom: 28, gap: 4 }}>
            {[{k:"email",i:"mail",l:"Email"},{k:"mobile",i:"mobile",l:"Mobile"}].map(t => (
              <button key={t.k} onClick={() => { setTab(t.k); setError(""); setOtpMode(false); setOtpSent(false); }} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px 0", borderRadius: 7, border: "none", background: tab === t.k ? C.pri : "transparent", color: tab === t.k ? C.wh : C.txL, fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.15s" }}>
                <Ic n={t.i} s={14} c={tab === t.k ? C.wh : C.txL}/>{t.l}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && <div style={{ padding: "10px 14px", background: C.dangerL, border: `1px solid #FECACA`, borderRadius: 8, color: C.danger, fontSize: 12, fontWeight: 500, marginBottom: 16 }}>{error}</div>}

          {tab === "email" && !otpMode && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.tx, display: "block", marginBottom: 6 }}>Email address</label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }}><Ic n="mail" s={15} c={C.txL}/></div>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@choiceindia.com" style={{ width: "100%", padding: "11px 12px 11px 40px", borderRadius: 9, border: `1.5px solid ${C.brd}`, fontSize: 13, outline: "none", background: C.wh, boxSizing: "border-box", transition: "border 0.15s" }} onFocus={e => e.target.style.borderColor = C.pri} onBlur={e => e.target.style.borderColor = C.brd}/>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.tx, display: "block", marginBottom: 6 }}>Password</label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }}><Ic n="lock" s={15} c={C.txL}/></div>
                  <input value={password} onChange={e => setPassword(e.target.value)} type={showPass ? "text" : "password"} placeholder="Enter your password" style={{ width: "100%", padding: "11px 40px 11px 40px", borderRadius: 9, border: `1.5px solid ${C.brd}`, fontSize: 13, outline: "none", background: C.wh, boxSizing: "border-box" }} onFocus={e => e.target.style.borderColor = C.pri} onBlur={e => e.target.style.borderColor = C.brd} onKeyDown={e => e.key === "Enter" && handleSignIn()}/>
                  <div onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}><Ic n={showPass ? "eyeOff" : "eye"} s={15} c={C.txL}/></div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 13, color: C.txL }}>
                  <input type="checkbox" checked={keep} onChange={e => setKeep(e.target.checked)} style={{ width: 15, height: 15, accentColor: C.pri }}/> Keep me signed in
                </label>
                <span style={{ fontSize: 13, color: C.pri, fontWeight: 600, cursor: "pointer" }}>Forgot password?</span>
              </div>
            </div>
          )}

          {tab === "mobile" && !otpMode && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.tx, display: "block", marginBottom: 6 }}>Mobile number</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ padding: "11px 12px", background: C.wh, border: `1.5px solid ${C.brd}`, borderRadius: 9, fontSize: 13, color: C.txL, fontWeight: 600, flexShrink: 0 }}>🇮🇳 +91</div>
                  <input value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="98765 43210" style={{ flex: 1, padding: "11px 12px", borderRadius: 9, border: `1.5px solid ${C.brd}`, fontSize: 13, outline: "none", background: C.wh, boxSizing: "border-box" }} onFocus={e => e.target.style.borderColor = C.pri} onBlur={e => e.target.style.borderColor = C.brd}/>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.tx, display: "block", marginBottom: 6 }}>OTP</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g,"").slice(0,6))} placeholder="Enter OTP" style={{ width: "100%", padding: "11px 12px", borderRadius: 9, border: `1.5px solid ${C.brd}`, fontSize: 13, outline: "none", background: C.wh, boxSizing: "border-box" }} onFocus={e => e.target.style.borderColor = C.pri} onBlur={e => e.target.style.borderColor = C.brd}/>
                  </div>
                  <button onClick={() => { setOtpSent(true); }} style={{ padding: "0 16px", borderRadius: 9, border: `1.5px solid ${C.pri}`, background: C.wh, color: C.pri, fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>{otpSent ? "Resend" : "Send OTP"}</button>
                </div>
                {otpSent && <p style={{ fontSize: 11, color: C.acc, marginTop: 6 }}>✓ OTP sent to +91 {mobile}</p>}
              </div>
            </div>
          )}

          {otpMode && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ padding: 14, background: C.accL, borderRadius: 9, fontSize: 13, color: C.accD }}>✓ OTP sent to {email || "+91 " + mobile}</div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.tx, display: "block", marginBottom: 6 }}>Enter OTP</label>
                <input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g,"").slice(0,6))} placeholder="6-digit OTP" style={{ width: "100%", padding: "11px 12px", borderRadius: 9, border: `1.5px solid ${C.brd}`, fontSize: 13, outline: "none", background: C.wh, boxSizing: "border-box", letterSpacing: 4, textAlign: "center" }} onFocus={e => e.target.style.borderColor = C.pri} onBlur={e => e.target.style.borderColor = C.brd}/>
              </div>
              <p onClick={() => setOtpMode(false)} style={{ fontSize: 12, color: C.txL, cursor: "pointer" }}>← Back to password login</p>
            </div>
          )}

          {/* Sign in button */}
          <button onClick={handleSignIn} disabled={loading} style={{ width: "100%", marginTop: 22, padding: "13px 0", borderRadius: 10, border: "none", background: loading ? C.txL : `linear-gradient(135deg, ${C.pri}, #1a6fd4)`, color: C.wh, fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 14px rgba(0,82,204,0.3)", transition: "all 0.2s" }}>
            {loading ? <>Signing in…</> : <>{otpMode ? "Verify & Sign In" : "Sign in securely"} <Ic n="arrowR" s={16} c={C.wh}/></>}
          </button>

          {/* OR divider */}
          {!otpMode && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
                <div style={{ flex: 1, height: 1, background: C.brd }}/><span style={{ fontSize: 11, color: C.txL, fontWeight: 500 }}>OR</span><div style={{ flex: 1, height: 1, background: C.brd }}/>
              </div>
              <button onClick={sendOtp} style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: `1.5px solid ${C.brd}`, background: C.wh, color: C.tx, fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Ic n="key" s={15} c={C.txL}/> Sign in with OTP
              </button>
            </>
          )}

          <p style={{ textAlign: "center", fontSize: 11, color: C.txL, marginTop: 24 }}>Protected by 256-bit SSL encryption · Compliant with SEBI & IRDAI guidelines</p>
        </div>
      </div>
    </div>
  );
};

// ===================== SHARED UI =====================
const Bdg = ({ t, v = "def" }) => {
  const s = { def: { bg: C.priL, c: C.pri }, suc: { bg: C.successL, c: C.success }, dan: { bg: C.dangerL, c: C.danger }, war: { bg: C.warnL, c: C.warn }, acc: { bg: C.accL, c: C.acc }, pur: { bg: C.purpleL, c: C.purple }, teal: { bg: C.tealL, c: C.teal }, pink: { bg: C.pinkL, c: C.pink } };
  const st = s[v] || s.def;
  return <span style={{ background: st.bg, color: st.c, padding: "2px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", display: "inline-block" }}>{t}</span>;
};
const priBdg = p => p === "Critical" ? <Bdg t="Critical" v="dan"/> : p === "High" ? <Bdg t="High" v="war"/> : p === "Medium" ? <Bdg t="Medium" v="def"/> : <Bdg t="Low" v="suc"/>;
const stBdg = s => s === "Active" || s === "Open" || s === "Breached" ? <Bdg t={s} v="dan"/> : s === "Pending" || s === "In Progress" || s === "At Risk" ? <Bdg t={s} v="war"/> : <Bdg t={s} v="suc"/>;
const Card = ({ children, style: sx }) => <div style={{ background: C.wh, borderRadius: 14, border: `1px solid ${C.brd}`, ...sx }}>{children}</div>;
const CardH = ({ title, sub, right }) => <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.brd}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><div style={{ fontWeight: 700, fontSize: 14 }}>{title}</div>{sub && <div style={{ fontSize: 11, color: C.txL, marginTop: 2 }}>{sub}</div>}</div>{right}</div>;
const Tabs = ({ tabs, active, set }) => <div style={{ display: "flex", gap: 4, background: C.bg, borderRadius: 10, padding: 3 }}>{tabs.map(t => <button key={t} onClick={() => set(t)} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: active === t ? C.wh : "transparent", color: active === t ? C.pri : C.txL, fontWeight: 600, fontSize: 12, cursor: "pointer", boxShadow: active === t ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>{t}</button>)}</div>;
const Metric = ({ label, value, icon, trend, sub, color = C.pri }) => (
  <Card style={{ padding: "14px 12px", flex: "1 1 0", minWidth: 0 }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div><div style={{ fontSize: 11, color: C.txL, fontWeight: 500, marginBottom: 6 }}>{label}</div><div style={{ fontSize: 24, fontWeight: 800, color: C.tx }}>{value}</div>{sub && <div style={{ fontSize: 11, color: C.txL, marginTop: 3 }}>{sub}</div>}</div>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n={icon} s={17} c={color}/></div>
    </div>
    {trend && <div style={{ marginTop: 8, fontSize: 11, fontWeight: 700, color: trend.startsWith("+") && !trend.includes("breach") ? C.acc : C.danger }}>{trend}</div>}
  </Card>
);

// ===================== DATA =====================
const escalationMatrix = [
  { level: "L0 — AI Bot", timeframe: "0-2 min", handler: "Choice AI Assistant", actions: "Auto-resolve FAQs, account status, charges info, IPO status", sla: "Instant", autoEscalate: "If confidence < 70% or customer asks for agent" },
  { level: "L1 — Frontline Agent", timeframe: "2-15 min", handler: "Support Agents (Priya, Vikram, Neha)", actions: "Account issues, trading queries, app help, SIP changes", sla: "15 min first response", autoEscalate: "If unresolved in 30 min or priority = High" },
  { level: "L2 — Senior Agent", timeframe: "15-60 min", handler: "Senior Support (Team Leads)", actions: "Brokerage disputes, margin calls, complex KYC, fund transfers", sla: "1 hour resolution", autoEscalate: "If unresolved in 2 hours or customer threatens escalation" },
  { level: "L3 — Manager", timeframe: "1-4 hours", handler: "CX Manager (Deepak Joshi)", actions: "Regulatory complaints, large refunds (>Rs.10K), data issues", sla: "4 hour resolution", autoEscalate: "If unresolved in 4 hours or SEBI/exchange complaint" },
  { level: "L4 — Head of CX", timeframe: "4-24 hours", handler: "VP Customer Experience", actions: "Legal threats, media escalations, VIP clients, system failures", sla: "Same business day", autoEscalate: "CEO notification if reputational risk" },
  { level: "L5 — C-Suite", timeframe: "24-48 hours", handler: "CEO / Compliance Head", actions: "Regulatory action, legal proceedings, board-level issues", sla: "48 hour max", autoEscalate: "Board notification" },
];
const slaBreaches = [
  { id: "TKT-5021", customer: "Deepak Verma", subject: "Brokerage overcharge refund", sla: "4h", elapsed: "6h 12m", status: "Breached", level: "L2", assignee: "Unassigned", priority: "Critical" },
  { id: "TKT-5018", customer: "Rajesh Kumar", subject: "Margin shortfall alert incorrect", sla: "6h", elapsed: "5h 40m", status: "At Risk", level: "L1", assignee: "Neha K.", priority: "High" },
  { id: "TKT-5024", customer: "Meena Devi", subject: "Fund withdrawal stuck 3 days", sla: "8h", elapsed: "7h 10m", status: "At Risk", level: "L2", assignee: "Arjun N.", priority: "High" },
  { id: "TKT-5025", customer: "Amit Jain", subject: "Unauthorized trade on account", sla: "2h", elapsed: "3h 45m", status: "Breached", level: "L3", assignee: "Deepak J.", priority: "Critical" },
];
const conversations = [
  { id: "CID-10042", customer: "Rahul Sharma", channel: "WhatsApp", subject: "Demat account opening delay", status: "Active", agent: "Priya M.", priority: "High", sentiment: "Negative", csat: null, tags: ["Account", "KYC"], startTime: "09:12", msgs: [{ from: "customer", text: "Hi, I applied for a demat account 5 days ago. No update yet.", time: "09:12" },{ from: "bot", text: "Application #DA-78432 found. Status: KYC Verification Pending. Estimated completion: 24 hours.", time: "09:12" },{ from: "agent", text: "Rahul, your KYC is in final verification. I'll personally track this and update you by 5 PM today.", time: "09:14" },{ from: "customer", text: "Okay, please make sure it happens this time.", time: "09:15" }]},
  { id: "CID-10041", customer: "Anita Patel", channel: "App Chat", subject: "IPO application not reflecting", status: "Active", agent: "Vikram S.", priority: "Medium", sentiment: "Neutral", csat: null, tags: ["IPO", "Portfolio"], startTime: "08:45", msgs: [{ from: "customer", text: "I applied for the Nexgen Tech IPO yesterday but can't see it anywhere.", time: "08:45" },{ from: "bot", text: "IPO Bid found: Nexgen Technologies, Lot: 1, Amount: Rs. 14,820. Status: Bid Submitted. Allotment date: April 18.", time: "08:46" },{ from: "agent", text: "Your bid is confirmed. It'll show in portfolio after allotment on April 18.", time: "08:47" }]},
  { id: "CID-10040", customer: "Deepak Verma", channel: "Email", subject: "Brokerage overcharged on F&O trade", status: "Pending", agent: "Unassigned", priority: "Critical", sentiment: "Negative", csat: null, tags: ["Billing", "F&O", "Refund"], startTime: "07:30", msgs: [{ from: "customer", text: "My last 5 F&O trades show Rs. 120/lot brokerage. My plan says Rs. 20/lot. Total overcharge Rs. 500. Refund immediately or I'm filing with SEBI.", time: "07:30" }]},
  { id: "CID-10039", customer: "Sneha Iyer", channel: "Phone", subject: "SIP modification", status: "Resolved", agent: "Priya M.", priority: "Low", sentiment: "Positive", csat: 5, tags: ["Mutual Fund", "SIP"], startTime: "16:20", msgs: [{ from: "customer", text: "Change my SIP from Rs. 5000 to Rs. 10000 for Axis Bluechip Fund.", time: "16:20" },{ from: "agent", text: "Done. SIP updated to Rs. 10,000/month starting May 2026.", time: "16:25" },{ from: "customer", text: "Thank you, perfect!", time: "16:26" }]},
  { id: "CID-10038", customer: "Mohan Gupta", channel: "WhatsApp", subject: "FinX app login failure", status: "Resolved", agent: "Vikram S.", priority: "Medium", sentiment: "Positive", csat: 4, tags: ["Technical", "App"], startTime: "14:10", msgs: [{ from: "customer", text: "App says invalid password. I reset it 5 mins ago.", time: "14:10" },{ from: "bot", text: "Password reset detected at 14:05. Suggest force-close app and retry after 60 seconds.", time: "14:10" },{ from: "agent", text: "Force close and reopen the app. New password takes ~60s to sync.", time: "14:11" },{ from: "customer", text: "Working now, thanks!", time: "14:13" }]},
  { id: "CID-10036", customer: "Amit Jain", channel: "Phone", subject: "Unauthorized trade on account", status: "Active", agent: "Deepak J.", priority: "Critical", sentiment: "Negative", csat: null, tags: ["Security", "Fraud", "Urgent"], startTime: "06:45", msgs: [{ from: "customer", text: "There are 3 trades on my account I never placed. Block it NOW.", time: "06:45" },{ from: "agent", text: "I've immediately frozen your trading account. Reference: SEC-4421.", time: "06:48" }]},
];
const tickets = [
  { id: "TKT-5021", subject: "Brokerage overcharge refund", customer: "Deepak Verma", cat: "Billing", pri: "Critical", status: "Open", created: "2026-04-15 07:35", sla: "4h", assignee: "Unassigned", esc: "L2", desc: "Customer charged Rs. 120/lot instead of Rs. 20/lot on 5 F&O trades. Overcharge: Rs. 500. Customer threatening SEBI complaint." },
  { id: "TKT-5025", subject: "Unauthorized trade investigation", customer: "Amit Jain", cat: "Security", pri: "Critical", status: "In Progress", created: "2026-04-15 06:50", sla: "2h", assignee: "Deepak J.", esc: "L3", desc: "3 unauthorized trades detected. Account frozen. Security audit in progress. Reference: SEC-4421." },
  { id: "TKT-5020", subject: "Demat KYC delay - 5 days", customer: "Rahul Sharma", cat: "Account", pri: "High", status: "In Progress", created: "2026-04-15 09:15", sla: "8h", assignee: "Priya M.", esc: "L1", desc: "Application DA-78432 pending KYC for 5 days." },
  { id: "TKT-5019", subject: "IPO bid not visible", customer: "Anita Patel", cat: "Trading", pri: "Medium", status: "In Progress", created: "2026-04-15 08:50", sla: "12h", assignee: "Vikram S.", esc: "L1", desc: "Nexgen Tech IPO bid confirmed but not visible. Allotment April 18." },
  { id: "TKT-5018", subject: "False margin shortfall alert", customer: "Rajesh Kumar", cat: "Trading", pri: "High", status: "Open", created: "2026-04-14 15:00", sla: "6h", assignee: "Unassigned", esc: "L1", desc: "Alert triggered despite Rs. 2,45,000 balance against Rs. 1,80,000 requirement." },
  { id: "TKT-5024", subject: "Fund withdrawal stuck 3 days", customer: "Meena Devi", cat: "Account", pri: "High", status: "In Progress", created: "2026-04-13 11:00", sla: "8h", assignee: "Arjun N.", esc: "L2", desc: "Rs. 85,000 withdrawal initiated 3 days ago. Funds not received. Bank: HDFC." },
  { id: "TKT-5017", subject: "SIP modification", customer: "Sneha Iyer", cat: "Mutual Funds", pri: "Low", status: "Closed", created: "2026-04-14 16:30", sla: "24h", assignee: "Priya M.", esc: "L1", desc: "SIP updated from Rs. 5K to Rs. 10K." },
  { id: "TKT-5016", subject: "App login sync delay", customer: "Mohan Gupta", cat: "Technical", pri: "Medium", status: "Closed", created: "2026-04-14 14:15", sla: "4h", assignee: "Vikram S.", esc: "L0", desc: "Resolved by force-close." },
];
const agents = [
  { id: "AG-01", name: "Priya Mehta", status: "Online", chats: 3, capacity: 5, resolved: 42, avgResp: "1.2m", csat: 4.7, quality: 94, spec: "Accounts & MF", skills: ["Account Opening","KYC","SIP","NPS"], languages: ["English","Hindi","Marathi"] },
  { id: "AG-02", name: "Vikram Singh", status: "Online", chats: 2, capacity: 5, resolved: 38, avgResp: "1.8m", csat: 4.5, quality: 91, spec: "Trading & IPO", skills: ["F&O","IPO","Stocks","Commodities"], languages: ["English","Hindi"] },
  { id: "AG-03", name: "Neha Kapoor", status: "Away", chats: 0, capacity: 5, resolved: 35, avgResp: "2.1m", csat: 4.3, quality: 88, spec: "Technical Support", skills: ["App Issues","Login","API","FinX"], languages: ["English","Hindi","Gujarati"] },
  { id: "AG-04", name: "Arjun Nair", status: "Offline", chats: 0, capacity: 4, resolved: 29, avgResp: "2.5m", csat: 4.1, quality: 85, spec: "Billing & Compliance", skills: ["Brokerage","Refunds","Compliance","Charges"], languages: ["English","Hindi","Tamil"] },
  { id: "AG-05", name: "Deepak Joshi", status: "Online", chats: 1, capacity: 3, resolved: 58, avgResp: "3.2m", csat: 4.8, quality: 97, spec: "CX Manager / Escalations", skills: ["Escalations","VIP","Security","Regulatory"], languages: ["English","Hindi"] },
];
const customer360 = {
  "Rahul Sharma": { id: "CUS-44210", phone: "+91-98765-43210", email: "rahul.sharma@gmail.com", segment: "New", ltv: "Rs. 0 (Pending)", accountAge: "5 days", products: ["Demat (Pending)"], tickets: 1, csat: null, nps: null, lastLogin: "Apr 15 09:00", riskScore: "Low" },
  "Deepak Verma": { id: "CUS-31087", phone: "+91-98111-22334", email: "deepak.v@outlook.com", segment: "Premium", ltv: "Rs. 4,52,000", accountAge: "3.2 years", products: ["Stocks","F&O","MF SIP"], tickets: 4, csat: 3.2, nps: -10, lastLogin: "Apr 15 07:20", riskScore: "High (Churn)" },
  "Amit Jain": { id: "CUS-28445", phone: "+91-99887-66554", email: "amit.jain@company.co", segment: "VIP", ltv: "Rs. 18,70,000", accountAge: "5.8 years", products: ["Stocks","F&O","PMS","MF","Bonds"], tickets: 2, csat: 4.0, nps: 30, lastLogin: "Apr 15 06:30", riskScore: "Critical (Security)" },
};
const cannedResponses = [
  { cat: "Greeting", title: "Welcome", text: "Welcome to Choice support. I'm here to help you. Could you share your registered mobile number or client ID?" },
  { cat: "Account", title: "KYC Status", text: "I've checked your KYC status. It's currently under verification. Expected completion: [TIME]. I'll track this personally." },
  { cat: "Billing", title: "Brokerage Plan", text: "Your current plan: Equity Delivery — Free (Year 1), F&O — Rs. 20/order, Commodities — Rs. 20/order." },
  { cat: "Billing", title: "Refund Initiated", text: "I've initiated a refund of Rs. [AMOUNT] to your registered bank account. Processing time: 3-5 business days. Reference: [REF]." },
  { cat: "Trading", title: "IPO Status", text: "Your IPO application for [IPO_NAME] is confirmed. Allotment date: [DATE]. Status will reflect in portfolio post-allotment." },
  { cat: "Technical", title: "App Login Fix", text: "Force close the FinX app, clear cache (Settings > Apps > FinX), then reopen. Password sync takes ~60 seconds after reset." },
  { cat: "Escalation", title: "Escalating", text: "I understand your concern. I'm escalating this to our [LEVEL] team for priority handling. You'll receive an update within [TIME]." },
  { cat: "Closing", title: "Resolution", text: "Your issue has been resolved. Is there anything else I can help with? Please rate your experience when prompted." },
];
const autoRules = [
  { name: "VIP Auto-Priority", condition: "Customer segment = VIP", action: "Set priority to Critical, assign to Deepak J.", status: true },
  { name: "Fraud Alert Fast-Track", condition: 'Keywords: "unauthorized", "fraud", "hacked"', action: "Priority = Critical, Escalate to L3, Freeze account alert", status: true },
  { name: "Billing Round-Robin", condition: "Category = Billing", action: "Round-robin assign to Billing team", status: true },
  { name: "After-Hours Bot", condition: "Time: 7PM - 8:30AM", action: "Bot handles all, creates tickets for morning", status: true },
  { name: "SEBI Keyword Escalation", condition: 'Keywords: "SEBI", "regulatory", "legal", "lawyer"', action: "Escalate to L3 + notify CX Manager", status: true },
  { name: "Negative Sentiment Alert", condition: "AI Sentiment = Negative + 2 messages", action: "Flag for supervisor review, suggest agent response", status: true },
  { name: "SIP/MF to Priya", condition: "Category = Mutual Fund OR SIP", action: "Assign to Priya M. (specialist)", status: false },
  { name: "Idle Conversation Nudge", condition: "No agent reply for 5 min", action: "Send automated acknowledgment + notify agent", status: true },
];
const qualityScores = [
  { agent: "Priya Mehta", greeting: 98, empathy: 95, accuracy: 92, resolution: 96, compliance: 100, overall: 94 },
  { agent: "Vikram Singh", greeting: 95, empathy: 88, accuracy: 94, resolution: 90, compliance: 98, overall: 91 },
  { agent: "Neha Kapoor", greeting: 90, empathy: 85, accuracy: 90, resolution: 88, compliance: 95, overall: 88 },
  { agent: "Arjun Nair", greeting: 88, empathy: 82, accuracy: 88, resolution: 85, compliance: 92, overall: 85 },
  { agent: "Deepak Joshi", greeting: 100, empathy: 98, accuracy: 96, resolution: 97, compliance: 100, overall: 97 },
];
const surveyData = { csat: { avg: 4.5, responses: 842, dist: [2, 4, 8, 28, 58] }, nps: { score: 42, promoters: 58, passives: 26, detractors: 16, responses: 634 }, ces: { avg: 2.1, responses: 512 } };

// ===================== SIDEBAR =====================
const Sidebar = ({ pg, setPg, col }) => {
  const items = [
    { k: "dashboard", i: "dash", l: "Dashboard" },{ k: "conversations", i: "chat", l: "Conversations" },{ k: "tickets", i: "ticket", l: "Tickets" },
    { k: "escalation", i: "escalation", l: "Escalation Matrix" },{ k: "sla", i: "shield", l: "SLA Tracker" },{ k: "agents", i: "users", l: "Agents" },
    { k: "quality", i: "award", l: "Quality Scoring" },{ k: "routing", i: "route", l: "Smart Routing" },{ k: "canned", i: "zap", l: "Canned Responses" },
    { k: "surveys", i: "survey", l: "CSAT / NPS / CES" },{ k: "analytics", i: "chart", l: "Analytics" },{ k: "botconfig", i: "bot", l: "AI Bot Config" },
    { k: "knowledge", i: "kb", l: "Knowledge Base" },{ k: "automation", i: "workflow", l: "Automation Rules" },{ k: "chatbot", i: "send", l: "Chatbot Preview" },
  ];
  return (
    <div style={{ width: col ? 58 : 210, background: `linear-gradient(180deg, ${C.priD} 0%, #002266 100%)`, color: C.wh, display: "flex", flexDirection: "column", transition: "width 0.2s", flexShrink: 0, overflowY: "auto", overflowX: "hidden" }}>
      <div style={{ padding: col ? "8px 6px" : "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: col ? "center" : "flex-start", height: 52, flexShrink: 0 }}>
        {col ? (
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.wh, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
            <span style={{ fontWeight: 900, fontSize: 15, color: C.pri }}>C</span>
          </div>
        ) : (
          <div style={{ background: C.wh, borderRadius: 8, padding: "4px 8px", display: "flex", alignItems: "center", height: 36, overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span style={{ fontWeight: 900, fontSize: 15, color: "#1a1a1a", fontFamily: "Georgia,serif", letterSpacing: -0.3 }}>Choice</span>
              <span style={{ fontSize: 8.5, color: "#1479C8", fontWeight: 600, letterSpacing: 0.2 }}>The Joy of Earning</span>
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: "8px 6px", flex: 1 }}>
        {items.map(it => (
          <div key={it.k} onClick={() => setPg(it.k)} style={{ display: "flex", alignItems: "center", gap: 10, padding: col ? "9px 10px" : "8px 12px", borderRadius: 8, marginBottom: 1, cursor: "pointer", background: pg === it.k ? "rgba(255,255,255,0.14)" : "transparent", color: pg === it.k ? C.wh : "rgba(255,255,255,0.55)", fontWeight: pg === it.k ? 600 : 400, fontSize: 12.5, transition: "all 0.12s", justifyContent: col ? "center" : "flex-start" }}>
            <Ic n={it.i} s={16}/>{!col && <span style={{ whiteSpace: "nowrap" }}>{it.l}</span>}
          </div>
        ))}
      </div>
      {!col && <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Choice CX Platform v3.0</div>}
    </div>
  );
};

// ===================== TOPBAR =====================
const TopBar = ({ pg, toggle, onLogout }) => (
  <div style={{ height: 52, background: C.wh, borderBottom: `1px solid ${C.brd}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div onClick={toggle} style={{ cursor: "pointer", padding: 4 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.txL} strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg></div>
      <span style={{ fontWeight: 700, fontSize: 15, color: C.tx }}>{pg === "botconfig" ? "AI Bot Config" : pg === "sla" ? "SLA Breach Tracker" : pg === "canned" ? "Canned Responses" : pg === "chatbot" ? "Chatbot Preview" : pg.charAt(0).toUpperCase() + pg.slice(1)}</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ padding: "5px 12px", borderRadius: 8, background: C.dangerL, fontSize: 11, fontWeight: 700, color: C.danger }}>2 SLA Breaches</div>
      <div style={{ position: "relative" }}><Ic n="bell" s={18} c={C.txL}/><div style={{ position: "absolute", top: -2, right: -2, width: 7, height: 7, borderRadius: 99, background: C.danger }}/></div>
      <div style={{ width: 32, height: 32, borderRadius: 99, background: C.priL, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, color: C.pri }}>AK</div>
      <div onClick={onLogout} title="Sign out" style={{ cursor: "pointer", padding: 4 }}><Ic n="logout" s={17} c={C.txL}/></div>
    </div>
  </div>
);

// ===================== PAGES =====================
const Dashboard = () => (
  <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
      <Metric label="Total Conversations" value="1,248" icon="chat" trend="+8% vs last week" sub="This month"/>
      <Metric label="Active Now" value="47" icon="users" sub="Live conversations" color={C.acc}/>
      <Metric label="Avg First Response" value="1.4m" icon="clock" trend="-12%" sub="Target: 2 min"/>
      <Metric label="CSAT Score" value="4.5/5" icon="star" trend="+0.3" color={C.warn}/>
    </div>
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
      <Metric label="Resolution Rate" value="89%" icon="check" trend="+4%" color={C.acc}/>
      <Metric label="Bot Deflection" value="34%" icon="bot" trend="+6%" sub="Auto-resolved" color={C.teal}/>
      <Metric label="SLA Compliance" value="92%" icon="shield" trend="-2% (2 breaches)" color={C.danger}/>
      <Metric label="NPS Score" value="+42" icon="megaphone" trend="+5 pts" color={C.purple}/>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 18 }}>
      <Card>
        <CardH title="Hourly Volume (Today)" sub="Green = peak hours"/>
        <div style={{ padding: "12px 20px 16px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 80 }}>
            {[12,18,32,45,52,68,85,92,78,65,55,48,42,38,45,52,48,35,22,15,10,8,5,3].map((v,i) => (
              <div key={i} style={{ flex: 1, background: v > 70 ? C.acc : C.pri, opacity: v > 70 ? 1 : 0.45, borderRadius: 2, height: `${(v/95)*100}%`, minHeight: 2 }}/>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.txL, marginTop: 4 }}><span>12AM</span><span>6AM</span><span>12PM</span><span>6PM</span><span>11PM</span></div>
        </div>
      </Card>
      <Card>
        <CardH title="Sentiment Live"/>
        <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          {[{ l: "Positive", v: 42, c: C.acc },{ l: "Neutral", v: 38, c: C.pri },{ l: "Negative", v: 20, c: C.danger }].map(d => (
            <div key={d.l}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}><span style={{ color: C.txL }}>{d.l}</span><span style={{ fontWeight: 700 }}>{d.v}%</span></div><div style={{ height: 7, background: C.bg, borderRadius: 99 }}><div style={{ width: `${d.v}%`, height: "100%", background: d.c, borderRadius: 99 }}/></div></div>
          ))}
        </div>
      </Card>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
      <Card>
        <CardH title="Channel Split"/>
        <div style={{ padding: "12px 20px 16px" }}>
          {[{ l: "App Chat", v: 38 },{ l: "WhatsApp", v: 28 },{ l: "Email", v: 18 },{ l: "Phone", v: 12 },{ l: "Website", v: 4 }].map(ch => (
            <div key={ch.l} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 65, fontSize: 11, color: C.txL }}>{ch.l}</div>
              <div style={{ flex: 1, height: 7, background: C.priL, borderRadius: 99 }}><div style={{ width: `${ch.v}%`, height: "100%", background: C.pri, borderRadius: 99 }}/></div>
              <div style={{ width: 28, fontSize: 11, fontWeight: 700, textAlign: "right" }}>{ch.v}%</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardH title="Top Issues"/>
        <div style={{ padding: "8px 20px 16px" }}>
          {[{ i: "Account Opening Delays", n: 156, t: "+12%" },{ i: "Brokerage Disputes", n: 98, t: "-5%" },{ i: "App Login Issues", n: 87, t: "+3%" },{ i: "IPO Status Queries", n: 76, t: "+22%" },{ i: "Fund Transfers", n: 64, t: "-8%" }].map((ti, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderBottom: idx < 4 ? `1px solid ${C.brd}` : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 20, height: 20, borderRadius: 5, background: C.priL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: C.pri }}>{idx+1}</span><span style={{ fontSize: 12 }}>{ti.i}</span></div>
              <span style={{ fontSize: 11, color: ti.t.startsWith("+") ? C.danger : C.acc, fontWeight: 600 }}>{ti.n} ({ti.t})</span>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardH title="Escalation Summary"/>
        <div style={{ padding: "12px 20px 16px" }}>
          {[{ l: "L0 Bot Resolved", v: "34%", c: C.acc },{ l: "L1 Agent Resolved", v: "48%", c: C.pri },{ l: "L2 Senior Agent", v: "12%", c: C.warn },{ l: "L3+ Manager/VP", v: "6%", c: C.danger }].map(e => (
            <div key={e.l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.brd}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: 99, background: e.c }}/><span style={{ fontSize: 12 }}>{e.l}</span></div>
              <span style={{ fontWeight: 700, fontSize: 13 }}>{e.v}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const EscalationPage = () => {
  const [sel, setSel] = useState(null);
  return (
    <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}><div><div style={{ fontWeight: 700, fontSize: 16 }}>Escalation Matrix</div><div style={{ fontSize: 12, color: C.txL }}>6-level escalation with auto-triggers and SLA timeframes</div></div><button style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: C.pri, color: C.wh, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Edit Matrix</button></div>
      <div style={{ display: "flex", gap: 0, marginBottom: 24, overflowX: "auto", paddingBottom: 8 }}>
        {escalationMatrix.map((e, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <div onClick={() => setSel(i)} style={{ width: 160, padding: 14, borderRadius: 12, background: sel === i ? C.pri : C.wh, color: sel === i ? C.wh : C.tx, border: `2px solid ${sel === i ? C.pri : i < 2 ? C.acc : i < 4 ? C.warn : C.danger}`, cursor: "pointer", transition: "all 0.15s" }}>
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.7 }}>{e.level.split("—")[0].trim()}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4 }}>{e.level.split("—")[1]?.trim()}</div>
              <div style={{ fontSize: 11, marginTop: 6, opacity: 0.8 }}>{e.timeframe}</div>
              <div style={{ fontSize: 10, marginTop: 4, padding: "2px 8px", borderRadius: 99, background: sel === i ? "rgba(255,255,255,0.2)" : i < 2 ? C.accL : i < 4 ? C.warnL : C.dangerL, color: sel === i ? C.wh : i < 2 ? C.acc : i < 4 ? C.warn : C.danger, fontWeight: 600, display: "inline-block" }}>SLA: {e.sla}</div>
            </div>
            {i < escalationMatrix.length - 1 && <div style={{ width: 24, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="escalation" s={18} c={C.txXL}/></div>}
          </div>
        ))}
      </div>
      {sel !== null && (
        <Card style={{ marginBottom: 20 }}>
          <div style={{ padding: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.pri, marginBottom: 14 }}>{escalationMatrix[sel].level}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <div><div style={{ fontSize: 11, color: C.txL, marginBottom: 4 }}>Timeframe</div><div style={{ fontSize: 14, fontWeight: 600 }}>{escalationMatrix[sel].timeframe}</div></div>
              <div><div style={{ fontSize: 11, color: C.txL, marginBottom: 4 }}>Handler</div><div style={{ fontSize: 14, fontWeight: 600 }}>{escalationMatrix[sel].handler}</div></div>
              <div><div style={{ fontSize: 11, color: C.txL, marginBottom: 4 }}>SLA Target</div><div style={{ fontSize: 14, fontWeight: 600 }}>{escalationMatrix[sel].sla}</div></div>
              <div style={{ gridColumn: "1/3" }}><div style={{ fontSize: 11, color: C.txL, marginBottom: 4 }}>Actions Handled</div><div style={{ fontSize: 13, lineHeight: 1.6 }}>{escalationMatrix[sel].actions}</div></div>
              <div><div style={{ fontSize: 11, color: C.txL, marginBottom: 4 }}>Auto-Escalate When</div><div style={{ fontSize: 13, lineHeight: 1.6, color: C.danger, fontWeight: 500 }}>{escalationMatrix[sel].autoEscalate}</div></div>
            </div>
          </div>
        </Card>
      )}
      <Card>
        <CardH title="Active Escalations Right Now" right={<Bdg t="4 Active" v="dan"/>}/>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr style={{ borderBottom: `2px solid ${C.brd}` }}>{["Ticket","Customer","Subject","Level","Elapsed","SLA","Status","Assignee"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, fontWeight: 600, color: C.txL, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>{slaBreaches.map(b => (<tr key={b.id} style={{ borderBottom: `1px solid ${C.brd}` }}><td style={{ padding: "10px 14px", fontWeight: 600, color: C.pri }}>{b.id}</td><td style={{ padding: "10px 14px" }}>{b.customer}</td><td style={{ padding: "10px 14px" }}>{b.subject}</td><td style={{ padding: "10px 14px" }}><Bdg t={b.level} v={b.level==="L3"?"dan":"war"}/></td><td style={{ padding: "10px 14px", fontWeight: 700, color: C.danger }}>{b.elapsed}</td><td style={{ padding: "10px 14px" }}>{b.sla}</td><td style={{ padding: "10px 14px" }}>{stBdg(b.status)}</td><td style={{ padding: "10px 14px" }}>{b.assignee}</td></tr>))}</tbody>
        </table>
      </Card>
    </div>
  );
};

const SLAPage = () => (
  <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
    <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
      <Metric label="SLA Compliance" value="92%" icon="shield" trend="-2%" color={C.acc}/>
      <Metric label="Active Breaches" value="2" icon="x" color={C.danger} sub="Needs action now"/>
      <Metric label="At Risk" value="2" icon="clock" color={C.warn} sub="Approaching SLA limit"/>
      <Metric label="Avg Resolution" value="28m" icon="zap" trend="-8%" color={C.pri}/>
    </div>
    <Card>
      <CardH title="SLA Breach & Risk Tracker" right={<Bdg t="Live" v="dan"/>}/>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr style={{ borderBottom: `2px solid ${C.brd}` }}>{["Ticket","Customer","Subject","Priority","SLA Limit","Elapsed","Status","Esc Level","Assignee","Action"].map(h => <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 10, fontWeight: 600, color: C.txL, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead>
          <tbody>{slaBreaches.map(b => (<tr key={b.id} style={{ borderBottom: `1px solid ${C.brd}`, background: b.status==="Breached"?C.dangerL:"transparent" }}><td style={{ padding: "10px 12px", fontWeight: 600, color: C.pri }}>{b.id}</td><td style={{ padding: "10px 12px" }}>{b.customer}</td><td style={{ padding: "10px 12px" }}>{b.subject}</td><td style={{ padding: "10px 12px" }}>{priBdg(b.priority)}</td><td style={{ padding: "10px 12px", fontWeight: 600 }}>{b.sla}</td><td style={{ padding: "10px 12px", fontWeight: 700, color: C.danger }}>{b.elapsed}</td><td style={{ padding: "10px 12px" }}>{stBdg(b.status)}</td><td style={{ padding: "10px 12px" }}><Bdg t={b.level} v={b.level.includes("3")?"dan":"war"}/></td><td style={{ padding: "10px 12px" }}>{b.assignee}</td><td style={{ padding: "10px 12px" }}><button style={{ padding: "4px 12px", borderRadius: 6, border: "none", background: C.danger, color: C.wh, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Escalate</button></td></tr>))}</tbody>
        </table>
      </div>
    </Card>
  </div>
);

const ConvPage = () => {
  const [sel, setSel] = useState(null);
  const [flt, setFlt] = useState("All");
  const [reply, setReply] = useState("");
  const [showC360, setShowC360] = useState(false);
  const [showWhisper, setShowWhisper] = useState(false);
  const conv = sel ? conversations.find(c => c.id === sel) : null;
  const filtered = flt === "All" ? conversations : conversations.filter(c => c.status === flt);
  const c360 = conv ? customer360[conv.customer] : null;
  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
      <div style={{ width: 320, borderRight: `1px solid ${C.brd}`, display: "flex", flexDirection: "column", background: C.wh, flexShrink: 0 }}>
        <div style={{ padding: "12px 14px", borderBottom: `1px solid ${C.brd}` }}>
          <Tabs tabs={["All","Active","Pending","Resolved"]} active={flt} set={setFlt}/>
          <div style={{ position: "relative", marginTop: 8 }}><input placeholder="Search..." style={{ width: "100%", padding: "7px 10px 7px 30px", borderRadius: 8, border: `1px solid ${C.brd}`, fontSize: 12, outline: "none", boxSizing: "border-box" }}/><div style={{ position: "absolute", left: 8, top: 8 }}><Ic n="search" s={14} c={C.txL}/></div></div>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {filtered.map(c => (
            <div key={c.id} onClick={() => { setSel(c.id); setShowC360(false); setShowWhisper(false); }} style={{ padding: "12px 14px", borderBottom: `1px solid ${C.brd}`, cursor: "pointer", background: sel === c.id ? C.priL : "transparent" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><span style={{ fontWeight: 600, fontSize: 12.5 }}>{c.customer}</span>{priBdg(c.priority)}</div>
              <div style={{ fontSize: 11.5, color: C.txL, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.subject}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ display: "flex", gap: 4, alignItems: "center" }}>{stBdg(c.status)}<span style={{ fontSize: 10, color: C.txL }}>{c.channel}</span></div><span style={{ fontSize: 10, color: C.txL }}>{c.startTime}</span></div>
              <div style={{ display: "flex", gap: 3, marginTop: 4, flexWrap: "wrap" }}>{c.tags.map(t => <span key={t} style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: C.bg, color: C.txL }}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
      {conv ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg }}>
          <div style={{ padding: "10px 16px", background: C.wh, borderBottom: `1px solid ${C.brd}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ fontWeight: 700, fontSize: 13 }}>{conv.customer} <span style={{ fontWeight: 400, color: C.txL, fontSize: 11 }}>({conv.id})</span></div><div style={{ fontSize: 11, color: C.txL }}>{conv.subject}</div></div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <button onClick={() => { setShowC360(!showC360); setShowWhisper(false); }} style={{ padding: "5px 10px", borderRadius: 6, border: `1px solid ${showC360?C.pri:C.brd}`, background: showC360?C.priL:C.wh, color: showC360?C.pri:C.tx, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Customer 360</button>
              <button onClick={() => { setShowWhisper(!showWhisper); setShowC360(false); }} style={{ padding: "5px 10px", borderRadius: 6, border: `1px solid ${showWhisper?C.purple:C.brd}`, background: showWhisper?C.purpleL:C.wh, color: showWhisper?C.purple:C.tx, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Whisper Mode</button>
              {stBdg(conv.status)}{priBdg(conv.priority)}
              <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: conv.sentiment==="Positive"?C.successL:conv.sentiment==="Negative"?C.dangerL:C.priL, color: conv.sentiment==="Positive"?C.success:conv.sentiment==="Negative"?C.danger:C.pri, fontWeight: 600 }}>{conv.sentiment}</span>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              {conv.msgs.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.from==="customer"?"flex-start":"flex-end" }}>
                  <div style={{ maxWidth: "72%", padding: "9px 13px", borderRadius: 12, background: m.from==="customer"?C.wh:m.from==="bot"?C.accL:C.priL, border: m.from==="customer"?`1px solid ${C.brd}`:"none", fontSize: 12.5 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: m.from==="bot"?C.acc:m.from==="agent"?C.pri:C.txL, marginBottom: 3 }}>{m.from==="bot"?"Choice AI":m.from==="agent"?conv.agent:conv.customer} — {m.time}</div>
                    {m.text}
                  </div>
                </div>
              ))}
              {showWhisper && <div style={{ padding: 12, background: C.purpleL, borderRadius: 10, border: `1px dashed ${C.purple}`, fontSize: 12 }}><div style={{ fontWeight: 700, color: C.purple, marginBottom: 6, fontSize: 11 }}>AI Whisper (visible to agent only)</div><div style={{ color: C.purple }}>Based on this customer's history, suggest offering a goodwill gesture — expedite KYC within 4 hours and offer 3 months free AMC extension.</div></div>}
            </div>
            {showC360 && c360 && (
              <div style={{ width: 260, background: C.wh, borderLeft: `1px solid ${C.brd}`, overflowY: "auto", padding: 14, flexShrink: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.pri, marginBottom: 12 }}>Customer 360</div>
                {Object.entries(c360).map(([k,v]) => (<div key={k} style={{ marginBottom: 10 }}><div style={{ fontSize: 10, color: C.txL, textTransform: "capitalize" }}>{k.replace(/([A-Z])/g," $1")}</div><div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>{Array.isArray(v)?v.join(", "):v===null?"N/A":String(v)}</div></div>))}
              </div>
            )}
          </div>
          <div style={{ padding: "10px 16px", background: C.wh, borderTop: `1px solid ${C.brd}`, display: "flex", gap: 8 }}>
            <input value={reply} onChange={e=>setReply(e.target.value)} placeholder="Type a reply..." style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.brd}`, fontSize: 12, outline: "none" }}/>
            <button style={{ padding: "9px 16px", borderRadius: 8, border: "none", background: C.pri, color: C.wh, fontWeight: 600, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><Ic n="send" s={13} c={C.wh}/> Send</button>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: C.txL }}>Select a conversation</div>
      )}
    </div>
  );
};

const TktPage = () => {
  const [sel, setSel] = useState(null);
  const [flt, setFlt] = useState("All");
  const tkt = sel ? tickets.find(t => t.id === sel) : null;
  const filtered = flt === "All" ? tickets : tickets.filter(t => t.status === flt);
  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "12px 20px", background: C.wh, borderBottom: `1px solid ${C.brd}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Tabs tabs={["All","Open","In Progress","Closed"]} active={flt} set={f=>{setFlt(f);setSel(null);}}/>
          <button style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: C.acc, color: C.wh, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>+ New Ticket</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead><tr style={{ borderBottom: `2px solid ${C.brd}`, background: C.bg }}>{["ID","Subject","Customer","Category","Priority","Status","Esc Level","SLA","Assignee"].map(h=><th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 10, fontWeight: 600, color: C.txL, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead>
            <tbody>{filtered.map(t=>(<tr key={t.id} onClick={()=>setSel(t.id)} style={{ borderBottom:`1px solid ${C.brd}`,cursor:"pointer",background:sel===t.id?C.priL:C.wh }}><td style={{padding:"10px 12px",fontWeight:600,color:C.pri}}>{t.id}</td><td style={{padding:"10px 12px"}}>{t.subject}</td><td style={{padding:"10px 12px"}}>{t.customer}</td><td style={{padding:"10px 12px"}}><Bdg t={t.cat}/></td><td style={{padding:"10px 12px"}}>{priBdg(t.pri)}</td><td style={{padding:"10px 12px"}}>{stBdg(t.status)}</td><td style={{padding:"10px 12px"}}><Bdg t={t.esc} v={t.esc.includes("3")?"dan":t.esc.includes("2")?"war":"def"}/></td><td style={{padding:"10px 12px"}}>{t.sla}</td><td style={{padding:"10px 12px"}}>{t.assignee}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
      {tkt && (
        <div style={{ width: 340, background: C.wh, borderLeft: `1px solid ${C.brd}`, overflowY: "auto", padding: 16, flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}><span style={{ fontWeight: 700, color: C.pri }}>{tkt.id}</span><div onClick={()=>setSel(null)} style={{ cursor: "pointer" }}><Ic n="x" s={15} c={C.txL}/></div></div>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>{tkt.subject}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[["Customer",tkt.customer],["Category",<Bdg t={tkt.cat}/>],["Priority",priBdg(tkt.pri)],["Status",stBdg(tkt.status)],["Escalation",<Bdg t={tkt.esc} v={tkt.esc.includes("3")?"dan":"war"}/>],["SLA",tkt.sla],["Assignee",tkt.assignee],["Created",tkt.created]].map(([l,v],i)=>(<div key={i}><div style={{fontSize:10,color:C.txL}}>{l}</div><div style={{marginTop:2,fontSize:12,fontWeight:600}}>{v}</div></div>))}
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.6, padding: 12, background: C.bg, borderRadius: 8, marginBottom: 12 }}>{tkt.desc}</div>
          <div style={{ display: "flex", gap: 6 }}>
            <button style={{ flex:1,padding:"8px 0",borderRadius:8,border:"none",background:C.pri,color:C.wh,fontWeight:600,fontSize:11,cursor:"pointer" }}>Assign</button>
            <button style={{ flex:1,padding:"8px 0",borderRadius:8,border:"none",background:C.acc,color:C.wh,fontWeight:600,fontSize:11,cursor:"pointer" }}>Resolve</button>
            <button style={{ flex:1,padding:"8px 0",borderRadius:8,border:"none",background:C.danger,color:C.wh,fontWeight:600,fontSize:11,cursor:"pointer" }}>Escalate</button>
          </div>
        </div>
      )}
    </div>
  );
};

const AgentPage = () => {
  const [sel, setSel] = useState(null);
  const ag = sel ? agents.find(a=>a.id===sel) : null;
  return (
    <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}><div style={{ fontWeight: 700, fontSize: 16 }}>Agent Workforce</div><button style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: C.acc, color: C.wh, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>+ Add Agent</button></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14, marginBottom: 20 }}>
        {agents.map(a=>(
          <Card key={a.id} style={{ padding:16,cursor:"pointer",border:sel===a.id?`2px solid ${C.pri}`:`1px solid ${C.brd}` }}>
            <div onClick={()=>setSel(a.id)}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}><div style={{ width:34,height:34,borderRadius:99,background:C.priL,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:C.pri,fontSize:13 }}>{a.name.split(" ").map(n=>n[0]).join("")}</div><div><div style={{fontWeight:600,fontSize:13}}>{a.name}</div><div style={{fontSize:10,color:C.txL}}>{a.spec}</div></div></div>
                <div style={{ width:9,height:9,borderRadius:99,background:a.status==="Online"?C.acc:a.status==="Away"?C.warn:C.txXL }}/>
              </div>
              <div style={{ display:"flex",gap:3,marginBottom:10,flexWrap:"wrap" }}>{a.skills.map(s=><span key={s} style={{fontSize:9,padding:"1px 6px",borderRadius:4,background:C.bg,color:C.txL}}>{s}</span>)}</div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                {[["Load",`${a.chats}/${a.capacity}`,""],["CSAT",a.csat,"csatC"],["Resolved",a.resolved,""],["Quality",`${a.quality}%`,"qC"]].map(([l,v,flag],i)=>(<div key={i} style={{background:C.bg,borderRadius:6,padding:"6px 8px"}}><div style={{fontSize:9,color:C.txL}}>{l}</div><div style={{fontWeight:700,fontSize:13,color:flag==="csatC"?(Number(v)>=4.5?C.acc:C.warn):flag==="qC"?(parseInt(v)>=90?C.acc:C.warn):C.tx}}>{v}</div></div>))}
              </div>
            </div>
          </Card>
        ))}
      </div>
      {ag && (
        <Card>
          <CardH title={`${ag.name} — Detail`} right={<Bdg t={ag.status} v={ag.status==="Online"?"suc":ag.status==="Away"?"war":"def"}/>}/>
          <div style={{ padding:16,display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12 }}>
            {[["Active Chats",`${ag.chats}/${ag.capacity}`],["Resolved",ag.resolved],["Avg Response",ag.avgResp],["CSAT",ag.csat],["Quality",`${ag.quality}%`],["Languages",ag.languages.join(", ")]].map(([l,v],i)=>(<div key={i} style={{textAlign:"center",padding:12,background:C.bg,borderRadius:8}}><div style={{fontSize:10,color:C.txL,marginBottom:3}}>{l}</div><div style={{fontWeight:700,fontSize:15}}>{v}</div></div>))}
          </div>
        </Card>
      )}
    </div>
  );
};

const QualityPage = () => (
  <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 18 }}>Quality Scoring</div>
    <Card>
      <CardH title="Agent Quality Scorecard" sub="AI-evaluated across 5 parameters (out of 100)"/>
      <table style={{ width:"100%",borderCollapse:"collapse",fontSize:12 }}>
        <thead><tr style={{ borderBottom:`2px solid ${C.brd}`,background:C.bg }}>{["Agent","Greeting","Empathy","Accuracy","Resolution","Compliance","Overall"].map(h=><th key={h} style={{padding:"10px 14px",textAlign:h==="Agent"?"left":"center",fontSize:10,fontWeight:600,color:C.txL,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
        <tbody>{qualityScores.map((q,i)=>(<tr key={i} style={{borderBottom:`1px solid ${C.brd}`}}><td style={{padding:"10px 14px",fontWeight:600}}>{q.agent}</td>{[q.greeting,q.empathy,q.accuracy,q.resolution,q.compliance,q.overall].map((v,j)=>(<td key={j} style={{padding:"10px 14px",textAlign:"center"}}><span style={{fontWeight:700,color:v>=95?C.acc:v>=85?C.pri:C.warn,padding:"2px 10px",borderRadius:99,background:v>=95?C.accL:v>=85?C.priL:C.warnL}}>{v}</span></td>))}</tr>))}</tbody>
      </table>
    </Card>
  </div>
);

const RoutingPage = () => (
  <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 18 }}>Omnichannel Smart Routing</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card>
        <CardH title="Routing Rules"/>
        <div style={{ padding: 16 }}>
          {[["Skill-Based Routing","Match query category to agent specialty",true],["Load Balancing","Distribute evenly by agent capacity",true],["Language Matching","Route Hindi/Marathi to matching agents",true],["VIP Priority Queue","VIP customers skip queue to senior agents",true],["Sticky Agent","Return customers to same agent if available",false],["Overflow to Bot","When all agents at capacity, bot handles",true]].map(([n,d,on],i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.brd}`}}>
              <div><div style={{fontSize:13,fontWeight:600}}>{n}</div><div style={{fontSize:11,color:C.txL}}>{d}</div></div>
              <div style={{width:38,height:20,borderRadius:99,background:on?C.acc:C.brd,padding:2,cursor:"pointer"}}><div style={{width:16,height:16,borderRadius:99,background:C.wh,transform:on?"translateX(18px)":"translateX(0)",transition:"0.2s"}}/></div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardH title="Live Queue Status"/>
        <div style={{ padding: 16 }}>
          {[["General Support",3,"1.2m",2],["Billing & Charges",1,"0.8m",1],["Trading & IPO",2,"1.5m",1],["Technical / App",0,"0m",0],["VIP Priority",1,"0.3m",1],["Escalations (L2+)",2,"4.2m",1]].map(([q,w,a,ag],i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.brd}`}}>
              <div style={{fontSize:13,fontWeight:600}}>{q}</div>
              <div style={{display:"flex",gap:12,alignItems:"center"}}><span style={{fontSize:11,color:C.txL}}>Waiting: <span style={{fontWeight:700,color:w>2?C.danger:C.tx}}>{w}</span></span><span style={{fontSize:11,color:C.txL}}>Avg: {a}</span><span style={{fontSize:11,color:C.txL}}>Agents: {ag}</span></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const CannedPage = () => {
  const [cat, setCat] = useState("All");
  const cats = ["All",...[...new Set(cannedResponses.map(r=>r.cat))]];
  const filtered = cat==="All"?cannedResponses:cannedResponses.filter(r=>r.cat===cat);
  return (
    <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}><div style={{ fontWeight: 700, fontSize: 16 }}>Canned Responses</div><button style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: C.acc, color: C.wh, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>+ Add Response</button></div>
      <Tabs tabs={cats} active={cat} set={setCat}/>
      <div style={{ marginTop: 16 }}>
        {filtered.map((r,i)=>(
          <Card key={i} style={{ padding:16,marginBottom:10 }}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><div style={{display:"flex",gap:8,alignItems:"center"}}><Bdg t={r.cat}/><span style={{fontWeight:700,fontSize:13}}>{r.title}</span></div><div style={{display:"flex",gap:4}}><button style={{padding:"3px 10px",borderRadius:6,border:`1px solid ${C.brd}`,background:C.wh,fontSize:10,cursor:"pointer"}}>Edit</button><button style={{padding:"3px 10px",borderRadius:6,border:`1px solid ${C.pri}`,background:C.priL,color:C.pri,fontSize:10,fontWeight:600,cursor:"pointer"}}>Copy</button></div></div>
            <div style={{fontSize:12,color:C.txL,lineHeight:1.6}}>{r.text}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const SurveyPage = () => {
  const [tab, setTab] = useState("CSAT");
  return (
    <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 18 }}>Customer Feedback & Surveys</div>
      <Tabs tabs={["CSAT","NPS","CES"]} active={tab} set={setTab}/>
      <div style={{ marginTop: 16 }}>
        {tab==="CSAT" && <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:16}}><Card style={{padding:20,textAlign:"center"}}><div style={{fontSize:48,fontWeight:800,color:C.acc}}>{surveyData.csat.avg}</div><div style={{fontSize:14,color:C.txL}}>out of 5</div><div style={{fontSize:12,color:C.txL,marginTop:8}}>{surveyData.csat.responses} responses</div></Card><Card style={{padding:20}}><div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Rating Distribution</div>{[5,4,3,2,1].map((star,i)=>(<div key={star} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><div style={{width:30,fontSize:12,fontWeight:600}}>{star} ★</div><div style={{flex:1,height:10,background:C.bg,borderRadius:99}}><div style={{width:`${surveyData.csat.dist[4-i]}%`,height:"100%",background:star>=4?C.acc:star===3?C.warn:C.danger,borderRadius:99}}/></div><div style={{width:35,fontSize:12,fontWeight:700,textAlign:"right"}}>{surveyData.csat.dist[4-i]}%</div></div>))}</Card></div>}
        {tab==="NPS" && <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:16}}><Card style={{padding:20,textAlign:"center"}}><div style={{fontSize:48,fontWeight:800,color:C.acc}}>+{surveyData.nps.score}</div><div style={{fontSize:14,color:C.txL}}>NPS Score</div><div style={{fontSize:12,color:C.txL,marginTop:8}}>{surveyData.nps.responses} responses</div></Card><Card style={{padding:20}}><div style={{fontWeight:700,fontSize:14,marginBottom:14}}>NPS Breakdown</div>{[{l:"Promoters (9-10)",v:surveyData.nps.promoters,c:C.acc},{l:"Passives (7-8)",v:surveyData.nps.passives,c:C.warn},{l:"Detractors (0-6)",v:surveyData.nps.detractors,c:C.danger}].map(d=>(<div key={d.l} style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}><span>{d.l}</span><span style={{fontWeight:700}}>{d.v}%</span></div><div style={{height:10,background:C.bg,borderRadius:99}}><div style={{width:`${d.v}%`,height:"100%",background:d.c,borderRadius:99}}/></div></div>))}</Card></div>}
        {tab==="CES" && <Card style={{padding:20}}><div style={{textAlign:"center",marginBottom:20}}><div style={{fontSize:48,fontWeight:800,color:C.pri}}>2.1</div><div style={{fontSize:14,color:C.txL}}>Customer Effort Score (1-7, lower = better)</div><div style={{fontSize:12,color:C.txL,marginTop:4}}>{surveyData.ces.responses} responses</div></div><div style={{display:"flex",gap:8,justifyContent:"center"}}>{[1,2,3,4,5,6,7].map(n=>(<div key={n} style={{width:50,textAlign:"center",padding:"10px 0",borderRadius:8,background:n<=2?C.accL:n<=4?C.warnL:C.dangerL,fontWeight:700,fontSize:14,color:n<=2?C.acc:n<=4?C.warn:C.danger,border:n===2?`2px solid ${C.acc}`:"none"}}>{n}</div>))}</div></Card>}
      </div>
    </div>
  );
};

const AnalyticsPage = () => (
  <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 18 }}>Analytics & Predictive Insights</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
      <Card><CardH title="Weekly Trend"/><div style={{padding:"12px 20px 16px"}}><div style={{display:"flex",gap:3,alignItems:"flex-end",height:100}}>{[{d:"Mon",c:180,r:162},{d:"Tue",c:210,r:189},{d:"Wed",c:195,r:170},{d:"Thu",c:230,r:210},{d:"Fri",c:200,r:178},{d:"Sat",c:120,r:108},{d:"Sun",c:80,r:72}].map((d,i)=>(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{width:"70%",background:C.priL,borderRadius:"3px 3px 0 0",height:`${(d.c/230)*90}px`,position:"relative"}}><div style={{position:"absolute",bottom:0,left:0,right:0,height:`${(d.r/230)*90}px`,background:C.pri,borderRadius:"3px 3px 0 0"}}/></div></div>))}</div><div style={{display:"flex",gap:3}}>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=><div key={d} style={{flex:1,textAlign:"center",fontSize:10,color:C.txL}}>{d}</div>)}</div></div></Card>
      <Card><CardH title="Resolution Time"/><div style={{padding:"12px 20px 16px"}}>{[{l:"Under 5 min",p:35},{l:"5-15 min",p:28},{l:"15-30 min",p:18},{l:"30-60 min",p:12},{l:"Over 60 min",p:7}].map((r,i)=>(<div key={i} style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}><span style={{color:C.txL}}>{r.l}</span><span style={{fontWeight:700}}>{r.p}%</span></div><div style={{height:6,background:C.bg,borderRadius:99}}><div style={{width:`${r.p}%`,height:"100%",background:i<2?C.acc:i<4?C.pri:C.danger,borderRadius:99}}/></div></div>))}</div></Card>
    </div>
    <Card>
      <CardH title="AI Predictive Insights" right={<Bdg t="AI-Powered" v="pur"/>}/>
      <div style={{padding:16,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
        {[{title:"Churn Risk Customers",val:"18",desc:"Customers showing negative sentiment over 3+ interactions. Top: Deepak Verma (92% risk).",color:C.danger},{title:"Peak Volume Prediction",val:"Tomorrow 10-11 AM",desc:"Expected 95 conversations. Recommend 4 agents online. IPO allotment day will spike queries.",color:C.warn},{title:"Bot Training Gap",val:"Margin Queries",desc:"Bot confidence drops to 42% on margin questions. 23 escalations this week. Needs training data.",color:C.purple}].map((p,i)=>(<div key={i} style={{padding:14,background:p.color+"10",borderRadius:10,border:`1px solid ${p.color}30`}}><div style={{fontWeight:700,fontSize:13,color:p.color,marginBottom:4}}>{p.title}</div><div style={{fontSize:20,fontWeight:800,marginBottom:6}}>{p.val}</div><div style={{fontSize:11,color:C.txL,lineHeight:1.5}}>{p.desc}</div></div>))}
      </div>
    </Card>
  </div>
);

const BotPage = () => {
  const [tab, setTab] = useState("General");
  return (
    <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 18 }}>AI Bot Configuration</div>
      <Tabs tabs={["General","Flows","Training","Performance"]} active={tab} set={setTab}/>
      <div style={{ marginTop: 16 }}>
        {tab==="General" && <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}><Card style={{padding:18}}><div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Bot Identity</div>{[["Bot Name","Choice Assistant"],["Welcome Message","Hi! I'm your Choice Assistant."],["Fallback","I'll connect you with a support agent."],["Personality","Professional, helpful, concise"]].map(([l,v],i)=>(<div key={i} style={{marginBottom:12}}><div style={{fontSize:11,fontWeight:600,marginBottom:4}}>{l}</div><input defaultValue={v} style={{width:"100%",padding:"8px 10px",borderRadius:8,border:`1px solid ${C.brd}`,fontSize:12,outline:"none",boxSizing:"border-box"}}/></div>))}</Card><Card style={{padding:18}}><div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Channel Toggles</div>{[["Website Widget",true],["FinX Mobile App",true],["WhatsApp Business",true],["Email Auto-Reply",false],["Auto-Escalation",true],["After-Hours Response",true],["Proactive Nudges",true],["Sentiment-Based Routing",true]].map(([l,on],i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${C.brd}`}}><span style={{fontSize:12}}>{l}</span><div style={{width:36,height:20,borderRadius:99,background:on?C.acc:C.brd,padding:2,cursor:"pointer"}}><div style={{width:16,height:16,borderRadius:99,background:C.wh,transform:on?"translateX(16px)":"translateX(0)",transition:"0.2s"}}/></div></div>))}</Card></div>}
        {tab==="Training" && <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}><Card style={{padding:18}}><div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Intent Confidence Map</div>{[["Account Opening","96%",C.acc],["Brokerage Charges","94%",C.acc],["IPO Queries","92%",C.acc],["SIP/MF Queries","90%",C.pri],["App Technical","87%",C.pri],["Margin Queries","42%",C.danger],["Regulatory","65%",C.warn],["Fund Transfers","78%",C.warn]].map(([l,v,cl],i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><div style={{width:110,fontSize:12}}>{l}</div><div style={{flex:1,height:7,background:C.bg,borderRadius:99}}><div style={{width:v,height:"100%",background:cl,borderRadius:99}}/></div><span style={{fontWeight:700,fontSize:12,color:cl,width:32,textAlign:"right"}}>{v}</span></div>))}</Card><Card style={{padding:18}}><div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Performance</div>{[["Intent Accuracy","94.2%"],["Correct Response","91.8%"],["Avg Confidence","0.87"],["Escalation Rate","18.4%"],["Containment Rate","81.6%"]].map(([l,v],i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.brd}`,fontSize:12}}><span style={{color:C.txL}}>{l}</span><span style={{fontWeight:700}}>{v}</span></div>))}</Card></div>}
        {tab==="Flows" && <Card><CardH title="Conversation Flows"/><div style={{padding:16}}>{[["Account Opening",5],["KYC Verification",4],["IPO Application",3],["Complaint Registration",6],["SIP Setup",4],["Password Reset",3],["Fund Transfer Help",4],["Margin Query Handler",5]].map(([n,s],i)=>(<div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.brd}`}}><div style={{fontWeight:600,fontSize:13}}>{n}</div><div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:11,color:C.txL}}>{s} steps</span><Bdg t={i<6?"Active":"Draft"} v={i<6?"suc":"def"}/><button style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${C.pri}`,background:C.wh,color:C.pri,fontSize:11,fontWeight:600,cursor:"pointer"}}>Edit</button></div></div>))}</div></Card>}
        {tab==="Performance" && <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>{[["Intent Accuracy","94.2%",C.acc],["Correct Response","91.8%",C.acc],["Avg Confidence","0.87",C.pri],["Escalation Rate","18.4%",C.warn],["Containment Rate","81.6%",C.acc],["Avg Handling Time","1.8 min",C.pri],["User Satisfaction","4.1/5",C.acc],["Fallback Rate","6.2%",C.warn],["Languages","5",C.pri]].map(([l,v,cl],i)=>(<Card key={i} style={{padding:16,textAlign:"center"}}><div style={{fontSize:11,color:C.txL,marginBottom:6}}>{l}</div><div style={{fontSize:24,fontWeight:800,color:cl}}>{v}</div></Card>))}</div>}
      </div>
    </div>
  );
};

const KBPage = () => {
  const [search, setSearch] = useState("");
  const arts = [["How to open a Demat Account","Accounts",2340,"94%"],["Brokerage charges for F&O","Billing",1890,"88%"],["IPO application via UPI","IPO",1560,"91%"],["Reset FinX app password","Technical",1340,"96%"],["SIP setup and modification","Mutual Funds",1120,"90%"],["Margin requirements explained","Trading",980,"85%"],["NPS enrollment checklist","NPS",870,"92%"],["Fund transfer process","Accounts",760,"87%"],["Commodity trading hours","Trading",650,"89%"],["Tax implications on gains","Tax",540,"91%"]];
  return (
    <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}><div style={{ fontWeight: 700, fontSize: 16 }}>Knowledge Base</div><button style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: C.acc, color: C.wh, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>+ Add Article</button></div>
      <div style={{ position: "relative", marginBottom: 16 }}><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search articles..." style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: 10, border: `1px solid ${C.brd}`, fontSize: 12, outline: "none", boxSizing: "border-box", background: C.wh }}/><div style={{ position: "absolute", left: 10, top: 10 }}><Ic n="search" s={14} c={C.txL}/></div></div>
      <Card>
        <table style={{ width:"100%",borderCollapse:"collapse",fontSize:12 }}>
          <thead><tr style={{borderBottom:`2px solid ${C.brd}`,background:C.bg}}>{["Title","Category","Views","Helpful","Actions"].map(h=><th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:10,fontWeight:600,color:C.txL,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
          <tbody>{arts.filter(a=>a[0].toLowerCase().includes(search.toLowerCase())).map(([t,cat,v,h],i)=>(<tr key={i} style={{borderBottom:`1px solid ${C.brd}`}}><td style={{padding:"10px 14px",fontWeight:600,color:C.pri}}>{t}</td><td style={{padding:"10px 14px"}}><Bdg t={cat}/></td><td style={{padding:"10px 14px"}}>{v.toLocaleString()}</td><td style={{padding:"10px 14px",fontWeight:600,color:parseInt(h)>=90?C.acc:C.warn}}>{h}</td><td style={{padding:"10px 14px"}}><button style={{padding:"3px 10px",borderRadius:6,border:`1px solid ${C.brd}`,background:C.wh,fontSize:10,cursor:"pointer",marginRight:4}}>Edit</button><button style={{padding:"3px 10px",borderRadius:6,border:`1px solid ${C.brd}`,background:C.wh,fontSize:10,cursor:"pointer"}}>View</button></td></tr>))}</tbody>
        </table>
      </Card>
    </div>
  );
};

const AutoPage = () => (
  <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}><div style={{ fontWeight: 700, fontSize: 16 }}>Automation & Assignment Rules</div><button style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: C.acc, color: C.wh, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>+ New Rule</button></div>
    {autoRules.map((r,i)=>(
      <Card key={i} style={{ padding:16,marginBottom:10 }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div><div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{r.name}</div><div style={{fontSize:12,marginBottom:2}}><span style={{color:C.txL}}>If:</span> {r.condition}</div><div style={{fontSize:12}}><span style={{color:C.txL}}>Then:</span> <span style={{color:C.pri,fontWeight:600}}>{r.action}</span></div></div>
          <div style={{display:"flex",alignItems:"center",gap:8}}><Bdg t={r.status?"Active":"Disabled"} v={r.status?"suc":"def"}/><div style={{width:36,height:20,borderRadius:99,background:r.status?C.acc:C.brd,padding:2,cursor:"pointer"}}><div style={{width:16,height:16,borderRadius:99,background:C.wh,transform:r.status?"translateX(16px)":"translateX(0)",transition:"0.2s"}}/></div></div>
        </div>
      </Card>
    ))}
  </div>
);

const ChatbotPrev = () => {
  const [msgs, setMsgs] = useState([{ from: "bot", text: "Hi! I'm your Choice Assistant. How can I help you today?", time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}) }]);
  const [inp, setInp] = useState("");
  const [typing, setTyping] = useState(false);
  const ref = useRef(null);
  const responses = { demat:"To open a free Demat account:\n1. Visit choiceindia.com or FinX\n2. Enter mobile + OTP\n3. Complete KYC\n4. E-sign\n\nFirst year AMC is free.", ipo:"Your IPO bid is confirmed. It'll reflect in portfolio after allotment.", brokerage:"Equity Delivery: Free (Y1), F&O: Rs.20/order, Commodities: Rs.20/order. No hidden charges.", login:"Force close FinX app, clear cache, reopen. Password sync takes ~60 sec after reset.", agent:"Connecting you with a live agent. Wait time: under 2 minutes.", mutual:"Choice has 3000+ MF schemes. SIP starts from Rs. 500/month.", sip:"FinX > Mutual Funds > My SIPs > Select > Modify to change SIP amount.", margin:"Check FinX > F&O > Margin Calculator for exact requirements.", nps:"NPS enrollment needs: PAN, Aadhaar, bank details, passport photo, cancelled cheque." };
  const getResp = t => { const low = t.toLowerCase(); for (const [k,r] of Object.entries(responses)) { if (low.includes(k)) return r; } return "I can help with account opening, IPO, brokerage, trading, mutual funds, SIPs, and more!"; };
  const send = t => {
    if (!t.trim()) return;
    const now = new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
    setMsgs(p=>[...p,{from:"user",text:t.trim(),time:now}]);
    setInp(""); setTyping(true);
    setTimeout(()=>{ setTyping(false); setMsgs(p=>[...p,{from:"bot",text:getResp(t),time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}]); },1000);
  };
  useEffect(()=>{ ref.current&&(ref.current.scrollTop=ref.current.scrollHeight); },[msgs,typing]);
  return (
    <div style={{ padding: 20, overflowY: "auto", flex: 1, display: "flex", gap: 20 }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center" }}>
        <div style={{ fontWeight:700,fontSize:16,marginBottom:14,alignSelf:"flex-start" }}>Live Chatbot Preview</div>
        <div style={{ width:370,height:560,borderRadius:16,overflow:"hidden",boxShadow:"0 8px 30px rgba(0,0,0,0.12)",display:"flex",flexDirection:"column",border:`1px solid ${C.brd}` }}>
          <div style={{ background:`linear-gradient(135deg,${C.pri},${C.priD})`,color:C.wh,padding:"12px 16px",display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:34,height:34,borderRadius:99,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center" }}><Ic n="bot" s={16} c={C.wh}/></div>
            <div><div style={{fontWeight:700,fontSize:13}}>Choice Assistant</div><div style={{fontSize:10,opacity:0.8,display:"flex",alignItems:"center",gap:4}}><div style={{width:6,height:6,borderRadius:99,background:C.acc}}/> Online</div></div>
          </div>
          <div ref={ref} style={{ flex:1,overflowY:"auto",padding:12,display:"flex",flexDirection:"column",gap:8,background:"#F0F4F8" }}>
            {msgs.map((m,i)=>(<div key={i} style={{display:"flex",justifyContent:m.from==="user"?"flex-end":"flex-start"}}><div style={{maxWidth:"82%",padding:"9px 12px",borderRadius:m.from==="user"?"12px 12px 3px 12px":"12px 12px 12px 3px",background:m.from==="user"?C.pri:C.wh,color:m.from==="user"?C.wh:C.tx,fontSize:12.5,lineHeight:1.5,whiteSpace:"pre-line",boxShadow:"0 1px 2px rgba(0,0,0,0.05)"}}>{m.text}<div style={{fontSize:9,opacity:0.5,textAlign:"right",marginTop:3}}>{m.time}</div></div></div>))}
            {typing&&<div style={{padding:"8px 14px",borderRadius:12,background:C.wh,fontSize:12,color:C.txL,alignSelf:"flex-start"}}>Typing…</div>}
            {msgs.length===1&&<div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:4}}>{["Open Demat","IPO Status","Brokerage","Login Help","Talk to Agent"].map(q=>(<button key={q} onClick={()=>send(q)} style={{padding:"5px 10px",borderRadius:99,border:`1px solid ${C.pri}`,background:C.wh,color:C.pri,fontSize:11,cursor:"pointer"}}>{q}</button>))}</div>}
          </div>
          <div style={{ padding:"8px 12px",background:C.wh,borderTop:`1px solid ${C.brd}`,display:"flex",gap:6 }}>
            <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send(inp)} placeholder="Type your message..." style={{flex:1,padding:"8px 10px",borderRadius:99,border:`1px solid ${C.brd}`,fontSize:12,outline:"none"}}/>
            <button onClick={()=>send(inp)} style={{width:34,height:34,borderRadius:99,border:"none",background:C.pri,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}><Ic n="send" s={14} c={C.wh}/></button>
          </div>
        </div>
      </div>
      <div style={{ width:300,flexShrink:0 }}>
        <Card style={{ padding:16,marginBottom:14 }}>
          <div style={{ fontWeight:700,fontSize:13,marginBottom:10 }}>Embed Code</div>
          <div style={{ background:"#14243D",color:"#A8D8A8",borderRadius:8,padding:12,fontSize:10,fontFamily:"monospace",lineHeight:1.6 }}>{`<script src="https://cx.choiceindia.com/widget.js"></script>\n<script>\n  ChoiceCX.init({\n    key: "cx_live_*****",\n    position: "bottom-right",\n    theme: "blue-green"\n  });\n</script>`}</div>
        </Card>
        <Card style={{ padding:16 }}>
          <div style={{ fontWeight:700,fontSize:13,marginBottom:10 }}>Widget Stats (Today)</div>
          {[["Widget Opens","342"],["Conversations","187"],["Bot Resolved","118 (63%)"],["Escalated","69 (37%)"],["Avg Duration","3.2 min"],["CSAT (Bot)","4.1/5"]].map(([l,v],i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.brd}`,fontSize:12}}><span style={{color:C.txL}}>{l}</span><span style={{fontWeight:700}}>{v}</span></div>))}
        </Card>
      </div>
    </div>
  );
};

// ===================== MAIN APP =====================
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pg, setPg] = useState("dashboard");
  const [col, setCol] = useState(false);

  const pages = {
    dashboard: <Dashboard/>, conversations: <ConvPage/>, tickets: <TktPage/>,
    escalation: <EscalationPage/>, sla: <SLAPage/>, agents: <AgentPage/>,
    quality: <QualityPage/>, routing: <RoutingPage/>, canned: <CannedPage/>,
    surveys: <SurveyPage/>, analytics: <AnalyticsPage/>, botconfig: <BotPage/>,
    knowledge: <KBPage/>, automation: <AutoPage/>, chatbot: <ChatbotPrev/>,
  };

  if (!loggedIn) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Outfit',system-ui,sans-serif}button{transition:all 0.15s}button:hover{opacity:0.9}`}</style>
        <LoginPage onLogin={() => setLoggedIn(true)}/>
      </>
    );
  }

  return (
    <div style={{ display:"flex",height:"100vh",fontFamily:"'Outfit','DM Sans',system-ui,sans-serif",color:C.tx,background:C.bg,overflow:"hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:99px}button{transition:all 0.12s}button:hover{opacity:0.9;transform:translateY(-0.5px)}tr:hover{background:${C.bg}!important}`}</style>
      <Sidebar pg={pg} setPg={setPg} col={col}/>
      <div style={{ flex:1,display:"flex",flexDirection:"column",overflow:"hidden" }}>
        <TopBar pg={pg} toggle={()=>setCol(!col)} onLogout={()=>{ setLoggedIn(false); setPg("dashboard"); }}/>
        {pages[pg]}
      </div>
    </div>
  );
}