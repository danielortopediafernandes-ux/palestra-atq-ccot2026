// ============================================================================
// DECK OFICIAL — Palestra ATQ · XVI CCOT 2026 · 21/08 · 15:20
//   DONO: sessão de CONTEÚDO (Dr. reassinou 2026-08-20 — conteúdo cuida de tudo:
//   CAPITULO.md + slides/deck). A sessão fork cuida só do QR/versão pública.
//   MODELO RESPOSTA v2: cada slide de decisão fecha numa RESPOSTA hero (funde
//   veredito+conduta, objetiva/enumerada) + ARTIGO PRINCIPAL âncora. Sem conduta.
//   Tópicos = evidência (descem). RESPOSTA surge por ÚLTIMO. Tema V2 escura+âmbar.
//   FIGURAS reais (herdadas do trabalho da fork) no canto inferior-direito;
//   slides sem figura levam o QR de canto. Dados: deck_respostas_v2.json.
// ============================================================================
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const RESP = JSON.parse(fs.readFileSync(path.join(__dirname, "deck_respostas_v2.json"), "utf8")).slides;
const FIGDIR = path.join(__dirname, "_figuras");

const BG = "33414B", CARD = "3E4E5A", CARD2 = "46586A", COND = "2B3841", PANEL = "F4F6F7", TEAL = "107368", TEALB = "35B3A3";
const INK = "FFFFFF", BODY = "D6DEE4", MUT = "9FABB6", REF = "8CA0AC", HF = "Cambria", BF = "Calibri";
const R_FILL = "161D23", R_LINE = "E8A33D", R_LABEL = "E8A33D", R_VERDICT = "F2B84B", R_CORPO = "FFFFFF", R_ARTIGO = "AEB9C2";

const p = new pptxgen(); p.layout = "LAYOUT_WIDE";
const bgDark = (s) => { s.background = { color: BG }; };
const shadow = () => ({ type: "outer", color: "000000", opacity: 0.32, blur: 8, offset: 3, angle: 90 });
const topbar = (sl) => sl.addShape(p.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.14, fill: { color: TEAL }, line: { type: "none" } });
const rodape = (sl) => {
  sl.addText("Dr. Daniel Araújo Fernandes · Planejamento, Precisão e Técnica na Artroplastia do Quadril",
    { x: 0.6, y: 7.16, w: 9.6, h: 0.26, color: MUT, fontSize: 9.5, fontFace: BF, align: "left", margin: 0 });
  sl.addText("XVI CCOT · 2026", { x: 10.2, y: 7.16, w: 2.5, h: 0.26, color: MUT, fontSize: 9.5, fontFace: BF, align: "right", margin: 0 });
};
let animSeq = 0;
const markAnim = (o) => { animSeq++; return Object.assign({}, o, { objectName: "anim_" + animSeq }); };
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
function bullet(sl, b, x, y, w, size) {
  const s = size || 19;
  const runs = [{ text: "▸  ", options: { color: TEAL, bold: true, fontSize: s, fontFace: BF } }, ...parseRuns(b.t, BODY, s)];
  if (b.f) runs.push({ text: "\n      " + b.f, options: { color: REF, italic: true, fontSize: s <= 17 ? 10.5 : 11, fontFace: BF } });
  sl.addText(runs, markAnim({ x, y, w, h: 0.90, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.03 }));
}
// figura real em cartão claro (canto inferior-direito), abaixo da RESPOSTA
function figCard(sl, fig, cx, cy, cw, ch) {
  const pad = 0.16;
  sl.addShape(p.ShapeType.roundRect, { rectRadius: 0.05, fill: { color: PANEL }, line: { type: "none" }, shadow: shadow(), x: cx, y: cy, w: cw, h: ch });
  sl.addImage({ path: path.join(FIGDIR, fig.img), x: cx + pad, y: cy + pad, w: cw - 2 * pad, h: ch - 2 * pad - 0.32, sizing: { type: "contain", w: cw - 2 * pad, h: ch - 2 * pad - 0.32 } });
  sl.addText(fig.credito, { x: cx + pad, y: cy + ch - 0.36, w: cw - 2 * pad, h: 0.32, color: "5A6B74", italic: true, fontSize: 8.5, fontFace: BF, align: "center", valign: "middle", margin: 0, lineSpacingMultiple: 1.0 });
}
// QR de canto (slides SEM figura) → versão pública/handout (drfernandes.com.br/atq)
const QRIMG = path.join(FIGDIR, "qr_atq_teal.png");
function qrCorner(sl) {
  const qw = 0.72, cardW = 0.92, cardH = 1.04, cardX = 13.33 - 0.20 - cardW, cardY = 7.5 - 0.46 - cardH;
  sl.addShape(p.ShapeType.roundRect, { rectRadius: 0.04, fill: { color: "FFFFFF" }, line: { type: "none" }, shadow: shadow(), x: cardX, y: cardY, w: cardW, h: cardH });
  sl.addImage({ path: QRIMG, x: cardX + (cardW - qw) / 2, y: cardY + 0.08, w: qw, h: qw });
  sl.addText("drfernandes.com.br/atq", { x: cardX, y: cardY + 0.09 + qw, w: cardW, h: 0.18, color: "5A6B74", bold: true, fontSize: 6.5, fontFace: BF, align: "center", valign: "middle", margin: 0 });
}
function respostaH(id) {
  const d = RESP[id]; const txt = (d.veredito + " " + d.corpo).replace(/[*~]/g, "");
  const linhas = Math.max(2, Math.ceil(txt.length / 76));
  const lf = d.respostaFonte.length > 118 ? 2 : 1;
  return 0.74 + linhas * 0.40 + lf * 0.24;
}
function respostaHero(sl, id, hBox) {
  const d = RESP[id];
  const runs = [
    { text: "RESPOSTA\n", options: { bold: true, color: R_LABEL, fontSize: 12.5, charSpacing: 2, fontFace: BF } },
    { text: d.veredito + " ", options: { bold: true, color: R_VERDICT, fontSize: 27, fontFace: BF } },
    ...parseRuns(d.corpo, R_CORPO, 22),
    { text: "\n\n", options: { fontSize: 5, fontFace: BF } },
    { text: "Artigo principal — ", options: { bold: true, color: R_LABEL, italic: true, fontSize: 11.5, fontFace: BF } },
    { text: d.respostaFonte, options: { color: R_ARTIGO, italic: true, fontSize: 11.5, fontFace: BF } },
  ];
  sl.addText(runs, markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: R_FILL }, line: { color: R_LINE, width: 2.0 }, shadow: shadow(),
    x: 0.58, y: 1.58, w: 12.17, h: hBox, align: "left", valign: "middle", margin: [12, 20, 12, 20], lineSpacingMultiple: 1.05 }));
}
function topico(cfg) {
  const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText(cfg.eyebrow, { x: 0.62, y: 0.36, w: 12.1, h: 0.32, color: TEALB, bold: true, fontSize: 14, charSpacing: 1.5, fontFace: BF, margin: 0 });
  sl.addText(cfg.titulo, { x: 0.58, y: 0.70, w: 12.1, h: 0.80, color: INK, bold: true, fontSize: cfg.tituloSize || 28, fontFace: HF, valign: "top", margin: 0, lineSpacingMultiple: 1.02 });
  const hBox = respostaH(cfg.id);
  const lowerY = 1.58 + hBox + 0.28;
  if (cfg.fig) {
    // bullets à esquerda (estreitos) + figura no canto inferior-direito
    let y = lowerY;
    for (const b of cfg.bullets) { bullet(sl, b, 0.7, y, 6.75, 17); y += 0.80; }
    figCard(sl, cfg.fig, 7.78, lowerY, 4.95, 7.02 - lowerY);
  } else {
    let y = lowerY;
    const step = cfg.bullets.length >= 4 ? 0.86 : 0.94;
    for (const b of cfg.bullets) { bullet(sl, b, 0.7, y, 12.0, 19); y += step; }
    qrCorner(sl);
  }
  respostaHero(sl, cfg.id, hBox);
}

// S1 CAPA
(function () { const sl = p.addSlide(); bgDark(sl); topbar(sl);
  sl.addText("XVI CONGRESSO CATARINENSE DE ORTOPEDIA E TRAUMATOLOGIA", { x: 0.62, y: 0.72, w: 12.1, h: 0.40, color: TEALB, bold: true, fontSize: 14, charSpacing: 2.5, fontFace: BF, margin: 0 });
  sl.addText("Planejamento, Precisão e Técnica na Artroplastia do Quadril", { x: 0.58, y: 2.30, w: 12.15, h: 1.90, color: INK, bold: true, fontSize: 40, fontFace: HF, valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  sl.addText("Planejamento pré-operatório — o que realmente muda o resultado", { x: 0.62, y: 4.45, w: 12.10, h: 0.70, color: TEALB, italic: true, bold: true, fontSize: 23, fontFace: BF, margin: 0 });
  sl.addShape(p.ShapeType.line, { x: 0.64, y: 5.62, w: 3.0, h: 0, line: { color: TEAL, width: 2.5 } });
  sl.addText("Dr. Daniel Araújo Fernandes", { x: 0.62, y: 5.76, w: 9, h: 0.4, color: INK, bold: true, fontSize: 20, fontFace: BF, margin: 0 });
  sl.addText("Florianópolis · 21 de agosto de 2026", { x: 0.62, y: 6.20, w: 9, h: 0.36, color: BODY, fontSize: 15, fontFace: BF, margin: 0 });
  qrCorner(sl);
})();
// S2 CONFLITO
(function () { const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText("DECLARAÇÃO", { x: 0.62, y: 0.72, w: 12.1, h: 0.34, color: TEALB, bold: true, fontSize: 14, charSpacing: 2.5, fontFace: BF, margin: 0 });
  sl.addText("Conflito de interesse", { x: 0.58, y: 1.15, w: 12.1, h: 0.90, color: INK, bold: true, fontSize: 38, fontFace: HF, valign: "top", margin: 0 });
  sl.addText("Sem conflito de interesse relacionado ao tema desta apresentação.", { shape: p.ShapeType.roundRect, rectRadius: 0.08, fill: { color: CARD }, line: { type: "none" }, shadow: shadow(), x: 0.62, y: 3.30, w: 12.09, h: 1.60, color: INK, fontSize: 24, fontFace: BF, italic: true, align: "center", valign: "middle", margin: 0 });
})();
// S3 EQUIPE
(function () { const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText("APRESENTAÇÃO", { x: 0.62, y: 0.72, w: 12.1, h: 0.34, color: TEALB, bold: true, fontSize: 14, charSpacing: 2.5, fontFace: BF, margin: 0 });
  sl.addText("Programa de Especialização em Cirurgia do Quadril", { x: 0.58, y: 1.10, w: 12.1, h: 1.00, color: INK, bold: true, fontSize: 30, fontFace: HF, valign: "top", margin: 0, lineSpacingMultiple: 1.02 });
  ["Daniel Araujo","Marcos Contreras","Douglas Ouriques","Renan Matineli","Marco Galeazi"].forEach((nm,i)=>{ const cw=2.36,gap=0.08; sl.addText(nm,{shape:p.ShapeType.roundRect,rectRadius:0.06,fill:{color:CARD},line:{type:"none"},shadow:shadow(),x:0.62+i*(cw+gap),y:3.25,w:cw,h:1.10,color:INK,bold:true,fontSize:16,fontFace:BF,align:"center",valign:"middle",margin:0}); });
})();
// S4 TESE
(function () { const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText("CONCEITO FUNDADOR", { x: 0.62, y: 0.40, w: 12.1, h: 0.34, color: TEALB, bold: true, fontSize: 14, charSpacing: 2.5, fontFace: BF, margin: 0 });
  sl.addText("A dissociação entre acurácia e resultado clínico", { x: 0.58, y: 0.76, w: 12.1, h: 1.05, color: INK, bold: true, fontSize: 32, fontFace: HF, valign: "top", margin: 0, lineSpacingMultiple: 1.02 });
  const cy=2.15,cw=5.86,ch=2.10;
  sl.addText([{text:"ALVO TÉCNICO\n",options:{bold:true,color:INK,fontSize:22,fontFace:HF}},{text:"o que o cirurgião afere\n",options:{color:BODY,fontSize:15,fontFace:BF,italic:true}},{text:"posicionamento e dimensionamento dos componentes",options:{color:BODY,fontSize:15,fontFace:BF}}],{shape:p.ShapeType.roundRect,rectRadius:0.06,fill:{color:CARD},line:{type:"none"},shadow:shadow(),x:0.60,y:cy,w:cw,h:ch,valign:"middle",align:"left",margin:[10,18,10,18],lineSpacingMultiple:1.12});
  sl.addText([{text:"RESULTADO CLÍNICO\n",options:{bold:true,color:INK,fontSize:22,fontFace:HF}},{text:"o que o paciente experimenta\n",options:{color:INK,fontSize:15,fontFace:BF,italic:true}},{text:"revisão · luxação · infecção · função",options:{color:INK,fontSize:15,fontFace:BF}}],{shape:p.ShapeType.roundRect,rectRadius:0.06,fill:{color:TEAL},line:{type:"none"},shadow:shadow(),x:6.87,y:cy,w:cw,h:ch,valign:"middle",align:"left",margin:[10,18,10,18],lineSpacingMultiple:1.12});
  sl.addText([{text:"Tese — ",options:{bold:true,color:R_VERDICT,fontSize:20,fontFace:BF}},{text:"a tecnologia define a precisão, mas alterar o resultado depende de respeitar a evidência que a literatura fornece.",options:{italic:true,color:INK,fontSize:20,fontFace:BF}}],markAnim({shape:p.ShapeType.roundRect,rectRadius:0.06,fill:{color:R_FILL},line:{color:R_LINE,width:2.0},shadow:shadow(),x:0.60,y:4.65,w:12.13,h:1.30,align:"left",valign:"middle",margin:[8,18,8,18],lineSpacingMultiple:1.10}));
})();

// ATO 1
topico({ id:"S5", eyebrow:"ATO 1 · IMAGEM · TEMPLATE", titulo:"Template manual ou digital: qual muda o resultado?", bullets:[
  {t:"Haste — template manual superou o software: acerto ~75% × 60%~", f:"Petretta 2015 · CORR · PMID 25910779"},
  {t:"Haste — método digital superou o manual: acerto ~94% × 84%~", f:"Pongkunakorn 2021 · J Arthroplasty · 113 quadris · PMID 33583670"},
  {t:"Componente acetabular — **nenhum método foi superior**", f:"Petretta 2015 (p = 0,05) · Pongkunakorn 2021 (p = 0,48)"},
  {t:"**Nenhum estudo comparou resultado clínico** — apenas acurácia", f:"busca 2015–2026"} ]});
topico({ id:"S6", eyebrow:"ATO 1 · IMAGEM · CALIBRAÇÃO", titulo:"A calibração com marcador único muda o resultado?",
  fig:{ img:"1.1_calibracao_esquema_marcador.jpg", credito:"Marcador de dupla escala × marcador único · Ries 2022 · PMID 35099608" }, bullets:[
  {t:"Marcador único: erro ~12,5%~ (até 23,3%) · dupla escala ~2,1%~", f:"Ries 2022 · Arch Orthop Trauma Surg · 100 pac · PMID 35099608"},
  {t:"Acerto exato da haste — dupla escala ~54% × 32%~ (p = 0,04)", f:"Maatough 2025 · Cureus · PMID 40470419"},
  {t:"Erro de calibração **> 1,5%** já altera o tamanho planejado", f:"Boese 2023 · Int Orthop · phantom · PMID 36881153"} ]});
topico({ id:"S7", eyebrow:"ATO 1 · IMAGEM · TRIDIMENSIONAL", titulo:"O planejamento 3D por tomografia muda o resultado?",
  fig:{ img:"3or6_pelve3D_anteversao_geometria.png", credito:"Reconstrução 3D por tomografia — mensuração de anteversão" }, bullets:[
  {t:"Acerto do componente acetabular — 3D ~96,9% × 87,1%~ (2D)", f:"Parisi 2024 · PMID 39518705 · Bishi 2022 · meta · PMID 35076413"},
  {t:"Resultado relatado pelo paciente (PROM) — **sem diferença** (RCT)", f:"Thomas 2022 · RCT · PMID 36183111"} ]});
topico({ id:"S8", eyebrow:"ATO 1 · IMAGEM · IMPRESSÃO 3D", titulo:"O modelo 3D impresso muda o resultado na anatomia complexa?", bullets:[
  {t:"Ensaio no modelo corresponde à cirurgia — ~ICC 0,93~ · defeito ósseo P = 0,97", f:"Zhang 2021 · Orthop Surg · 17 pac · PMID 34898037"},
  {t:"Permite ensaiar redução, defeito ósseo, tamanho e posição antes da mesa", f:"Godoy-Monzón 2025 · Acta Ortop Mex · 22 pac · PMID 40925848"} ]});
topico({ id:"S9", eyebrow:"ATO 1 · IMAGEM · INTELIGÊNCIA ARTIFICIAL", titulo:"O planejamento assistido por IA muda o resultado?", bullets:[
  {t:"Acerto do tamanho — componente acetabular ~OR 3,85~ (contra 2D)", f:"Altahtamouni 2026 · meta · PMID 41727957"},
  {t:"Validação — **1.371 pacientes**, um único país, nível III", f:"Altahtamouni 2026 · meta · PMID 41727957"},
  {t:"Função — ~+0,73~ ponto no HHS: **abaixo do MCID**", f:"Taghavi 2026 · Arthroplasty · meta · PMID 42547897"} ]});
topico({ id:"S10", eyebrow:"ATO 1 · EXECUÇÃO · ROBÓTICA · FUNÇÃO", titulo:"A assistência robótica muda o resultado — a função?", bullets:[
  {t:"Erro de anteversão — ~2,6° × 8,9°~ (TC pré/pós, RCT)", f:"Fontalis 2024 · RCT · 60 pac · PMID 38555946"},
  {t:"Único ganho clínico — internação ~−0,49 dia~, significância marginal", f:"Poyser 2026 · coorte pareada · PMID 41519489"} ]});
topico({ id:"S11", eyebrow:"ATO 1 · EXECUÇÃO · ROBÓTICA · DEMAIS RESULTADOS", titulo:"A robótica muda o resultado — revisão, luxação, infecção?", bullets:[
  {t:"Internação — ~−0,49 dia~, significância marginal (P = 0,044)", f:"Poyser 2026 · coorte pareada · PMID 41519489"},
  {t:"Revisão — **HR 0,947** (registro nacional) · sem diferença", f:"Farhan-Alanie 2025 · NJR · PMID 41442047"},
  {t:"Luxação ~OR 0,57~ · infecção ~OR 0,83~ — sinais observacionais", f:"Giannakis 2026 · Premier · PMID 42093134 · Zhang 2026 · meta · PMID 42009981"} ]});
topico({ id:"S12", eyebrow:"ATO 1 · EXECUÇÃO · NAVEGAÇÃO", titulo:"A navegação intraoperatória muda o resultado?", bullets:[
  {t:"Zona-alvo até ~83%~; anteversão (P = 0,08) e inclinação (P = 0,94) finais **sem diferença**", f:"Braun 2025 · J Arthroplasty · 150 pac · PMID 40588106"},
  {t:"Luxação — ~0,3% × 1,2%~, **não significativa** (maior fator: tabagismo, OR 6,31)", f:"Alqazzaz 2026 · coorte 3.243 ATQ · PMID 42103591"},
  {t:"Obeso mórbido — **não reduziu** complicações, tromboembolismo nem revisão", f:"Latifi 2026 · J Robot Surg · PMID 42474881 · Int Orthop · PMID 42118304"} ]});
topico({ id:"S13", eyebrow:"ATO 1 · EXECUÇÃO · GUIAS PERSONALIZADOS (PSI)", titulo:"Os guias personalizados (PSI) mudam o resultado?", bullets:[
  {t:"Erro de anteversão femoral **significativamente menor** com PSI (p < 0,05) · n = 60", f:"Zheng 2023 · Biomed Eng Online · RCT · PMID 37705017"},
  {t:"Evidência escassa no quadril — **superioridade clínica não demonstrada**", f:"Gauci 2022 · revisão · nível V · PMID 34838754"} ]});
topico({ id:"S14", eyebrow:"ATO 1 · ALVO · LEWINNEK", titulo:"A zona de segurança de Lewinnek muda o resultado?", bullets:[
  {t:"**58%** das luxações com o componente **dentro** da zona (9.784 ATQs)", f:"Abdel 2016 · CORR · PMID 26150264"},
  {t:"Confirmação — ~55,8%~; anteversão **femoral** correta em só ~38,2%~", f:"Hernández 2021 · J Clin Orthop Trauma · 2.489 ATQs · PMID 34434695"} ]});
topico({ id:"S15", eyebrow:"ATO 1 · ALVO · ESPINOPÉLVICO · RASTREIO", titulo:"Em quem indicar o rastreio radiográfico espinopélvico?",
  fig:{ img:"3.2_espinopelvico_radiografia_anotada.png", credito:"Parâmetros espinopélvicos (PI · LL · PT) — RX lateral em pé × sentado" }, bullets:[
  {t:"A pelve **roda ao sentar** e muda a orientação funcional — a zona estática é insuficiente"},
  {t:"Quadris dentro de Lewinnek porém fora da zona funcional — ~14,2%~", f:"Tezuka & Dorr 2019 · J Arthroplasty · PMID 30454867"} ]});
topico({ id:"S16", eyebrow:"ATO 1 · ALVO · CLASSIFICAÇÃO QUADRIL-COLUNA", titulo:"A classificação Hip-Spine: como estratificar o risco?", bullets:[
  {t:"**Grupo 1** — alinhado (PI − LL ≤ 10°): ~1A~ móvel · ~1B~ rígido", f:"Vigdorchik 2021 · Bone Joint J · PMID 34192913"},
  {t:"**Grupo 2** — flatback (PI − LL > 10°): ~2A~ móvel · **~2B~ rígido — maior risco**", f:"Vigdorchik 2021 · 2.081 ATQ · PMID 34192913"},
  {t:"Luxação com DM no 2B e fusão > 3 níveis — ~0,8%~ em 5 anos", f:"Vigdorchik 2021 · Bone Joint J · PMID 34192913"} ]});
topico({ id:"S17", eyebrow:"ATO 1 · ALVO · O QUE MUDA NA CIRURGIA", titulo:"O que a avaliação espinopélvica muda no resultado?",
  fig:{ img:"3.4_CSI_scatter_alvo_taca.png", credito:"Índice sagital combinado (CSI) ótimo × não-ótimo · Verhaegen 2025 · Hip Int · PMID 39865697" }, bullets:[
  {t:"Alvo (CSI) — ~205–245°~ → **OHS 42 × 40** (P = 0,003)", f:"Verhaegen 2025 · Hip Int · PMID 39865697"},
  {t:"Anteversão — **aumentar no rígido** (~26° × 22°~)", f:"Verhaegen 2025 · Hip Int · PMID 39865697"},
  {t:"Construto — dupla mobilidade → luxação ~0,8%~ em 5 anos", f:"Vigdorchik 2021 · Bone Joint J · PMID 34192913"} ]});
// ATO 2
topico({ id:"S18", eyebrow:"ATO 2 · INSTABILIDADE · DUPLA MOBILIDADE", titulo:"A articulação de dupla mobilidade muda o resultado — e em quem?", bullets:[
  {t:"Fratura do colo ≥ 65 anos — luxação ~1,3% × 4,2%~ (aHR 0,27), primeiro RCT", f:"Hailer 2026 · The Lancet · 1.600 pac · PMID 42392114"},
  {t:"Eletivo — benefício concentrado nos grupos de risco (coluna rígida/artrodese · revisão)", f:"Nessler 2023 · JAAOS · 15.572 pac · PMID 36728665"},
  {t:"Cabeça grande **não reproduz de forma consistente** o efeito da DM — discordante", f:"Ibrahim 2025 · JBJS Rev · 133.474 quadris · PMID 41379986 · contraponto: Hoskins 2022 · PMID 35438011"},
  {t:"Por que a maior metanálise pesa mais → **slide seguinte**"} ]});
topico({ id:"S19", eyebrow:"ATO 2 · LICENÇA METODOLÓGICA", titulo:"Como ler estudos que discordam: amostra e ajuste por confundidor", bullets:[
  {t:"Tamanho da amostra — maior série ~133.474~ quadris × ~12.511~ × ~5.004~", f:"Ibrahim 2025 · PMID 41379986 · Hoskins 2022 · PMID 35438011 · Sephton 2025 · PMID 39128780"},
  {t:"Meta-regressão pelo tamanho do componente — moderador **não significativo** (OR 1,20; P = 0,12)", f:"Ibrahim 2025 · JBJS Rev · PMID 41379986"},
  {t:"Sem ensaio randomizado dedicado — o rótulo correto é **favorável, não provado**"} ]});
topico({ id:"S20", eyebrow:"ATO 2 · INSTABILIDADE · DIÂMETRO DA CABEÇA", titulo:"O diâmetro da cabeça femoral muda o resultado — a luxação?", bullets:[
  {t:"Revisão por luxação — ~1,4%~ (22–28 mm) → ~0,9%~ (32 mm) → ~0,6%~ (36 mm)", f:"van Steenbergen 2023 · LROI · 269.280 ATQs · PMID 36935558"},
  {t:"Confirmação — 36 mm ~0,46%~ × 32 mm ~0,68%~ (319.531 ATQs)", f:"Bender 2025 · J Arthroplasty · AJRR · PMID 40015384"},
  {t:"**Teto em 36** — com ≥ 40 mm a luxação **não cai mais**; revisão e infecção sobem", f:"Bender 2025 · J Arthroplasty · PMID 40015384"} ]});
topico({ id:"S21", eyebrow:"ATO 2 · INSTABILIDADE · TÉCNICA · REPARO CAPSULAR", titulo:"O reparo capsular na via posterior muda o resultado?", bullets:[
  {t:"Com reparo, via posterior equivale às demais vias — ~1,01% × 0,70% × 0,43%~", f:"Kwon 2006 · CORR · PMID 16741471"},
  {t:"Mecanismo medido — torque para luxar ~9,12 × 2,73 N·m~", f:"Cherry 2025 · Int Orthop · cadavérico · PMID 40715845"} ]});
topico({ id:"S22", eyebrow:"ATO 2 · PÓS-OPERATÓRIO · RESTRIÇÕES", titulo:"As restrições pós-operatórias mudam o resultado?", bullets:[
  {t:"RCT, 1.133 pacientes — luxação ~0,88%~, sem diferença restrito × livre", f:"Yadav 2026 · RCT · J Arthroplasty · PMID 42055222"},
  {t:"Função (HOOS JR) — **melhor no grupo livre** (6 semanas e 3–6 meses)", f:"Yadav 2026 · RCT · PMID 42055222"},
  {t:"GRADE, 8.835 pacientes — evidência **não sustenta** restrições de rotina", f:"Korfitsen 2023 · Acta Orthop · PMID 37039064"} ]});
topico({ id:"S23", eyebrow:"ATO 2 · FIXAÇÃO · CIMENTAR EM QUEM", titulo:"A fixação femoral muda o resultado — em quem cimentar?",
  fig:{ img:"5.4_BCIS_sobrevida_30dias_por_grau.png", credito:"Sobrevida em 30 dias por grau de BCIS · Rassir 2021 · PMID 33165048" }, bullets:[
  {t:"Cimentar — mulher **≥ 70,5 anos** · osso de má qualidade", f:"Ladurner 2023 · Registro Suíço · 86.423 ATQs · PMID 37595764"},
  {t:"Fratura do colo (nível 1) — periprotética ~OR 0,22~ · mortalidade ~RR 0,86~", f:"Malki 2026 · meta 16 RCTs · PMID 42259040 · Lewis 2022 · Cochrane · PMID 35156194"},
  {t:"Risco do cimento — **agudo, dia 0–1** (~0,4%~); após 7 dias sem diferença", f:"Viberg 2022 · Bone Joint J · PMID 34969285"} ]});
topico({ id:"S24", eyebrow:"ATO 2 · FIXAÇÃO · CIMENTLESS · QUAL HASTE", titulo:"Se não cimentar, qual haste?",
  fig:{ img:"5.3_colar_x_sem_colar_revisao.png", credito:"Revisão: haste com colar × sem colar · Kelly 2024 · AJRR · PMID 38323976" }, bullets:[
  {t:"Haste **com colar** — sem colar: fratura periprotética ~HR 7,8~", f:"Kelly 2024 · J Arthroplasty · AJRR · PMID 38323976"},
  {t:"Geometria **gradual-taper** — em cunha: ~HR 2,9–3,0~", f:"Kelly 2024 · J Arthroplasty · PMID 38323976"},
  {t:"Cimentless com colar **equipara-se** à cimentada polished taper-slip", f:"Lamb 2025 · JBJS · 809.832 ATQs · PMID 39874379"} ]});
topico({ id:"S25", eyebrow:"ATO 2 · PAR TRIBOLÓGICO · POLIETILENO RETICULADO", titulo:"Polietileno reticulado muda o resultado?", bullets:[
  {t:"Reticulado × convencional em 16 anos — revisão ~6,2% × 11,7%~ (razão de risco 3,02 aos 9 anos)", f:"de Steiger 2018 · AOANJRR · JBJS · PMID 30063590"},
  {t:"Desgaste — **20 anos sem nenhuma revisão por desgaste** · ~0,02 mm/ano~", f:"Wright 2024 · Mayo · 690 ATQs · PMID 38964487"},
  {t:"**Pergunta encerrada** — o convencional saiu de uso; nenhum registro moderno compara"} ]});
topico({ id:"S26", eyebrow:"ATO 2 · PAR TRIBOLÓGICO · CABEÇA", titulo:"Que cabeça: cerâmica ou metal? E por que 36 mm em cerâmica?",
  fig:{ img:"4.4_cabeca_bearing_sobrevida.png", credito:"Sobrevida por par tribológico da cabeça (cerâmica × metal)" }, bullets:[
  {t:"**< 55 anos** — cerâmica-polietileno ~HR 0,73~ contra metal-polietileno", f:"Reddy 2025 · J Arthroplasty · AJRR · 101.313 ATQs · PMID 40939940"},
  {t:"**≥ 55 anos** — cerâmica × metal sobre reticulado ~HR 1,0~ — sem diferença", f:"Pakarinen 2024 · J Arthroplasty · NARA · 158.044 ATQs · PMID 39173975"},
  {t:"Corrosão (ARMD) ≥ 36 mm no **cobalto-cromo** — Accolade I ~HR 8,3~ · M/L Taper ~HR 14,4~", f:"de Steiger 2020 · AOANJRR · PMID 32345846"} ]});
// ATO 3
topico({ id:"S27", eyebrow:"ATO 3 · SOBREVIDA", titulo:"Quanto dura a artroplastia moderna — dado medido ou projeção?", bullets:[
  {t:"**~93,6%~** sem revisão aos **20 anos** (8 registros · 1.899.034 ATQs)", f:"Pentland 2026 · The Lancet · PMID 41763743"},
  {t:"25 anos ~92,8%~ · 30 anos ~92,1%~ — **projeção por modelo**, não seguimento", f:"Pentland 2026 · The Lancet · PMID 41763743"},
  {t:"Dado medido ≠ projeção — citar sempre com a distinção"} ]});
// S28 SÍNTESE
(function () { const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText("ATO 3 · SÍNTESE", { x: 0.62, y: 0.40, w: 12.1, h: 0.34, color: TEALB, bold: true, fontSize: 14, charSpacing: 2.5, fontFace: BF, margin: 0 });
  sl.addText("O que muda o resultado", { x: 0.58, y: 0.76, w: 12.1, h: 0.90, color: INK, bold: true, fontSize: 34, fontFace: HF, valign: "top", margin: 0 });
  sl.addText([{text:"Tese — ",options:{bold:true,color:R_VERDICT,fontSize:18,fontFace:BF}},{text:"a tecnologia define a precisão, mas alterar o resultado depende de respeitar a evidência que a literatura fornece.",options:{italic:true,color:INK,fontSize:18,fontFace:BF}}],markAnim({shape:p.ShapeType.roundRect,rectRadius:0.06,fill:{color:R_FILL},line:{color:R_LINE,width:2.0},shadow:shadow(),x:0.58,y:1.72,w:12.15,h:0.72,align:"left",valign:"middle",margin:[4,16,4,16]}));
  const linhas=[["Otimização clínica","descolonizar · glicemia do dia · detectar anemia · cessação de tabagismo","pele OR 0,43 · cessação 52→18%"],["Imagem","RX com dupla escala + template (manual ou digital); 3D só anatomia atípica","manual ≥ digital · erro 12,5% → 2,1%"],["Execução","tecnologia não muda função; sinal observacional em luxação/infecção","SMD 0,01 · HR 0,947"],["Alvo do componente","funcional na coluna rígida; CSI + anteversão + DM","OHS 42 × 40 (P = 0,003)"],["Construto/via","DM no risco (inclui fratura do colo) · 36 mm em cerâmica · reparo capsular","36 mm 0,46% × 32 mm 0,68% · RR ≈ 8"],["Ordem quadril-coluna","a fusão é o risco; a ordem não muda resultado","luxação 7× (fusão)"]];
  const y0=2.66,rowH=0.66,colX=[0.62,3.10,8.90],colW=[2.42,5.72,3.68];
  ["DECISÃO","CONDUTA","NÚMERO-CHAVE"].forEach((h,i)=>sl.addText(h,{x:colX[i],y:y0,w:colW[i],h:0.34,color:TEALB,bold:true,fontSize:12,charSpacing:1.2,fontFace:BF,margin:0}));
  linhas.forEach((row,i)=>{ const y=y0+0.38+i*rowH; sl.addShape(p.ShapeType.rect,{x:0.60,y:y-0.04,w:12.15,h:rowH-0.04,fill:{color:i%2?CARD:CARD2},line:{type:"none"}}); sl.addText(row[0],{x:colX[0],y,w:colW[0],h:rowH-0.10,color:INK,bold:true,fontSize:12.5,fontFace:BF,valign:"middle",margin:0}); sl.addText(row[1],{x:colX[1],y,w:colW[1],h:rowH-0.10,color:BODY,fontSize:12.5,fontFace:BF,valign:"middle",margin:0}); sl.addText(row[2],{x:colX[2],y,w:colW[2],h:rowH-0.10,color:R_VERDICT,bold:true,fontSize:12.5,fontFace:BF,valign:"middle",margin:0}); });
})();

const OUT = path.join(__dirname, "deck_completo.pptx");
p.writeFile({ fileName: OUT }).then(() => console.log("OK ->", OUT, "|", animSeq, "blocos | 28 slides | 6 figuras + QR")).catch((e) => { console.error(e); process.exit(1); });
