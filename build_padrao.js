// AMOSTRA DE PADRÃO — 4 primeiros slides (Opção 3 / Ato 1), escala LETRAS GRANDES.
// Fonte de dados: deck_padrao_4.json. Identidade escura CCOT. Estático (animação de clique é etapa posterior).
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");

const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, "deck_padrao_4.json"), "utf8"));

// ---- Identidade CCOT (escura) ----
const BG = "33414B", CARD = "3E4E5A", CARD2 = "46586A", COND = "2B3841";
const TEAL = "107368", TEALB = "35B3A3";
const INK = "FFFFFF", BODY = "D6DEE4", MUT = "9FABB6";
const HF = "Cambria", BF = "Calibri"; // fontes seguras que existem no Office e renderizam fiel

const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 in

const bgDark = (s) => { s.background = { color: BG }; };
const shadow = () => ({ type: "outer", color: "000000", opacity: 0.30, blur: 7, offset: 3, angle: 90 });
const topbar = (sl) => sl.addShape(p.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.14, fill: { color: TEAL }, line: { type: "none" } });
const rodape = (sl) => sl.addText("Dr. Daniel Araújo Fernandes · Planejamento pré-operatório em artroplastia total do quadril",
  { x: 0.6, y: 7.12, w: 12.1, h: 0.3, color: MUT, fontSize: 9.5, fontFace: BF, align: "left", margin: 0 });

function slideCapa(s) {
  const sl = p.addSlide(); bgDark(sl); topbar(sl);
  sl.addText(s.eyebrow, { x: 0.62, y: 0.60, w: 12, h: 0.4, color: TEALB, bold: true, fontSize: 15, charSpacing: 2.5, fontFace: BF, margin: 0 });
  sl.addText(s.titulo, { x: 0.58, y: 1.02, w: 11.9, h: 1.7, color: INK, bold: true, fontSize: 42, fontFace: HF, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  sl.addText(s.subtitulo, { x: 0.62, y: 2.72, w: 11.4, h: 0.6, color: TEALB, bold: true, italic: true, fontSize: 26, fontFace: BF, margin: 0 });

  const cy = 3.78, cw = 5.86, ch = 1.72;
  sl.addText([
    { text: s.conceito.a.rotulo + "\n", options: { bold: true, color: INK, fontSize: 18, fontFace: BF } },
    { text: s.conceito.a.texto, options: { color: BODY, fontSize: 15, fontFace: BF } },
  ], { shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: CARD }, line: { type: "none" }, shadow: shadow(),
       x: 0.6, y: cy, w: cw, h: ch, valign: "middle", align: "left", margin: [6, 15, 6, 15], lineSpacingMultiple: 1.06 });
  sl.addText([
    { text: s.conceito.b.rotulo + "\n", options: { bold: true, color: INK, fontSize: 18, fontFace: BF } },
    { text: s.conceito.b.texto, options: { color: INK, fontSize: 15, fontFace: BF } },
  ], { shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: TEAL }, line: { type: "none" }, shadow: shadow(),
       x: 6.87, y: cy, w: cw, h: ch, valign: "middle", align: "left", margin: [6, 15, 6, 15], lineSpacingMultiple: 1.06 });

  sl.addText(s.conceito.tese, { x: 0.62, y: 5.66, w: 12.1, h: 0.78, color: BODY, italic: true, fontSize: 16, fontFace: BF, align: "left", margin: 0, lineSpacingMultiple: 1.1 });
  sl.addText(s.autor, { x: 0.62, y: 6.52, w: 8, h: 0.4, color: INK, bold: true, fontSize: 17, fontFace: BF, margin: 0 });
  sl.addText(s.evento, { x: 0.62, y: 6.88, w: 11.5, h: 0.35, color: MUT, fontSize: 13, fontFace: BF, margin: 0 });
}

function slideUnidade(s) {
  const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText(s.eyebrow, { x: 0.62, y: 0.40, w: 12.1, h: 0.34, color: TEALB, bold: true, fontSize: 14, charSpacing: 1.5, fontFace: BF, margin: 0 });
  sl.addText(s.titulo, { x: 0.58, y: 0.76, w: 12.1, h: 1.0, color: INK, bold: true, fontSize: s.tituloSize || 36, fontFace: HF, margin: 0, valign: "top", lineSpacingMultiple: 1.02 });

  sl.addText(s.tagline, { shape: p.ShapeType.roundRect, rectRadius: 0.05, fill: { color: TEAL }, line: { type: "none" }, shadow: shadow(),
    x: 0.6, y: 1.86, w: 12.1, h: 0.80, color: INK, bold: true, fontSize: 20, fontFace: BF, align: "left", valign: "middle", margin: [5, 16, 5, 16], lineSpacingMultiple: 1.03 });

  // HERO — coluna direita
  const hx = 8.60, hw = 4.10, hy = 3.00, hh = 3.02;
  sl.addShape(p.ShapeType.roundRect, { rectRadius: 0.06, fill: { color: CARD2 }, line: { type: "none" }, shadow: shadow(), x: hx, y: hy, w: hw, h: hh });
  sl.addText(s.hero.num, { x: hx, y: hy + 0.20, w: hw, h: 1.15, color: TEALB, bold: true, fontSize: 54, fontFace: HF, align: "center", valign: "middle", margin: 0 });
  sl.addText(s.hero.label, { x: hx + 0.18, y: hy + 1.40, w: hw - 0.36, h: 1.10, color: BODY, fontSize: 15.5, fontFace: BF, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  if (s.hero.fonte) sl.addText(s.hero.fonte, { x: hx + 0.14, y: hy + hh - 0.56, w: hw - 0.28, h: 0.5, color: MUT, italic: true, fontSize: 11, fontFace: BF, align: "center", valign: "bottom", margin: 0, lineSpacingMultiple: 1.02 });

  // LINHAS — coluna esquerda
  const rx = 0.6, rw = 7.66;
  const n = s.rows.length;
  const rh = n >= 3 ? 0.92 : 1.16;
  let y = 3.00;
  for (const r of s.rows) {
    sl.addText([
      { text: r.rotulo + " — ", options: { bold: true, color: INK, fontSize: 18, fontFace: BF } },
      { text: r.achado, options: { color: BODY, fontSize: 18, fontFace: BF } },
      { text: "\n" + r.fonte, options: { color: MUT, italic: true, fontSize: 12.5, fontFace: BF } },
    ], { shape: p.ShapeType.roundRect, rectRadius: 0.045, fill: { color: CARD }, line: { type: "none" }, shadow: shadow(),
         x: rx, y, w: rw, h: rh, align: "left", valign: "middle", margin: [5, 15, 5, 15], lineSpacingMultiple: 1.05 });
    y += rh + 0.16;
  }

  // CONDUTA — faixa inferior largura total
  sl.addText([
    { text: "Conduta:  ", options: { bold: true, color: TEALB, fontSize: 18, fontFace: BF } },
    { text: s.conduta, options: { color: INK, fontSize: 18, fontFace: BF } },
  ], { shape: p.ShapeType.roundRect, rectRadius: 0.05, fill: { color: COND }, line: { color: TEAL, width: 1.25 }, shadow: shadow(),
       x: 0.6, y: 6.16, w: 12.1, h: 0.84, align: "left", valign: "middle", margin: [5, 16, 5, 16], lineSpacingMultiple: 1.03 });
}

for (const s of DATA) {
  if (s.kind === "capa") slideCapa(s);
  else slideUnidade(s);
}

const OUT = path.join(__dirname, "deck_padrao_4.pptx");
p.writeFile({ fileName: OUT }).then(() => console.log("OK ->", OUT, "|", DATA.length, "slides"))
  .catch((e) => { console.error(e); process.exit(1); });
