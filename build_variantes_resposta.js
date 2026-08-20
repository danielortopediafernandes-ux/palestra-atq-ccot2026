// ============================================================================
// 3 VARIANTES DE COR da caixa RESPOSTA (Dr. 2026-08-20)
//   Mesmo slide (S18, RESPOSTA já OBJETIVA) renderizado 3×, variando APENAS
//   a cor/tom da caixa-conclusão + letra maior. Para o Dr. escolher o visual.
//     V1 · CLARA          — caixa creme, texto escuro, veredito teal
//     V2 · ESCURA + ÂMBAR — caixa quase-preta, veredito âmbar (chama atenção)
//     V3 · ACENTO TEAL    — caixa teal preenchida, veredito amarelo-ouro
// ============================================================================
const path = require("path");
const pptxgen = require("pptxgenjs");

const BG = "33414B", COND = "2B3841";
const TEAL = "107368", TEALB = "35B3A3";
const INK = "FFFFFF", BODY = "D6DEE4", MUT = "9FABB6", REF = "8CA0AC";
const HF = "Cambria", BF = "Calibri";

const p = new pptxgen();
p.layout = "LAYOUT_WIDE";

const bgDark = (s) => { s.background = { color: BG }; };
const shadow = () => ({ type: "outer", color: "000000", opacity: 0.34, blur: 8, offset: 3, angle: 90 });
const topbar = (sl) => sl.addShape(p.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.14, fill: { color: TEAL }, line: { type: "none" } });
const rodape = (sl, tag) => {
  sl.addText("Dr. Daniel Araújo Fernandes · Planejamento pré-operatório em artroplastia total do quadril",
    { x: 0.6, y: 7.16, w: 8.2, h: 0.26, color: MUT, fontSize: 9.5, fontFace: BF, align: "left", margin: 0 });
  sl.addText(tag, { x: 8.9, y: 7.16, w: 3.8, h: 0.26, color: MUT, fontSize: 9.5, fontFace: BF, align: "right", margin: 0 });
};

// bullet de evidência
function bullet(sl, b, x, y, w) {
  const runs = [{ text: "▸  ", options: { color: TEAL, bold: true, fontSize: 19, fontFace: BF } },
    { text: b.t, options: { color: BODY, fontSize: 19, fontFace: BF } }];
  if (b.f) runs.push({ text: "\n      " + b.f, options: { color: REF, italic: true, fontSize: 11, fontFace: BF } });
  sl.addText(runs, { x, y, w, h: 0.90, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
}

// RESPOSTA hero — tema define a cor; veredito grande em cor de destaque
function respostaHero(sl, cfg, T) {
  const runs = [
    { text: "RESPOSTA\n", options: { bold: true, color: T.label, fontSize: 12.5, charSpacing: 2, fontFace: BF } },
    { text: cfg.veredito + " ", options: { bold: true, color: T.verdict, fontSize: 27, fontFace: BF } },
    { text: cfg.corpo, options: { color: T.corpo, fontSize: 22, fontFace: BF } },
    { text: "\n\n", options: { fontSize: 5, fontFace: BF } },
    { text: "Artigo principal — ", options: { bold: true, color: T.label, italic: true, fontSize: 11.5, fontFace: BF } },
    { text: cfg.respostaFonte, options: { color: T.artigo, italic: true, fontSize: 11.5, fontFace: BF } },
  ];
  const line = T.boxLineW ? { color: T.boxLine, width: T.boxLineW } : { type: "none" };
  sl.addText(runs, {
    shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: T.boxFill }, line, shadow: shadow(),
    x: 0.58, y: 1.58, w: 12.17, h: 2.05, align: "left", valign: "middle", margin: [12, 20, 12, 20], lineSpacingMultiple: 1.06,
  });
}

function slideVariante(cfg, T) {
  const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl, "VARIANTE " + T.nome);
  sl.addText(cfg.eyebrow, { x: 0.62, y: 0.36, w: 12.1, h: 0.32, color: TEALB, bold: true, fontSize: 14, charSpacing: 1.5, fontFace: BF, margin: 0 });
  sl.addText(cfg.titulo, { x: 0.58, y: 0.70, w: 12.1, h: 0.80, color: INK, bold: true, fontSize: 28, fontFace: HF, valign: "top", margin: 0, lineSpacingMultiple: 1.02 });
  // tópicos (evidência de suporte)
  let y = 4.05;
  for (const b of cfg.bullets) { bullet(sl, b, 0.7, y, 12.0); y += 0.94; }
  // RESPOSTA hero — a peça que muda de cor
  respostaHero(sl, cfg, T);
}

// ---- S18 com RESPOSTA OBJETIVA ----
const S18 = {
  eyebrow: "ATO 2 · INSTABILIDADE · DUPLA MOBILIDADE",
  titulo: "A articulação de dupla mobilidade muda o resultado — e em quem?",
  veredito: "Sim,",
  corpo: "somente no grupo de risco: (1) fratura do colo, (2) fusão lombar, (3) coluna rígida. Não é indicação universal.",
  respostaFonte: "Hailer 2026 · The Lancet · ensaio randomizado multicêntrico (Duality) · 1.600 pacientes · aHR 0,27 · PMID 42392114",
  bullets: [
    { t: "Fratura do colo ≥ 65 anos — luxação 1,3% × 4,2% (aHR 0,27), primeiro RCT", f: "Hailer 2026 · The Lancet · 1.600 pac · PMID 42392114" },
    { t: "Eletivo — benefício concentrado nos grupos de risco (coluna rígida/artrodese · revisão)", f: "Nessler 2023 · JAAOS · 15.572 pac · PMID 36728665" },
    { t: "Cabeça grande não reproduz de forma consistente o efeito da DM — evidência discordante", f: "Ibrahim 2025 · JBJS Rev · 133.474 quadris · PMID 41379986" },
  ],
};

const THEMES = [
  // V1 · CLARA — inverte o fundo, alto contraste, veredito teal escuro
  { nome: "CLARA", boxFill: "F4F6F7", boxLine: "107368", boxLineW: 2.25, label: "0E7A6C", corpo: "243039", verdict: "0E7A6C", artigo: "5A6B74" },
  // V2 · ESCURA + ÂMBAR — caixa quase-preta, veredito âmbar (cor quente = chama atenção)
  { nome: "ESCURA-ÂMBAR", boxFill: "161D23", boxLine: "E8A33D", boxLineW: 2.0, label: "E8A33D", corpo: "FFFFFF", verdict: "F2B84B", artigo: "AEB9C2" },
  // V3 · ACENTO TEAL — caixa teal preenchida, veredito amarelo-ouro
  { nome: "ACENTO-TEAL", boxFill: "0E6E62", boxLine: "none", boxLineW: 0, label: "CDECE7", corpo: "FFFFFF", verdict: "FFD873", artigo: "CFE6E1" },
];

THEMES.forEach((T) => slideVariante(S18, T));

const OUT = path.join(__dirname, "deck_variantes_resposta.pptx");
p.writeFile({ fileName: OUT })
  .then(() => console.log("OK ->", OUT, "| 3 variantes"))
  .catch((e) => { console.error(e); process.exit(1); });
