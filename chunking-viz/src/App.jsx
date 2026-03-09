import { useState } from "react";

// ── Design tokens — dark (Git/GitHub Pages version) ───────────────────────
const C = {
  bg:       "#0D1117",
  surface:  "#161B22",
  border:   "#21262D",
  blue:     "#58A6FF",
  blueL:    "#0D2340",
  green:    "#3FB950",
  greenL:   "#0C2B15",
  gold:     "#D29922",
  goldL:    "#2D1F00",
  red:      "#F85149",
  redL:     "#2D0D0D",
  purple:   "#BC8CFF",
  purpleL:  "#1E0D3A",
  teal:     "#39D5C4",
  tealL:    "#062120",
  orange:   "#F0883E",
  orangeL:  "#2D1500",
  grey:     "#C9D1D9",
  muted:    "#8B949E",
  panel:    "#1C2128",
  heading:  "#F0F6FC",
};

// ── Shared mini-components ──────────────────────────────────────────────────
const TokenBox = ({ label, fc, ec }) => (
  <span style={{
    display: "inline-block", padding: "2px 7px", margin: "2px 2px",
    background: fc, border: `1.5px solid ${ec}`, borderRadius: 4,
    fontSize: 11, fontFamily: "monospace", color: C.grey, fontWeight: 600,
  }}>{label}</span>
);

const ChunkBox = ({ tokens, label, fc, ec, note }) => (
  <div style={{
    background: fc, border: `1.5px solid ${ec}`, borderRadius: 8,
    padding: "8px 12px", marginBottom: 8,
  }}>
    {label && <div style={{ fontSize: 10, fontWeight: 700, color: ec, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{label}</div>}
    <div>{tokens.map((t, i) => <TokenBox key={i} label={t} fc={C.surface} ec={ec} />)}</div>
    {note && <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{note}</div>}
  </div>
);

const InfoRow = ({ label, value, color }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: `1px solid ${C.border}` }}>
    <span style={{ fontSize: 12, color: C.grey }}>{label}</span>
    <span style={{ fontSize: 12, fontWeight: 700, color: color || C.blue }}>{value}</span>
  </div>
);

const Panel = ({ children, style = {} }) => (
  <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px", ...style }}>
    {children}
  </div>
);

const SectionHead = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
    {children}
  </div>
);

const Badge = ({ text, color, bg }) => (
  <span style={{ background: bg, color: color, border: `1px solid ${color}`, borderRadius: 12, padding: "2px 9px", fontSize: 11, fontWeight: 600 }}>
    {text}
  </span>
);

// ── Category groups ─────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", label: "Alle (20)" },
  { id: "grundlegend", label: "Grundlegend" },
  { id: "semantisch", label: "Semantisch" },
  { id: "hierarchisch", label: "Hierarchisch" },
  { id: "adaptiv", label: "Adaptiv" },
  { id: "kompression", label: "Kompression" },
  { id: "spezialisiert", label: "Spezialisiert" },
];

// ── Strategy definitions ────────────────────────────────────────────────────
const STRATEGIES = [
  // ── GRUNDLEGEND ─────────────────────────────────────────────────────────
  {
    id: "fixed", cat: "grundlegend", num: "01",
    name: "Fixed-Size Chunking",
    subtitle: "Gleichmäßige Zerlegung in Token-Einheiten fixer Größe S",
    color: C.blue, bg: C.blueL,
    profile: [
      ["Retrieval-Effektivität", "Niedrig", C.red],
      ["Kontextkohärenz", "Niedrig", C.red],
      ["Latenz", "Niedrig ✓", C.green],
      ["Storage-Kosten", "Niedrig ✓", C.green],
      ["Komplexität", "Einfach ✓", C.green],
      ["Use Case", "Baseline / Rapid Prototyping", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Token-Stream → Chunks (S = 5, Overlap = 0)</SectionHead>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10"].map((t, i) => (
            <TokenBox key={i} label={t} fc={[C.blueL,C.greenL,C.goldL][Math.floor(i/5)%3]} ec={[C.blue,C.green,C.gold][Math.floor(i/5)%3]} />
          ))}
        </div>
        <ChunkBox tokens={["T1","T2","T3","T4","T5"]} label="Chunk 1 (Token 1–5)" fc={C.blueL} ec={C.blue} />
        <ChunkBox tokens={["T6","T7","T8","T9","T10"]} label="Chunk 2 (Token 6–10)" fc={C.greenL} ec={C.green} />
        <Panel style={{ background: C.redL, border: `1px solid ${C.red}` }}>
          <span style={{ color: C.red, fontWeight: 700, fontSize: 12 }}>⚠ Boundary-Cut-Problem: </span>
          <span style={{ fontSize: 12, color: C.grey }}>Semantische Einheiten werden mechanisch zerrissen — kein Bezug auf natürliche Satzgrenzen.</span>
        </Panel>
        <Panel style={{ marginTop: 8 }}>
          <code style={{ fontSize: 11 }}>
            tokens = tokenize(text)<br/>
            for i in range(0, len(tokens), S):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;chunk = tokens[i : i + S]
          </code>
        </Panel>
      </div>
    ),
  },
  {
    id: "sliding", cat: "grundlegend", num: "02",
    name: "Sliding Window Chunking",
    subtitle: "Überlappende Fenster zur Reduktion von Boundary-Verlusten",
    color: C.gold, bg: C.goldL,
    profile: [
      ["Retrieval-Effektivität", "Mittel", C.gold],
      ["Kontextkohärenz", "Mittel", C.gold],
      ["Latenz", "Hoch", C.red],
      ["Storage-Kosten", "Mittel–Hoch", C.red],
      ["Komplexität", "Einfach ✓", C.green],
      ["Use Case", "Overlap-sensitive Korpora", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Sliding Window (S = 6, Overlap O = 2)</SectionHead>
        <ChunkBox tokens={["T1","T2","T3","T4","T5","T6"]} label="Chunk 1 (T1–T6)" fc={C.blueL} ec={C.blue} />
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          {["T5","T6"].map((t,i) => <TokenBox key={i} label={t} fc={C.goldL} ec={C.gold} />)}
          {["T7","T8","T9","T10"].map((t,i) => <TokenBox key={i} label={t} fc={C.greenL} ec={C.green} />)}
        </div>
        <div style={{ fontSize: 11, color: C.gold, fontWeight: 700, marginBottom: 8 }}>↑ Chunk 2 (T5–T10): T5, T6 = Overlap-Bereich</div>
        <Panel>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Overlap-Kostenformel</div>
          <code style={{ fontSize: 12 }}>Index-Größe ≈ N_chunks × (1 + O/S)</code>
          <div style={{ marginTop: 8, fontSize: 11, color: C.red }}>Beispiel O=50%: Index ×1,5 gegenüber O=0</div>
          <div style={{ fontSize: 11, color: C.green, marginTop: 4 }}>Empfehlung: O = 15–20% von S</div>
        </Panel>
      </div>
    ),
  },
  {
    id: "sentence", cat: "grundlegend", num: "03",
    name: "Sentence / Paragraph Chunking",
    subtitle: "Zerlegung an natürlichen Satz- und Absatzgrenzen",
    color: C.teal, bg: C.tealL,
    profile: [
      ["Retrieval-Effektivität", "Mittel–Hoch", C.gold],
      ["Kontextkohärenz", "Mittel", C.gold],
      ["Latenz", "Mittel", C.gold],
      ["Storage-Kosten", "Mittel", C.gold],
      ["Komplexität", "Einfach ✓", C.green],
      ["Use Case", "Klare Satzstruktur", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Natürliche Satzgrenzen erkennen</SectionHead>
        <Panel style={{ marginBottom: 8, fontSize: 12 }}>
          <span style={{ color: C.blue, fontWeight: 700 }}>[S1]</span> Das Unternehmen erzielte 12,4 Mrd. €.{" "}
          <span style={{ color: C.green, fontWeight: 700 }}>[S2]</span> Das EBIT stieg um 8 %.{" "}
          <span style={{ color: C.gold, fontWeight: 700 }}>[S3]</span> Die Region DACH wuchs am stärksten.
        </Panel>
        <ChunkBox tokens={["Das","Unternehmen","erzielte","12,4","Mrd.","€."]} label="Chunk 1 = Satz S1" fc={C.blueL} ec={C.blue} />
        <ChunkBox tokens={["Das","EBIT","stieg","um","8%."]} label="Chunk 2 = Satz S2" fc={C.greenL} ec={C.green} />
        <ChunkBox tokens={["Die","Region","DACH","wuchs","stärksten."]} label="Chunk 3 = Satz S3" fc={C.goldL} ec={C.gold} />
        <Panel>
          <div style={{ fontSize: 12 }}>Boundary-Indikatoren: <code>. ! ? \n \n\n</code></div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>Variable Chunk-Länge → Padding/Truncation beim Batching erforderlich</div>
        </Panel>
      </div>
    ),
  },
  {
    id: "recursive", cat: "grundlegend", num: "04",
    name: "Recursive / Hybrid Chunking",
    subtitle: "Separator-Hierarchie — größtmöglich kohärente Chunks ≤ S Token",
    color: C.orange, bg: C.orangeL,
    profile: [
      ["Retrieval-Effektivität", "Mittel–Hoch", C.gold],
      ["Kontextkohärenz", "Mittel–Hoch", C.gold],
      ["Latenz", "Niedrig ✓", C.green],
      ["Storage-Kosten", "Mittel", C.gold],
      ["Komplexität", "Einfach ✓", C.green],
      ["Use Case", "General-Purpose, LangChain-Standard", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Separator-Hierarchie (Priorität absteigend)</SectionHead>
        {[["1.", "\\n\\n", "Absätze", C.green, C.greenL],
          ["2.", "\\n",   "Zeilenumbrüche", C.blue, C.blueL],
          ["3.", ". ",    "Satzenden", C.gold, C.goldL],
          ["4.", " ",     "Wörter (Fallback)", C.red, C.redL],
        ].map(([nr, sep, desc, ec, fc]) => (
          <div key={nr} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: ec, width: 18 }}>{nr}</span>
            <code style={{ background: fc, border: `1px solid ${ec}`, borderRadius: 4, padding: "2px 8px", fontSize: 12 }}>{sep}</code>
            <span style={{ fontSize: 12, color: C.grey }}>{desc}</span>
          </div>
        ))}
        <Panel style={{ marginTop: 8 }}>
          <code style={{ fontSize: 11 }}>
            RecursiveCharacterTextSplitter(<br/>
            &nbsp;&nbsp;chunk_size=512, chunk_overlap=76,<br/>
            &nbsp;&nbsp;separators=["\\n\\n","\\n",". "," "]<br/>
            )
          </code>
        </Panel>
      </div>
    ),
  },

  // ── SEMANTISCH ────────────────────────────────────────────────────────────
  {
    id: "texttiling", cat: "semantisch", num: "06a",
    name: "TextTiling",
    subtitle: "TF-IDF-basierte Topic-Segmentierung (Hearst 1997)",
    color: C.purple, bg: C.purpleL,
    profile: [
      ["Retrieval-Effektivität", "Mittel", C.gold],
      ["Kontextkohärenz", "Hoch ✓", C.green],
      ["Latenz", "Niedrig ✓", C.green],
      ["Storage-Kosten", "Niedrig ✓", C.green],
      ["Komplexität", "Mittel", C.gold],
      ["Use Case", "Klassische Fließtexte", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Prinzip: Gleitende Fenster + TF-IDF-Kosinus-Abfall</SectionHead>
        <Panel style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 12 }}>Zwei aufeinanderfolgende Fenster werden verglichen. Ein starker Abfall der Kosinus-Ähnlichkeit indiziert einen Topikwechsel.</div>
        </Panel>
        {[
          { window: "Fenster A (S1–S4)", sim: "sim=0.88", topic: "Finanzkennzahlen", fc: C.blueL, ec: C.blue },
          { window: "← Boundary (sim-Abfall 0.88→0.22) →", sim: null, topic: null, fc: C.redL, ec: C.red },
          { window: "Fenster B (S5–S8)", sim: "sim=0.91", topic: "Regionale Entwicklung", fc: C.greenL, ec: C.green },
        ].map((r, i) => (
          <div key={i} style={{ background: r.fc, border: `1.5px solid ${r.ec}`, borderRadius: 6, padding: "6px 10px", marginBottom: 4, fontSize: 11 }}>
            <strong style={{ color: r.ec }}>{r.window}</strong>
            {r.topic && <span style={{ color: C.muted }}> — Topik: {r.topic} {r.sim}</span>}
          </div>
        ))}
        <Panel style={{ marginTop: 8, fontSize: 11, color: C.muted }}>
          Limitation: Rein lexikal-basiert — keine semantische Äquivalenz (Synonyme, Paraphrasen)
        </Panel>
      </div>
    ),
  },
  {
    id: "c99", cat: "semantisch", num: "06b",
    name: "C99",
    subtitle: "Cosinus-Ähnlichkeitsmatrix + Divisive Clustering (Choi 2000)",
    color: C.purple, bg: C.purpleL,
    profile: [
      ["Retrieval-Effektivität", "Mittel–Hoch", C.gold],
      ["Kontextkohärenz", "Hoch ✓", C.green],
      ["Latenz", "Mittel", C.gold],
      ["Storage-Kosten", "Mittel", C.gold],
      ["Komplexität", "Mittel", C.gold],
      ["Use Case", "Benchmark-Segmentierung", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Ähnlichkeitsmatrix — Blockstruktur identifiziert Segmente</SectionHead>
        <Panel style={{ marginBottom: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3, maxWidth: 220 }}>
            {[0.95,0.91,0.12,0.08, 0.91,0.93,0.10,0.07, 0.12,0.10,0.94,0.88, 0.08,0.07,0.88,0.96].map((v,i) => (
              <div key={i} style={{
                width: 40, height: 28, background: v > 0.5 ? C.blueL : C.redL,
                border: `1px solid ${v > 0.5 ? C.blue : C.red}`,
                borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 600, color: v > 0.5 ? C.blue : C.red,
              }}>{v.toFixed(2)}</div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>Blöcke hoher Ähnlichkeit = zusammenhängende Segmente</div>
        </Panel>
        <Panel style={{ fontSize: 11, color: C.muted }}>
          Evaluationsmetrik: WindowDiff — Strafe für Boundary-Fehler im ±k-Token-Fenster.<br/>
          Komplexität: O(n²) Speicher — bei langen Dokumenten rechenintensiv.
        </Panel>
      </div>
    ),
  },
  {
    id: "lcseg", cat: "semantisch", num: "06c",
    name: "LCseg",
    subtitle: "Lexikale Kohäsionsketten (Galley 2003)",
    color: C.purple, bg: C.purpleL,
    profile: [
      ["Retrieval-Effektivität", "Mittel", C.gold],
      ["Kontextkohärenz", "Hoch ✓", C.green],
      ["Latenz", "Niedrig ✓", C.green],
      ["Storage-Kosten", "Niedrig ✓", C.green],
      ["Komplexität", "Einfach ✓", C.green],
      ["Use Case", "Lexikale Kohäsion", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Prinzip: Repetitive Termverwendung als Kohäsionsindikator</SectionHead>
        <Panel style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 12 }}>Ketten gleicher oder verwandter Terme werden verfolgt. Ein Abbruch vieler Ketten gleichzeitig signalisiert eine Topikgrenze.</div>
        </Panel>
        {[
          { chain: "Kette »EBIT«", sents: ["S1 ✓", "S2 ✓", "S3 ✓", "S4 —"], fc: C.blueL, ec: C.blue },
          { chain: "Kette »Umsatz«", sents: ["S1 ✓", "S2 —", "S3 —", "S4 —"], fc: C.goldL, ec: C.gold },
          { chain: "Kette »Werk«", sents: ["S1 —", "S2 —", "S3 —", "S4 ✓"], fc: C.greenL, ec: C.green },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: r.ec, fontWeight: 700, minWidth: 100 }}>{r.chain}</span>
            {r.sents.map((s, j) => (
              <div key={j} style={{ background: s.includes("✓") ? r.fc : C.panel, border: `1px solid ${s.includes("✓") ? r.ec : C.border}`, borderRadius: 4, padding: "2px 7px", fontSize: 10 }}>{s}</div>
            ))}
          </div>
        ))}
        <Panel style={{ marginTop: 8, fontSize: 11, color: C.muted }}>
          Schwäche: Keine Synoym-Erkennung — »Erlös« und »Umsatz« werden als separate Ketten behandelt.
        </Panel>
      </div>
    ),
  },
  {
    id: "topictiling", cat: "semantisch", num: "06d",
    name: "TopicTiling",
    subtitle: "LDA-Topic-IDs statt Terme (Riedl & Biemann 2012)",
    color: C.purple, bg: C.purpleL,
    profile: [
      ["Retrieval-Effektivität", "Mittel–Hoch", C.gold],
      ["Kontextkohärenz", "Hoch ✓", C.green],
      ["Latenz", "Mittel", C.gold],
      ["Storage-Kosten", "Mittel", C.gold],
      ["Komplexität", "Mittel", C.gold],
      ["Use Case", "LDA-basierte Segmentierung", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Erweiterung von TextTiling: LDA-Topics statt TF-IDF-Terme</SectionHead>
        <Panel style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 12 }}>Anstelle von Termen werden LDA-Topic-IDs verglichen. Zwei Sätze gehören zusammen, wenn ihre dominanten Topics ähnlich sind — robuster gegenüber Synonymen.</div>
        </Panel>
        {[
          { sent: "S1: »Umsatz stieg auf 12,4 Mrd. €«", topic: "Topic 2 (Finanzen)", ec: C.blue, fc: C.blueL },
          { sent: "S2: »Erlös wuchs um 8 %«", topic: "Topic 2 (Finanzen)", ec: C.blue, fc: C.blueL },
          { sent: "S3: »Neues Werk in Wrocław eröffnet«", topic: "Topic 7 (Investitionen)", ec: C.green, fc: C.greenL },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: r.fc, border: `1px solid ${r.ec}`, borderRadius: 6, padding: "5px 10px", marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: C.grey }}>{r.sent}</span>
            <Badge text={r.topic} color={r.ec} bg={r.fc} />
          </div>
        ))}
        <Panel style={{ marginTop: 8, fontSize: 11, color: C.muted }}>
          Voraussetzung: LDA-Modell muss auf Domänendaten vortrainiert werden — kein Zero-Shot.
        </Panel>
      </div>
    ),
  },
  {
    id: "embedkcpd", cat: "semantisch", num: "07",
    name: "Embedding-Based Change-Point Detection (Embed-KCPD)",
    subtitle: "Cosinus-Ähnlichkeit aufeinanderfolgender Satz-Embeddings",
    color: C.teal, bg: C.tealL,
    profile: [
      ["Retrieval-Effektivität", "Hoch ✓", C.green],
      ["Kontextkohärenz", "Hoch ✓", C.green],
      ["Latenz (Ingestion)", "Niedrig ✓", C.green],
      ["Storage-Kosten", "Hoch", C.red],
      ["Komplexität", "Hoch", C.red],
      ["Use Case", "Lange Fließtexte ✓", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Ähnlichkeitsprofil aufeinanderfolgender Sätze</SectionHead>
        {[
          { pair: "sim(S1,S2)", val: 0.91, break: false },
          { pair: "sim(S2,S3)", val: 0.88, break: false },
          { pair: "sim(S3,S4)", val: 0.26, break: true },
          { pair: "sim(S4,S5)", val: 0.89, break: false },
          { pair: "sim(S5,S6)", val: 0.31, break: true },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
            <span style={{ fontSize: 11, minWidth: 90, color: C.muted }}>{r.pair}</span>
            <div style={{ flex: 1, height: 16, background: C.panel, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${r.val * 100}%`, height: "100%", background: r.break ? C.red : C.blue, borderRadius: 4 }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: r.break ? C.red : C.blue, minWidth: 36 }}>{r.val.toFixed(2)}</span>
            {r.break && <Badge text="GRENZE" color={C.red} bg={C.redL} />}
          </div>
        ))}
        <Panel style={{ marginTop: 8, fontSize: 11, color: C.muted }}>
          Schwellenwert θ (typisch: cos-sim &lt; 0.5) wird empirisch kalibriert. Bei langen Dokumenten: RUPTURES-Bibliothek für robustere Change-Point-Detection empfohlen.
        </Panel>
      </div>
    ),
  },

  // ── HIERARCHISCH ─────────────────────────────────────────────────────────
  {
    id: "parentchild", cat: "hierarchisch", num: "05",
    name: "Parent–Child Chunking",
    subtitle: "«Retrieve small, return parent» — löst den Retrieval/Generierungs-Zielkonflikt",
    color: C.green, bg: C.greenL,
    profile: [
      ["Retrieval-Effektivität", "Hoch ✓", C.green],
      ["Kontextkohärenz", "Mittel–Hoch ✓", C.green],
      ["Latenz", "Mittel", C.gold],
      ["Storage-Kosten", "Mittel", C.gold],
      ["Komplexität", "Mittel", C.gold],
      ["Use Case", "Enterprise-Dokumente ✓", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Parent-Chunk (1024 Token) — gespeichert, nicht indiziert</SectionHead>
        <div style={{ background: C.greenL, border: `2px solid ${C.green}`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.green, marginBottom: 8 }}>P1: Abschnitt »Umsatzentwicklung GJ 2024« (≈1024 Token)</div>
          <div style={{ display: "flex", gap: 6 }}>
            {[["C1: Umsatz +12%", C.blue, C.blueL], ["C2: EBIT +8%", C.gold, C.goldL], ["C3: DACH +15%", C.purple, C.purpleL]].map(([l, ec, fc], i) => (
              <div key={i} style={{ flex: 1, background: fc, border: `1.5px solid ${ec}`, borderRadius: 6, padding: "6px 10px", fontSize: 11, fontWeight: 700, color: ec }}>
                {l}<br/><span style={{ fontWeight: 400, color: C.muted }}>256 Token — indiziert</span>
              </div>
            ))}
          </div>
        </div>
        <Panel>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 6 }}>Retrieval-Ablauf</div>
          {[
            ["🔍 Query", "»EBIT-Entwicklung 2024«", C.blue],
            ["→ Child-Match", "C2 gefunden (cos-sim = 0.94)", C.gold],
            ["→ Parent-Lookup", "P1 geladen via Pointer", C.green],
            ["→ LLM-Kontext", "Vollständiger P1 übergeben", C.purple],
          ].map(([label, val, c], i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "3px 0", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: c, minWidth: 110 }}>{label}</span>
              <span style={{ fontSize: 11, color: C.grey }}>{val}</span>
            </div>
          ))}
        </Panel>
      </div>
    ),
  },
  {
    id: "automerge", cat: "hierarchisch", num: "13",
    name: "Auto-Merging (Parent-Swap)",
    subtitle: "Dynamisches Ersetzen mehrerer Child-Chunks durch den Parent",
    color: C.green, bg: C.greenL,
    profile: [
      ["Retrieval-Effektivität", "Hoch ✓", C.green],
      ["Kontextkohärenz", "Hoch ✓", C.green],
      ["Latenz", "Mittel", C.gold],
      ["Storage-Kosten", "Mittel", C.gold],
      ["Komplexität", "Mittel", C.gold],
      ["Use Case", "LlamaIndex-Ökosystem", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Schwellenwert-basierter Parent-Swap</SectionHead>
        <div style={{ background: C.greenL, border: `1.5px solid ${C.green}`, borderRadius: 8, padding: 10, marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.green }}>Parent P1 (1024 Token)</div>
          <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
            {[["C1: 0.45", false], ["C2: 0.89", true], ["C3: 0.91", true], ["C4: 0.38", false]].map(([l, matched], i) => (
              <div key={i} style={{ flex: 1, background: matched ? C.greenL : C.redL, border: `1.5px solid ${matched ? C.green : C.red}`, borderRadius: 5, padding: "4px 6px", fontSize: 10, textAlign: "center", fontWeight: 700, color: matched ? C.green : C.red }}>
                {l} {matched ? "✓" : "✗"}
              </div>
            ))}
          </div>
        </div>
        <Panel style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 12 }}>
            <strong>Threshold = 0.5</strong>: 2 von 4 Chunks matched (50%) → Merge-Bedingung erfüllt<br/>
            → P1 wird <strong>statt C2+C3</strong> an das LLM übergeben
          </div>
        </Panel>
        <Panel style={{ fontSize: 11, color: C.muted }}>
          LlamaIndex: <code>AutoMergingRetriever + SimpleHierarchicalNodeParser</code><br/>
          chunk_sizes=[1024, 512, 256], merge_threshold=0.5
        </Panel>
      </div>
    ),
  },

  // ── ADAPTIV ───────────────────────────────────────────────────────────────
  {
    id: "sentwindow", cat: "adaptiv", num: "12",
    name: "Sentence-Window / Neighbor Expansion",
    subtitle: "Kleine Indexeinheit + dynamische Kontexterweiterung zur Laufzeit",
    color: C.blue, bg: C.blueL,
    profile: [
      ["Retrieval-Effektivität", "Hoch ✓", C.green],
      ["Kontextkohärenz", "Hoch ✓", C.green],
      ["Latenz (Retrieval)", "Niedrig ✓", C.green],
      ["Komplexität", "Mittel", C.gold],
      ["Update-Frequenz", "Hoch ✓", C.green],
      ["Use Case", "Adaptiver Kontext, kurze Docs", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Jeder Satz wird einzeln indiziert — Kontext wird zur Laufzeit expandiert</SectionHead>
        <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
          {["S1: Umsatz +12%","S2: DACH +15%","S3: EBIT +8%","S4: Cashflow +","S5: Ausblick +"].map((s,i) => (
            <div key={i} style={{ flex: 1, background: i===2 ? C.redL : C.blueL, border: `1.5px solid ${i===2 ? C.red : C.blue}`, borderRadius: 6, padding: "5px 7px", fontSize: 10, textAlign: "center", fontWeight: i===2 ? 700 : 400 }}>
              {s} {i===2 ? "← Match" : ""}
            </div>
          ))}
        </div>
        <Panel style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Window W=1: Expansion um ±1 Nachbar</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, background: C.goldL, border: `1.5px solid ${C.gold}`, borderRadius: 6, padding: "6px 10px", fontSize: 11 }}>S2 (Nachbar links)</div>
            <div style={{ flex: 1, background: C.greenL, border: `2px solid ${C.green}`, borderRadius: 6, padding: "6px 10px", fontSize: 11, fontWeight: 700 }}>S3 (Match)</div>
            <div style={{ flex: 1, background: C.goldL, border: `1.5px solid ${C.gold}`, borderRadius: 6, padding: "6px 10px", fontSize: 11 }}>S4 (Nachbar rechts)</div>
          </div>
          <div style={{ fontSize: 11, color: C.green, marginTop: 6 }}>→ S2+S3+S4 als Kontext an LLM übergeben</div>
        </Panel>
        <Panel style={{ fontSize: 11, color: C.muted }}>LlamaIndex: <code>SentenceWindowNodeParser(window_size=3)</code></Panel>
      </div>
    ),
  },
  {
    id: "latechunking", cat: "adaptiv", num: "16",
    name: "Late Chunking (Embed-then-Chunk)",
    subtitle: "Kontextbewusste Token-Embeddings vor der Chunk-Zerlegung",
    color: C.purple, bg: C.purpleL,
    profile: [
      ["Retrieval-Effektivität", "Hoch ✓", C.green],
      ["Kontextkohärenz", "Hoch ✓", C.green],
      ["Latenz", "Mittel", C.gold],
      ["Storage-Kosten", "Mittel", C.gold],
      ["Komplexität", "Mittel", C.gold],
      ["Use Case", "Lange Encoder, kurze Docs", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Chunk-then-Embed vs. Embed-then-Chunk</SectionHead>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
          <div style={{ background: C.redL, border: `1.5px solid ${C.red}`, borderRadius: 8, padding: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.red, marginBottom: 6 }}>Standard (Kontextverlust)</div>
            <div style={{ fontSize: 11 }}>Chunk 1: »Umsatz stieg…«</div>
            <div style={{ fontSize: 11 }}>Chunk 2: »Er stieg auf 12 Mrd.«</div>
            <div style={{ fontSize: 10, color: C.red, marginTop: 6 }}>⚠ »Er« verliert Bezug zu »Umsatz«</div>
          </div>
          <div style={{ background: C.greenL, border: `1.5px solid ${C.green}`, borderRadius: 8, padding: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.green, marginBottom: 6 }}>Late Chunking ✓</div>
            <div style={{ fontSize: 11 }}>1. Volles Dokument embedden</div>
            <div style={{ fontSize: 11 }}>2. Grenzen danach anwenden</div>
            <div style={{ fontSize: 10, color: C.green, marginTop: 6 }}>✓ »Er« = Umsatz — aufgelöst</div>
          </div>
        </div>
        <Panel>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Voraussetzung</div>
          <div style={{ fontSize: 11 }}>Encoder mit langem Kontextfenster: <strong>BGE-M3 (8192 Token)</strong>, jina-embeddings-v2, Longformer</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>Caveat: Memory-Footprint ↑ linear mit Dokumentlänge</div>
        </Panel>
      </div>
    ),
  },

  // ── KOMPRESSION ───────────────────────────────────────────────────────────
  {
    id: "compression", cat: "kompression", num: "14",
    name: "Contextual Compression (Post-Retrieval)",
    subtitle: "Entfernung query-irrelevanter Passagen nach dem Retrieval",
    color: C.teal, bg: C.tealL,
    profile: [
      ["Retrieval-Effektivität", "Sehr Hoch ✓", C.green],
      ["Kontextkohärenz", "Sehr Hoch ✓", C.green],
      ["Latenz (Gesamt)", "Hoch", C.red],
      ["LLM-Kosten", "Senkt Kosten ✓", C.green],
      ["Komplexität", "Mittel", C.gold],
      ["Use Case", "Post-Retrieval Filter, LLM-Kosten ↓", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Pipeline: Retrieve → Compress → Generate</SectionHead>
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          {["Hybrid\nRetrieval\nTop-10", "Compressor\n(LLM/ML)", "Komprimierter\nKontext\nTop-5"].map((l, i) => (
            <div key={i} style={{ flex: 1, background: [C.blueL, C.goldL, C.greenL][i], border: `1.5px solid ${[C.blue, C.gold, C.green][i]}`, borderRadius: 6, padding: "6px 10px", fontSize: 10, textAlign: "center", fontWeight: 700, whiteSpace: "pre", color: [C.blue, C.gold, C.green][i] }}>
              {l}
            </div>
          ))}
        </div>
        {[
          ["C1: EBIT stieg um 8%", true],
          ["C2: Dividende wurde erhöht", false],
          ["C3: EBIT-Marge: 9,7%", true],
          ["C4: Neues Werk in Wrocław", false],
          ["C5: Adj. EBIT: 1,24 Mrd. €", true],
        ].map(([text, relevant], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: relevant ? C.greenL : C.redL, border: `1px solid ${relevant ? C.green : C.red}`, borderRadius: 5, padding: "4px 10px", marginBottom: 4, fontSize: 11 }}>
            <span>{text}</span>
            <span style={{ color: relevant ? C.green : C.red, fontWeight: 700 }}>{relevant ? "✓ behalten" : "✗ entfernt"}</span>
          </div>
        ))}
        <Panel style={{ marginTop: 8, fontSize: 11, color: C.muted }}>
          LangChain: <code>ContextualCompressionRetriever + LLMChainExtractor / EmbeddingsFilter</code>
        </Panel>
      </div>
    ),
  },
  {
    id: "llmlingua", cat: "kompression", num: "15",
    name: "LLMLingua",
    subtitle: "Token-Level Kompression durch Perplexitäts-Scoring (Microsoft Research)",
    color: C.teal, bg: C.tealL,
    profile: [
      ["Retrieval-Effektivität", "Sehr Hoch ✓", C.green],
      ["Kontextkohärenz", "Sehr Hoch ✓", C.green],
      ["Latenz", "Mittel", C.gold],
      ["Kompressionsrate", "50–80% weniger Token", C.green],
      ["Komplexität", "Hoch", C.red],
      ["Use Case", "Token-Budget-Optimierung", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Perplexitäts-basierte Token-Selektion (θ = 0.4)</SectionHead>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
          {[["Das",0.2],["Unternehmen",0.15],["erzielte",0.85],["im",0.1],["GJ",0.7],["2024",0.95],["einen",0.1],["Umsatz",0.92],["von",0.12],["12,4",0.98],["Mrd.",0.96],["€",0.89]].map(([tok,p],i) => (
            <div key={i} style={{ background: p >= 0.4 ? C.greenL : C.redL, border: `1.5px solid ${p >= 0.4 ? C.green : C.red}`, borderRadius: 5, padding: "3px 7px", fontSize: 10 }}>
              <div style={{ fontFamily: "monospace", fontWeight: 700 }}>{tok}</div>
              <div style={{ fontSize: 9, color: p >= 0.4 ? C.green : C.red }}>p={p.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <Panel style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 12 }}>
            <strong>Behalten:</strong> erzielte, GJ, 2024, Umsatz, 12,4, Mrd., €<br/>
            <strong style={{ color: C.green }}>Kompressionsrate: ~58% Token behalten</strong>
          </div>
        </Panel>
        <Panel style={{ fontSize: 11, color: C.muted }}>
          Small-LM bewertet Informativität (Perplexität) vor dem großen LLM. Implementierungen: LLMLingua-2, LongLLMLingua (Microsoft Research, 2023/2024)
        </Panel>
      </div>
    ),
  },

  // ── SPEZIALISIERT ─────────────────────────────────────────────────────────
  {
    id: "llmassisted", cat: "spezialisiert", num: "08",
    name: "LLM-Assisted Chunking",
    subtitle: "Schema-geführte Zerlegung durch ein LLM — semantisch präziseste Methode",
    color: C.red, bg: C.redL,
    profile: [
      ["Retrieval-Effektivität", "Sehr Hoch ✓", C.green],
      ["Kontextkohärenz", "Sehr Hoch ✓", C.green],
      ["Latenz", "Sehr Niedrig", C.red],
      ["Storage-Kosten", "Sehr Hoch", C.red],
      ["Komplexität", "Sehr Hoch", C.red],
      ["Use Case", "Kleine, kritische Korpora", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Schema-geführter Prompt</SectionHead>
        <Panel style={{ marginBottom: 8 }}>
          <code style={{ fontSize: 10 }}>
            System: Extrahiere alle semantisch eigenständigen Abschnitte.<br/>
            Gib zurück: &#123;"chunks": [&#123;"title": ..., "content": ...,<br/>
            &nbsp;"type": ..., "entities": [...], "period": ...&#125;]&#125;<br/><br/>
            Erkenne: Kennzahlenblöcke, Risikoabschnitte, Segmentberichte…
          </code>
        </Panel>
        <Panel style={{ marginBottom: 8 }}>
          <code style={{ fontSize: 10 }}>
            Output: &#123;"chunks": [<br/>
            &nbsp;&#123;"title": "Umsatzentwicklung Q3",<br/>
            &nbsp;&nbsp;"type": "financial_metric",<br/>
            &nbsp;&nbsp;"entities": ["EBIT","12,4 Mrd.","DACH"],<br/>
            &nbsp;&nbsp;"period": "2024-Q3"&#125;, …]&#125;
          </code>
        </Panel>
        <Panel style={{ background: C.redL, border: `1px solid ${C.red}` }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.red }}>⚠ Kosten-Warnung: </span>
          <span style={{ fontSize: 12 }}>ca. 0,01–0,05 USD/Dokument via GPT-4o. Nur für kleine, kritische Korpora sinnvoll (max. ~1.000 Dokumente).</span>
        </Panel>
      </div>
    ),
  },
  {
    id: "ocr", cat: "spezialisiert", num: "09",
    name: "OCR / Layout-Aware Chunking",
    subtitle: "Struktur-first Pipeline für PDFs, Scans und tabellenreiche Dokumente",
    color: C.orange, bg: C.orangeL,
    profile: [
      ["Retrieval-Effektivität", "Hoch ✓", C.green],
      ["Kontextkohärenz", "Hoch ✓", C.green],
      ["Latenz (Ingestion)", "Niedrig ✓", C.green],
      ["Storage-Kosten", "Mittel–Hoch", C.red],
      ["Komplexität", "Hoch", C.red],
      ["Use Case", "Tabellenreiche PDFs ✓", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Element-Klassifikation (Unstructured hi_res)</SectionHead>
        {[
          ["📌 Title", "→ Metadaten-Tag (Kontext)", C.blue, C.blueL],
          ["📝 NarrativeText", "→ Paragraph-Chunk (256 Token)", C.green, C.greenL],
          ["📊 Table", "→ Atomic Chunk (unzerlegt!) ✓", C.gold, C.goldL],
          ["🖼 Image/Figure", "→ Caption-Chunk + CLIP-Embedding", C.purple, C.purpleL],
        ].map(([type, action, ec, fc], i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
            <div style={{ background: fc, border: `1.5px solid ${ec}`, borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: ec, minWidth: 160 }}>{type}</div>
            <span style={{ fontSize: 12, color: C.grey }}>→</span>
            <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 11 }}>{action}</div>
          </div>
        ))}
        <Panel style={{ marginTop: 8, background: C.greenL, border: `1px solid ${C.green}` }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.green }}>✓ Kernvorteil: </span>
          <span style={{ fontSize: 12 }}>Tabellen bleiben als atomare Einheit erhalten — kein Zeilen-Durchschneiden durch Token-Limits.</span>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>hi_res: 3–5× langsamer als fast, aber deutlich höhere Extraktionsqualität.</div>
        </Panel>
      </div>
    ),
  },
  {
    id: "multimodal", cat: "spezialisiert", num: "10",
    name: "Multimodales Chunking",
    subtitle: "Text + Tabellen + Bilder als integrierte Retrieval-Einheiten",
    color: C.purple, bg: C.purpleL,
    profile: [
      ["Retrieval-Effektivität", "Hoch ✓", C.green],
      ["Kontextkohärenz", "Hoch ✓", C.green],
      ["Latenz", "Mittel", C.gold],
      ["Storage-Kosten", "Hoch", C.red],
      ["Komplexität", "Sehr Hoch", C.red],
      ["Use Case", "PDFs + Bilder + Diagramme", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Embedding-Strategien je Modalität</SectionHead>
        {[
          ["TEXT", "Fließtext, Transkripte", "Text-Encoder (BGE-M3)", C.blue, C.blueL],
          ["TABELLEN", "Finanzkennzahlen", "Tabelle → Text → Encoder", C.gold, C.goldL],
          ["BILDER", "Diagramme, Charts", "CLIP / Visual-Encoder", C.purple, C.purpleL],
          ["FORMELN/XBRL", "Strukturierte Kennzahlen", "Serialisierung → Text-Encoder", C.teal, C.tealL],
        ].map(([type, desc, encoder, ec, fc], i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
            <div style={{ background: fc, border: `1.5px solid ${ec}`, borderRadius: 5, padding: "3px 8px", fontSize: 10, fontWeight: 700, color: ec, minWidth: 100, textAlign: "center" }}>{type}</div>
            <span style={{ fontSize: 10, color: C.muted, flex: 1 }}>{desc}</span>
            <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 5, padding: "3px 8px", fontSize: 10 }}>{encoder}</div>
          </div>
        ))}
        <Panel style={{ marginTop: 8, background: C.goldL, border: `1px solid ${C.gold}` }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.gold }}>⚠ Alignment: </span>
          <span style={{ fontSize: 11 }}>CLIP- und Text-Embeddings befinden sich in unterschiedlichen Vektorräumen — separater Index oder Bridging-Layer erforderlich.</span>
        </Panel>
      </div>
    ),
  },
  {
    id: "metadata", cat: "spezialisiert", num: "11",
    name: "Metadata / Time-Based Chunking",
    subtitle: "Strukturierte Metadaten-Attribute für facettierte Filterung",
    color: C.blue, bg: C.blueL,
    profile: [
      ["Retrieval-Effektivität", "Mittel–Hoch", C.gold],
      ["Latenz", "Niedrig ✓", C.green],
      ["Kontextkohärenz", "Mittel", C.gold],
      ["Storage-Kosten", "Mittel", C.gold],
      ["Komplexität", "Mittel", C.gold],
      ["Use Case", "Zeitbasierte / facettierte Suche", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>Standardisiertes Chunk-Metadaten-Schema</SectionHead>
        <Panel style={{ marginBottom: 8 }}>
          <code style={{ fontSize: 10 }}>
            {`{
  "doc_id":           "gb_siemens_2024",
  "company":          "Siemens AG",
  "year":             2024,
  "report_type":      "Geschaeftsbericht",
  "segment":          "Digital Industries",
  "page":             47,
  "chunk_type":       "NarrativeText",
  "language":         "de",
  "source_trust_score": 0.95
}`}
          </code>
        </Panel>
        <SectionHead>Facettierte Filter-Beispiele (Qdrant payload filter)</SectionHead>
        {[
          ["Filter 1", "company=Siemens AND year IN [2022–2024]", C.blue],
          ["Filter 2", "segment=Digital AND chunk_type=Table", C.gold],
          ["Filter 3", "trust_score > 0.8 AND language=de", C.green],
        ].map(([name, filt, c], i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
            <Badge text={name} color={c} bg={C.surface} />
            <code style={{ fontSize: 10, color: C.grey, background: C.panel, padding: "3px 8px", borderRadius: 4 }}>{filt}</code>
          </div>
        ))}
        <Panel style={{ marginTop: 8, background: C.greenL, border: `1px solid ${C.green}`, fontSize: 11 }}>
          ✓ Filter wird <strong>vor</strong> ANN-Suche angewendet → drastische Suchraum-Reduktion ohne Qualitätsverlust.
        </Panel>
      </div>
    ),
  },
  {
    id: "hierarchical", cat: "hierarchisch", num: "17",
    name: "Hierarchical / Kombinierte Strategie",
    subtitle: "Multi-Level-Architektur — für komplexe Enterprise-Korpora",
    color: C.green, bg: C.greenL,
    profile: [
      ["Retrieval-Effektivität", "Sehr Hoch ✓", C.green],
      ["Kontextkohärenz", "Sehr Hoch ✓", C.green],
      ["Latenz", "Mittel", C.gold],
      ["Storage-Kosten", "Hoch", C.red],
      ["Komplexität", "Sehr Hoch", C.red],
      ["Use Case", "Komplexe Enterprise-Architektur ✓", C.blue],
    ],
    render: () => (
      <div>
        <SectionHead>RAG Intelligence Platform — Empfohlene Ingestion-Hierarchie</SectionHead>
        {[
          ["Level 1", "Dokument-Ebene", "Metadaten, Trust-Score, Sprache", C.blue, C.blueL],
          ["Level 2", "Abschnitt-Ebene (Parent)", "1024-Token-Chunks, Abschnittsbezeichnung", C.green, C.greenL],
          ["Level 3", "Retrieval-Ebene (Child)", "256-Token-Chunks, indiziert in Qdrant", C.gold, C.goldL],
          ["Level 4", "Atom-Ebene", "Einzelne Tabellen, Kennzahlen, Fakten", C.purple, C.purpleL],
        ].map(([lvl, name, desc, ec, fc], i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
            <div style={{ background: fc, border: `1.5px solid ${ec}`, borderRadius: 5, padding: "4px 9px", fontSize: 10, fontWeight: 700, color: ec, minWidth: 65, textAlign: "center" }}>{lvl}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: ec }}>{name}</div>
              <div style={{ fontSize: 10, color: C.muted }}>{desc}</div>
            </div>
          </div>
        ))}
        <Panel style={{ background: C.greenL, border: `1px solid ${C.green}`, marginTop: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.green, marginBottom: 4 }}>Empfehlung für Enterprise-Korpora:</div>
          <div style={{ fontSize: 11 }}>Pfad 1 (Text): Recursive → Parent-Child 256/1024, Overlap 15%<br/>
          Pfad 2 (PDF/Layout): OCR hi_res → Parent-Child<br/>
          Pfad 3 (Strukturdaten): XBRL → Serialisierung → Atom-Level</div>
        </Panel>
      </div>
    ),
  },
];

// ── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [activeId, setActiveId] = useState("concept");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = STRATEGIES.filter(s => {
    const matchCat = category === "all" || s.cat === category;
    const matchSearch = search === "" ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.subtitle.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const active = STRATEGIES.find(s => s.id === activeId) || null;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.heading }}>

      {/* ── Header ── */}
      <div style={{ background: "#161B22", color: C.blue, borderBottom: `2px solid ${C.blue}`, padding: "16px 24px" }}>
        <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
          RAG Intelligence Platform — Masterarbeit Kapitel 5
        </div>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Chunking-Strategien — Interaktive Referenz</h1>
        <p style={{ margin: "4px 0 0", fontSize: 12, opacity: 0.8 }}>
          Alle 20 Strategien · taxonomisiert · mit Bewertungsprofil · für Enterprise-RAG-Systeme
        </p>
      </div>

      {/* ── Concept overview button ── */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, color: C.grey, padding: "10px 24px", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => setActiveId("concept")}
          style={{ background: activeId === "concept" ? C.blue : C.blueL, color: activeId === "concept" ? "white" : C.blue, border: `1.5px solid ${C.blue}`, borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          ★ Was ist Chunking? (Grundkonzept)
        </button>
        <div style={{ width: 1, height: 24, background: C.border }} />
        <input
          placeholder="Strategie suchen…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ border: `1px solid ${C.border}`, borderRadius: 6, padding: "5px 10px", fontSize: 12, outline: "none", width: 200, background: C.surface, color: C.grey }} />
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
              background: category === cat.id ? C.heading : "transparent",
              color: category === cat.id ? "white" : C.grey,
              border: `1px solid ${category === cat.id ? C.heading : C.border}`,
              borderRadius: 20, padding: "3px 10px", fontSize: 11, cursor: "pointer",
            }}>{cat.label}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 140px)" }}>

        {/* ── Sidebar ── */}
        <div style={{ width: 280, background: C.surface, borderRight: `1px solid ${C.border}`, overflowY: "auto", flexShrink: 0 }}>
          {filtered.map(s => (
            <button key={s.id} onClick={() => setActiveId(s.id)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: activeId === s.id ? s.bg : "transparent",
              borderLeft: `4px solid ${activeId === s.id ? s.color : "transparent"}`,
              border: "none", borderBottom: `1px solid ${C.border}`,
              padding: "10px 14px", cursor: "pointer", transition: "background 0.1s",
            }}>
              <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: s.color, background: s.bg, border: `1px solid ${s.color}`, borderRadius: 3, padding: "1px 5px", flexShrink: 0 }}>
                  {s.num}
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: activeId === s.id ? s.color : C.grey, lineHeight: 1.3 }}>
                  {s.name}
                </span>
              </div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 3, marginLeft: 36, lineHeight: 1.3 }}>
                {s.subtitle.slice(0, 60)}{s.subtitle.length > 60 ? "…" : ""}
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 20, fontSize: 12, color: C.muted }}>Keine Strategie gefunden.</div>
          )}
        </div>

        {/* ── Main content ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {activeId === "concept" ? (
            <ConceptPanel />
          ) : active ? (
            <StrategyPanel strategy={active} />
          ) : (
            <div style={{ color: C.muted, fontSize: 13 }}>Strategie auswählen →</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Concept overview panel ──────────────────────────────────────────────────
function ConceptPanel() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 18, color: C.blue }}>Was ist Chunking?</h2>
        <p style={{ margin: 0, color: C.muted, fontSize: 13 }}>Grundkonzept für RAG-Systeme — nicht-parametrischer Speicher</p>
      </div>

      {/* Pipeline */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
        {[
          ["Quelldokument", "PDF, DOCX,\nTranskript", C.blue, C.blueL],
          null,
          ["Chunking", "Zerlegung in\nRetrieval-Einheiten", C.gold, C.goldL],
          null,
          ["Embedding", "Vektorisierung\njedes Chunks", C.green, C.greenL],
          null,
          ["HNSW-Index", "ANN-Suche\nVektordatenbank", C.teal, C.tealL],
          null,
          ["LLM-Antwort", "Kontextbasierte\nGenerierung", C.purple, C.purpleL],
        ].map((item, i) =>
          item === null ? (
            <div key={i} style={{ fontSize: 20, color: C.blue }}>→</div>
          ) : (
            <div key={i} style={{ background: item[3], border: `1.5px solid ${item[2]}`, borderRadius: 8, padding: "10px 14px", textAlign: "center", minWidth: 90 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: item[2] }}>{item[0]}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 3, whiteSpace: "pre" }}>{item[1]}</div>
            </div>
          )
        )}
      </div>

      {/* Tradeoff */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
        <div style={{ background: C.blueL, border: `1.5px solid ${C.blue}`, borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.blue, marginBottom: 6 }}>Kleine Chunks</div>
          <div style={{ fontSize: 12 }}>✓ Hohe Retrieval-Präzision<br/>✓ Stabile Ähnlichkeits-Rankings<br/>✗ Wenig Kontext für das LLM</div>
        </div>
        <div style={{ background: C.panel, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, color: C.muted }}>⟷</div>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>Zielkonflikt</div>
          </div>
        </div>
        <div style={{ background: C.greenL, border: `1.5px solid ${C.green}`, borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 6 }}>Große Chunks</div>
          <div style={{ fontSize: 12 }}>✓ Gute Kontextkohärenz<br/>✓ Vollständige LLM-Antworten<br/>✗ Schwächeres Retrieval-Ranking</div>
        </div>
      </div>

      <Panel style={{ background: C.goldL, border: `1.5px solid ${C.gold}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, marginBottom: 6 }}>
          ✓ Lösung: Parent–Child-Prinzip (Strategie 05)
        </div>
        <div style={{ fontSize: 12 }}>
          <strong>»Retrieve small, return parent«</strong><br/>
          Kleine Child-Einheiten (256 Token) für präzises Retrieval →
          Großer Parent-Kontext (1024 Token) für kohärente LLM-Generierung
        </div>
      </Panel>
    </div>
  );
}

// ── Strategy detail panel ────────────────────────────────────────────────────
function StrategyPanel({ strategy: s }) {
  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ background: s.bg, border: `1.5px solid ${s.color}`, borderRadius: 5, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: s.color }}>{s.num}</span>
          <h2 style={{ margin: 0, fontSize: 18, color: s.color }}>{s.name}</h2>
        </div>
        <p style={{ margin: 0, color: C.muted, fontSize: 13 }}>{s.subtitle}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
        {/* Left: diagram */}
        <div style={{ background: C.surface, border: `1.5px solid ${s.color}40`, borderRadius: 10, padding: 20 }}>
          {s.render()}
        </div>
        {/* Right: profile */}
        <div>
          <Panel>
            <SectionHead>Bewertungsprofil</SectionHead>
            {s.profile.map(([label, val, color], i) => (
              <InfoRow key={i} label={label} value={val} color={color} />
            ))}
          </Panel>
        </div>
      </div>
    </div>
  );
}
