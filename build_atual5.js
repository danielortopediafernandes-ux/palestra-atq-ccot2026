// 5 PRIMEIROS SLIDES — VERSÃO ATUAL (CAPITULO.md @ffb0893, formato "resumo em tópicos").
// S1 capa+conceito · S2 template · S3 calibração (dupla escala, c/ ilustração real Ries 2022 CC BY)
// · S4 3D+impressão · S5 IA. Identidade escura CCOT · letras grandes · animação de clique.
const path = require("path");
const pptxgen = require("pptxgenjs");

const BG = "33414B", CARD = "3E4E5A", COND = "2B3841", PANEL = "F4F6F7";
const TEAL = "107368", TEALB = "35B3A3";
const INK = "FFFFFF", BODY = "D6DEE4", MUT = "9FABB6";
const HF = "Cambria", BF = "Calibri";
const FIGDIR = path.join(__dirname, "_figuras");

const p = new pptxgen(); p.layout = "LAYOUT_WIDE";
const bgDark = (s) => { s.background = { color: BG }; };
const shadow = () => ({ type: "outer", color: "000000", opacity: 0.30, blur: 7, offset: 3, angle: 90 });
const topbar = (sl) => sl.addShape(p.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.14, fill: { color: TEAL }, line: { type: "none" } });
const rodape = (sl) => sl.addText("Dr. Daniel Araújo Fernandes · Planejamento pré-operatório em artroplastia total do quadril",
  { x: 0.6, y: 7.13, w: 12.1, h: 0.28, color: MUT, fontSize: 9.5, fontFace: BF, align: "left", margin: 0 });
let animSeq = 0;
const markAnim = (o) => { animSeq++; return Object.assign({}, o, { objectName: "anim_" + animSeq }); };

// runs: **negrito branco**  ~destaque teal~
function parseRuns(str, base) {
  const runs = []; const re = /(\*\*[^*]+\*\*|~[^~]+~)/g; let last = 0, m;
  while ((m = re.exec(str))) {
    if (m.index > last) runs.push({ text: str.slice(last, m.index), options: { color: base, fontSize: 21, fontFace: BF } });
    const t = m[0];
    if (t.startsWith("**")) runs.push({ text: t.slice(2, -2), options: { bold: true, color: INK, fontSize: 21, fontFace: BF } });
    else runs.push({ text: t.slice(1, -1), options: { bold: true, color: TEALB, fontSize: 21, fontFace: BF } });
    last = re.lastIndex;
  }
  if (last < str.length) runs.push({ text: str.slice(last), options: { color: base, fontSize: 21, fontFace: BF } });
  return runs;
}

function bullet(sl, str, x, y, w) {
  sl.addText([{ text: "▸  ", options: { color: TEAL, bold: true, fontSize: 21, fontFace: BF } }, ...parseRuns(str, BODY)],
    markAnim({ x, y, w, h: 0.82, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.05 }));
}

function figCard(sl, img, cx, cy, cw, ch, credito) {
  sl.addShape(p.ShapeType.roundRect, { rectRadius: 0.05, fill: { color: PANEL }, line: { type: "none" }, shadow: shadow(), x: cx, y: cy, w: cw, h: ch });
  const pad = 0.16;
  sl.addImage({ path: path.join(FIGDIR, img), x: cx + pad, y: cy + pad, w: cw - 2 * pad, h: ch - 2 * pad - 0.28, sizing: { type: "contain", w: cw - 2 * pad, h: ch - 2 * pad - 0.28 } });
  sl.addText(credito, { x: cx + pad, y: cy + ch - 0.33, w: cw - 2 * pad, h: 0.27, color: "5A6B74", italic: true, fontSize: 9.5, fontFace: BF, align: "center", valign: "middle", margin: 0 });
}

function condutaBand(sl, txt, y, w) {
  sl.addText([{ text: "Conduta:  ", options: { bold: true, color: TEALB, fontSize: 20, fontFace: BF } }, ...parseRuns(txt, INK).map(r => (r.options.fontSize = 20, r))],
    markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.05, fill: { color: COND }, line: { color: TEAL, width: 1.25 }, shadow: shadow(),
      x: 0.6, y, w, h: 0.76, align: "left", valign: "middle", margin: [5, 16, 5, 16], lineSpacingMultiple: 1.02 }));
}

function sources(sl, txt) {
  sl.addText(txt, { x: 0.6, y: 6.86, w: 12.1, h: 0.26, color: MUT, italic: true, fontSize: 10.5, fontFace: BF, align: "left", margin: 0 });
}

// ---------- S1 · CAPA + CONCEITO ----------
(function () {
  const sl = p.addSlide(); bgDark(sl); topbar(sl);
  sl.addText("ARTROPLASTIA TOTAL DO QUADRIL", { x: 0.62, y: 0.70, w: 12, h: 0.4, color: TEALB, bold: true, fontSize: 15, charSpacing: 2.5, fontFace: BF, margin: 0 });
  sl.addText("Planejamento pré-operatório em artroplastia total do quadril", { x: 0.58, y: 1.12, w: 11.9, h: 1.7, color: INK, bold: true, fontSize: 42, fontFace: HF, valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  sl.addText("o que altera o desfecho", { x: 0.62, y: 2.82, w: 11.4, h: 0.6, color: TEALB, bold: true, italic: true, fontSize: 26, fontFace: BF, margin: 0 });

  const cy = 3.74, cw = 5.86, ch = 1.62;
  sl.addText([{ text: "ALVO TÉCNICO\n", options: { bold: true, color: INK, fontSize: 21, fontFace: HF } },
    { text: "o que o cirurgião mede", options: { color: BODY, fontSize: 16, fontFace: BF } }],
    { shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: CARD }, line: { type: "none" }, shadow: shadow(), x: 0.6, y: cy, w: cw, h: ch, valign: "middle", align: "left", margin: [8, 16, 8, 16], lineSpacingMultiple: 1.1 });
  sl.addText([{ text: "DESFECHO CLÍNICO\n", options: { bold: true, color: INK, fontSize: 21, fontFace: HF } },
    { text: "o que o paciente vive: revisão · luxação · infecção · função", options: { color: INK, fontSize: 16, fontFace: BF } }],
    { shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: TEAL }, line: { type: "none" }, shadow: shadow(), x: 6.87, y: cy, w: cw, h: ch, valign: "middle", align: "left", margin: [8, 16, 8, 16], lineSpacingMultiple: 1.1 });

  sl.addText([{ text: "Tese — ", options: { bold: true, color: TEALB, fontSize: 17, fontFace: BF } },
    { text: "a tecnologia melhora o alvo técnico; o planejamento melhora o desfecho clínico.", options: { italic: true, color: BODY, fontSize: 17, fontFace: BF } }],
    { x: 0.62, y: 5.55, w: 12.1, h: 0.6, align: "left", margin: 0, lineSpacingMultiple: 1.1 });

  sl.addShape(p.ShapeType.line, { x: 0.64, y: 6.35, w: 3.0, h: 0, line: { color: TEAL, width: 2.5 } });
  sl.addText("Dr. Daniel Araújo Fernandes", { x: 0.62, y: 6.5, w: 9, h: 0.4, color: INK, bold: true, fontSize: 17, fontFace: BF, margin: 0 });
  sl.addText("Congresso [nome a confirmar] de Ortopedia e Traumatologia · 2026", { x: 0.62, y: 6.86, w: 11.5, h: 0.35, color: MUT, fontSize: 13, fontFace: BF, margin: 0 });
})();

// ---------- helper topico ----------
function topico(cfg) {
  const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText(cfg.eyebrow, { x: 0.62, y: 0.40, w: 12.1, h: 0.34, color: TEALB, bold: true, fontSize: 14, charSpacing: 1.5, fontFace: BF, margin: 0 });
  sl.addText(cfg.titulo, { x: 0.58, y: 0.76, w: 12.1, h: 1.02, color: INK, bold: true, fontSize: cfg.tituloSize || 34, fontFace: HF, valign: "top", margin: 0, lineSpacingMultiple: 1.02 });

  const bx = 0.7, bw = cfg.fig ? 7.3 : 12.0;
  let y = 2.0;
  for (const b of cfg.bullets) { bullet(sl, b, bx, y, bw); y += 0.86; }
  if (cfg.fig) figCard(sl, cfg.fig.img, 8.35, 1.98, 4.35, cfg.fig.h || 4.35, cfg.fig.credito);
  condutaBand(sl, cfg.conduta, 5.98, cfg.fig ? 7.5 : 12.1);
  if (cfg.sources) sources(sl, cfg.sources);
}

// ---------- S2 · TEMPLATE ----------
topico({
  eyebrow: "ATO 1 · PLANEJAMENTO DE IMAGEM · TEMPLATE",
  titulo: "Template manual ou digital? A ferramenta não é o determinante",
  tituloSize: 32,
  bullets: [
    "Acerto da haste — template manual ~75% × 60%~ software (p < 0,001)",
    "Comparação inversa — digital ~93,8% × 84,1%~: o método importa menos que a execução",
    "Padrão alcançável — **± 1 tamanho em ~90%**; tamanho exato em ~32–40%",
    "O desenho da haste desloca a previsão — subdimensionamento ~3,7×~",
  ],
  conduta: "template em **TODA** artroplastia — manual ou digital.",
  sources: "Petretta 2015 · PMID 25910779 · Pongkunakorn 2021 · PMID 33583670 · Surroca 2024 · PMID 38825822 · Diaz-Ledezma 2025 · PMID 40130235",
});

// ---------- S3 · CALIBRAÇÃO (com ilustração real) ----------
topico({
  eyebrow: "ATO 1 · PLANEJAMENTO DE IMAGEM · CALIBRAÇÃO",
  titulo: "Calibração: o marcador único é insuficiente para o fêmur",
  tituloSize: 31,
  bullets: [
    "Erro de magnificação — marcador único ~12,5%~ (até 23,3%) × dupla escala ~2,1%~",
    "Acerto exato da haste — dupla escala ~54% × 32%~ (p = 0,04); taça: sem diferença",
    "Erro de calibração **> 1,5%** já altera o tamanho planejado",
    "Fator fixo — magnificação real varia ~116–140%~ (muda com IMC e sexo)",
  ],
  conduta: "calibração de **dupla escala** em toda radiografia de planejamento; não usar fator fixo.",
  fig: { img: "1.1_calibracao_esquema_marcador.jpg", h: 4.0, credito: "Marcador anterior (dupla escala) × entre as pernas · Ries 2022 · CC BY 4.0" },
  sources: "Ries 2022 · PMID 35099608 · Maatough 2025 · PMID 40470419 · Boese 2023 · PMID 36881153 · Ashkenazi 2023 · PMID 37195151",
});

// ---------- S4 · 3D + IMPRESSÃO ----------
topico({
  eyebrow: "ATO 1 · PLANEJAMENTO DE IMAGEM · TRIDIMENSIONAL",
  titulo: "Planejamento 3D por tomografia e impressão 3D",
  tituloSize: 33,
  bullets: [
    "Acerto da taça — 3D ~96,9% × 87,1%~ (2D)",
    "Desfecho relatado pelo paciente — **sem diferença** (ensaio randomizado)",
    "Modelo impresso — ensaio corresponde à cirurgia (~ICC 0,93~): anatomia complexa",
  ],
  conduta: "2D na rotina; **impressão 3D** na displasia e revisão.",
  sources: "Parisi 2024 · PMID 39518705 · Thomas 2022 (RCT) · PMID 36183111 · Zhang 2021 · PMID 34898037",
});

// ---------- S5 · IA ----------
topico({
  eyebrow: "ATO 1 · PLANEJAMENTO DE IMAGEM · INTELIGÊNCIA ARTIFICIAL",
  titulo: "Planejamento assistido por inteligência artificial",
  tituloSize: 32,
  bullets: [
    "Acerto do tamanho — taça ~OR 3,85~ (melhor que o 2D)",
    "Validação — 1.371 pacientes, **um único país**, nível III",
    "Função — ~+0,73~ ponto no HHS: abaixo do MCID (imperceptível ao paciente)",
  ],
  conduta: "**não adotar** sem validação na população local; acompanhar a literatura.",
  sources: "Altahtamouni 2026 · PMID 41727957 · Taghavi 2026 · PMID 42547897",
});

const OUT = path.join(__dirname, "deck_atual5.pptx");
p.writeFile({ fileName: OUT }).then(() => console.log("OK ->", OUT, "|", animSeq, "blocos anim")).catch((e) => { console.error(e); process.exit(1); });
