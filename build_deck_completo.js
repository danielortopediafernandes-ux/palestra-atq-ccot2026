// ============================================================================
// DECK COMPLETO — Palestra ATQ · XVI CCOT 2026 · 21/08 · 15:20
//   28 slides (S1–S28) traduzidos do CAPITULO.md (fonte da verdade).
//   Padrão canônico Dr. Daniel — refinado 15–19/08:
//     · TÍTULO = pergunta   · TAGLINE (conclusão) surge por último
//     · Cada afirmação com a SUA referência JUNTO (autor·ano·PMID)
//     · Linguagem científica formal (Regra Inviolável #9)
//     · "Slide é de graça" — dividido sempre que 2 ideias distintas
//     · Identidade escura CCOT · paleta oficial 33414b/107368/fff
//   Ordem: Abertura (S1–S4) · Ato 1 (S5–S17) · Ato 2 (S18–S26) · Ato 3 (S27–S28)
// ============================================================================
const path = require("path");
const pptxgen = require("pptxgenjs");

// ---- Paleta oficial CCOT (escura) ----
const BG = "33414B", CARD = "3E4E5A", CARD2 = "46586A", COND = "2B3841", PANEL = "F4F6F7";
const TEAL = "107368", TEALB = "35B3A3";
const INK = "FFFFFF", BODY = "D6DEE4", MUT = "9FABB6", REF = "8CA0AC";
const HF = "Cambria", BF = "Calibri";
const FIGDIR = path.join(__dirname, "_figuras");

const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 in

// ---- Helpers de layout ----
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

// bullet = { t: "afirmação (com **/~ )", f: "Autor ANO · Revista · N · PMID XXXX" }
function bullet(sl, b, x, y, w) {
  const runs = [{ text: "▸  ", options: { color: TEAL, bold: true, fontSize: 20, fontFace: BF } }, ...parseRuns(b.t, BODY, 20)];
  if (b.f) runs.push({ text: "\n      " + b.f, options: { color: REF, italic: true, fontSize: 11.5, fontFace: BF } });
  sl.addText(runs, markAnim({ x, y, w, h: 0.94, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.04 }));
}

function condutaBand(sl, txt, y, w) {
  sl.addText([{ text: "Conduta:  ", options: { bold: true, color: TEALB, fontSize: 19, fontFace: BF } }, ...parseRuns(txt, INK, 19)],
    markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.05, fill: { color: COND }, line: { color: TEAL, width: 1.25 }, shadow: shadow(),
      x: 0.6, y, w, h: 0.72, align: "left", valign: "middle", margin: [5, 16, 5, 16], lineSpacingMultiple: 1.02 }));
}

// TAGLINE (conclusão) — surge por último; posição sob o título mas animação = última
function taglineBand(sl, txt) {
  sl.addText(parseRuns(txt, INK, 16),
    markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: TEAL }, line: { type: "none" }, shadow: shadow(),
      x: 0.58, y: 1.66, w: 12.15, h: 0.60, italic: true, align: "left", valign: "middle", margin: [4, 14, 4, 14], lineSpacingMultiple: 1.05 }));
}

// ---- Helper genérico de slide-decisão ----
function topico(cfg) {
  const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText(cfg.eyebrow, { x: 0.62, y: 0.40, w: 12.1, h: 0.34, color: TEALB, bold: true, fontSize: 14, charSpacing: 1.5, fontFace: BF, margin: 0 });
  sl.addText(cfg.titulo, { x: 0.58, y: 0.76, w: 12.1, h: 0.90, color: INK, bold: true, fontSize: cfg.tituloSize || 30, fontFace: HF, valign: "top", margin: 0, lineSpacingMultiple: 1.02 });
  const bx = 0.7, bw = cfg.fig ? 7.35 : 12.0, by0 = cfg.tagline ? 2.48 : 2.05;
  let y = by0;
  for (const b of cfg.bullets) { bullet(sl, b, bx, y, bw); y += 0.99; }
  if (cfg.tagline) taglineBand(sl, cfg.tagline);
  if (cfg.conduta) condutaBand(sl, cfg.conduta, cfg.condY || 6.30, cfg.fig ? 7.55 : 12.1);
}

// ============================================================================
// S1 · CAPA — somente o tema (Dr. 18/08)
// ============================================================================
(function () {
  const sl = p.addSlide(); bgDark(sl); topbar(sl);
  sl.addText("XVI CONGRESSO CATARINENSE DE ORTOPEDIA E TRAUMATOLOGIA",
    { x: 0.62, y: 0.72, w: 12.1, h: 0.40, color: TEALB, bold: true, fontSize: 14, charSpacing: 2.5, fontFace: BF, margin: 0 });
  sl.addText("Planejamento pré-operatório em artroplastia total do quadril",
    { x: 0.58, y: 2.60, w: 12.15, h: 1.90, color: INK, bold: true, fontSize: 42, fontFace: HF, valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  sl.addText("o que realmente muda o resultado",
    { x: 0.62, y: 4.55, w: 12.10, h: 0.60, color: TEALB, italic: true, bold: true, fontSize: 26, fontFace: BF, margin: 0 });
  sl.addShape(p.ShapeType.line, { x: 0.64, y: 5.62, w: 3.0, h: 0, line: { color: TEAL, width: 2.5 } });
  sl.addText("Dr. Daniel Araújo Fernandes",
    { x: 0.62, y: 5.76, w: 9, h: 0.4, color: INK, bold: true, fontSize: 20, fontFace: BF, margin: 0 });
  sl.addText("Florianópolis · 21 de agosto de 2026",
    { x: 0.62, y: 6.20, w: 9, h: 0.36, color: BODY, fontSize: 15, fontFace: BF, margin: 0 });
})();

// ============================================================================
// S2 · CONFLITO DE INTERESSE
// ============================================================================
(function () {
  const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText("DECLARAÇÃO", { x: 0.62, y: 0.72, w: 12.1, h: 0.34, color: TEALB, bold: true, fontSize: 14, charSpacing: 2.5, fontFace: BF, margin: 0 });
  sl.addText("Conflito de interesse",
    { x: 0.58, y: 1.15, w: 12.1, h: 0.90, color: INK, bold: true, fontSize: 38, fontFace: HF, valign: "top", margin: 0 });
  sl.addText("Sem conflito de interesse relacionado ao tema desta apresentação.",
    { shape: p.ShapeType.roundRect, rectRadius: 0.08, fill: { color: CARD }, line: { type: "none" }, shadow: shadow(),
      x: 0.62, y: 3.30, w: 12.09, h: 1.60, color: INK, fontSize: 24, fontFace: BF, italic: true, align: "center", valign: "middle", margin: 0 });
})();

// ============================================================================
// S3 · EQUIPE — Programa de Especialização em Cirurgia do Quadril
// ============================================================================
(function () {
  const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText("APRESENTAÇÃO", { x: 0.62, y: 0.72, w: 12.1, h: 0.34, color: TEALB, bold: true, fontSize: 14, charSpacing: 2.5, fontFace: BF, margin: 0 });
  sl.addText("Programa de Especialização em Cirurgia do Quadril",
    { x: 0.58, y: 1.10, w: 12.1, h: 1.00, color: INK, bold: true, fontSize: 30, fontFace: HF, valign: "top", margin: 0, lineSpacingMultiple: 1.02 });
  const nomes = ["Daniel Araujo", "Marcos Contreras", "Douglas Ouriques", "Renan Matineli", "Marco Galeazi"];
  const cy = 3.25, cw = 2.36, ch = 1.10, gap = 0.08;
  nomes.forEach((nm, i) => {
    const x = 0.62 + i * (cw + gap);
    sl.addText(nm, { shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: CARD }, line: { type: "none" }, shadow: shadow(),
      x, y: cy, w: cw, h: ch, color: INK, bold: true, fontSize: 16, fontFace: BF, align: "center", valign: "middle", margin: 0 });
  });
})();

// ============================================================================
// S4 · TESE — dois planos de medida
// ============================================================================
(function () {
  const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText("CONCEITO FUNDADOR", { x: 0.62, y: 0.40, w: 12.1, h: 0.34, color: TEALB, bold: true, fontSize: 14, charSpacing: 2.5, fontFace: BF, margin: 0 });
  sl.addText("A dissociação entre acurácia e desfecho clínico",
    { x: 0.58, y: 0.76, w: 12.1, h: 1.05, color: INK, bold: true, fontSize: 32, fontFace: HF, valign: "top", margin: 0, lineSpacingMultiple: 1.02 });

  const cy = 2.15, cw = 5.86, ch = 2.10;
  sl.addText([
    { text: "ALVO TÉCNICO\n", options: { bold: true, color: INK, fontSize: 22, fontFace: HF } },
    { text: "o que o cirurgião afere\n", options: { color: BODY, fontSize: 15, fontFace: BF, italic: true } },
    { text: "posicionamento e dimensionamento dos componentes", options: { color: BODY, fontSize: 15, fontFace: BF } }],
    { shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: CARD }, line: { type: "none" }, shadow: shadow(),
      x: 0.60, y: cy, w: cw, h: ch, valign: "middle", align: "left", margin: [10, 18, 10, 18], lineSpacingMultiple: 1.12 });
  sl.addText([
    { text: "DESFECHO CLÍNICO\n", options: { bold: true, color: INK, fontSize: 22, fontFace: HF } },
    { text: "o que o paciente experimenta\n", options: { color: INK, fontSize: 15, fontFace: BF, italic: true } },
    { text: "revisão · luxação · infecção · função", options: { color: INK, fontSize: 15, fontFace: BF } }],
    { shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: TEAL }, line: { type: "none" }, shadow: shadow(),
      x: 6.87, y: cy, w: cw, h: ch, valign: "middle", align: "left", margin: [10, 18, 10, 18], lineSpacingMultiple: 1.12 });

  sl.addText([
    { text: "Tese — ", options: { bold: true, color: TEALB, fontSize: 20, fontFace: BF } },
    { text: "a tecnologia define a precisão, mas alterar o desfecho depende de respeitar a evidência que a literatura fornece.",
      options: { italic: true, color: INK, fontSize: 20, fontFace: BF } }],
    markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: COND }, line: { color: TEAL, width: 1.25 }, shadow: shadow(),
      x: 0.60, y: 4.65, w: 12.13, h: 1.30, align: "left", valign: "middle", margin: [8, 18, 8, 18], lineSpacingMultiple: 1.10 }));
})();

// ============================================================================
// ATO 1 — TECNOLOGIAS E ALVO DE POSICIONAMENTO (S5–S17)
// ============================================================================

// S5 · Template manual ou digital?
topico({
  eyebrow: "ATO 1 · IMAGEM · TEMPLATE",
  titulo: "Template manual ou digital: qual altera o resultado?",
  tituloSize: 28,
  tagline: "Nenhum dos dois métodos é superior em acurácia.",
  bullets: [
    { t: "Haste — template manual superou o software: acerto ~75% × 60%~", f: "Petretta 2015 · CORR · 5 observadores · 52 ATQs · PMID 25910779" },
    { t: "Haste — método digital superou o manual: acerto ~94% × 84%~", f: "Pongkunakorn 2021 · J Arthroplasty · 113 quadris · PMID 33583670" },
    { t: "Componente acetabular — **nenhum método foi superior**", f: "Petretta 2015 (p = 0,05) · Pongkunakorn 2021 (p = 0,48)" },
    { t: "**Nenhum estudo comparou desfecho clínico** entre os métodos — apenas acurácia", f: "busca 2015–2026, sem comparação de desfecho" },
  ],
  conduta: "template em **toda artroplastia** — manual ou digital; a calibração da radiografia é o determinante.",
});

// S6 · Calibração
topico({
  eyebrow: "ATO 1 · IMAGEM · CALIBRAÇÃO",
  titulo: "A calibração com marcador único é suficiente?",
  tituloSize: 30,
  tagline: "A calibração não altera o planejamento do componente acetabular; altera o da haste — sobretudo no obeso e no sexo feminino.",
  bullets: [
    { t: "Marcador único: erro ~12,5%~ (até 23,3%) · dupla escala ~2,1%~", f: "Ries 2022 · Arch Orthop Trauma Surg · 100 pac · PMID 35099608" },
    { t: "Acerto exato da haste — dupla escala ~54% × 32%~ (p = 0,04) · componente acetabular sem diferença", f: "Maatough 2025 · Cureus · PMID 40470419" },
    { t: "Erro de calibração **> 1,5%** já altera o tamanho planejado", f: "Boese 2023 · Int Orthop · phantom · PMID 36881153" },
    { t: "Magnificação real varia com IMC e sexo — obeso ~121,8% × 119,9%~ (p < 0,001)", f: "Ashkenazi 2023 · SICOT-J · PMID 37195151" },
  ],
  conduta: "**dupla escala** sobretudo no paciente de risco (obeso, sexo feminino); não usar fator de magnificação fixo.",
});

// S7 · 3D por TC
topico({
  eyebrow: "ATO 1 · IMAGEM · TRIDIMENSIONAL",
  titulo: "O planejamento 3D por tomografia altera o resultado?",
  tituloSize: 30,
  tagline: "Não na rotina — melhora a acurácia do componente acetabular, sem alterar o desfecho relatado pelo paciente.",
  bullets: [
    { t: "Acerto do componente acetabular — 3D ~96,9% × 87,1%~ (2D)", f: "Parisi 2024 · PMID 39518705 · Bishi 2022 · meta · PMID 35076413" },
    { t: "Desfecho relatado pelo paciente (PROM) — **sem diferença** (ensaio randomizado)", f: "Thomas 2022 · RCT · PMID 36183111" },
  ],
  conduta: "**templating 2D** basta na artrose de rotina.",
});

// S8 · Modelo 3D impresso
topico({
  eyebrow: "ATO 1 · IMAGEM · IMPRESSÃO 3D",
  titulo: "O modelo 3D impresso altera o planejamento na anatomia complexa?",
  tituloSize: 28,
  tagline: "Sim — na anatomia atípica (displasia/Crowe, deformidade); reservado a esses casos, não à rotina.",
  bullets: [
    { t: "Ensaio no modelo corresponde à cirurgia — componente acetabular ~ICC 0,93~ · defeito ósseo P = 0,97", f: "Zhang 2021 · Orthop Surg · piloto · 17 pac · PMID 34898037" },
    { t: "Permite ensaiar redução, defeito ósseo, tamanho e posição antes da mesa", f: "Godoy-Monzón 2025 · Acta Ortop Mex · 22 pac · PMID 40925848" },
  ],
  conduta: "modelo impresso na **anatomia atípica** (displasia/Crowe, deformidade); não na rotina.",
});

// S9 · IA
topico({
  eyebrow: "ATO 1 · IMAGEM · INTELIGÊNCIA ARTIFICIAL",
  titulo: "O planejamento assistido por IA altera o resultado?",
  tituloSize: 30,
  tagline: "Ainda não — a acurácia melhora, mas sem validação de desfecho e restrita a um único país.",
  bullets: [
    { t: "Acerto do tamanho — componente acetabular ~OR 3,85~ (contra 2D)", f: "Altahtamouni 2026 · meta · PMID 41727957" },
    { t: "Validação — **1.371 pacientes**, um único país, nível III", f: "Altahtamouni 2026 · meta · PMID 41727957" },
    { t: "Função — ~+0,73~ ponto no HHS: **abaixo do MCID** (imperceptível ao paciente)", f: "Taghavi 2026 · Arthroplasty · meta · PMID 42547897" },
  ],
  conduta: "**não adotar** sem validação na população local; acompanhar a literatura.",
});

// S10 · Robótica — função
topico({
  eyebrow: "ATO 1 · EXECUÇÃO · ROBÓTICA · FUNÇÃO",
  titulo: "A assistência robótica altera a função?",
  tituloSize: 32,
  tagline: "Não — a precisão triplica, mas a função permanece equivalente ao método convencional.",
  bullets: [
    { t: "Erro de anteversão — ~2,6° × 8,9°~ (TC pré/pós, ensaio randomizado)", f: "Fontalis 2024 · RCT · 60 pac · PMID 38555946" },
    { t: "Função (PROM) — **SMD 0,01** (metanálise de 8 ensaios randomizados)", f: "Ruangsomboon 2024 · meta 8 RCT · 1.014 pac · PMID 38888718" },
  ],
  conduta: "**não indicar** a robótica para melhorar a função na rotina.",
});

// S11 · Robótica — demais desfechos
topico({
  eyebrow: "ATO 1 · EXECUÇÃO · ROBÓTICA · DEMAIS DESFECHOS",
  titulo: "A robótica altera revisão, luxação e infecção?",
  tituloSize: 32,
  tagline: "Só a função tem RCT; revisão sem diferença, internação 0,49 dia menor, sinais observacionais em luxação e infecção.",
  bullets: [
    { t: "Internação — ~−0,49 dia~ (~12 h) — coorte pareada, significância marginal (P = 0,044)", f: "Poyser 2026 · coorte pareada · PMID 41519489" },
    { t: "Revisão — **HR 0,947** (registro nacional) · sem diferença", f: "Farhan-Alanie 2025 · NJR · PMID 41442047" },
    { t: "Luxação ~OR 0,57~ · infecção ~OR 0,83~ — sinais observacionais", f: "Giannakis 2026 · Premier · PMID 42093134 · Zhang 2026 · meta 1,83 mi · PMID 42009981" },
  ],
  conduta: "**não indicar** por esses desfechos; acompanhar o sinal.",
});

// S12 · Navegação
topico({
  eyebrow: "ATO 1 · EXECUÇÃO · NAVEGAÇÃO",
  titulo: "A navegação intraoperatória altera o desfecho?",
  tituloSize: 30,
  tagline: "Melhora o posicionamento intraoperatório; o benefício clínico não se confirma nas coortes pareadas recentes.",
  bullets: [
    { t: "Componente acetabular na zona-alvo — até ~83%~ com navegação; anteversão (P = 0,08) e inclinação (P = 0,94) finais **sem diferença**", f: "Braun 2025 · J Arthroplasty · 150 pac · PMID 40588106" },
    { t: "Luxação — ~0,3% × 1,2%~ convencional, **não significativa** (o maior fator foi o tabagismo, OR 6,31)", f: "Alqazzaz 2026 · J Arthroplasty · coorte 3.243 ATQ · PMID 42103591" },
    { t: "Obeso mórbido — navegação **não reduziu** complicações, tromboembolismo nem revisão", f: "Latifi 2026 · J Robot Surg · PMID 42474881 · Latifi 2026 · Int Orthop · PMID 42118304" },
  ],
  conduta: "**não adotar por desfecho** — o sinal de registro não se confirma em coortes pareadas.",
});

// S13 · PSI
topico({
  eyebrow: "ATO 1 · EXECUÇÃO · GUIAS PERSONALIZADOS (PSI)",
  titulo: "Os guias personalizados alteram o resultado?",
  tituloSize: 30,
  tagline: "Um RCT pequeno mostra melhor acurácia de anteversão; sem evidência de desfecho clínico no quadril.",
  bullets: [
    { t: "Erro de anteversão femoral **significativamente menor** com PSI (p < 0,05) · n = 60", f: "Zheng 2023 · Biomed Eng Online · RCT · PMID 37705017" },
    { t: "Evidência escassa no quadril — **superioridade clínica não demonstrada**", f: "Gauci 2022 · revisão · nível V · PMID 34838754" },
  ],
  conduta: "**não adotar na rotina** — ganho de acurácia, sem prova de desfecho.",
});

// S14 · Lewinnek
topico({
  eyebrow: "ATO 1 · ALVO · LEWINNEK",
  titulo: "A zona de segurança de Lewinnek é suficiente?",
  tituloSize: 32,
  tagline: "Não — a maioria das luxações ocorre com o componente dentro da zona; o alvo precisa ser individualizado.",
  bullets: [
    { t: "**58%** das luxações com o componente acetabular **dentro** da zona (9.784 ATQs)", f: "Abdel 2016 · CORR · PMID 26150264" },
    { t: "Confirmação independente — ~55,8%~; a anteversão **femoral** correta em só ~38,2%~ (o que mais erramos não é o que mais medimos)", f: "Hernández 2021 · J Clin Orthop Trauma · 2.489 ATQs · PMID 34434695" },
  ],
  conduta: "o ângulo estático é o **piso**, não o alvo suficiente — individualizar o alvo.",
});

// S15 · Rastreio espinopélvico
topico({
  eyebrow: "ATO 1 · ALVO · ESPINOPÉLVICO · RASTREIO",
  titulo: "Em quem indicar o rastreio radiográfico espinopélvico?",
  tituloSize: 28,
  tagline: "A coluna rígida, desbalanceada ou artrodesada — identificada por três critérios objetivos na consulta.",
  bullets: [
    { t: "A pelve **roda ao sentar** e muda a orientação funcional do componente — a zona estática é insuficiente" },
    { t: "Rastreio: ~ΔSS < 10°~ (coluna rígida) · ~PI − LL > 10°~ (flatback) · **artrodese > 3 níveis**", f: "Vigdorchik 2021 · Bone Joint J · Prêmio Otto Aufranc · PMID 34192913" },
    { t: "Quadris dentro de Lewinnek porém fora da zona funcional — ~14,2%~", f: "Tezuka & Dorr 2019 · J Arthroplasty · PMID 30454867" },
  ],
  conduta: "presente **qualquer critério** → radiografia lateral em pé × sentado.",
});

// S16 · Classificação Hip-Spine
topico({
  eyebrow: "ATO 1 · ALVO · CLASSIFICAÇÃO QUADRIL-COLUNA",
  titulo: "A classificação Hip-Spine: como estratificar o risco?",
  tituloSize: 30,
  tagline: "Quatro grupos por alinhamento × mobilidade; o 2B (flatback rígido) concentra o risco e recebe dupla mobilidade.",
  bullets: [
    { t: "Dois eixos — **alinhamento** (PI − LL) e **mobilidade** (ΔSS em pé × sentado)" },
    { t: "**Grupo 1** — alinhado (PI − LL ≤ 10°): ~1A~ móvel · ~1B~ rígido", f: "Vigdorchik 2021 · Bone Joint J · PMID 34192913" },
    { t: "**Grupo 2** — flatback (PI − LL > 10°): ~2A~ móvel · **~2B~ rígido — maior risco**", f: "Vigdorchik 2021 · 2.081 ATQ · PMID 34192913" },
  ],
  conduta: "dupla mobilidade em **todo 2B** e em **fusão > 3 níveis** → luxação ~0,8%~ em 5 anos.",
});

// S17 · O que a avaliação muda na cirurgia
topico({
  eyebrow: "ATO 1 · ALVO · O QUE MUDA NA CIRURGIA",
  titulo: "O que a avaliação espinopélvica muda na cirurgia?",
  tituloSize: 30,
  tagline: "Modifica alvo, anteversão e construto — o ganho demonstrado é de função; a proteção contra luxação vem do construto.",
  bullets: [
    { t: "Alvo (CSI) — balanceada ~205–245°~ · desbalanceada ~215–235°~ → função **OHS 42 × 40** (P = 0,003)", f: "Verhaegen 2025 · Hip Int · multicêntrico · PMID 39865697" },
    { t: "Anteversão — **aumentar no rígido** (~26° × 22°~)", f: "Verhaegen 2025 · Hip Int · PMID 39865697" },
    { t: "Construto — dupla mobilidade nos grupos de risco → luxação ~0,8%~ em 5 anos", f: "Vigdorchik 2021 · Bone Joint J · PMID 34192913" },
    { t: "Diferença de luxação dentro × fora do alvo (0,4% × 1,7%) — **não significativa** (P = 0,178)", f: "Verhaegen 2025 · Hip Int · PMID 39865697" },
  ],
  conduta: "na coluna rígida — alvo CSI, anteversão aumentada, dupla mobilidade conforme o grupo.",
});

// ============================================================================
// ATO 2 — DECISÕES TÉCNICAS: INSTABILIDADE → FIXAÇÃO → PAR TRIBOLÓGICO (S18–S26)
// ============================================================================

// S18 · Dupla mobilidade
topico({
  eyebrow: "ATO 2 · INSTABILIDADE · DUPLA MOBILIDADE",
  titulo: "A articulação de dupla mobilidade altera o resultado — e em quem?",
  tituloSize: 28,
  tagline: "Sim, no grupo de risco — luxação 1,3% × 4,2% na fratura do colo (ensaio randomizado); indicação dirigida, não universal.",
  bullets: [
    { t: "Fratura do colo ≥ 65 anos — luxação ~1,3% × 4,2%~ (aHR 0,27) — **primeiro RCT**", f: "Hailer 2026 · Lancet · Duality · 1.600 pac · PMID 42392114" },
    { t: "Eletivo — benefício nos grupos de risco (coluna rígida/artrodese · revisão)" },
    { t: "Cabeça grande **não reproduz de forma consistente** o efeito da DM — evidência discordante (maior série, ajustada pelo componente, favorece a DM)", f: "Ibrahim 2025 · JBJS Rev · 133.474 quadris · PMID 41379986 · contraponto: Hoskins 2022 · PMID 35438011 · Sephton 2025 · PMID 39128780" },
    { t: "**Por que a maior metanálise pesa mais → slide seguinte**" },
  ],
  conduta: "indicação **dirigida ao risco** — coluna rígida/fusão, revisão, fratura do colo do idoso; não universal.",
});

// S19 · Licença didática — como ler estudos que discordam
topico({
  eyebrow: "ATO 2 · LICENÇA METODOLÓGICA",
  titulo: "Como ler estudos que discordam: amostra e ajuste por confundidor",
  tituloSize: 28,
  tagline: "A maior metanálise, ajustada pelo tamanho do componente, indica que a proteção vem da DM em si — não do diâmetro da cabeça.",
  bullets: [
    { t: "Quatro metanálises, mesma pergunta, resultados divergentes — a conclusão depende de **como** cada uma foi construída" },
    { t: "**Tamanho da amostra** — maior série ~133.474~ quadris × ~12.511~ × ~5.004~", f: "Ibrahim 2025 · PMID 41379986 (maior) · Hoskins 2022 · PMID 35438011 · Sephton 2025 · PMID 39128780" },
    { t: "**Meta-regressão** ajustou pelo tamanho do componente — moderador **não significativo** (OR 1,20; P = 0,12) → benefício da DM independe do diâmetro", f: "Ibrahim 2025 · JBJS Rev · PMID 41379986" },
    { t: "Sem ensaio randomizado dedicado — o rótulo correto é **favorável, não provado**" },
  ],
  conduta: "ler um artigo é **pesar amostra, ajuste e desenho** — não apenas o resultado.",
});

// S20 · Diâmetro da cabeça
topico({
  eyebrow: "ATO 2 · INSTABILIDADE · DIÂMETRO DA CABEÇA",
  titulo: "O diâmetro da cabeça femoral altera a luxação?",
  tituloSize: 30,
  tagline: "Sim — 36 mm quando o acetábulo comporta: revisão por luxação 0,46% × 0,68%, com teto do benefício em 36 mm.",
  bullets: [
    { t: "Revisão por luxação — ~1,4%~ (22–28 mm) → ~0,9%~ (32 mm) → ~0,6%~ (36 mm)", f: "van Steenbergen 2023 · LROI · 269.280 ATQs · PMID 36935558" },
    { t: "Confirmação — 36 mm ~0,46%~ × 32 mm ~0,68%~ (319.531 ATQs)", f: "Bender 2025 · J Arthroplasty · AJRR · PMID 40015384" },
    { t: "**Teto em 36** — com ≥ 40 mm a luxação **não cai mais**; revisão e infecção sobem", f: "Bender 2025 · J Arthroplasty · PMID 40015384" },
  ],
  conduta: "**36 mm quando o componente acetabular comporta** · piso 32 mm.",
});

// S21 · Reparo capsular
topico({
  eyebrow: "ATO 2 · INSTABILIDADE · TÉCNICA · REPARO CAPSULAR",
  titulo: "O reparo capsular na via posterior altera o resultado?",
  tituloSize: 30,
  tagline: "Sim — sem reparo, risco de luxação aproximadamente 8 vezes maior; reparo capsular sistemático.",
  bullets: [
    { t: "Luxação sem reparo capsular — ~RR ≈ 8~ (IC 4–17)", f: "Kwon 2006 · CORR · meta 5 estudos · PMID 16741471" },
    { t: "Com reparo — via posterior equivale às demais vias (~1,01% × 0,70% × 0,43%~)", f: "Kwon 2006 · CORR · PMID 16741471" },
    { t: "Mecanismo medido — torque para luxar ~9,12 × 2,73 N·m~", f: "Cherry 2025 · Int Orthop · cadavérico · PMID 40715845" },
  ],
  conduta: "**reparo capsular sistemático** em toda via posterior.",
});

// S22 · Restrições pós-operatórias
topico({
  eyebrow: "ATO 2 · PÓS-OPERATÓRIO · RESTRIÇÕES",
  titulo: "As restrições pós-operatórias alteram o resultado?",
  tituloSize: 30,
  tagline: "Não — com reparo capsular, não reduzem a luxação (0,88%) e pioram a função precoce; sem restrições de rotina.",
  bullets: [
    { t: "Ensaio randomizado, 1.133 pacientes — luxação ~0,88%~, sem diferença restrito × livre", f: "Yadav 2026 · RCT · J Arthroplasty · PMID 42055222" },
    { t: "Função (HOOS JR) — **melhor no grupo livre** (6 semanas e 3–6 meses)", f: "Yadav 2026 · RCT · J Arthroplasty · PMID 42055222" },
    { t: "GRADE, 8.835 pacientes — evidência **não sustenta** restrições de rotina", f: "Korfitsen 2023 · Acta Orthop · PMID 37039064" },
  ],
  conduta: "com reparo capsular, **sem restrições rígidas de rotina**; reservar precauções ao risco individualizado.",
});

// S23 · Cimentar em quem
topico({
  eyebrow: "ATO 2 · FIXAÇÃO · CIMENTAR EM QUEM",
  titulo: "A fixação femoral altera o resultado — em quem cimentar?",
  tituloSize: 28,
  tagline: "Cimentar mulher ≥ 70,5 anos, fratura do colo e osso de má qualidade; o risco do cimento é agudo (dia 0–1), não tardio.",
  bullets: [
    { t: "Cimentar — mulher **≥ 70,5 anos** · osso de má qualidade", f: "Ladurner 2023 · Bone Joint J · Registro Suíço · 86.423 ATQs · PMID 37595764 · Kim 2024 · PMID 39126454" },
    { t: "Fratura do colo (nível 1) — fratura periprotética ~OR 0,22~ · mortalidade ~RR 0,86~", f: "Malki 2026 · meta 16 RCTs · PMID 42259040 · Lewis 2022 · Cochrane · PMID 35156194" },
    { t: "Risco do cimento — **agudo, dia 0–1** (diferença absoluta ~0,4%~) · embolia RR 3,56; após 7 dias sem diferença", f: "Viberg 2022 · Bone Joint J · PMID 34969285 · Lewis 2022 · Cochrane · PMID 35156194" },
    { t: "Contrapartida no eletivo — menos revisão × mais mortalidade global (~OR 0,73~)", f: "Alagha 2025 · J Arthroplasty · 60.064 pareados · PMID 39814112" },
  ],
  conduta: "decidir pelo **perfil objetivo** (mulher ≥ 70,5, osso de má qualidade, fratura do colo) — não pela impressão de \"idoso\".",
});

// S24 · Se não cimentar, qual haste
topico({
  eyebrow: "ATO 2 · FIXAÇÃO · CIMENTLESS · QUAL HASTE",
  titulo: "Se não cimentar, qual haste?",
  tituloSize: 32,
  tagline: "No paciente sem indicação de cimento, haste com colar e geometria gradual-taper — o desenho pesa mais que o cimento.",
  bullets: [
    { t: "Haste **com colar** — sem colar: fratura periprotética ~HR 7,8~", f: "Kelly 2024 · J Arthroplasty · AJRR · 266.040 hastes ≥ 65 anos · PMID 38323976" },
    { t: "Geometria **gradual-taper** — em cunha: ~HR 2,9–3,0~", f: "Kelly 2024 · J Arthroplasty · PMID 38323976" },
    { t: "Cimentless com colar **equipara-se** à cimentada polished taper-slip — o desenho pesa mais que o cimento", f: "Lamb 2025 · JBJS · 809.832 ATQs · PMID 39874379" },
  ],
  conduta: "haste **com colar + gradual-taper**; evitar em cunha sem colar no osso de risco.",
});

// S25 · Polietileno reticulado
topico({
  eyebrow: "ATO 2 · PAR TRIBOLÓGICO · POLIETILENO RETICULADO",
  titulo: "Polietileno reticulado altera o resultado?",
  tituloSize: 32,
  tagline: "Polietileno reticulado em toda artroplastia — a revisão em 16 anos cai à metade e o desgaste em 20 anos é desprezível.",
  bullets: [
    { t: "Reticulado × convencional em 16 anos — revisão ~6,2% × 11,7%~ (razão de risco 3,02 aos 9 anos)", f: "de Steiger 2018 · AOANJRR · JBJS · 199.131 × 41.171 procedimentos · PMID 30063590" },
    { t: "Desgaste no longo prazo — **20 anos sem nenhuma revisão por desgaste** · taxa ~0,02 mm/ano~", f: "Wright 2024 · Mayo · 690 ATQs · PMID 38964487" },
    { t: "**Pergunta encerrada** — o convencional saiu de uso; nenhum registro moderno mantém braço de comparação" },
  ],
  conduta: "polietileno **reticulado em toda ATQ**; o convencional não tem mais lugar.",
});

// S26 · Cabeça: cerâmica × metal, e por que 36 mm em cerâmica
topico({
  eyebrow: "ATO 2 · PAR TRIBOLÓGICO · CABEÇA",
  titulo: "Que cabeça: cerâmica ou metal? E por que 36 mm em cerâmica?",
  tituloSize: 28,
  tagline: "Cerâmica no jovem; no idoso, metal sobre reticulado é equivalente. Quando o planejamento indicar 36 mm, preferir cerâmica.",
  bullets: [
    { t: "**< 55 anos** — cerâmica-polietileno ~HR 0,73~ contra metal-polietileno · zircônio oxidado ~HR 0,72~", f: "Reddy 2025 · J Arthroplasty · AJRR · 101.313 ATQs · PMID 40939940" },
    { t: "**≥ 55 anos** — cerâmica × metal (ambos sobre reticulado) ~HR 1,0~ — sem diferença", f: "Pakarinen 2024 · J Arthroplasty · NARA · 158.044 ATQs · PMID 39173975" },
    { t: "Corrosão do cone (ARMD) nas cabeças ≥ 36 mm concentra-se no **cobalto-cromo** — Accolade I ~HR 8,3~ · M/L Taper ~HR 14,4~", f: "de Steiger 2020 · AOANJRR · PMID 32345846" },
    { t: "Desgaste do 36 mm sobre reticulado — ~0,01 mm em 14 anos~ (32 mm desgastou mais: 0,10 mm)", f: "Thoen 2025 · Bone Joint J · RCT · PMID 41173047" },
  ],
  conduta: "cerâmica no **jovem**; **36 mm em cerâmica** quando o planejamento indicar 36 mm.",
});

// ============================================================================
// ATO 3 — SÍNTESE (S27–S28)
// ============================================================================

// S27 · Sobrevida
topico({
  eyebrow: "ATO 3 · SOBREVIDA",
  titulo: "Quanto dura a artroplastia moderna — dado medido ou projeção?",
  tituloSize: 28,
  tagline: "93,6% livres de revisão em 20 anos — dado medido; os valores de 25 e 30 anos são projeção por modelo.",
  bullets: [
    { t: "**~93,6%~** sem revisão aos **20 anos** (8 registros · 1.899.034 ATQs)", f: "Pentland 2026 · Lancet · PMID 41763743" },
    { t: "25 anos ~92,8%~ · 30 anos ~92,1%~ — **projeção por modelo**, não seguimento", f: "Pentland 2026 · Lancet · PMID 41763743" },
    { t: "Dado medido ≠ projeção — citar sempre com a distinção" },
  ],
  conduta: "ao responder \"quanto dura?\", usar **93,6% em 20 anos**; 25 e 30 anos sempre com a palavra **projeção**.",
});

// S28 · Síntese — a tese fechada
(function () {
  const sl = p.addSlide(); bgDark(sl); topbar(sl); rodape(sl);
  sl.addText("ATO 3 · SÍNTESE", { x: 0.62, y: 0.40, w: 12.1, h: 0.34, color: TEALB, bold: true, fontSize: 14, charSpacing: 2.5, fontFace: BF, margin: 0 });
  sl.addText("O que altera o resultado", { x: 0.58, y: 0.76, w: 12.1, h: 0.90, color: INK, bold: true, fontSize: 34, fontFace: HF, valign: "top", margin: 0 });

  sl.addText(parseRuns("A tecnologia define a precisão, mas ~alterar o desfecho~ depende de respeitar a evidência que a literatura fornece.", INK, 18),
    markAnim({ shape: p.ShapeType.roundRect, rectRadius: 0.06, fill: { color: TEAL }, line: { type: "none" }, shadow: shadow(),
      x: 0.58, y: 1.72, w: 12.15, h: 0.62, italic: true, align: "left", valign: "middle", margin: [4, 14, 4, 14] }));

  // Quadro-síntese em 6 linhas · [decisão, conduta, número-chave]
  const linhas = [
    ["Otimização clínica",    "descolonizar · glicemia do dia · detectar anemia · cessação de tabagismo",  "pele OR 0,43 · cessação 52→18%"],
    ["Imagem",                "RX com dupla escala + template (manual ou digital); 3D só anatomia atípica", "manual ≥ digital · erro 12,5% → 2,1%"],
    ["Execução",              "tecnologia não muda função; sinal observacional em luxação/infecção",         "SMD 0,01 · HR 0,947"],
    ["Alvo do componente",    "funcional na coluna rígida; CSI + anteversão + DM",                          "OHS 42 × 40 (P = 0,003)"],
    ["Construto/via",         "DM no risco (inclui fratura do colo) · 36 mm em cerâmica · reparo capsular", "36 mm 0,46% × 32 mm 0,68% · RR ≈ 8"],
    ["Ordem quadril-coluna",  "a fusão é o risco; a ordem não muda desfecho",                                "luxação 7× (fusão)"],
  ];
  const y0 = 2.50, rowH = 0.68;
  const colX = [0.62, 3.10, 8.90], colW = [2.42, 5.72, 3.68];
  // cabeçalhos
  ["DECISÃO", "CONDUTA", "NÚMERO-CHAVE"].forEach((h, i) =>
    sl.addText(h, { x: colX[i], y: y0, w: colW[i], h: 0.36, color: TEALB, bold: true, fontSize: 12, charSpacing: 1.2, fontFace: BF, margin: 0 }));
  linhas.forEach((row, i) => {
    const y = y0 + 0.40 + i * rowH;
    sl.addShape(p.ShapeType.rect, { x: 0.60, y: y - 0.04, w: 12.15, h: rowH - 0.04, fill: { color: i % 2 ? CARD : CARD2 }, line: { type: "none" } });
    sl.addText(row[0], { x: colX[0], y, w: colW[0], h: rowH - 0.10, color: INK, bold: true, fontSize: 12.5, fontFace: BF, valign: "middle", margin: 0 });
    sl.addText(row[1], { x: colX[1], y, w: colW[1], h: rowH - 0.10, color: BODY, fontSize: 12.5, fontFace: BF, valign: "middle", margin: 0 });
    sl.addText(row[2], { x: colX[2], y, w: colW[2], h: rowH - 0.10, color: TEALB, bold: true, fontSize: 12.5, fontFace: BF, valign: "middle", margin: 0 });
  });
})();

// ============================================================================
const OUT = path.join(__dirname, "deck_completo.pptx");
p.writeFile({ fileName: OUT })
  .then(() => console.log("OK ->", OUT, "|", animSeq, "blocos anim | 28 slides"))
  .catch((e) => { console.error(e); process.exit(1); });
