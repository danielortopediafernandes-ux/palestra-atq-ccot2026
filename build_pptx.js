// Deck ATQ em PowerPoint — MESMO conteudo e MESMA identidade visual do deck.html.
// Fonte unica: deck_data.json (gerado por build_deck.py). NAO editar conteudo aqui —
// editar CAPA/DIVISORES_E_UNIDADES em build_deck.py e rodar `python3 build_deck.py` de novo.
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");

const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, "deck_data.json"), "utf8"));

// pptxgenjs/PowerPoint nao renderizam .svg embutido de forma confiavel -> rasteriza para PNG.
// Cache em _figuras/_png_cache (gerado uma vez; a fonte .svg/.png original fica intacta p/ o HTML).
const FIG_CACHE = path.join(__dirname, "_figuras", "_png_cache");
if (!fs.existsSync(FIG_CACHE)) fs.mkdirSync(FIG_CACHE, { recursive: true });
async function figPngPath(arquivoRel){
  const abs = path.join(__dirname, arquivoRel);
  if (abs.toLowerCase().endsWith(".png")) return abs;
  const out = path.join(FIG_CACHE, path.basename(arquivoRel, path.extname(arquivoRel)) + ".png");
  if (!fs.existsSync(out) || fs.statSync(abs).mtimeMs > fs.statSync(out).mtimeMs) {
    await sharp(abs, { density: 220 }).png().toFile(out);
  }
  return out;
}

const BG="33414B", CARD="3E4E5A", TEAL="107368", TEALB="35B3A3";
const INK="FFFFFF", BODY="D6DEE4", MUT="A6B2BC";
const HF="Cambria", BF="Calibri"; // fontes seguras (ver skill pptx: renderizam fiel no QA e existem no Office)

const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 in — DEVE vir antes de addSlide

function bgDark(s){ s.background = { color: BG }; }
function shadow(){ return { type:"outer", color:"000000", opacity:0.35, blur:6, offset:3, angle:90 }; } // objeto NOVO por shape

// ---- marcador de animacao: toda shape/texto que deve "aparecer ao clique" ganha
// um name unico (para o inject_anim.py achar o cNvPr depois). Ordem de push = ordem dos cliques.
let animSeq = 0;
function markAnim(opts){
  animSeq++;
  return Object.assign({}, opts, { objectName: "anim_"+animSeq });
}

function slideCapa(s){
  const sl = p.addSlide(); bgDark(sl);
  sl.addText(s.titulo.replace(/<br\s*\/?>/gi, "\n"), {
    x:0.52, y:1.45, w:9.0, h:2.05, color:INK, bold:true, fontSize:38, fontFace:HF,
    align:"left", valign:"top", margin:0, lineSpacingMultiple:1.06 });
  sl.addText(s.autor, { x:0.54, y:3.78, w:8.6, h:0.5, color:TEALB, bold:true, fontSize:25, fontFace:BF, margin:0 });
  sl.addText(s.evento, { x:0.54, y:4.29, w:8.6, h:0.5, color:BODY, fontSize:17, fontFace:BF, margin:0 });
}

function slideDivisor(s){
  const sl = p.addSlide(); bgDark(sl);
  sl.addText(s.num, { x:0.52, y:1.64, w:9.5, h:0.4, color:TEALB, bold:true, fontSize:16, charSpacing:2, fontFace:BF, margin:0 });
  sl.addText(s.titulo, { x:0.52, y:2.02, w:8.8, h:1.1, color:INK, bold:true, fontSize:32, fontFace:HF, margin:0, lineSpacingMultiple:1.04 });
  sl.addText(s.linha, { x:0.54, y:3.36, w:8.2, h:1.3, color:BODY, fontSize:16, fontFace:BF, margin:0, lineSpacingMultiple:1.15 });
}

async function slideDecisao(s){
  const sl = p.addSlide(); bgDark(sl);
  sl.addText(s.eyebrow+" · "+s.tag, { x:0.52, y:0.31, w:9.5, h:0.3, color:TEALB, bold:true, fontSize:12.5, charSpacing:1.2, fontFace:BF, margin:0 });
  sl.addText(s.titulo, { x:0.52, y:0.57, w:9.0, h:0.62, color:INK, bold:true, fontSize:23, fontFace:HF, margin:0, lineSpacingMultiple:1.03 });

  const hasFig = !!s.fig;
  const colW = hasFig ? 5.55 : 8.96;   // rows ficam mais estreitas quando há figura (2 colunas, espelha o HTML)

  let y = 1.20;
  if (s.resposta){
    sl.addText(s.resposta, markAnim({
      shape:p.ShapeType.roundRect, rectRadius:0.055, fill:{color:TEAL}, line:{type:"none"}, shadow:shadow(),
      x:0.52, y, w:colW, h:0.62, color:INK, bold:true, fontSize:14.5, fontFace:BF, align:"left", valign:"middle", margin:[4,12,4,12] }));
    y += 0.78;
  } else { y += 0.06; }

  const rowY0 = y;
  for (const r of s.rows){
    const h = hasFig ? 0.80 : 0.70;
    sl.addText([
        { text:r.rotulo+" ", options:{ bold:true, color:INK, fontSize:12.5, fontFace:BF } },
        { text:"— "+r.achado, options:{ color:BODY, fontSize:12.5, fontFace:BF } },
        { text:"\n"+r.fonte, options:{ color:MUT, italic:true, fontSize:9, fontFace:BF } },
      ], markAnim({
        shape:p.ShapeType.roundRect, rectRadius:0.045, fill:{color:CARD}, line:{type:"none"}, shadow:shadow(),
        x:0.52, y, w:colW, h, align:"left", valign:"middle", margin:[3,12,3,12], lineSpacingMultiple:1.05 }));
    y += h + 0.065;
  }

  if (hasFig){
    const png = await figPngPath(s.fig.arquivo);
    const fx = 6.30, fw = 3.35, fh = 2.40, fy = rowY0;
    sl.addImage(markAnim({ path: png, x:fx, y:fy, w:fw, h:fh, sizing:{ type:"contain", w:fw, h:fh } }));
    sl.addText(s.fig.credito, { x:fx-0.05, y:fy+fh+0.06, w:fw+0.1, h:0.5, color:MUT, italic:true, fontSize:9.5, fontFace:BF, align:"center", margin:0, lineSpacingMultiple:1.1 });
  }

  if (s.conduta){
    y = Math.max(y + 0.06, 4.86);
    sl.addText([
        { text:"Conduta: ", options:{ bold:true, color:TEALB, fontSize:12.5, fontFace:BF } },
        { text:s.conduta, options:{ color:BODY, fontSize:12.5, fontFace:BF } },
      ], markAnim({ x:0.52, y, w:8.96, h:0.9, align:"left", valign:"top", margin:0, lineSpacingMultiple:1.1 }));
  }
}

async function main(){
  for (const s of DATA){
    if (s.kind === "capa") slideCapa(s);
    else if (s.kind === "divisor") slideDivisor(s);
    else await slideDecisao(s);   // await: pode rasterizar SVG->PNG (figPngPath e assincrono)
  }
  const OUT = path.join(__dirname, "deck.pptx");
  await p.writeFile({ fileName: OUT });
  console.log("OK ->", OUT, "|", DATA.length, "slides |", animSeq, "blocos marcados p/ animação");
}
main().catch(e => { console.error(e); process.exit(1); });
