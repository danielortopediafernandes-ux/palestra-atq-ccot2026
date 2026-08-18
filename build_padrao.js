// AMOSTRA DE PADRÃO — 5 temas iniciais (Opção 3 / Ato 1) em 6 slides, escala LETRAS GRANDES.
// Termo: ALVO TÉCNICO (nunca "desfecho substituto"). Identidade escura CCOT.
// Blocos marcados com objectName "anim_N" -> inject_anim.py injeta "aparecer ao clique".
// Fonte de dados: deck_padrao_5.json.
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");

const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, "deck_padrao_5.json"), "utf8"));

// ---- Identidade CCOT (escura) ----
const BG = "33414B", CARD = "3E4E5A", CARD2 = "46586A", COND = "2B3841";
const TEAL = "107368", TEALB = "35B3A3";
const INK = "FFFFFF", BODY = "D6DEE4", MUT = "9FABB6";
const HF = "Cambria", BF = "Calibri";

const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 in

const bgDark = (s) => { s.background = { color: BG }; };
const shadow = () => ({ type: "outer", color: "000000", opacity: 0.30, blur: 7, offset: 3, angle: 90 });
const topbar = (sl) => sl.addShape(p.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.14, fill: { color: TEAL }, line: { type: "none" } });
const rodape = (sl) => sl.addText("Dr. Daniel Araújo Fernandes · Planejamento pré-operatório em artroplastia total do quadril",
  { x: 0.6, y: 7.12, w: 12.1, h: 0.3, color: MUT, fontSize: 9.5, fontFace: BF, align: "left", margin: 0 });

// ---- marcador de animação (ordem de push = ordem de clique) ----
let animSeq = 0;
const markAnim = (opts) => { animSeq++; return Object.assign({}, opts, { objectName: "anim_" + animSeq }); };

function slideCapa(s) {
  const sl = p.addSlide(); bgDark(sl); topbar(sl);
  sl.addText(s.eyebrow, { x: 0.62, y: 1.55, w: 12, h: 0.4, color: TEALB, bold: true, fontSize: 16, charSpacing: 2.5, fontFace: BF, margin: 0 });
  sl.addText(s.titulo, { x: 0.58, y: 2.05, w: 11.9, h: 2.0, color: INK, bold: true, fontSize: 46, fontFace: HF, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  sl.addText(s.subtitulo, { x: 0.62, y: 4.05, w: 11.4, h: 0.7, color: TEALB, bold: true, italic: true, fontSize: 30, fontFace: BF, margin: 0 });
  sl.addShape(p.ShapeType.line, { x: 0.64, y: 5.55, w: 3.2, h: 0, line: { color: TEAL, width: 2.5 } });
  sl.addText(s.autor, { x: 0.62, y: 5.75, w: 9, h: 0.45, color: INK, bold: true, fontSize: 20, fontFace: BF, margin: 0 });
  sl.addText(s.evento, { x: 0.62, y: 6.22, w: 11.5, h: 0.4, color: MUT, fontSize: 15, fontFace: BF, margin: 0 });
}

function slideConceito(s) {
  const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText(s.eyebrow, { x: 0.62, y: 0.46, w: 12, h: 0.34, color: TEALB, bold: true, fontSize: 15, charSpacing: 2, fontFace: BF, margin: 0 });
  sl.addText(s.titulo, { x: 0.58, y: 0.84, w: 12, h: 0.9, color: INK, bold: true, fontSize: 40, fontFace: HF, margin: 0, valign: "top" });

  const cy = 2.2, cw = 5.86, ch = 3.0;
  const panel = (obj, x, isB) => sl.addText([
    { text: obj.rotulo + "\n", options: { bold: true, color: INK, fontSize: 26, fontFace: HF } },
    { text: obj.sub + "\n\n", options: { italic: true, color: isB ? INK : BODY, fontSize: 16, fontFace: BF } },
    { text: obj.itens + "\n\n", options: { color: isB ? INK : BODY, fontSize: 15.5, fontFace: BF } },
    { text: obj.tag, options: { bold: true, color: isB ? INK : TEALB, fontSize: 19, fontFace: BF } },
  ], markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: isB ? TEAL : CARD }, line: { type: "none" }, shadow: shadow(),
    x, y: cy, w: cw, h: ch, valign: "top", align: "left", margin: [14, 16, 12, 16], lineSpacingMultiple: 1.08 }));

  panel(s.planoA, 0.6, false);
  panel(s.planoB, 6.87, true);

  sl.addText(s.tese, markAnim({ x: 0.62, y: 5.55, w: 12.1, h: 1.1, color: BODY, italic: true, fontSize: 18, fontFace: BF, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.12 }));
}

function slideUnidade(s) {
  const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText(s.eyebrow, { x: 0.62, y: 0.40, w: 12.1, h: 0.34, color: TEALB, bold: true, fontSize: 14, charSpacing: 1.5, fontFace: BF, margin: 0 });
  sl.addText(s.titulo, { x: 0.58, y: 0.76, w: 12.1, h: 1.0, color: INK, bold: true, fontSize: s.tituloSize || 36, fontFace: HF, margin: 0, valign: "top", lineSpacingMultiple: 1.02 });

  // 1) tagline
  sl.addText(s.tagline, markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.05, fill: { color: TEAL }, line: { type: "none" }, shadow: shadow(),
    x: 0.6, y: 1.86, w: 12.1, h: 0.80, color: INK, bold: true, fontSize: 20, fontFace: BF, align: "left", valign: "middle", margin: [5, 16, 5, 16], lineSpacingMultiple: 1.03 }));

  // 2..) linhas (coluna esquerda)
  const rx = 0.6, rw = 7.66;
  const rh = s.rows.length >= 3 ? 0.92 : 1.16;
  let y = 3.00;
  for (const r of s.rows) {
    sl.addText([
      { text: r.rotulo + " — ", options: { bold: true, color: INK, fontSize: 18, fontFace: BF } },
      { text: r.achado, options: { color: BODY, fontSize: 18, fontFace: BF } },
      { text: "\n" + r.fonte, options: { color: MUT, italic: true, fontSize: 12.5, fontFace: BF } },
    ], markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.045, fill: { color: CARD }, line: { type: "none" }, shadow: shadow(),
      x: rx, y, w: rw, h: rh, align: "left", valign: "middle", margin: [5, 15, 5, 15], lineSpacingMultiple: 1.05 }));
    y += rh + 0.16;
  }

  // hero — formas SEPARADAS (número/rótulo/fonte posicionados; fonte sempre visível). Fica FIXO (âncora
  // visual, sem clique) para não brigar com o transbordo; tagline/linhas/conduta é que "aparecem".
  const hx = 8.60, hw = 4.10, hy = 3.00, hh = 3.02;
  sl.addShape(p.ShapeType.roundRect, { rectRadius: 0.06, fill: { color: CARD2 }, line: { type: "none" }, shadow: shadow(), x: hx, y: hy, w: hw, h: hh });
  sl.addText(s.hero.num, { x: hx, y: hy + 0.22, w: hw, h: 1.15, color: TEALB, bold: true, fontSize: 52, fontFace: HF, align: "center", valign: "middle", margin: 0 });
  sl.addText(s.hero.label, { x: hx + 0.20, y: hy + 1.44, w: hw - 0.40, h: 1.02, color: BODY, fontSize: 15, fontFace: BF, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  sl.addText(s.hero.fonte, { x: hx + 0.16, y: hy + hh - 0.56, w: hw - 0.32, h: 0.48, color: MUT, italic: true, fontSize: 11, fontFace: BF, align: "center", valign: "bottom", margin: 0, lineSpacingMultiple: 1.02 });

  // conduta — faixa inferior
  sl.addText([
    { text: "Conduta:  ", options: { bold: true, color: TEALB, fontSize: 18, fontFace: BF } },
    { text: s.conduta, options: { color: INK, fontSize: 18, fontFace: BF } },
  ], markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.05, fill: { color: COND }, line: { color: TEAL, width: 1.25 }, shadow: shadow(),
    x: 0.6, y: 6.16, w: 12.1, h: 0.84, align: "left", valign: "middle", margin: [5, 16, 5, 16], lineSpacingMultiple: 1.03 }));
}

for (const s of DATA) {
  if (s.kind === "capa") slideCapa(s);
  else if (s.kind === "conceito") slideConceito(s);
  else slideUnidade(s);
}

const OUT = path.join(__dirname, "deck_padrao_5.pptx");
p.writeFile({ fileName: OUT }).then(() => console.log("OK ->", OUT, "|", DATA.length, "slides |", animSeq, "blocos p/ animação"))
  .catch((e) => { console.error(e); process.exit(1); });
