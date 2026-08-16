#!/usr/bin/env python3
# Deck da palestra ATQ — design escuro CCOT, letras grandes, aparecer-ao-clique.
# Conteudo 1:1 do CAPITULO.md (fonte da verdade da sessao de conteudo). NAO alterar/resumir aqui.
# Escala 100% via CSS (cqw) — sem JS de dimensionamento (robusto no GitHub Pages).
import os, html, json
D = os.path.dirname(__file__)

# ---------- MODELO DE CONTEUDO (transcricao fiel do CAPITULO.md) ----------
# Cada 'unit' vira 1 slide-decisao: eyebrow, pergunta (titulo), resposta (barra-veredito),
# rows [(rotulo, achado_com_numero, fonte)], conduta. Discussao NAO entra.

CAPA = {
  "titulo": "Planejamento pré-operatório em ATQ:<br>o que realmente muda o resultado",
  "autor": "Dr. Daniel Araújo Fernandes",
  "evento": "XVI Congresso Catarinense de Ortopedia e Traumatologia · 2026",
}

DIVISORES_E_UNIDADES = [
  # ---- DIVISOR DECISAO 0 ----
  {"tipo":"divisor", "num":"DECISÃO 0", "titulo":"O paciente — otimização clínica antes de operar",
   "linha":"A primeira decisão do planejamento não é técnica: é “opero agora ou preparo o paciente primeiro?”. Quatro condições modificáveis têm número publicado."},

  {"tipo":"decisao", "eyebrow":"DECISÃO 0 · O PACIENTE", "tag":"0.1",
   "pergunta":"Descolonizar Staphylococcus aureus?",
   "resposta":"Sim — protocolo universal antes da artroplastia eletiva.",
   "rows":[
     ("Sem descolonização","infecção RR 1,70 (qualquer) e RR 2,18 (por S. aureus)","Ribau 2020 · J Arthroplasty · meta 32 estudos · PMID 32950342"),
     ("Com rastreio + descolonização","ISC RR 0,52 (IC 0,40–0,67); S. aureus RR 0,48; MRSA RR 0,45","Lin 2021 · meta 12 estudos · PMID 33468375"),
     ("Estratégia","pele OR 0,43 · combinada OR 0,48; universal ≈ dirigida por rastreio","Henkelmann 2026 · meta 19 estudos · 64.796 pac · PMID 41652612"),
     ("Limite honesto","portador de MRSA mantém risco residual — PJI OR 2,42","Javidmehr 2026 · meta 15 estudos · 318.487 pac · PMID 42520992"),
   ],
   "conduta":"Mupirocina nasal + banho de clorexidina no pré-op da eletiva (o protocolo universal dispensa o rastreio); no portador de MRSA, vigilância reforçada."},

  {"tipo":"decisao", "eyebrow":"DECISÃO 0 · O PACIENTE", "tag":"0.2",
   "pergunta":"Diabético: controlar a HbA1c ou a glicemia da cirurgia?",
   "resposta":"A glicemia perioperatória — alvo < 137 mg/dL. A HbA1c com corte em 7% não prevê complicação.",
   "rows":[
     ("A HbA1c falha como veto","cortes de 7% e 7,5% NÃO se associaram a complicações (prospectivo 1.119 pac; meta 17 estudos, P = 0,50)","Shohat 2019 · Insall Award · Bone Joint J · PMID 31256656"),
     ("O que prevê: glicemia pós-op","risco contínuo (linear) a partir de 115 mg/dL; 137 mg/dL = melhor corte de discriminação · 24.857 artroplastias","Kheir 2018 · JBJS · PMID 30106824"),
     ("Quando medir","pico glicêmico às 21 h do dia da cirurgia (65% hiperglicêmicos); a coleta da manhã seguinte subestima","Varady 2019 · J Arthroplasty · 314 pac · PMID 30704771"),
     ("Marcador pré-op melhor","frutosamina > 293 µmol/L → infecção periprotética 11,2×","Shohat 2019 · PMID 31256656"),
     ("Risco basal do diabético","PJI 2,39% × 1,46% do não-diabético","Kheir 2018 · JBJS · PMID 30106824"),
   ],
   "conduta":"Não adiar por HbA1c isolada; planejar o controle glicêmico perioperatório com alvo < 137 mg/dL, medindo na noite da cirurgia (21 h); onde disponível, frutosamina > 293 µmol/L prediz infecção."},

  {"tipo":"decisao", "eyebrow":"DECISÃO 0 · O PACIENTE", "tag":"0.3",
   "pergunta":"Anemia: o que é, como tratar e o que muda?",
   "resposta":"Hb < 13 g/dL na eletiva → ferro IV 4 semanas antes: transfusão cai de 24% para 4%.",
   "rows":[
     ("O GATILHO — o que é anemia na eletiva","Hb < 13 g/dL (mesmo alvo p/ homem e mulher — protocolo de otimização + consenso internacional)","Pinilla-Gracia 2020 · Blood Transfus · PMID 32281924 · Muñoz 2017 · Anaesthesia · PMID 27996086"),
     ("Quem chega assim","22% dos candidatos a artroplastia","meta 2024 · 369.101 pac · PMID 38637795"),
     ("A SOLUÇÃO — a intervenção no planejamento","carboximaltose férrica IV 1.000 mg ± epoetina-α 40.000 UI, 4 semanas antes da cirurgia","Pinilla-Gracia 2020 · Blood Transfus · PMID 32281924"),
     ("Por que IV (e não oral)","Hb ≥ 12 g/dL em 42,3% × 23,5% do oral (P = 0,04) — vantagem maior no ferropênico e na anemia profunda","Bisbe 2014 · RCT · Br J Anaesth · PMID 24780615"),
     ("FAZ DIFERENÇA — o desfecho","transfusão 24% → 4% (P = 0,001) · internação 7 → 6 dias · alta p/ casa 47% → 74%","Pinilla-Gracia 2020 · Blood Transfus · PMID 32281924"),
     ("Confirmação em meta","ferro pré-op no anêmico: transfusão RR 0,61 (IC 0,50–0,73)","meta BMJ Open 2020 · PMID 33130561"),
     ("O intermediário (mecanismo — NÃO é o desfecho)","Hb na admissão 12,2 → 13,4 g/dL; anemia corrigida em 79%","Pinilla-Gracia 2020 · Blood Transfus · PMID 32281924"),
   ],
   "conduta":"Hemograma na indicação; Hb < 13 g/dL → investigar (perfil de ferro) e tratar antes de agendar — ferro IV (carboximaltose 1.000 mg) quando faltam ≤ 4 semanas ou há intolerância/má absorção oral; reavaliar a Hb na admissão."},

  {"tipo":"decisao", "eyebrow":"DECISÃO 0 · O PACIENTE", "tag":"0.4",
   "pergunta":"Posso operar o fumante? Quanto recupero se ele parar?",
   "resposta":"Pode, mas o risco é sistêmico e alto — e 6–8 semanas de cessação derrubam as complicações de 52% para 18% (ensaio randomizado).",
   "rows":[
     ("Não é só infecção — é sistêmico","complicações 1,41 · ferida 1,77 · PJI 1,84 · soltura 1,62 · revisão 2,12 · mortalidade hospitalar 12,37","Yue 2022 · meta 40 estudos · 3.037.683 casos · PMID 36406352"),
     ("Infecção no detalhe","PJI: fumante atual OR 2,16 · ex-fumante OR 1,52 — parar reduz de forma mensurável","Bedard 2018 · meta 14 estudos · PMID 30385090"),
     ("O que a cessação recupera (nível 1)","intervenção 6–8 sem antes: complicações 52% → 18% (P = 0,0003) · ferida 31% → 5% · reoperação 15% → 4%","Møller 2002 · RCT · Lancet · 120 pac · PMID 11809253"),
   ],
   "conduta":"A eletiva do fumante não se veta — se agenda: prescrever cessação (aconselhamento + reposição de nicotina) 6–8 semanas antes e marcar depois; documentar. (Florianópolis: HU-UFSC mantém programa de cessação — encaminhar na indicação.)"},
]

# ---------- FONTE ÚNICA: specs (compartilhada com build_pptx.js via deck_data.json) ----------
# CADA slide real (capa/divisor/decisao-ja-dividida) vira 1 dict de spec.
# build_deck.py (HTML) e build_pptx.js (.pptx) leem os MESMOS specs — editar só CAPA/DIVISORES_E_UNIDADES acima.
MAXROWS = 4   # letras grandes: no maximo 4 linhas por slide; excedente -> mais um slide (nunca espremer)

def build_specs():
    specs = [{"kind":"capa", **CAPA}]
    for it in DIVISORES_E_UNIDADES:
        if it["tipo"] == "divisor":
            specs.append({"kind":"divisor", "num":it["num"], "titulo":it["titulo"], "linha":it["linha"]})
        else:
            rows = it["rows"]
            chunks = [rows[i:i+MAXROWS] for i in range(0, len(rows), MAXROWS)] or [[]]
            for idx, chunk in enumerate(chunks):
                has_resposta = (idx == 0)
                is_last = (idx == len(chunks) - 1)
                specs.append({
                    "kind": "decisao",
                    "eyebrow": it["eyebrow"], "tag": it["tag"],
                    "titulo": it["pergunta"] + ("" if has_resposta else " (continuação)"),
                    "resposta": it["resposta"] if has_resposta else None,
                    "rows": [{"rotulo": r, "achado": a, "fonte": f} for (r, a, f) in chunk],
                    "conduta": it["conduta"] if is_last else None,
                })
    return specs

SPECS = build_specs()

# exporta JSON — build_pptx.js le este arquivo para gerar o .pptx com o MESMO conteudo
json_out = os.path.join(D, "deck_data.json")
open(json_out, "w", encoding="utf-8").write(json.dumps(SPECS, ensure_ascii=False, indent=1))

# ---------- CSS / render HTML (a partir dos specs) ----------
def esc(s): return html.escape(str(s), quote=True)
def q(px): return f"{px/12.8:.4f}cqw"   # 1cqw = 1% da largura do palco (1280px de projeto)

def html_capa(s):
    return f"""<section class="slide on" data-frags="0">
      <div class="t title" style="left:{q(67)};top:{q(212)};width:{q(1150)};font-size:{q(48)};line-height:1.06">{s['titulo']}</div>
      <div class="t" style="left:{q(69)};top:{q(452)};width:{q(1100)};font-size:{q(32)};color:var(--tealb);font-weight:700">{esc(s['autor'])}</div>
      <div class="t" style="left:{q(69)};top:{q(514)};width:{q(1100)};font-size:{q(22)};color:var(--body)">{esc(s['evento'])}</div>
    </section>"""

def html_divisor(s):
    return f"""<section class="slide" data-frags="0">
      <div class="t" style="left:{q(67)};top:{q(210)};font-size:{q(30)};letter-spacing:.06em;color:var(--tealb);font-weight:700">{esc(s['num'])}</div>
      <div class="t title" style="left:{q(67)};top:{q(258)};width:{q(1120)};font-size:{q(52)};line-height:1.04">{esc(s['titulo'])}</div>
      <div class="t" style="left:{q(69)};top:{q(430)};width:{q(1050)};font-size:{q(24)};color:var(--body);line-height:1.3">{esc(s['linha'])}</div>
    </section>"""

def html_decisao(s):
    has_resposta = s["resposta"] is not None
    is_last = s["conduta"] is not None
    frags = (1 if has_resposta else 0) + len(s["rows"]) + (1 if is_last else 0)
    parts = []
    parts.append(f'<div class="t" style="left:{q(67)};top:{q(40)};font-size:{q(20)};letter-spacing:.05em;color:var(--tealb);font-weight:700">{esc(s["eyebrow"])} · {esc(s["tag"])}</div>')
    parts.append(f'<div class="t title" style="left:{q(67)};top:{q(74)};width:{q(1150)};font-size:{q(37)};line-height:1.05">{esc(s["titulo"])}</div>')
    if has_resposta:
        parts.append(f'<div class="t tag frag" style="left:{q(67)};top:{q(162)};width:{q(1146)};font-size:{q(23)}">{esc(s["resposta"])}</div>')
        y0 = 252
    else:
        y0 = 172
    rowh = 90
    y = y0
    for r in s["rows"]:
        parts.append(
          f'<div class="t frag rowcard" style="left:{q(67)};top:{q(y)};width:{q(1146)}">'
          f'<span class="rlabel" style="font-size:{q(21)}"><b>{esc(r["rotulo"])}</b> — {esc(r["achado"])}</span>'
          f'<span class="rsrc" style="font-size:{q(15.5)}">{esc(r["fonte"])}</span>'
          f'</div>')
        y += rowh
    if is_last:
        cy = max(y + 14, 632)
        parts.append(f'<div class="t conduta frag" style="left:{q(67)};top:{q(cy)};width:{q(1146)};font-size:{q(18.5)}"><b style="color:var(--tealb)">Conduta:</b> {esc(s["conduta"])}</div>')
    return f'<section class="slide" data-frags="{frags}">' + "".join(parts) + '</section>'

RENDER = {"capa": html_capa, "divisor": html_divisor, "decisao": html_decisao}
SLIDES = [RENDER[s["kind"]](s) for s in SPECS]

HTML = f"""<title>Palestra ATQ — Planejamento</title>
<style>
  :root{{--bg:#33414B;--card:#3E4E5A;--teal:#107368;--tealb:#35B3A3;--ink:#fff;--body:#D6DEE4;--mut:#A6B2BC;
        --hf:Georgia,'Times New Roman',serif;--bf:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;}}
  *{{margin:0;padding:0;box-sizing:border-box;}}
  html,body{{margin:0;background:#11161c;font-family:var(--bf);}} body{{overflow-x:hidden;}}
  #wrap{{display:flex;justify-content:center;}}
  #stage{{position:relative;width:min(96vw,1280px);aspect-ratio:16/9;background:var(--bg);
          container-type:size;overflow:hidden;box-shadow:0 10px 60px rgba(0,0,0,.6);}}
  .slide{{position:absolute;inset:0;display:none;}} .slide.on{{display:block;}}
  .t{{position:absolute;}}
  .title{{font-family:var(--hf);font-weight:700;color:var(--ink);}}
  .frag{{opacity:0;transform:translateY(1cqw);transition:opacity .35s ease,transform .35s ease;}}
  .frag.show{{opacity:1;transform:none;}}
  .tag{{background:var(--teal);border-radius:.7cqw;color:#fff;font-weight:700;padding:.7cqw 1.4cqw;
        box-shadow:0 .3cqw 1cqw rgba(0,0,0,.3);line-height:1.15;}}
  .rowcard{{background:var(--card);border-radius:.6cqw;box-shadow:0 .25cqw .8cqw rgba(0,0,0,.28);
            padding:.55cqw 1.2cqw;display:flex;flex-direction:column;gap:.2cqw;}}
  .rlabel{{color:var(--body);line-height:1.12;}} .rlabel b{{color:#fff;}}
  .rsrc{{color:var(--mut);font-style:italic;line-height:1.05;}}
  .conduta{{color:var(--body);line-height:1.15;}}
  #dots{{position:fixed;top:10px;left:50%;transform:translateX(-50%);display:flex;gap:6px;flex-wrap:wrap;max-width:90vw;justify-content:center;z-index:6;}}
  #dots i{{width:8px;height:8px;border-radius:50%;background:#4a5a67;display:block;}} #dots i.on{{background:var(--tealb);}}
  #nav{{position:fixed;right:18px;bottom:16px;display:flex;gap:10px;z-index:6;}}
  #nav button{{width:54px;height:54px;border-radius:50%;border:none;cursor:pointer;font-size:28px;line-height:1;
    background:var(--teal);color:#fff;box-shadow:0 4px 14px rgba(0,0,0,.5);font-family:var(--bf);
    display:flex;align-items:center;justify-content:center;padding-bottom:4px;transition:background .15s,transform .1s;}}
  #nav button:hover{{background:var(--tealb);}} #nav button:active{{transform:scale(.92);}}
  #hint{{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);color:#cfd8df;background:rgba(0,0,0,.5);
         padding:7px 15px;border-radius:20px;font-size:13px;z-index:6;transition:opacity .3s;}}
</style>

<div id="wrap"><div id="stage">
{''.join(SLIDES)}
</div></div>
<div id="dots"></div>
<div id="nav"><button id="prev" aria-label="Anterior">‹</button><button id="next" aria-label="Próximo">›</button></div>
<div id="hint">botões ‹ › · setas · ou clique para avançar</div>
<script>
var slides=[].slice.call(document.querySelectorAll('.slide'));var si=0,fi=0;
var dots=document.getElementById('dots');slides.forEach(function(){{var d=document.createElement('i');dots.appendChild(d);}});
function fragsOf(i){{return parseInt(slides[i].dataset.frags||'0',10);}}
function render(){{if(si<0)si=0;if(si>slides.length-1)si=slides.length-1;if(fi<0)fi=0;if(fi>fragsOf(si))fi=fragsOf(si);
  slides.forEach(function(s,i){{s.classList.toggle('on',i===si);}});
  [].forEach.call(dots.children,function(d,i){{d.classList.toggle('on',i===si);}});
  var f=slides[si].querySelectorAll('.frag');[].forEach.call(f,function(x,k){{x.classList.toggle('show',k<fi);}});
  var h=document.getElementById('hint');if(h)h.style.opacity=(si===0&&fi===0)?'1':'0';}}
function next(){{if(fi<fragsOf(si)){{fi++;render();return;}}if(si<slides.length-1){{si++;fi=0;render();}}}}
function prev(){{if(fi>0){{fi--;render();return;}}if(si>0){{si--;fi=fragsOf(si);render();}}}}
document.getElementById('next').addEventListener('click',function(e){{e.stopPropagation();next();}});
document.getElementById('prev').addEventListener('click',function(e){{e.stopPropagation();prev();}});
window.addEventListener('keydown',function(e){{if(['ArrowRight','ArrowDown',' ','PageDown','Enter'].indexOf(e.key)>=0){{e.preventDefault();next();}}else if(['ArrowLeft','ArrowUp','PageUp','Backspace'].indexOf(e.key)>=0){{e.preventDefault();prev();}}}});
document.getElementById('wrap').addEventListener('click',function(e){{if(e.target.closest('#nav'))return;(e.clientX<window.innerWidth*0.22)?prev():next();}});
render();
</script>
"""
out=os.path.join(D,"deck.html")
open(out,"w",encoding="utf-8").write(HTML)
print("OK ->",out,"|",len(SLIDES),"slides |",round(len(HTML)/1024),"KB")
