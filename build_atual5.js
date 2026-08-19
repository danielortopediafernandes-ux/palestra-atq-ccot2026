// 5 PRIMEIROS SLIDES — VERSÃO ATUAL (CAPITULO.md @ffb0893, formato "resumo em tópicos").
// ⛔ CANÔNICO (Dr. 18/08): CADA afirmação leva a SUA referência JUNTO dela (autor·ano·PMID
// logo abaixo do tópico) — NUNCA referências agrupadas no rodapé.
// S1 capa+conceito · S2 template · S3 calibração (dupla escala, c/ ilustração real Ries 2022 CC BY)
// · S4 3D+impressão · S5 IA. Identidade escura CCOT (paleta OFICIAL 33414b/107368/fff) · animação.
const path = require("path");
const pptxgen = require("pptxgenjs");

const BG = "33414B", CARD = "3E4E5A", COND = "2B3841", PANEL = "F4F6F7";
const TEAL = "107368", TEALB = "35B3A3";
const INK = "FFFFFF", BODY = "D6DEE4", MUT = "9FABB6", REF = "8CA0AC";
const HF = "Cambria", BF = "Calibri";
const FIGDIR = path.join(__dirname, "_figuras");

const p = new pptxgen(); p.layout = "LAYOUT_WIDE";
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

// b = { t: "afirmação (com **/~ )", f: "Autor ANO · Revista · PMID XXXX" }
function bullet(sl, b, x, y, w) {
  const runs = [{ text: "▸  ", options: { color: TEAL, bold: true, fontSize: 20, fontFace: BF } }, ...parseRuns(b.t, BODY, 20)];
  if (b.f) runs.push({ text: "\n      " + b.f, options: { color: REF, italic: true, fontSize: 11.5, fontFace: BF } });
  sl.addText(runs, markAnim({ x, y, w, h: 0.94, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.04 }));
}

function figCard(sl, img, cx, cy, cw, ch, credito) {
  sl.addShape(p.ShapeType.roundRect, { rectRadius: 0.05, fill: { color: PANEL }, line: { type: "none" }, shadow: shadow(), x: cx, y: cy, w: cw, h: ch });
  const pad = 0.16;
  sl.addImage({ path: path.join(FIGDIR, img), x: cx + pad, y: cy + pad, w: cw - 2 * pad, h: ch - 2 * pad - 0.28, sizing: { type: "contain", w: cw - 2 * pad, h: ch - 2 * pad - 0.28 } });
  sl.addText(credito, { x: cx + pad, y: cy + ch - 0.33, w: cw - 2 * pad, h: 0.27, color: "5A6B74", italic: true, fontSize: 9.5, fontFace: BF, align: "center", valign: "middle", margin: 0 });
}

function condutaBand(sl, txt, y, w) {
  sl.addText([{ text: "Conduta:  ", options: { bold: true, color: TEALB, fontSize: 19, fontFace: BF } }, ...parseRuns(txt, INK, 19)],
    markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.05, fill: { color: COND }, line: { color: TEAL, width: 1.25 }, shadow: shadow(),
      x: 0.6, y, w, h: 0.72, align: "left", valign: "middle", margin: [5, 16, 5, 16], lineSpacingMultiple: 1.02 }));
}

// ---------- S1 · CAPA + CONCEITO ----------
(function () {
  const sl = p.addSlide(); bgDark(sl); topbar(sl);
  sl.addShape(p.ShapeType.roundRect, { rectRadius: 0.08, fill: { color: "FFFFFF" }, line: { type: "none" }, shadow: shadow(), x: 9.95, y: 0.52, w: 2.85, h: 1.42 });
  sl.addImage({ path: path.join(FIGDIR, "logo-ccot.png"), x: 10.12, y: 0.62, w: 2.51, h: 1.22, sizing: { type: "contain", w: 2.51, h: 1.22 } });

  sl.addText("MESA REDONDA · JORNADA DO QUADRIL", { x: 0.62, y: 0.72, w: 9, h: 0.4, color: TEALB, bold: true, fontSize: 15, charSpacing: 2.5, fontFace: BF, margin: 0 });
  sl.addText("Planejamento pré-operatório em artroplastia total do quadril", { x: 0.58, y: 1.16, w: 9.1, h: 1.9, color: INK, bold: true, fontSize: 40, fontFace: HF, valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  sl.addText("o que realmente muda o resultado", { x: 0.62, y: 3.02, w: 11.4, h: 0.6, color: TEALB, bold: true, italic: true, fontSize: 26, fontFace: BF, margin: 0 });

  const cy = 3.78, cw = 5.86, ch = 1.46;
  sl.addText([{ text: "ALVO TÉCNICO\n", options: { bold: true, color: INK, fontSize: 20, fontFace: HF } },
    { text: "o que o cirurgião mede", options: { color: BODY, fontSize: 15.5, fontFace: BF } }],
    { shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: CARD }, line: { type: "none" }, shadow: shadow(), x: 0.6, y: cy, w: cw, h: ch, valign: "middle", align: "left", margin: [8, 16, 8, 16], lineSpacingMultiple: 1.1 });
  sl.addText([{ text: "DESFECHO CLÍNICO\n", options: { bold: true, color: INK, fontSize: 20, fontFace: HF } },
    { text: "o que o paciente vive: revisão · luxação · infecção · função", options: { color: INK, fontSize: 15.5, fontFace: BF } }],
    { shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: TEAL }, line: { type: "none" }, shadow: shadow(), x: 6.87, y: cy, w: cw, h: ch, valign: "middle", align: "left", margin: [8, 16, 8, 16], lineSpacingMultiple: 1.1 });

  sl.addText([{ text: "Tese — ", options: { bold: true, color: TEALB, fontSize: 16, fontFace: BF } },
    { text: "a tecnologia melhora o alvo técnico; o planejamento melhora o desfecho clínico.", options: { italic: true, color: BODY, fontSize: 16, fontFace: BF } }],
    { x: 0.62, y: 5.42, w: 12.1, h: 0.5, align: "left", margin: 0, lineSpacingMultiple: 1.08 });

  sl.addShape(p.ShapeType.line, { x: 0.64, y: 6.12, w: 3.0, h: 0, line: { color: TEAL, width: 2.5 } });
  sl.addText("Dr. Daniel Araújo Fernandes", { x: 0.62, y: 6.26, w: 9, h: 0.4, color: INK, bold: true, fontSize: 18, fontFace: BF, margin: 0 });
  sl.addText("XVI Congresso Catarinense de Ortopedia e Traumatologia", { x: 0.62, y: 6.66, w: 9.2, h: 0.32, color: BODY, fontSize: 13.5, fontFace: BF, margin: 0 });
  sl.addText("Oceania Park Hotel · Florianópolis-SC · 21–22 de agosto de 2026", { x: 0.62, y: 6.96, w: 9.2, h: 0.3, color: MUT, fontSize: 12.5, fontFace: BF, margin: 0 });
})();

// ---------- helper topico ----------
function topico(cfg) {
  const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText(cfg.eyebrow, { x: 0.62, y: 0.40, w: 12.1, h: 0.34, color: TEALB, bold: true, fontSize: 14, charSpacing: 1.5, fontFace: BF, margin: 0 });
  sl.addText(cfg.titulo, { x: 0.58, y: 0.76, w: 12.1, h: 1.02, color: INK, bold: true, fontSize: cfg.tituloSize || 34, fontFace: HF, valign: "top", margin: 0, lineSpacingMultiple: 1.02 });

  const bx = 0.7, bw = cfg.fig ? 7.35 : 12.0;
  let y = 1.9;
  for (const b of cfg.bullets) { bullet(sl, b, bx, y, bw); y += 0.99; }
  if (cfg.fig) figCard(sl, cfg.fig.img, 8.4, 1.9, 4.3, cfg.fig.h || 4.2, cfg.fig.credito);
  condutaBand(sl, cfg.conduta, 6.14, cfg.fig ? 7.55 : 12.1);
}

// ---------- S2 · TEMPLATE ----------
topico({
  eyebrow: "ATO 1 · PLANEJAMENTO DE IMAGEM · TEMPLATE",
  titulo: "Template manual ou digital? A ferramenta não é o determinante",
  tituloSize: 32,
  bullets: [
    { t: "Acerto da haste — template manual ~75% × 60%~ software (p < 0,001)", f: "Petretta 2015 · CORR · 5 observadores, 52 ATQs · PMID 25910779" },
    { t: "Comparação inversa — digital ~93,8% × 84,1%~: o método importa menos que a execução", f: "Pongkunakorn 2021 · J Arthroplasty · PMID 33583670" },
    { t: "Padrão alcançável — **± 1 tamanho em ~90%**; tamanho exato em ~32–40%", f: "Surroca 2024 · Hip Pelvis · PMID 38825822" },
    { t: "O desenho da haste desloca a previsão — subdimensionamento ~3,7×~", f: "Diaz-Ledezma 2025 · Arthroplast Today · PMID 40130235" },
  ],
  conduta: "template em **TODA** artroplastia — manual ou digital.",
});

// ---------- S3 · CALIBRAÇÃO (com ilustração real) ----------
topico({
  eyebrow: "ATO 1 · PLANEJAMENTO DE IMAGEM · CALIBRAÇÃO",
  titulo: "Calibração: o marcador único é insuficiente para o fêmur",
  tituloSize: 30,
  bullets: [
    { t: "Erro de magnificação — marcador único ~12,5%~ (até 23,3%) × dupla escala ~2,1%~", f: "Ries 2022 · Arch Orthop Trauma Surg · 100 pac · PMID 35099608" },
    { t: "Acerto exato da haste — dupla escala ~54% × 32%~ (p = 0,04); taça: sem diferença", f: "Maatough 2025 · Cureus · PMID 40470419" },
    { t: "Erro de calibração **> 1,5%** já altera o tamanho planejado", f: "Boese 2023 · Int Orthop · modelo físico · PMID 36881153" },
    { t: "Fator fixo — magnificação real varia ~116–140%~ (muda com IMC e sexo)", f: "Holliday 2021 · PMID 33590673 · Ashkenazi 2023 · PMID 37195151" },
  ],
  conduta: "calibração de **dupla escala** em toda radiografia; não usar fator fixo.",
  fig: { img: "1.1_calibracao_esquema_marcador.jpg", h: 3.9, credito: "Marcador anterior (dupla escala) × entre as pernas · Ries 2022 · CC BY 4.0" },
});

// ---------- S4 · 3D + IMPRESSÃO ----------
topico({
  eyebrow: "ATO 1 · PLANEJAMENTO DE IMAGEM · TRIDIMENSIONAL",
  titulo: "Planejamento 3D por tomografia e impressão 3D",
  tituloSize: 33,
  bullets: [
    { t: "Acerto da taça — 3D ~96,9% × 87,1%~ (2D)", f: "Parisi 2024 · PMID 39518705 · Bishi 2022 (meta) · PMID 35076413" },
    { t: "Desfecho relatado pelo paciente — **sem diferença** (ensaio randomizado)", f: "Thomas 2022 · RCT · PMID 36183111" },
    { t: "Modelo impresso — ensaio corresponde à cirurgia (~ICC 0,93~): anatomia complexa", f: "Zhang 2021 · Orthop Surg · piloto 17 pac · PMID 34898037" },
  ],
  conduta: "2D na rotina; **impressão 3D** na displasia e revisão.",
});

// ---------- S5 · IA ----------
topico({
  eyebrow: "ATO 1 · PLANEJAMENTO DE IMAGEM · INTELIGÊNCIA ARTIFICIAL",
  titulo: "Planejamento assistido por inteligência artificial",
  tituloSize: 32,
  bullets: [
    { t: "Acerto do tamanho — taça ~OR 3,85~ (melhor que o 2D)", f: "Altahtamouni 2026 · meta · PMID 41727957" },
    { t: "Validação — 1.371 pacientes, **um único país**, nível III", f: "Altahtamouni 2026 · meta · PMID 41727957" },
    { t: "Função — ~+0,73~ ponto no HHS: abaixo do MCID (imperceptível ao paciente)", f: "Taghavi 2026 · Arthroplasty · meta · PMID 42547897" },
  ],
  conduta: "**não adotar** sem validação na população local; acompanhar a literatura.",
});

const OUT = path.join(__dirname, "deck_atual5.pptx");
p.writeFile({ fileName: OUT }).then(() => console.log("OK ->", OUT, "|", animSeq, "blocos anim")).catch((e) => { console.error(e); process.exit(1); });
