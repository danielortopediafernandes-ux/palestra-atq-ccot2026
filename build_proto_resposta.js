// ============================================================================
// PROTÓTIPO — novo modelo de slide (Dr. 2026-08-20)
//   Elimina CONCLUSÃO + CONDUTA (eram redundantes) e funde ambas numa
//   RESPOSTA hero abaixo do título, ancorada num ARTIGO PRINCIPAL que
//   justifica o veredito. Tópicos DESCEM (viram a evidência de suporte).
//   Animação: tópicos surgem primeiro; a RESPOSTA surge POR ÚLTIMO (fecha o slide).
//   3 slides representativos: S10 (meta de RCTs) · S18 (RCT marco) · S21 (clássico).
// ============================================================================
const path = require("path");
const pptxgen = require("pptxgenjs");

const BG = "33414B", CARD = "3E4E5A", COND = "2B3841";
const TEAL = "107368", TEALB = "35B3A3";
const INK = "FFFFFF", BODY = "D6DEE4", MUT = "9FABB6", REF = "8CA0AC";
const HF = "Cambria", BF = "Calibri";

const p = new pptxgen();
p.layout = "LAYOUT_WIDE";

const bgDark = (s) => { s.background = { color: BG }; };
const shadow = () => ({ type: "outer", color: "000000", opacity: 0.30, blur: 7, offset: 3, angle: 90 });
const topbar = (sl) => sl.addShape(p.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.14, fill: { color: TEAL }, line: { type: "none" } });
const rodape = (sl) => {
  sl.addText("Dr. Daniel Araújo Fernandes · Planejamento pré-operatório em artroplastia total do quadril",
    { x: 0.6, y: 7.16, w: 9.6, h: 0.26, color: MUT, fontSize: 9.5, fontFace: BF, align: "left", margin: 0 });
  sl.addText("XVI CCOT · 2026", { x: 10.2, y: 7.16, w: 2.5, h: 0.26, color: MUT, fontSize: 9.5, fontFace: BF, align: "right", margin: 0 });
};
let animSeq = 0;
const markAnim = (o) => { animSeq++; return Object.assign({}, o, { objectName: "anim_" + animSeq }); };

// runs: **negrito branco**  ~destaque teal~
function parseRuns(str, base, size) {
  const runs = []; const re = /(\*\*[^*]+\*\*|~[^~]+~)/g; let last = 0, m;
  while ((m = re.exec(str))) {
    if (m.index > last) runs.push({ text: str.slice(last, m.index), options: { color: base, fontSize: size, fontFace: BF } });
    const t = m[0];
    if (t.startsWith("**")) runs.push({ text: t.slice(2, -2), options: { bold: true, color: INK, fontSize: size, fontFace: BF } });
    else runs.push({ text: t.slice(1, -1), options: { bold: true, color: TEALB, fontSize: size, fontFace: BF } });
    last = re.lastIndex;
  }
  if (last < str.length) runs.push({ text: str.slice(last), options: { color: base, fontSize: size, fontFace: BF } });
  return runs;
}

// bullet de evidência — texto + fonte na mesma unidade (fonte na linha de baixo)
function bullet(sl, b, x, y, w) {
  const runs = [{ text: "▸  ", options: { color: TEAL, bold: true, fontSize: 19, fontFace: BF } }, ...parseRuns(b.t, BODY, 19)];
  if (b.f) runs.push({ text: "\n      " + b.f, options: { color: REF, italic: true, fontSize: 11, fontFace: BF } });
  sl.addText(runs, markAnim({ x, y, w, h: 0.90, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.03 }));
}

// RESPOSTA hero — funde veredito + conduta, ancorada no artigo principal.
// UMA caixa, UMA animação (surge por último).
// Estima a altura da caixa pela extensão do texto da resposta (largura útil ~112 car/linha a 19pt).
function respostaH(cfg) {
  const txt = cfg.resposta.replace(/[*~]/g, "");
  const linhas = Math.max(2, Math.ceil(txt.length / 90));
  const linhasFonte = cfg.respostaFonte.length > 118 ? 2 : 1; // artigo principal costuma caber em 1 linha
  return 0.62 + linhas * 0.37 + linhasFonte * 0.24; // rótulo+margens (~0,62) + resposta 19pt + fonte 11,5pt
}

function respostaHero(sl, cfg, hBox) {
  const runs = [
    { text: "RESPOSTA\n", options: { bold: true, color: TEALB, fontSize: 12, charSpacing: 2, fontFace: BF } },
    ...parseRuns(cfg.resposta, INK, 19),
    { text: "\n\n", options: { fontSize: 5, fontFace: BF } },
    { text: "Artigo principal — ", options: { bold: true, color: TEALB, italic: true, fontSize: 11.5, fontFace: BF } },
    { text: cfg.respostaFonte, options: { color: BODY, italic: true, fontSize: 11.5, fontFace: BF } },
  ];
  sl.addText(runs, markAnim({
    shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: COND }, line: { color: TEAL, width: 1.75 }, shadow: shadow(),
    x: 0.58, y: 1.60, w: 12.17, h: hBox, align: "left", valign: "top", margin: [11, 18, 9, 18], lineSpacingMultiple: 1.05,
  }));
}

// slide-decisão no NOVO modelo
function topico(cfg) {
  const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText(cfg.eyebrow, { x: 0.62, y: 0.36, w: 12.1, h: 0.32, color: TEALB, bold: true, fontSize: 14, charSpacing: 1.5, fontFace: BF, margin: 0 });
  sl.addText(cfg.titulo, { x: 0.58, y: 0.70, w: 12.1, h: 0.86, color: INK, bold: true, fontSize: cfg.tituloSize || 30, fontFace: HF, valign: "top", margin: 0, lineSpacingMultiple: 1.02 });

  const hBox = respostaH(cfg);
  // tópicos DESCEM — evidência de suporte (surgem primeiro), começando abaixo da caixa
  const bx = 0.7, bw = 12.0;
  let y = 1.60 + hBox + 0.28;
  const step = cfg.bullets.length >= 4 ? 0.86 : 0.92;
  for (const b of cfg.bullets) { bullet(sl, b, bx, y, bw); y += step; }

  // RESPOSTA — surge POR ÚLTIMO (fecha o slide)
  respostaHero(sl, cfg, hBox);
}

// ---------------------------------------------------------------------------
// S10 · Robótica — função (âncora: meta de 8 RCTs)
topico({
  eyebrow: "ATO 1 · EXECUÇÃO · ROBÓTICA · FUNÇÃO",
  titulo: "A assistência robótica muda o resultado — a função?",
  tituloSize: 30,
  resposta: "Não. A precisão do posicionamento triplica, mas a função é indistinguível da do método convencional — a robótica não se justifica pelo desfecho funcional.",
  respostaFonte: "Ruangsomboon 2024 · J Robot Surg · metanálise de 8 ensaios randomizados · 1.014 pacientes · função SMD 0,01 (IC −0,27 a 0,30) · PMID 38888718",
  bullets: [
    { t: "Erro de anteversão — ~2,6° × 8,9°~ (TC pré/pós, ensaio randomizado)", f: "Fontalis 2024 · RCT · 60 pac · PMID 38555946" },
    { t: "Único ganho clínico — internação ~−0,49 dia~ (~12 h), significância marginal", f: "Poyser 2026 · coorte pareada · PMID 41519489" },
  ],
});

// S18 · Dupla mobilidade (âncora: RCT marco, Lancet)
topico({
  eyebrow: "ATO 2 · INSTABILIDADE · DUPLA MOBILIDADE",
  titulo: "A articulação de dupla mobilidade muda o resultado — e em quem?",
  tituloSize: 28,
  resposta: "Sim, no grupo de risco. Na fratura do colo do idoso, a dupla mobilidade reduziu a luxação a um terço (~1,3% × 4,2%~) — indicação dirigida ao risco (coluna rígida/fusão, revisão, fratura do colo), **não universal**.",
  respostaFonte: "Hailer 2026 · The Lancet · ensaio randomizado multicêntrico (Duality) · 1.600 pacientes · aHR 0,27 (IC 0,13–0,56) · PMID 42392114",
  bullets: [
    { t: "Eletivo — benefício concentrado nos grupos de risco (coluna rígida/artrodese · revisão)", f: "Nessler 2023 · JAAOS · 15.572 pac · PMID 36728665" },
    { t: "Cabeça grande **não reproduz de forma consistente** o efeito da DM — evidência discordante", f: "Ibrahim 2025 · JBJS Rev · 133.474 quadris · PMID 41379986 · contraponto: Hoskins 2022 · PMID 35438011" },
    { t: "Por que a maior metanálise pesa mais → **slide seguinte**" },
  ],
});

// S21 · Reparo capsular (âncora: clássico sem sucessor, CORR)
topico({
  eyebrow: "ATO 2 · INSTABILIDADE · TÉCNICA · REPARO CAPSULAR",
  titulo: "O reparo capsular na via posterior muda o resultado?",
  tituloSize: 30,
  resposta: "Sim, sistematicamente. Sem o reparo, o risco de luxação é cerca de ~8 vezes~ maior; com ele, a via posterior iguala-se às demais — **reparo capsular em toda via posterior**.",
  respostaFonte: "Kwon 2006 · Clin Orthop Relat Res · metanálise de 5 estudos · RR 8,21 (IC 4,05–16,67) · PMID 16741471",
  bullets: [
    { t: "Com reparo, via posterior equivale às demais vias — ~1,01% × 0,70% × 0,43%~", f: "Kwon 2006 · CORR · PMID 16741471" },
    { t: "Mecanismo medido — torque para luxar ~9,12 × 2,73 N·m~", f: "Cherry 2025 · Int Orthop · cadavérico · PMID 40715845" },
  ],
});

const OUT = path.join(__dirname, "deck_proto_resposta.pptx");
p.writeFile({ fileName: OUT })
  .then(() => console.log("OK ->", OUT, "|", animSeq, "blocos anim | 3 slides"))
  .catch((e) => { console.error(e); process.exit(1); });
