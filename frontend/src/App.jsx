import { useState, useEffect, useRef, useCallback } from "react";

// ── Recharts ────────────────────────────────────────────────────────────────
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ── Dummy-Daten (später durch FastAPI ersetzt) ──────────────────────────────
const KPI_DATA = [
  { year: "2007", umsatz: 1.2, ebitda: 0.18, jahresueberschuss: 0.09, eigenkapitalrendite: 8.1 },
  { year: "2008", umsatz: 1.3, ebitda: 0.20, jahresueberschuss: 0.10, eigenkapitalrendite: 8.9 },
  { year: "2009", umsatz: 1.1, ebitda: 0.15, jahresueberschuss: 0.07, eigenkapitalrendite: 6.2 },
  { year: "2010", umsatz: 1.4, ebitda: 0.22, jahresueberschuss: 0.11, eigenkapitalrendite: 9.4 },
  { year: "2011", umsatz: 1.6, ebitda: 0.26, jahresueberschuss: 0.13, eigenkapitalrendite: 10.2 },
  { year: "2012", umsatz: 1.7, ebitda: 0.28, jahresueberschuss: 0.14, eigenkapitalrendite: 10.8 },
  { year: "2013", umsatz: 1.8, ebitda: 0.30, jahresueberschuss: 0.15, eigenkapitalrendite: 11.3 },
  { year: "2014", umsatz: 1.9, ebitda: 0.33, jahresueberschuss: 0.16, eigenkapitalrendite: 11.9 },
  { year: "2015", umsatz: 2.0, ebitda: 0.35, jahresueberschuss: 0.18, eigenkapitalrendite: 12.4 },
  { year: "2016", umsatz: 2.1, ebitda: 0.37, jahresueberschuss: 0.19, eigenkapitalrendite: 12.8 },
  { year: "2017", umsatz: 2.2, ebitda: 0.38, jahresueberschuss: 0.20, eigenkapitalrendite: 13.1 },
  { year: "2018", umsatz: 2.0, ebitda: 0.34, jahresueberschuss: 0.16, eigenkapitalrendite: 11.5 },
  { year: "2019", umsatz: 2.1, ebitda: 0.36, jahresueberschuss: 0.17, eigenkapitalrendite: 12.0 },
  { year: "2020", umsatz: 1.8, ebitda: 0.29, jahresueberschuss: 0.12, eigenkapitalrendite: 9.8 },
  { year: "2021", umsatz: 2.3, ebitda: 0.41, jahresueberschuss: 0.21, eigenkapitalrendite: 13.8 },
  { year: "2022", umsatz: 2.5, ebitda: 0.43, jahresueberschuss: 0.23, eigenkapitalrendite: 14.5 },
  { year: "2023", umsatz: 2.7, ebitda: 0.47, jahresueberschuss: 0.26, eigenkapitalrendite: 15.2 },
];

const DOC_COVERAGE = [
  { year: "2007", docs: 2, types: ["Konzernabschluss"] },
  { year: "2008", docs: 2, types: ["Konzernabschluss"] },
  { year: "2010", docs: 4, types: ["Konzernabschluss", "Geschäftsbericht"] },
  { year: "2013", docs: 5, types: ["Konzernabschluss", "Geschäftsbericht", "Kapitalmarkt"] },
  { year: "2016", docs: 8, types: ["Konzernabschluss", "Geschäftsbericht", "Kapitalmarkt", "Quartal"] },
  { year: "2020", docs: 12, types: ["alle Typen"] },
  { year: "2023", docs: 15, types: ["alle Typen"] },
];

const QUERY_HISTORY = [
  { q: "Wie hat sich der Jahresüberschuss entwickelt?", time: "14:32", chunks: 5 },
  { q: "Welche Risiken wurden identifiziert?", time: "14:28", chunks: 7 },
  { q: "Wie hoch war die Eigenkapitalrendite 2022?", time: "14:21", chunks: 3 },
];

const PROCESSING_LOG = [
  { time: "14:30:01", msg: "Lade Konzernabschluss 2023...", status: "done" },
  { time: "14:30:03", msg: "Extrahiere 48 Seiten → 312 Chunks", status: "done" },
  { time: "14:30:08", msg: "Embedding BGE-M3 läuft...", status: "done" },
  { time: "14:30:12", msg: "Indiziere in ChromaDB...", status: "done" },
  { time: "14:30:14", msg: "Warte auf nächste Datei...", status: "active" },
];

// ── Partikel-Avatar ─────────────────────────────────────────────────────────
function ParticleAvatar({ speaking, size = 260 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width = size;
    const H = canvas.height = size;
    const cx = W / 2, cy = H / 2;
    const N = 2000;
    const pts = [];
    for (let i = 0; i < N; i++) {
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const theta = goldenAngle * i;
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const baseR = 58 + Math.random() * 32;
      pts.push({
        bx: r * Math.cos(theta), by: y, bz: r * Math.sin(theta),
        baseR,
        phase: Math.random() * Math.PI * 2,
        phaseZ: Math.random() * Math.PI * 2,
        speedMult: 0.4 + Math.random() * 0.8,
        depthOffset: Math.random() * Math.PI * 2,
        hue: 170 + Math.random() * 100,
        baseBright: 0.3 + Math.random() * 0.7,
        size: Math.random() * 1.8 + 0.2,
      });
    }
    const animate = () => {
      timeRef.current += 0.008;
      const t = timeRef.current;
      ctx.clearRect(0, 0, W, H);
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 110);
      grd.addColorStop(0, "rgba(0,230,200,0.04)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
      const rotY = t * 0.18;
      const toRender = pts.map(p => {
        const breathe = speaking
          ? Math.sin(t * 3.5 * p.speedMult + p.depthOffset) * 22
          : Math.sin(t * 0.9 * p.speedMult + p.depthOffset) * 8;
        const R = p.baseR + breathe;
        const cosR = Math.cos(rotY + p.phase * 0.1);
        const sinR = Math.sin(rotY + p.phase * 0.1);
        const rx = p.bx * cosR - p.bz * sinR;
        const rz = p.bx * sinR + p.bz * cosR;
        const px = cx + rx * R + Math.sin(t * 0.7 * p.speedMult + p.phase) * 2;
        const py = cy + p.by * R + Math.cos(t * 0.5 * p.speedMult + p.phaseZ) * 2;
        const depth = rz;
        const depthFactor = (depth + 1) / 2;
        const pulse = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.8 * p.speedMult + p.phase));
        const alpha = p.baseBright * (0.12 + 0.55 * depthFactor + 0.33 * pulse);
        const sz = p.size * (0.4 + 0.9 * depthFactor);
        const hue = p.hue + depth * 30 + Math.sin(t * 0.4 + p.phase) * 15;
        return { px, py, depth, alpha, sz, hue };
      });
      toRender.sort((a, b) => a.depth - b.depth);
      for (const d of toRender) {
        ctx.beginPath();
        ctx.arc(d.px, d.py, Math.max(0.2, d.sz), 0, Math.PI * 2);
        ctx.shadowColor = d.depth > 0.5 ? `hsla(${d.hue},90%,70%,0.5)` : "transparent";
        ctx.shadowBlur = d.depth > 0.5 ? 4 : 0;
        ctx.fillStyle = `hsla(${d.hue},85%,65%,${Math.min(1, d.alpha)})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [speaking, size]);

  return <canvas ref={canvasRef} style={{ display: "block", margin: "0 auto" }} />;
}

// ── KPI Card ────────────────────────────────────────────────────────────────
function KPICard({ label, value, unit, delta, color }) {
  return (
    <div style={{
      padding: "14px 18px", borderRadius: 10,
      background: "rgba(255,255,255,0.07)",
      border: `1px solid ${color}22`,
      flex: 1, minWidth: 120,
    }}>
      <div style={{ fontSize: 10, color: "#b0c4d8", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color, lineHeight: 1 }}>
        {value}<span style={{ fontSize: 12, marginLeft: 3, color: "#557" }}>{unit}</span>
      </div>
      {delta && (
        <div style={{ fontSize: 11, color: delta > 0 ? "#06d6a0" : "#ef476f", marginTop: 4 }}>
          {delta > 0 ? "▲" : "▼"} {Math.abs(delta)}%
        </div>
      )}
    </div>
  );
}

// ── Upload Zone ─────────────────────────────────────────────────────────────
function UploadZone({ onUpload }) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.name.endsWith(".pdf"));
    setFiles(prev => [...prev, ...dropped]);
  };

  return (
    <div>
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragging ? "#00f5d4" : "rgba(0,245,212,0.2)"}`,
          borderRadius: 12, padding: "28px 20px", textAlign: "center",
          background: dragging ? "rgba(0,245,212,0.05)" : "rgba(255,255,255,0.02)",
          cursor: "pointer", transition: "all 0.2s",
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 8 }}>📄</div>
        <div style={{ color: "#00f5d4", fontSize: 13, fontWeight: 600 }}>PDFs hier ablegen</div>
        <div style={{ color: "#aabbd0", fontSize: 11, marginTop: 4 }}>oder klicken zum Auswählen</div>
      </div>
      {files.length > 0 && (
        <div style={{ marginTop: 12 }}>
          {files.slice(-3).map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "6px 10px", borderRadius: 6, marginBottom: 4,
              background: "rgba(0,245,212,0.05)", fontSize: 11, color: "#c0d0e0"
            }}>
              <span style={{ color: "#00f5d4" }}>✓</span>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
              <span style={{ color: "#aabbd0" }}>{(f.size / 1024).toFixed(0)} KB</span>
            </div>
          ))}
          {files.length > 3 && (
            <div style={{ fontSize: 11, color: "#aabbd0", textAlign: "center" }}>+{files.length - 3} weitere</div>
          )}
          <button style={{
            width: "100%", marginTop: 10, padding: "9px",
            background: "linear-gradient(135deg,#00f5d4,#7b2fff)",
            border: "none", borderRadius: 8, color: "#07090f",
            fontWeight: 700, cursor: "pointer", fontSize: 12, letterSpacing: 1,
          }}>
            ▶ VERARBEITUNG STARTEN
          </button>
        </div>
      )}
    </div>
  );
}

// ── Custom Tooltip für Charts ───────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#0d1117", border: "1px solid rgba(0,245,212,0.3)",
      borderRadius: 8, padding: "10px 14px", fontSize: 12,
    }}>
      <div style={{ color: "#00f5d4", marginBottom: 6, fontWeight: 700 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong>{p.value}</strong> Mrd. €
        </div>
      ))}
    </div>
  );
};

// ── Haupt-App ───────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [speaking, setSpeaking] = useState(false);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("Ich bin dein KI-Assistent. Stelle mir eine Frage zu den Finanzdaten.");
  const [queryHistory, setQueryHistory] = useState(QUERY_HISTORY);
  const [activeChart, setActiveChart] = useState("umsatz");
  const [processingProgress, setProcessingProgress] = useState(68);

  const ANSWERS = {
    "umsatz":    "Der Umsatz ist von 1,2 Mrd. € (2007) auf 2,7 Mrd. € (2023) gestiegen — ein Wachstum von 125% über 16 Jahre.",
    "ebitda":    "Das EBITDA wuchs von 180 Mio. € auf 470 Mio. €. Die EBITDA-Marge verbesserte sich von 15% auf 17,4%.",
    "risiko":    "Identifizierte Hauptrisiken: Währungsrisiken (USD-Exposure ~35%), Klumpenrisiko Lieferkette, Cyber-Risiken seit 2019.",
    "dividende": "Die Dividende wurde kontinuierlich erhöht — durchschnittlich +8% p.a. Einzige Ausnahme: 2020 (COVID-19).",
    "strategie": "Drei strategische Säulen: Digitale Transformation, Nachhaltigkeit (CO2 -22%), Internationalisierung (Asien-Expansion ab 2022).",
  };

  const handleQuery = () => {
    if (!query.trim()) return;
    const q = query.toLowerCase();
    let resp = "Interessante Frage! Basierend auf den Finanzdokumenten 2007–2023 analysiere ich die relevanten Chunks...";
    for (const [k, v] of Object.entries(ANSWERS)) {
      if (q.includes(k)) { resp = v; break; }
    }
    setAnswer(resp);
    setSpeaking(true);
    setQueryHistory(prev => [{ q: query, time: new Date().toLocaleTimeString("de-DE", {hour:"2-digit",minute:"2-digit"}), chunks: Math.floor(Math.random()*8)+2 }, ...prev.slice(0,4)]);
    setQuery("");
    setTimeout(() => setSpeaking(false), 3500);
  };

  const TABS = [
    { id: "dashboard", label: "Dashboard", icon: "⬡" },
    { id: "avatar",    label: "KI-Assistent", icon: "✦" },
    { id: "charts",    label: "Visualisierung", icon: "◈" },
    { id: "upload",    label: "Dokumente", icon: "⬢" },
    { id: "results",   label: "Ergebnisse", icon: "◉" },
  ];

  const CHART_OPTIONS = [
    { key: "umsatz",             label: "Umsatz",             color: "#00f5d4" },
    { key: "ebitda",             label: "EBITDA",             color: "#7b2fff" },
    { key: "jahresueberschuss",  label: "Jahresüberschuss",   color: "#ff6b35" },
    { key: "eigenkapitalrendite",label: "EK-Rendite (%)",     color: "#ffd166" },
  ];

  const latestKPIs = KPI_DATA[KPI_DATA.length - 1];
  const prevKPIs   = KPI_DATA[KPI_DATA.length - 2];

  return (
    <div style={{
      minHeight: "100vh", width: "100%", background: "#0a0e1a", color: "#e8f1fc",
      fontFamily: "'DM Mono', 'Courier New', monospace", fontSize: 14,
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        padding: "14px 28px", borderBottom: "1px solid rgba(0,245,212,0.1)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(0,245,212,0.015)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%",
            background: "radial-gradient(circle, #00f5d4, #7b2fff)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, color: "#07090f", fontWeight: 700 }}>✦</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.3 }}>RAG Intelligence Platform</div>
            <div style={{ fontSize: 10, color: "#aabbd0", letterSpacing: 3, textTransform: "uppercase" }}>Finanzanalyse · 2007–2023</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: "#aabbd0", letterSpacing: 2 }}>VERARBEITUNGSSTAND</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
              <div style={{ width: 120, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99 }}>
                <div style={{ width: `${processingProgress}%`, height: "100%",
                  background: "linear-gradient(90deg,#00f5d4,#7b2fff)",
                  borderRadius: 99, boxShadow: "0 0 8px #00f5d4" }} />
              </div>
              <span style={{ fontSize: 12, color: "#00f5d4", fontWeight: 700 }}>{processingProgress}%</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 99,
            border: "1px solid rgba(6,214,160,0.3)",
            background: "rgba(6,214,160,0.06)", fontSize: 11, color: "#06d6a0" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#06d6a0",
              boxShadow: "0 0 6px #06d6a0" }} />
            ONLINE
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "0 28px", gap: 4 }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "10px 18px", background: "none",
            border: "none", borderBottom: `2px solid ${activeTab === tab.id ? "#00f5d4" : "transparent"}`,
            color: activeTab === tab.id ? "#00f5d4" : "#889",
            cursor: "pointer", fontSize: 12, fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 6,
            transition: "all 0.2s",
          }}>
            <span>{tab.icon}</span>{tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px 28px", overflowY: "auto" }}>

        {/* ── DASHBOARD ── */}
        {activeTab === "dashboard" && (
          <div>
            <div style={{ fontSize: 11, color: "#aabbd0", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
              Kennzahlen-Übersicht · Geschäftsjahr 2023
            </div>
            {/* KPI Cards */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
              <KPICard label="Umsatz" value="2,7" unit="Mrd. €" delta={8} color="#00f5d4" />
              <KPICard label="EBITDA" value="470" unit="Mio. €" delta={9.3} color="#7b2fff" />
              <KPICard label="Jahresüberschuss" value="260" unit="Mio. €" delta={13} color="#ff6b35" />
              <KPICard label="EK-Rendite" value="15,2" unit="%" delta={4.8} color="#ffd166" />
              <KPICard label="Dokumente" value="900" unit="PDFs" color="#06d6a0" />
            </div>

            {/* Mini Chart */}
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.06)", padding: "18px 20px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#aabbd0", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>
                Umsatzentwicklung 2007–2023
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={KPI_DATA}>
                  <defs>
                    <linearGradient id="ug" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f5d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00f5d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="year" tick={{ fill: "#445", fontSize: 10 }} />
                  <YAxis tick={{ fill: "#445", fontSize: 10 }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="umsatz" stroke="#00f5d4" fill="url(#ug)" strokeWidth={2} name="Umsatz" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Processing Log */}
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.06)", padding: "18px 20px" }}>
              <div style={{ fontSize: 11, color: "#aabbd0", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
                Live Processing Log
              </div>
              {PROCESSING_LOG.map((log, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center",
                  padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.03)",
                  fontSize: 11 }}>
                  <span style={{ color: "#6a7f96", minWidth: 60 }}>{log.time}</span>
                  <span style={{ color: log.status === "active" ? "#00f5d4" : "#556" }}>
                    {log.status === "active" ? "▶" : "✓"}
                  </span>
                  <span style={{ color: log.status === "active" ? "#e8f0f8" : "#445" }}>{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── AVATAR / CHAT ── */}
        {activeTab === "avatar" && (
          <div style={{ display: "flex", gap: 24 }}>
            {/* Avatar Panel */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ position: "relative", marginBottom: 12 }}>
                <div style={{ position: "absolute", inset: -24, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(0,245,212,0.06) 0%, transparent 70%)",
                  animation: "pulse 3s ease-in-out infinite", pointerEvents: "none" }} />
                <ParticleAvatar speaking={speaking} size={260} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16,
                padding: "5px 16px", borderRadius: 99,
                border: `1px solid ${speaking ? "#00f5d4" : "rgba(255,255,255,0.08)"}`,
                background: speaking ? "rgba(0,245,212,0.07)" : "rgba(255,255,255,0.02)",
                transition: "all 0.4s", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%",
                  background: speaking ? "#00f5d4" : "#333",
                  boxShadow: speaking ? "0 0 8px #00f5d4" : "none" }} />
                <span style={{ color: speaking ? "#00f5d4" : "#445" }}>
                  {speaking ? "Analysiere..." : "Bereit"}
                </span>
              </div>
              <div style={{ maxWidth: 380, padding: "14px 18px", borderRadius: 12,
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.07)",
                fontSize: 13, lineHeight: 1.75, color: "#c0d0e0", textAlign: "center", marginBottom: 16 }}>
                {answer}
              </div>
              <div style={{ display: "flex", gap: 8, width: "100%", maxWidth: 380 }}>
                <input value={query} onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleQuery()}
                  placeholder="Frage stellen... (Umsatz, Risiko, Strategie...)"
                  style={{ flex: 1, background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(0,245,212,0.2)", borderRadius: 8,
                    padding: "10px 13px", color: "#e8f0f8", fontSize: 12,
                    outline: "none", fontFamily: "inherit" }} />
                <button onClick={handleQuery} style={{
                  padding: "10px 18px",
                  background: "linear-gradient(135deg,#00f5d4,#7b2fff)",
                  border: "none", borderRadius: 8, color: "#07090f",
                  fontWeight: 700, cursor: "pointer", fontSize: 11, fontFamily: "inherit" }}>
                  SENDEN
                </button>
              </div>
            </div>

            {/* Query History */}
            <div style={{ width: 280 }}>
              <div style={{ fontSize: 11, color: "#aabbd0", letterSpacing: 2,
                textTransform: "uppercase", marginBottom: 12 }}>Query-Verlauf</div>
              {queryHistory.map((h, i) => (
                <div key={i} onClick={() => { setQuery(h.q); }}
                  style={{ padding: "10px 12px", borderRadius: 8, marginBottom: 8,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 12, color: "#dde8f4", marginBottom: 4,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.q}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#aabbd0" }}>
                    <span>{h.time}</span>
                    <span style={{ color: "#00f5d4" }}>{h.chunks} Chunks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CHARTS ── */}
        {activeTab === "charts" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {CHART_OPTIONS.map(c => (
                <button key={c.key} onClick={() => setActiveChart(c.key)} style={{
                  padding: "7px 16px", borderRadius: 99, cursor: "pointer",
                  background: activeChart === c.key ? `${c.color}22` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${activeChart === c.key ? c.color : "rgba(255,255,255,0.08)"}`,
                  color: activeChart === c.key ? c.color : "#445",
                  fontSize: 11, fontFamily: "inherit", transition: "all 0.2s",
                }}>{c.label}</button>
              ))}
            </div>

            {/* Liniendiagramm */}
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.06)", padding: "20px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#aabbd0", letterSpacing: 2,
                textTransform: "uppercase", marginBottom: 16 }}>
                {CHART_OPTIONS.find(c => c.key === activeChart)?.label} — Zeitreihe 2007–2023
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={KPI_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="year" tick={{ fill: "#445", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#445", fontSize: 11 }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Line type="monotone" dataKey={activeChart}
                    stroke={CHART_OPTIONS.find(c => c.key === activeChart)?.color || "#00f5d4"}
                    strokeWidth={2.5} dot={{ r: 3 }}
                    name={CHART_OPTIONS.find(c => c.key === activeChart)?.label} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Balkendiagramm alle KPIs */}
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.06)", padding: "20px" }}>
              <div style={{ fontSize: 11, color: "#aabbd0", letterSpacing: 2,
                textTransform: "uppercase", marginBottom: 16 }}>
                Vergleich Umsatz & EBITDA (Mrd. €)
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={KPI_DATA.slice(-8)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="year" tick={{ fill: "#445", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#445", fontSize: 11 }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend wrapperStyle={{ color: "#b0c4d8", fontSize: 11 }} />
                  <Bar dataKey="umsatz" fill="#00f5d488" name="Umsatz" radius={[4,4,0,0]} />
                  <Bar dataKey="ebitda" fill="#7b2fff88" name="EBITDA" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ── UPLOAD ── */}
        {activeTab === "upload" && (
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "#aabbd0", letterSpacing: 2,
                textTransform: "uppercase", marginBottom: 16 }}>Neue Dokumente hochladen</div>
              <UploadZone />
              <div style={{ marginTop: 24, background: "rgba(255,255,255,0.05)", borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)", padding: "18px 20px" }}>
                <div style={{ fontSize: 11, color: "#aabbd0", letterSpacing: 2,
                  textTransform: "uppercase", marginBottom: 12 }}>Verarbeitungs-Pipeline</div>
                {["PDF laden & Seiten extrahieren", "Text bereinigen & Metadaten extrahieren",
                  "Rekursives Chunking (600 Zeichen)", "BGE-M3 Embedding (lokal)",
                  "Indexierung in ChromaDB"].map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "center",
                    padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.03)",
                    fontSize: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%",
                      background: i < 4 ? "rgba(0,245,212,0.15)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${i < 4 ? "#00f5d4" : "rgba(255,255,255,0.1)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, color: i < 4 ? "#00f5d4" : "#445", flexShrink: 0 }}>
                      {i < 4 ? "✓" : i + 1}
                    </div>
                    <span style={{ color: i < 4 ? "#cdd6e8" : "#445" }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width: 260 }}>
              <div style={{ fontSize: 11, color: "#aabbd0", letterSpacing: 2,
                textTransform: "uppercase", marginBottom: 12 }}>Dokumenten-Inventar</div>
              {[
                { type: "Konzernabschluss", count: 17, color: "#00f5d4" },
                { type: "Geschäftsbericht", count: 14, color: "#7b2fff" },
                { type: "Kapitalmarkt", count: 38, color: "#ff6b35" },
                { type: "Quartalsbericht", count: 52, color: "#ffd166" },
                { type: "Sonstiges", count: 23, color: "#06d6a0" },
              ].map((item, i) => (
                <div key={i} style={{ padding: "10px 14px", borderRadius: 8, marginBottom: 8,
                  background: `${item.color}08`, border: `1px solid ${item.color}22` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: "#dde8f4" }}>{item.type}</span>
                    <span style={{ fontSize: 12, color: item.color, fontWeight: 700 }}>{item.count}</span>
                  </div>
                  <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 99 }}>
                    <div style={{ width: `${(item.count / 52) * 100}%`, height: "100%",
                      background: item.color, borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ERGEBNISSE ── */}
        {activeTab === "results" && (
          <div>
            <div style={{ fontSize: 11, color: "#aabbd0", letterSpacing: 2,
              textTransform: "uppercase", marginBottom: 16 }}>Letzte Analyse-Ergebnisse</div>
            {queryHistory.map((h, i) => (
              <div key={i} style={{ padding: "16px 20px", borderRadius: 12, marginBottom: 12,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ fontSize: 13, color: "#e8f0f8", fontWeight: 600 }}>❓ {h.q}</div>
                  <div style={{ fontSize: 10, color: "#aabbd0" }}>{h.time}</div>
                </div>
                <div style={{ fontSize: 12, color: "#b0c4d8", marginBottom: 10 }}>
                  {h.chunks} relevante Chunks gefunden aus:
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["Konzernabschluss 2023", "Geschäftsbericht 2022", "Konzernabschluss 2021"]
                    .slice(0, h.chunks > 4 ? 3 : 2).map((src, j) => (
                    <div key={j} style={{ padding: "3px 10px", borderRadius: 99, fontSize: 10,
                      background: "rgba(0,245,212,0.08)", border: "1px solid rgba(0,245,212,0.2)",
                      color: "#00f5d4" }}>{src}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:.4} 50%{transform:scale(1.05);opacity:.8} }
        input::placeholder { color: #334; }
        input:focus { border-color: rgba(0,245,212,0.5) !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,245,212,0.2); border-radius: 99px; }
      `}</style>
    </div>
  );
}
