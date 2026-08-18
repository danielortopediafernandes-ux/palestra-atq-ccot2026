// UNIDADE 1.1 — CALIBRAÇÃO / DUPLA ESCALA em DOIS slides (questão+imagem · conclusão+dados).
// Figuras REAIS de Ries et al. 2022 (Arch Orthop Trauma Surg · CC BY 4.0 · PMID 35099608).
// Identidade escura CCOT. Marcadores anim_N -> inject_anim.py.
const path = require("path");
const pptxgen = require("pptxgenjs");

const BG = "33414B", CARD = "3E4E5A", CARD2 = "46586A", COND = "2B3841", PANEL = "F4F6F7";
const TEAL = "107368", TEALB = "35B3A3";
const INK = "FFFFFF", BODY = "D6DEE4", MUT = "9FABB6", DARKINK = "2B3841";
const HF = "Cambria", BF = "Calibri";
const FIGDIR = path.join(__dirname, "_figuras");

const p = new pptxgen();
p.layout = "LAYOUT_WIDE";
const bgDark = (s) => { s.background = { color: BG }; };
const shadow = () => ({ type: "outer", color: "000000", opacity: 0.30, blur: 7, offset: 3, angle: 90 });
const topbar = (sl) => sl.addShape(p.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.14, fill: { color: TEAL }, line: { type: "none" } });
const rodape = (sl) => sl.addText("Dr. Daniel Araújo Fernandes · Planejamento pré-operatório em artroplastia total do quadril",
  { x: 0.6, y: 7.12, w: 12.1, h: 0.3, color: MUT, fontSize: 9.5, fontFace: BF, align: "left", margin: 0 });
let animSeq = 0;
const markAnim = (o) => { animSeq++; return Object.assign({}, o, { objectName: "anim_" + animSeq }); };

// cartão branco com a figura (line-art/plot em fundo claro lê melhor no slide escuro) + crédito
function figCard(sl, img, cx, cy, cw, ch, credito) {
  sl.addShape(p.ShapeType.roundRect, { rectRadius: 0.05, fill: { color: PANEL }, line: { type: "none" }, shadow: shadow(), x: cx, y: cy, w: cw, h: ch });
  const pad = 0.16;
  sl.addImage({ path: path.join(FIGDIR, img), x: cx + pad, y: cy + pad, w: cw - 2 * pad, h: ch - 2 * pad - 0.28, sizing: { type: "contain", w: cw - 2 * pad, h: ch - 2 * pad - 0.28 } });
  sl.addText(credito, { x: cx + pad, y: cy + ch - 0.34, w: cw - 2 * pad, h: 0.28, color: "5A6b74", italic: true, fontSize: 9.5, fontFace: BF, align: "center", valign: "middle", margin: 0 });
}

// ---------- SLIDE 1 — QUESTÃO + IMAGEM ----------
(function () {
  const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText("ATO 1 · PLANEJAMENTO DE IMAGEM · UNIDADE 1.1", { x: 0.62, y: 0.40, w: 12.1, h: 0.34, color: TEALB, bold: true, fontSize: 14, charSpacing: 1.5, fontFace: BF, margin: 0 });
  sl.addText("Manual ou digital? O que decide é a calibração", { x: 0.58, y: 0.76, w: 12.1, h: 0.9, color: INK, bold: true, fontSize: 36, fontFace: HF, margin: 0, valign: "top" });

  // figura à direita (esquema do marcador) — retrato 644x839
  figCard(sl, "1.1_calibracao_esquema_marcador.jpg", 8.55, 1.95, 4.15, 4.75, "Ries et al. 2022 · Arch Orthop Trauma Surg · CC BY 4.0");

  // esquerda: enquadramento + questão
  sl.addText([
    { text: "Toda medida do planejamento parte de uma radiografia calibrada", options: { bold: true, color: INK, fontSize: 19, fontFace: BF } },
    { text: " — é o marcador de calibração que diz de quanto a imagem está ampliada.", options: { color: BODY, fontSize: 19, fontFace: BF } },
  ], markAnim({ x: 0.6, y: 2.05, w: 7.55, h: 1.2, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.12 }));

  sl.addText([
    { text: "Padrão de cuidado", options: { bold: true, color: INK, fontSize: 18, fontFace: BF } },
    { text: " — marcador colocado entre as pernas (bola cinza). Fica fora do plano do quadril.", options: { color: BODY, fontSize: 18, fontFace: BF } },
  ], markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.045, fill: { color: CARD }, line: { type: "none" }, shadow: shadow(), x: 0.6, y: 3.45, w: 7.55, h: 1.02, align: "left", valign: "middle", margin: [5, 15, 5, 15], lineSpacingMultiple: 1.05 }));

  sl.addText("Um marcador anterior — a “dupla escala” — corrige esse erro?", markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.05, fill: { color: TEAL }, line: { type: "none" }, shadow: shadow(), x: 0.6, y: 4.72, w: 7.55, h: 1.0, color: INK, bold: true, fontSize: 21, fontFace: BF, align: "left", valign: "middle", margin: [6, 16, 6, 16], lineSpacingMultiple: 1.05 }));
})();

// ---------- SLIDE 2 — CONCLUSÃO + DADOS ----------
(function () {
  const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText("ATO 1 · PLANEJAMENTO DE IMAGEM · UNIDADE 1.1", { x: 0.62, y: 0.40, w: 12.1, h: 0.34, color: TEALB, bold: true, fontSize: 14, charSpacing: 1.5, fontFace: BF, margin: 0 });
  sl.addText("A dupla escala reduz o erro do marcador padrão", { x: 0.58, y: 0.76, w: 12.1, h: 0.9, color: INK, bold: true, fontSize: 36, fontFace: HF, margin: 0, valign: "top" });

  sl.addText([
    { text: "O padrão funciona — mas é impreciso; ", options: { bold: true, color: INK, fontSize: 20, fontFace: BF } },
    { text: "a dupla escala (marcador anterior) corrige o erro.", options: { color: INK, fontSize: 20, fontFace: BF } },
  ], markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.05, fill: { color: TEAL }, line: { type: "none" }, shadow: shadow(), x: 0.6, y: 1.86, w: 12.1, h: 0.78, align: "left", valign: "middle", margin: [5, 16, 5, 16], lineSpacingMultiple: 1.03 }));

  // esquerda: dois cartões de evidência
  sl.addText([
    { text: "Marcador padrão (externo, entre as pernas) — ", options: { bold: true, color: INK, fontSize: 18, fontFace: BF } },
    { text: "erro médio 12,5% (até 23,3%) e pior quanto maior o IMC", options: { color: BODY, fontSize: 18, fontFace: BF } },
    { text: "\nRies 2022 · Arch Orthop Trauma Surg · 100 pac · PMID 35099608", options: { color: MUT, italic: true, fontSize: 12.5, fontFace: BF } },
  ], markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.045, fill: { color: CARD }, line: { type: "none" }, shadow: shadow(), x: 0.6, y: 2.95, w: 7.35, h: 1.35, align: "left", valign: "middle", margin: [5, 15, 5, 15], lineSpacingMultiple: 1.05 }));

  sl.addText([
    { text: "Dupla escala (marcador anterior, DSSM) — ", options: { bold: true, color: INK, fontSize: 18, fontFace: BF } },
    { text: "erro 2,1%, consistente em todos os IMC (p < 0,001)", options: { color: BODY, fontSize: 18, fontFace: BF } },
    { text: "\nReferência-ouro: o próprio implante como calibrador interno (ICM)", options: { color: MUT, italic: true, fontSize: 12.5, fontFace: BF } },
  ], markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.045, fill: { color: CARD }, line: { type: "none" }, shadow: shadow(), x: 0.6, y: 4.44, w: 7.35, h: 1.35, align: "left", valign: "middle", margin: [5, 15, 5, 15], lineSpacingMultiple: 1.05 }));

  // direita: box plot dos métodos
  figCard(sl, "1.1_calibracao_boxplot_metodos.jpg", 8.25, 2.95, 4.45, 2.84, "Fator de calibração · ICM (referência) × DSSM × ECM · Ries 2022 · CC BY 4.0");

  // conduta
  sl.addText([
    { text: "Conduta:  ", options: { bold: true, color: TEALB, fontSize: 18, fontFace: BF } },
    { text: "calibrar sempre; preferir a dupla escala (ou uma referência interna) — sobretudo no paciente obeso, onde o marcador padrão mais erra.", options: { color: INK, fontSize: 18, fontFace: BF } },
  ], markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.05, fill: { color: COND }, line: { color: TEAL, width: 1.25 }, shadow: shadow(), x: 0.6, y: 6.02, w: 12.1, h: 0.92, align: "left", valign: "middle", margin: [5, 16, 5, 16], lineSpacingMultiple: 1.03 }));
})();

const OUT = path.join(__dirname, "deck_1_1_dupla_escala.pptx");
p.writeFile({ fileName: OUT }).then(() => console.log("OK ->", OUT, "|", animSeq, "blocos anim"))
  .catch((e) => { console.error(e); process.exit(1); });
